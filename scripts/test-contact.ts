/**
 * Offline tests for the contact form back end.
 * Run: npx -y tsx scripts/test-contact.ts
 * Nothing here touches the network: global fetch is replaced by a mock.
 */
import { GET, POST } from '../src/pages/api/contact';
import { checkContent, checkOrigin, checkTimeToken, isValidEmail, signToken, softSignals, validateFields } from '../src/lib/spam';

const SECRET = 'test-secret-not-real';
const GOOD_ORIGIN = 'https://jokholk.dev';
const REAL_MESSAGE = 'Hi, I saw your portfolio and would like to talk about a small web project for my shop.';

let passed = 0;
let failed = 0;
function check(name: string, ok: boolean, detail = '') {
    if (ok) passed++;
    else failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '  ' + detail}`);
}

type Call = { url: string; init: RequestInit };
let calls: Call[] = [];
let upstreamStatus = 200;
let upstreamThrows = false;
globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    if (upstreamThrows) throw new Error('network down');
    return new Response('{}', { status: upstreamStatus });
}) as typeof fetch;

const warnings: string[] = [];
console.warn = (...args: unknown[]) => {
    warnings.push(args.join(' '));
};

function resetEnv({ secret = SECRET, dry = true } = {}) {
    if (secret) process.env.CONTACT_SECRET = secret;
    else delete process.env.CONTACT_SECRET;
    if (dry) process.env.CONTACT_DRY_RUN = '1';
    else delete process.env.CONTACT_DRY_RUN;
    delete process.env.FORMSPREE_FORM_ID;
    calls = [];
    upstreamStatus = 200;
    upstreamThrows = false;
}

interface Payload {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    _gotcha?: unknown;
    t?: unknown;
    sig?: unknown;
}

function signedToken(ageMs: number) {
    const t = Date.now() - ageMs;
    return { t, sig: signToken(SECRET, t) };
}

function goodPayload(over: Payload = {}): Payload {
    return {
        name: 'Linh Tran',
        email: 'linh.tran@example.com',
        message: REAL_MESSAGE,
        _gotcha: '',
        ...signedToken(5_000),
        ...over,
    };
}

interface SendOpts {
    origin?: string | null;
    referer?: string | null;
    dryHeader?: boolean;
    contentType?: string;
    rawBody?: string;
}
async function send(payload: Payload, opts: SendOpts = {}) {
    const headers: Record<string, string> = { 'Content-Type': opts.contentType ?? 'application/json' };
    const origin = opts.origin === undefined ? GOOD_ORIGIN : opts.origin;
    if (origin) headers.Origin = origin;
    if (opts.referer) headers.Referer = opts.referer;
    if (opts.dryHeader ?? true) headers['x-dry-run'] = '1';
    const request = new Request('https://jokholk.dev/api/contact', {
        method: 'POST',
        headers,
        body: opts.rawBody ?? JSON.stringify(payload),
    });
    const response = await POST({ request } as never);
    const text = await response.text();
    let body: Record<string, unknown> = {};
    try {
        body = JSON.parse(text);
    } catch {
        /* leave empty */
    }
    return { status: response.status, body, headers: response.headers };
}

async function dryScenario(name: string, payload: Payload, expectDecision: 'forward' | 'blocked', opts: SendOpts = {}, reasonPrefix?: string) {
    resetEnv();
    const r = await send(payload, opts);
    const reason = String(r.body.reason ?? '');
    const ok =
        r.status === 200 &&
        r.body.ok === true &&
        r.body.dryRun === true &&
        r.body.decision === expectDecision &&
        calls.length === 0 &&
        (reasonPrefix === undefined || reason.startsWith(reasonPrefix));
    check(`${name} -> ${expectDecision}${reason ? ` (${reason})` : ''}`, ok, JSON.stringify({ status: r.status, body: r.body, fetchCalls: calls.length }));
}

async function main() {
    resetEnv();
    {
        const res = await GET({} as never);
        const body = (await res.json()) as { t: number; sig: string };
        check(
            'GET returns t + hex HMAC sig, no-store, json',
            typeof body.t === 'number' &&
                body.sig === signToken(SECRET, body.t) &&
                /^[0-9a-f]{64}$/.test(body.sig) &&
                res.headers.get('Cache-Control') === 'no-store' &&
                res.headers.get('Content-Type') === 'application/json',
        );
        resetEnv({ secret: '' });
        const open = (await (await GET({} as never)).json()) as { t: number; sig: string };
        check('GET without CONTACT_SECRET returns sig ""', typeof open.t === 'number' && open.sig === '');
    }

    await dryScenario('real person, valid signed token, 5 s old', goodPayload(), 'forward');
    await dryScenario('real person, referer only (no Origin)', goodPayload(), 'forward', { origin: null, referer: 'https://jokholk.dev/en#contact' });
    await dryScenario('real person from www host', goodPayload(), 'forward', { origin: 'https://www.jokholk.dev' });
    await dryScenario('real person from vercel preview', goodPayload(), 'forward', { origin: 'https://portfolio-git-x-me.vercel.app' });
    await dryScenario('honeypot filled', goodPayload({ _gotcha: 'http://spam.example' }), 'blocked', {}, 'honeypot');
    await dryScenario('submitted too fast (1 s)', goodPayload({ ...signedToken(1_000) }), 'blocked', {}, 'too-fast');
    await dryScenario('token from the future', goodPayload({ ...signedToken(-60_000) }), 'blocked', {}, 'too-fast');
    {
        const t = Date.now() - 5_000;
        await dryScenario('forged signature', goodPayload({ t, sig: 'f'.repeat(64) }), 'blocked', {}, 'token-signature');
        await dryScenario('signature of another secret', goodPayload({ t, sig: signToken('other', t) }), 'blocked', {}, 'token-signature');
        await dryScenario('tampered t (older timestamp, old sig)', goodPayload({ t: t - 10_000, sig: signToken(SECRET, t) }), 'blocked', {}, 'token-signature');
        await dryScenario('garbage signature', goodPayload({ t, sig: 'zz' }), 'blocked', {}, 'token-signature');
    }
    await dryScenario('token missing while secret is set', goodPayload({ t: undefined, sig: undefined }), 'blocked', {}, 'token-missing');
    await dryScenario('expired token (> 2 h)', goodPayload({ ...signedToken(2 * 3600_000 + 60_000) }), 'blocked', {}, 'token-expired');
    await dryScenario('wrong Origin evil.example', goodPayload(), 'blocked', { origin: 'https://evil.example' }, 'foreign-origin');
    await dryScenario('lookalike host evil.vercel.app.attacker.com', goodPayload(), 'blocked', { origin: 'https://evil.vercel.app.attacker.com' }, 'foreign-origin');
    await dryScenario('lookalike host evilvercel.app', goodPayload(), 'blocked', { origin: 'https://evilvercel.app' }, 'foreign-origin');
    await dryScenario('localhost origin outside dev', goodPayload(), 'blocked', { origin: 'http://localhost:4321' }, 'foreign-origin');
    await dryScenario('missing Origin and Referer', goodPayload(), 'blocked', { origin: null }, 'no-origin');
    await dryScenario('Origin: null (sandboxed iframe)', goodPayload(), 'blocked', { origin: 'null' }, 'bad-origin');

    await dryScenario(
        'exact spam sample (Brian Thompson)',
        goodPayload({
            name: 'Brian Thompson',
            email: 'clank182@hotmail.com',
            message: 'I would like more information. Please contact me by email - jokholk realm',
        }),
        'blocked',
        {},
        'site-name-echo',
    );
    await dryScenario('site name echoed in name field', goodPayload({ name: 'JokHolk  Realm Ltd' }), 'blocked', {}, 'site-name-echo');
    await dryScenario('site name with zero-width chars', goodPayload({ message: REAL_MESSAGE + ' jok​holk realm' }), 'blocked', {}, 'site-name-echo');
    await dryScenario(
        'message with 3 links',
        goodPayload({ message: 'Check https://a.example and http://b.example plus www.c.example for details of the project.' }),
        'blocked',
        {},
        'too-many-links',
    );
    await dryScenario(
        'template phrases alone (1 soft signal) pass',
        goodPayload({ message: 'I would like more information about your services. Please contact me by email.' }),
        'forward',
    );
    await dryScenario(
        'template phrase + a link (2 soft signals) blocked',
        goodPayload({ message: 'I would like more information, see https://offer.example for the details.' }),
        'blocked',
        {},
        'soft-signals:',
    );
    await dryScenario('one real link in a real message passes', goodPayload({ message: 'Hello! Here is my current shop https://shop.example, I want a new landing page.' }), 'forward');
    await dryScenario('Vietnamese message passes', goodPayload({ name: 'Nguyễn Văn An', message: 'Chào bạn, mình muốn trao đổi về một dự án website nhỏ cho cửa hàng.' }), 'forward');
    await dryScenario('control characters', goodPayload({ message: 'Hello there\u0007 this is a message' }), 'blocked', {}, 'control-chars');
    await dryScenario('multi-line message with tabs is fine', goodPayload({ message: 'Line one is here.\n\tLine two is indented.\r\nLine three.' }), 'forward');

    async function validation(name: string, payload: Payload, field: string, error: string) {
        resetEnv();
        const r = await send(payload);
        check(
            `${name} -> 422 ${field}/${error}`,
            r.status === 422 && r.body.ok === false && r.body.field === field && r.body.error === error && calls.length === 0,
            JSON.stringify({ status: r.status, body: r.body }),
        );
    }
    await validation('invalid email', goodPayload({ email: 'not-an-email' }), 'email', 'email');
    await validation('email without TLD', goodPayload({ email: 'a@b' }), 'email', 'email');
    await validation('empty name', goodPayload({ name: '   ' }), 'name', 'required');
    await validation('empty email', goodPayload({ email: '' }), 'email', 'required');
    await validation('empty message', goodPayload({ message: '' }), 'message', 'required');
    await validation('short message', goodPayload({ message: 'hi there' }), 'message', 'too_short');
    await validation('message too long', goodPayload({ message: 'a b '.repeat(2000) }), 'message', 'too_long');
    await validation('name too long', goodPayload({ name: 'x'.repeat(101) }), 'name', 'too_long');
    await validation('email too long', goodPayload({ email: 'a'.repeat(250) + '@x.io' }), 'email', 'too_long');
    await validation('non-string name', goodPayload({ name: { a: 1 } }), 'name', 'required');

    // silent block wins over 422 when an anti-bot check fails
    {
        resetEnv();
        const r = await send(goodPayload({ _gotcha: 'x', email: 'bad' }));
        check('bot with bad email still gets silent success', r.status === 200 && r.body.ok === true && r.body.dryRun === true);
    }

    {
        resetEnv({ secret: '' });
        let r = await send({ name: 'Linh Tran', email: 'linh@example.com', message: REAL_MESSAGE });
        check('no secret, no t: still accepted', r.body.decision === 'forward' && calls.length === 0, JSON.stringify(r.body));
        r = await send({ name: 'Linh Tran', email: 'linh@example.com', message: REAL_MESSAGE, t: Date.now() - 500, sig: '' });
        check('no secret, unsigned t too fast -> blocked', r.body.decision === 'blocked' && r.body.reason === 'too-fast', JSON.stringify(r.body));
        r = await send({ name: 'Linh Tran', email: 'linh@example.com', message: REAL_MESSAGE, t: Date.now() - 9 * 3600_000, sig: '' });
        check('no secret, unsigned t expired -> blocked', r.body.reason === 'token-expired', JSON.stringify(r.body));
        r = await send({ name: 'Linh Tran', email: 'linh@example.com', message: REAL_MESSAGE, t: Date.now() - 6_000, sig: '' });
        check('no secret, unsigned t 6 s old -> forward', r.body.decision === 'forward', JSON.stringify(r.body));
    }

    {
        resetEnv();
        const tok = signedToken(5_000);
        const body = new URLSearchParams({
            name: 'Linh Tran',
            email: 'linh@example.com',
            message: REAL_MESSAGE,
            _gotcha: '',
            t: String(tok.t),
            sig: tok.sig,
        }).toString();
        const r = await send({}, { contentType: 'application/x-www-form-urlencoded', rawBody: body });
        check('urlencoded body accepted (dry run forward)', r.body.decision === 'forward', JSON.stringify(r.body));
        const bad = await send({}, { rawBody: '{not json' });
        check('malformed JSON -> 400 bad_request', bad.status === 400 && bad.body.error === 'bad_request');
    }

    {
        resetEnv({ dry: false });
        const r = await send(goodPayload(), { dryHeader: true });
        const call = calls[0];
        const sent = call ? JSON.parse(String(call.init.body)) : null;
        check(
            'production mode: x-dry-run header ignored, forwards exactly once',
            r.status === 200 &&
                r.body.ok === true &&
                r.body.dryRun === undefined &&
                calls.length === 1 &&
                call.url === 'https://formspree.io/f/mwpnbnoy' &&
                call.init.method === 'POST' &&
                JSON.stringify(sent) === JSON.stringify({ name: 'Linh Tran', email: 'linh.tran@example.com', message: REAL_MESSAGE }) &&
                (call.init.headers as Record<string, string>)['Content-Type'] === 'application/json' &&
                (call.init.headers as Record<string, string>).Accept === 'application/json' &&
                call.init.signal instanceof AbortSignal,
            JSON.stringify({ status: r.status, body: r.body, calls: calls.length, url: call?.url }),
        );

        resetEnv({ dry: false });
        process.env.FORMSPREE_FORM_ID = 'customid';
        await send(goodPayload());
        check('FORMSPREE_FORM_ID overrides the form id', calls.length === 1 && calls[0].url === 'https://formspree.io/f/customid');

        resetEnv({ dry: false });
        const spam = await send(goodPayload({ _gotcha: 'bot' }));
        check('production mode: bot gets {ok:true} and nothing is forwarded', spam.status === 200 && JSON.stringify(spam.body) === '{"ok":true}' && calls.length === 0);

        resetEnv({ dry: false });
        const v = await send(goodPayload({ email: 'nope' }));
        check('production mode: validation error 422 and nothing is forwarded', v.status === 422 && calls.length === 0);

        resetEnv({ dry: false });
        upstreamStatus = 500;
        let f = await send(goodPayload());
        check('Formspree non-OK -> 502 upstream', f.status === 502 && f.body.ok === false && f.body.error === 'upstream' && calls.length === 1);

        resetEnv({ dry: false });
        upstreamThrows = true;
        f = await send(goodPayload());
        check('Formspree throws -> 502 upstream', f.status === 502 && f.body.error === 'upstream' && calls.length === 1);
    }

    {
        check('blocked requests are logged without personal data', warnings.some((w) => w.startsWith('[contact] blocked honeypot')) && !warnings.some((w) => /Linh|Brian|clank182|example\.com/.test(w)));
        check('isValidEmail accepts normal + unicode-domain, rejects junk', isValidEmail('a.b+c@sub.example.co') && isValidEmail('x@bücher.de') && !isValidEmail('a..b@x.io') && !isValidEmail('a@@x.io') && !isValidEmail('a b@x.io') && !isValidEmail('@x.io'));
        check('checkOrigin allows localhost only with allowLocal', checkOrigin('http://localhost:4321', null, { allowLocal: true }) === null && checkOrigin('http://127.0.0.1:4321', null, { allowLocal: false }) === 'foreign-origin');
        check('checkTimeToken boundary: exactly 3 s ok, 2999 ms too fast', (() => {
            const now = 1_800_000_000_000;
            const ok = checkTimeToken({ t: now - 3000, sig: signToken(SECRET, now - 3000), secret: SECRET, now });
            const fast = checkTimeToken({ t: now - 2999, sig: signToken(SECRET, now - 2999), secret: SECRET, now });
            return ok === null && fast === 'too-fast';
        })());
        check('softSignals/validateFields are pure and never throw on empty input', softSignals({ name: '', email: '', message: '' }).length >= 1 && validateFields({ name: '', email: '', message: '' })?.field === 'name' && checkContent({ name: 'A', email: 'a@b.co', message: REAL_MESSAGE }) === null);
    }

    console.log(`\n${passed} passed, ${failed} failed`);
    process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
    console.error('test runner crashed', err);
    process.exit(2);
});
