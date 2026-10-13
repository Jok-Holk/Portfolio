import type { APIRoute } from 'astro';
import {
    checkContent,
    checkHoneypot,
    checkOrigin,
    checkTimeToken,
    normalizeFields,
    signToken,
    validateFields,
} from '../../lib/spam';

// The site is static; only this route runs on the server (Vercel function).
export const prerender = false;

const FORMSPREE_DEFAULT_ID = 'mwpnbnoy';
const FORWARD_TIMEOUT_MS = 10_000;
const MAX_BODY_BYTES = 50_000;

/** Reads import.meta.env in Astro and falls back to process.env (Vercel runtime, tsx tests). */
function env(name: string): string | undefined {
    const fromMeta = import.meta.env?.[name];
    if (typeof fromMeta === 'string' && fromMeta !== '') return fromMeta;
    const fromProcess = typeof process !== 'undefined' ? process.env?.[name] : undefined;
    return fromProcess !== undefined && fromProcess !== '' ? fromProcess : undefined;
}

function isDev(): boolean {
    return import.meta.env?.DEV === true;
}

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra },
    });
}

/** Time token handed to the browser on page load. */
export const GET: APIRoute = () => {
    const t = Date.now();
    const secret = env('CONTACT_SECRET');
    return json({ t, sig: secret ? signToken(secret, t) : '' });
};

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
    const length = Number(request.headers.get('content-length') ?? '0');
    if (Number.isFinite(length) && length > MAX_BODY_BYTES) return null;

    const type = (request.headers.get('content-type') ?? '').toLowerCase();
    if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
        const form = await request.formData();
        const out: Record<string, unknown> = {};
        for (const [key, value] of form.entries()) {
            // Files are never valid here; a marker object keeps them out of the string checks.
            out[key] = typeof value === 'string' ? value : { file: true };
        }
        return out;
    }

    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return null;
    const parsed: unknown = JSON.parse(text);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
}

export const POST: APIRoute = async ({ request }) => {
    // x-dry-run only works in dev or with CONTACT_DRY_RUN=1.
    const dryRunAllowed = isDev() || env('CONTACT_DRY_RUN') === '1';
    const dryRun = dryRunAllowed && request.headers.get('x-dry-run') === '1';

    let raw: Record<string, unknown> | null;
    try {
        raw = await readBody(request);
    } catch {
        return json({ ok: false, error: 'bad_request' }, 400);
    }
    if (raw === null) return json({ ok: false, error: 'bad_request' }, 400);

    // A failed anti-bot check answers like a success so bots learn nothing, and forwards nothing.
    const blockedReason =
        checkHoneypot(raw._gotcha) ??
        checkOrigin(request.headers.get('origin'), request.headers.get('referer'), { allowLocal: isDev() }) ??
        checkTimeToken({ t: raw.t, sig: raw.sig, secret: env('CONTACT_SECRET'), now: Date.now() });

    const fields = normalizeFields(raw);

    if (blockedReason === null) {
        // Visitor mistakes: send codes only, the page localizes them.
        const problem = validateFields(fields);
        if (problem) return json({ ok: false, field: problem.field, error: problem.error }, 422);
    }

    const reason = blockedReason ?? checkContent(fields);

    if (reason !== null) {
        console.warn('[contact] blocked', reason);
        if (dryRun) return json({ ok: true, dryRun: true, decision: 'blocked', reason });
        return json({ ok: true });
    }

    if (dryRun) return json({ ok: true, dryRun: true, decision: 'forward', reason: null });

    try {
        const formId = env('FORMSPREE_FORM_ID') ?? FORMSPREE_DEFAULT_ID;
        const upstream = await fetch('https://formspree.io/f/' + encodeURIComponent(formId), {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
            signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
        });
        if (!upstream.ok) {
            console.warn('[contact] upstream status', upstream.status);
            return json({ ok: false, error: 'upstream' }, 502);
        }
    } catch {
        console.warn('[contact] upstream failed');
        return json({ ok: false, error: 'upstream' }, 502);
    }

    return json({ ok: true });
};
