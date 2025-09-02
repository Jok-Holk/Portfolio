/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment, u as unescapeHTML } from '../../chunks/astro/server_CHWcxQZ1.mjs';
import { $ as $$Layout, f as fetchApi } from '../../chunks/strapi_BqXo463T.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const articles = await fetchApi({
    endpoint: "/articles?populate=*",
    wrappedByKey: "data"
  });
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: article
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const article = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": article.title, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black" data-astro-cid-4sn4zg3r> <div class="container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32 mx-auto text-gray-300 font-mono" data-astro-cid-4sn4zg3r> <!-- Back Navigation --> <div class="animate-fade-in-left mb-8 md:mb-12" data-astro-cid-4sn4zg3r> <a href="/blog/" class="group inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-purple-400 font-mono transition-all duration-300 hover:text-purple-300 hover:scale-105" data-astro-cid-4sn4zg3r> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" data-astro-cid-4sn4zg3r></path> </svg> <span class="underline-on-hover" data-astro-cid-4sn4zg3r>Back to blogs</span> </a> </div> <!-- Article Header --> <header class="mb-8 md:mb-12 lg:mb-16" data-astro-cid-4sn4zg3r> <!-- Featured Image --> ${article.image && renderTemplate`<div class="mb-8 md:mb-12 animate-fade-in-up opacity-0" style="animation-delay: 200ms; animation-fill-mode: forwards;" data-astro-cid-4sn4zg3r> <div class="relative overflow-hidden rounded-2xl shadow-2xl group" data-astro-cid-4sn4zg3r> <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" data-astro-cid-4sn4zg3r></div> <img${addAttribute(`${article.image.url}`, "src")}${addAttribute(article.title, "alt")} class="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] object-cover transition-all duration-700 group-hover:scale-105" loading="eager" data-astro-cid-4sn4zg3r> </div> </div>`} <!-- Title and Meta --> <div class="space-y-4 md:space-y-6" data-astro-cid-4sn4zg3r> <div class="animate-fade-in-up opacity-0" style="animation-delay: 400ms; animation-fill-mode: forwards;" data-astro-cid-4sn4zg3r> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight md:leading-tight" data-astro-cid-4sn4zg3r> ${article.title} </h1> </div> <div class="animate-fade-in-up opacity-0" style="animation-delay: 600ms; animation-fill-mode: forwards;" data-astro-cid-4sn4zg3r> <div class="flex items-center gap-4 text-sm sm:text-base text-gray-400" data-astro-cid-4sn4zg3r> <div class="flex items-center gap-2" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-4sn4zg3r> <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" data-astro-cid-4sn4zg3r></path> </svg> <span class="font-medium" data-astro-cid-4sn4zg3r>
Published on: ${new Date(article.publish_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </span> </div> </div> <div class="h-px bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-transparent mt-6" data-astro-cid-4sn4zg3r></div> </div> </div> </header> <!-- Article Content --> <main class="animate-fade-in-up opacity-0" style="animation-delay: 800ms; animation-fill-mode: forwards;" data-astro-cid-4sn4zg3r> <div class="prose prose-lg sm:prose-xl prose-invert max-w-none prose-purple" data-astro-cid-4sn4zg3r> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(article.content)}` })} </div> </main> <!-- Article Footer --> <footer class="mt-16 md:mt-20 lg:mt-24 animate-fade-in-up opacity-0" style="animation-delay: 1000ms; animation-fill-mode: forwards;" data-astro-cid-4sn4zg3r> <div class="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" data-astro-cid-4sn4zg3r></div> <div class="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4" data-astro-cid-4sn4zg3r> <a href="/blog/" class="group inline-flex items-center gap-3 text-base sm:text-lg text-purple-400 font-mono transition-all duration-300 hover:text-purple-300 hover:scale-105" data-astro-cid-4sn4zg3r> <svg class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-4sn4zg3r> <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-4sn4zg3r></path> </svg> <span class="underline-on-hover" data-astro-cid-4sn4zg3r>Read more articles</span> </a> <div class="text-sm text-gray-500 font-mono" data-astro-cid-4sn4zg3r>Thanks for reading! ✨</div> </div> </footer> </div> </article> ` })} `;
}, "D:/work/Portfolio/src/pages/blog/[slug].astro", void 0);

const $$file = "D:/work/Portfolio/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
