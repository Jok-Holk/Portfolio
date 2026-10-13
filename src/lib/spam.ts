/**
 * Bot checks for the contact form. Each check returns a short reason when the
 * request should be dropped, or null. Reasons never contain user input.
 *
 * Hard rejects: control characters, the site's own name in the name or message
 * (bots paste the page title into their template), more than 2 URLs.
 * Soft signals, dropped at 2 or more: stock lead-gen phrases, spam keywords,
 * any URL, an odd sender name, a one-word message, a character repeated 8+
 * times, an all-caps message.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

export const MIN_AGE_MS = 3_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1000;

export const LIMITS = {
    nameMax: 100,
    emailMax: 254,
    messageMin: 10,
    messageMax: 5000,
    maxLinks: 2,
    softBlockAt: 2,
} as const;

export type FieldName = 'name' | 'email' | 'message';
export type FieldErrorCode = 'required' | 'email' | 'too_long' | 'too_short';
export interface FieldError {
    field: FieldName;
    error: FieldErrorCode;
}
export interface Fields {
    name: string;
    email: string;
    message: string;
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value : '';
}

/** Trimmed string, or '' for anything that is not a string. */
export function normalizeFields(raw: Record<string, unknown>): Fields {
    return {
        name: asString(raw.name).trim(),
        email: asString(raw.email).trim(),
        message: asString(raw.message).replace(/\r\n?/g, '\n').trim(),
    };
}

export function checkHoneypot(value: unknown): string | null {
    if (value === undefined || value === null) return null;
    if (typeof value === 'string') return value.trim() === '' ? null : 'honeypot';
    // Arrays, numbers, objects and files never come from the real form.
    return 'honeypot';
}

const ALLOWED_HOSTS = new Set(['jokholk.dev', 'www.jokholk.dev']);
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

function hostOf(value: string): string | null {
    try {
        const url = new URL(value);
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
        return url.hostname.toLowerCase();
    } catch {
        return null;
    }
}

export function isAllowedHost(host: string, allowLocal: boolean): boolean {
    if (ALLOWED_HOSTS.has(host)) return true;
    // Any Vercel preview deployment. The leading dot stops "evilvercel.app".
    if (host.endsWith('.vercel.app')) return true;
    if (allowLocal && LOCAL_HOSTS.has(host)) return true;
    return false;
}

export function checkOrigin(
    origin: string | null | undefined,
    referer: string | null | undefined,
    opts: { allowLocal: boolean },
): string | null {
    const source = origin && origin.trim() !== '' ? origin : referer && referer.trim() !== '' ? referer : '';
    if (!source) return 'no-origin';
    const host = hostOf(source);
    if (!host) return 'bad-origin';
    return isAllowedHost(host, opts.allowLocal) ? null : 'foreign-origin';
}

export function signToken(secret: string, t: number | string): string {
    return createHmac('sha256', secret).update(String(t)).digest('hex');
}

function parseTimestamp(value: unknown): number | null {
    if (typeof value === 'number') return Number.isSafeInteger(value) && value > 0 ? value : null;
    if (typeof value === 'string' && /^\d{10,16}$/.test(value.trim())) return Number(value.trim());
    return null;
}

function signatureMatches(secret: string, t: number, sig: unknown): boolean {
    if (typeof sig !== 'string' || !/^[0-9a-f]{64}$/i.test(sig)) return false;
    const expected = Buffer.from(signToken(secret, t), 'hex');
    const given = Buffer.from(sig, 'hex');
    return expected.length === given.length && timingSafeEqual(expected, given);
}

/**
 * With a secret, the token and its signature are required. Without one, a `t`
 * that is present still gets the age check and a missing `t` is allowed.
 */
export function checkTimeToken(input: { t: unknown; sig: unknown; secret?: string; now: number }): string | null {
    const { t, sig, secret, now } = input;
    const present = t !== undefined && t !== null && t !== '';
    if (secret) {
        if (!present) return 'token-missing';
        const ts = parseTimestamp(t);
        if (ts === null) return 'token-malformed';
        if (!signatureMatches(secret, ts, sig)) return 'token-signature';
        return ageReason(now - ts);
    }
    if (!present) return null;
    const ts = parseTimestamp(t);
    if (ts === null) return 'token-malformed';
    return ageReason(now - ts);
}

function ageReason(age: number): string | null {
    if (age < MIN_AGE_MS) return 'too-fast';
    if (age > MAX_AGE_MS) return 'token-expired';
    return null;
}

// Control characters except tab (\u0009), line feed (\u000A) and carriage return (\u000D).
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const EMAIL_LOCAL = /^[\p{L}\p{N}.!#$%&'*+/=?^_`{|}~-]+$/u;
const EMAIL_LABEL = /^[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?$/u;

export function isValidEmail(email: string): boolean {
    if (email.length === 0 || email.length > LIMITS.emailMax) return false;
    const at = email.lastIndexOf('@');
    if (at < 1 || at !== email.indexOf('@')) return false;
    const local = email.slice(0, at);
    const domain = email.slice(at + 1);
    if (local.length > 64 || !EMAIL_LOCAL.test(local) || local.startsWith('.') || local.endsWith('.') || local.includes('..')) {
        return false;
    }
    const labels = domain.split('.');
    if (labels.length < 2) return false;
    if (!labels.every((label) => label.length > 0 && label.length <= 63 && EMAIL_LABEL.test(label))) return false;
    return labels[labels.length - 1].length >= 2;
}

/** Input mistakes a real visitor can fix; the page shows a message per field. */
export function validateFields(f: Fields): FieldError | null {
    if (f.name.length === 0) return { field: 'name', error: 'required' };
    if (f.name.length > LIMITS.nameMax) return { field: 'name', error: 'too_long' };
    if (f.email.length === 0) return { field: 'email', error: 'required' };
    if (f.email.length > LIMITS.emailMax) return { field: 'email', error: 'too_long' };
    if (!isValidEmail(f.email)) return { field: 'email', error: 'email' };
    if (f.message.length === 0) return { field: 'message', error: 'required' };
    if (f.message.length < LIMITS.messageMin) return { field: 'message', error: 'too_short' };
    if (f.message.length > LIMITS.messageMax) return { field: 'message', error: 'too_long' };
    return null;
}

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;

/** The site name sent back as if it were the sender's, e.g. "JokHolk Realm". */
const SITE_NAME_ECHO = /jok\s*holk\s*realm/i;

const LEAD_GEN_PHRASES: RegExp[] = [
    /contact\s+me\s+(?:by|via|through|at|on)\s+e-?mail/i,
    /i\s+would\s+like\s+(?:to\s+get\s+)?(?:more\s+)?information/i,
    /please\s+(?:contact|reach|e-?mail)\s+me/i,
    /i(?:\s+am|'m)\s+interested\s+in\s+(?:your|this)\s+(?:product|service|offer)/i,
    /(?:dear|hello|hi)\s+(?:sir|madam|webmaster|site\s+owner|admin)\b/i,
    /business\s+proposal/i,
    /this\s+is\s+not\s+(?:a\s+)?spam/i,
];

const PROMO_KEYWORDS =
    /\b(?:viagra|cialis|casino|porn|forex|backlinks?|guest\s+post|buy\s+(?:followers|likes)|crypto\s+invest\w*|seo\s+(?:services?|packages?|expert)|first\s+page\s+of\s+google|loan\s+offer)\b/i;

function normalizeForMatching(value: string): string {
    return value.normalize('NFKC').replace(/[​-‍⁠﻿]/g, '');
}

export function countLinks(text: string): number {
    return (text.match(URL_PATTERN) ?? []).length;
}

export function hasControlChars(f: Fields): boolean {
    return CONTROL_CHARS.test(f.name) || CONTROL_CHARS.test(f.email) || CONTROL_CHARS.test(f.message);
}

/** Soft signals that fired; exported for the tests. */
export function softSignals(f: Fields): string[] {
    const message = normalizeForMatching(f.message);
    const name = normalizeForMatching(f.name);
    const signals: string[] = [];

    if (LEAD_GEN_PHRASES.some((p) => p.test(message))) signals.push('lead-gen-phrase');
    if (PROMO_KEYWORDS.test(message) || PROMO_KEYWORDS.test(name)) signals.push('promo-keyword');
    if (countLinks(message) >= 1) signals.push('has-link');
    if (/\d/.test(name) || name.includes('@') || countLinks(name) > 0) signals.push('odd-name');
    if (message.split(/\s+/).filter(Boolean).length < 2) signals.push('one-word');
    if (/(.)\1{7,}/u.test(message)) signals.push('repeated-char');

    const letters = message.replace(/[^\p{L}]/gu, '');
    if (letters.length >= 30 && letters === letters.toUpperCase() && letters !== letters.toLowerCase()) {
        signals.push('shouting');
    }
    return signals;
}

export function checkContent(f: Fields): string | null {
    if (hasControlChars(f)) return 'control-chars';

    const message = normalizeForMatching(f.message);
    const name = normalizeForMatching(f.name);
    if (SITE_NAME_ECHO.test(message) || SITE_NAME_ECHO.test(name)) return 'site-name-echo';
    if (countLinks(message) > LIMITS.maxLinks) return 'too-many-links';

    const signals = softSignals(f);
    if (signals.length >= LIMITS.softBlockAt) return 'soft-signals:' + signals.join('+');
    return null;
}
