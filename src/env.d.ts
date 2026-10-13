/// <reference types="astro/client" />

interface ImportMetaEnv {
    /** Base URL of the Strapi instance, e.g. https://strapi.jokholk.dev */
    readonly STRAPI_URL: string;
    /** Set to 1 locally to preview the draft copy in src/locales/*.draft.json */
    readonly CONTENT_DRAFT?: string;
    /** Formspree form id used by /api/contact (server only). */
    readonly FORMSPREE_FORM_ID?: string;
    /** HMAC secret for the contact form time token (server only). */
    readonly CONTACT_SECRET?: string;
}
