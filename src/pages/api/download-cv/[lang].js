export const prerender = false;

export async function GET({ params }) {
    const lang = params.lang === 'vi' || params.lang === 'en' ? params.lang : 'vi';
    return Response.redirect(`https://console.jokholk.dev/api/cv/export?lang=${lang}`, 302);
}
