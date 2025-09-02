/* empty css                                  */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CHWcxQZ1.mjs';
import { f as fetchApi, $ as $$Layout } from '../chunks/strapi_BqXo463T.mjs';
import { mergeProps, ref, computed, onMounted, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  __name: 'BlogListWithSearch',
  props: {
    articles: {
        type: Array,
        required: true,
    },
},
  setup(__props, { expose: __expose }) {
  __expose();

const props = __props;

const searchQuery = ref('');
const isSearching = ref(false);

// Computed filtered articles with better search logic
const filteredArticles = computed(() => {
    if (!searchQuery.value.trim()) {
        return props.articles;
    }

    const query = searchQuery.value.toLowerCase().trim();

    return props.articles.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const tagsMatch = article.Article?.some((tag) => tag.name.toLowerCase().includes(query)) || false;

        return titleMatch || tagsMatch;
    });
});

// Enhanced search input handler
const onSearchInput = () => {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 300);
};

// Clear search function
const clearSearch = () => {
    searchQuery.value = '';
};

// Enhanced date formatting
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Animation on mount
onMounted(() => {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.classList.add('animate-fade-in-up');
    });
});

const __returned__ = { props, searchQuery, isSearching, filteredArticles, onSearchInput, clearSearch, formatDate, ref, computed, onMounted };
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
return __returned__
}

};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "space-y-8 md:space-y-12" }, _attrs))
  } data-v-f500be61><div class="search-container animate-fade-in-up" data-v-f500be61><div class="relative w-full max-w-2xl mx-auto" data-v-f500be61><div class="relative group" data-v-f500be61><input type="text"${
    ssrRenderAttr("value", $setup.searchQuery)
  } placeholder="Search blogs by title or tags..." class="${
    ssrRenderClass([{
                            'border-purple-400 ring-4 ring-purple-500/30': $setup.searchQuery.length > 0,
                            'animate-pulse-border': $setup.isSearching,
                        }, "w-full px-6 py-4 pr-14 text-base md:text-lg text-gray-300 bg-gray-800/80 backdrop-blur-sm border-2 border-purple-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-500 placeholder-gray-500 hover:border-purple-500/70 hover:bg-gray-800/90 font-mono"])
  }" data-v-f500be61><div class="${
    ssrRenderClass([{
                            'scale-110 text-purple-400': $setup.searchQuery.length > 0,
                            'text-gray-500': !$setup.searchQuery.length,
                        }, "absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300"])
  }" data-v-f500be61><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-7 md:h-7" data-v-f500be61><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" data-v-f500be61></path></svg></div>`);
  if ($setup.searchQuery.length > 0) {
    _push(`<div class="absolute -bottom-8 left-0 text-sm text-purple-300 font-mono" data-v-f500be61>${
      ssrInterpolate($setup.filteredArticles.length)
    } result${
      ssrInterpolate($setup.filteredArticles.length !== 1 ? 's' : '')
    } found </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt pointer-events-none" data-v-f500be61></div></div></div><div class="font-mono" data-v-f500be61><ul${ssrRenderAttrs({
    name: "article-list",
    class: "grid grid-cols-1 gap-6 md:gap-8 lg:gap-10"
  })} data-v-f500be61>`);
  ssrRenderList($setup.filteredArticles, (article, index) => {
    _push(`<li class="article-card border-2 border-purple-600/30 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out hover:border-purple-500/60 hover:bg-gradient-to-br hover:from-purple-900/10 hover:via-blue-900/5 hover:to-pink-900/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer overflow-hidden" style="${
      ssrRenderStyle(`animation-delay: ${index * 100}ms`)
    }" data-v-f500be61><a${
      ssrRenderAttr("href", `/blog/${article.slug}/`)
    } class="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-8" data-v-f500be61>`);
    if (article.image) {
      _push(`<div class="image-container flex-shrink-0 overflow-hidden rounded-xl relative" data-v-f500be61><div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-f500be61></div><img${
        ssrRenderAttr("src", article.image.formats?.medium?.url || article.image.url)
      }${
        ssrRenderAttr("alt", article.title)
      } class="w-full lg:w-40 xl:w-48 h-32 md:h-36 lg:h-32 xl:h-36 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110" loading="lazy" data-v-f500be61><div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" data-v-f500be61></div></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="flex-1 min-w-0 space-y-3 md:space-y-4" data-v-f500be61><div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium" data-v-f500be61><svg class="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20" data-v-f500be61><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" data-v-f500be61></path></svg> ${
      ssrInterpolate($setup.formatDate(article.publish_date))
    }</div><div class="flex items-start gap-3 md:gap-4" data-v-f500be61><h3 class="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-white font-bold transition-all duration-300 ease-in-out group-hover:text-purple-400 leading-tight flex-1 line-clamp-2" data-v-f500be61>${
      ssrInterpolate(article.title)
    }</h3><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-purple-400 group-hover:scale-110 flex-shrink-0 mt-1" data-v-f500be61><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" data-v-f500be61></path></svg></div>`);
    if (article.Article && article.Article.length > 0) {
      _push(`<div class="flex flex-wrap gap-2 mt-3" data-v-f500be61><!--[-->`);
      ssrRenderList(article.Article, (tag, tagIndex) => {
        _push(`<span class="tag-item px-3 py-1.5 text-xs sm:text-sm text-purple-200 rounded-full bg-purple-900/50 border border-purple-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/60 hover:border-purple-600/70 hover:scale-105 hover:-translate-y-0.5" style="${
          ssrRenderStyle(`animation-delay: ${index * 100 + tagIndex * 50}ms`)
        }" data-v-f500be61>${
          ssrInterpolate(tag.name)
        }</span>`);
      });
      _push(`<!--]--></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></a><div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 ease-out pointer-events-none" data-v-f500be61></div></li>`);
  });
  _push(`</ul>`);
  if ($setup.filteredArticles.length === 0 && $setup.searchQuery.length > 0) {
    _push(`<div class="text-center py-16 md:py-20" data-v-f500be61><div class="space-y-4 md:space-y-6" data-v-f500be61><div class="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center" data-v-f500be61><svg class="w-8 h-8 md:w-10 md:h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f500be61><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.11-2.319C5.282 14.165 4.8 15.518 4.8 17c0 .619.053 1.227.156 1.819.114.66.302 1.294.558 1.89.273.635.62 1.238 1.033 1.803A12.004 12.004 0 0012 23c2.59 0 4.973-.82 6.933-2.215.413-.565.76-1.168 1.033-1.803.256-.596.444-1.23.558-1.89.103-.592.156-1.2.156-1.819 0-1.482-.482-2.835-1.29-4.181z" data-v-f500be61></path></svg></div><h3 class="text-xl md:text-2xl text-white font-bold" data-v-f500be61>No articles found</h3><p class="text-gray-400 text-base md:text-lg max-w-md mx-auto" data-v-f500be61> Try searching with different keywords or <button class="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors duration-200" data-v-f500be61> clear your search </button></p></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/BlogListWithSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const BlogListWithSearch = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender],['__scopeId',"data-v-f500be61"]]);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const articles = await fetchApi({
    endpoint: "articles?populate=*",
    wrappedByKey: "data"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "JokHolk Blogs", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mx-auto my-16 sm:my-20 md:my-24 lg:my-32 text-gray-300 font-mono min-h-screen" data-astro-cid-5tznm7mj> <!-- Back Button with Animation --> <div class="animate-fade-in-left mb-8 md:mb-12" data-astro-cid-5tznm7mj> <a href="/#blogs" class="group inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-purple-400 font-mono transition-all duration-300 hover:text-purple-300 hover:scale-105" data-astro-cid-5tznm7mj> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" data-astro-cid-5tznm7mj> <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" data-astro-cid-5tznm7mj></path> </svg> <span class="underline-on-hover" data-astro-cid-5tznm7mj>Go back</span> </a> </div> <!-- Page Title with Animation --> <div class="animate-fade-in-up mb-8 md:mb-12" data-astro-cid-5tznm7mj> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight" data-astro-cid-5tznm7mj>
My Journals
</h1> <div class="h-1 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-gradient" data-astro-cid-5tznm7mj></div> </div> <!-- Blog List Component --> <div class="animate-fade-in-up opacity-0" style="animation-delay: 300ms; animation-fill-mode: forwards;" data-astro-cid-5tznm7mj> ${renderComponent($$result2, "BlogListWithSearch", BlogListWithSearch, { "client:visible": true, "articles": articles, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/BlogListWithSearch.vue", "client:component-export": "default", "data-astro-cid-5tznm7mj": true })} </div> </section> ` })} `;
}, "D:/work/Portfolio/src/pages/blog/index.astro", void 0);

const $$file = "D:/work/Portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
