<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    articles: {
        type: Array,
        required: true,
    },
    translations: {
        type: Object,
        required: true,
    },
    lang: {
        type: String,
        required: true,
    },
    strapiUrl: {
        type: String,
        required: true,
    },
});

const searchQuery = ref('');
const isSearching = ref(false);

const filteredArticles = computed(() => {
    if (!searchQuery.value.trim()) {
        return props.articles;
    }

    const query = searchQuery.value.toLowerCase().trim();

    return props.articles.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const tagsMatch = article.category?.some((tag) => tag.name.toLowerCase().includes(query)) || false;

        return titleMatch || tagsMatch;
    });
});

const onSearchInput = () => {
    isSearching.value = true;
    setTimeout(() => {
        isSearching.value = false;
    }, 300);
};

const clearSearch = () => {
    searchQuery.value = '';
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(props.lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

onMounted(() => {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
        card.classList.add('animate-fade-in-up');
    });
});
</script>

<template>
    <div class="space-y-8 md:space-y-12">
        <div class="search-container animate-fade-in-up">
            <div class="relative w-full max-w-2xl mx-auto">
                <div class="relative group">
                    <input
                        type="text"
                        v-model="searchQuery"
                        :placeholder="props.translations?.blogContent?.search?.placeholder"
                        class="w-full px-6 py-4 pr-14 text-base md:text-lg text-gray-300 bg-gray-800/80 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-500 placeholder-gray-500 hover:bg-gray-800/90 font-mono"
                        :class="{
                            'animate-pulse-border': isSearching,
                        }"
                        style="
                            border-image: linear-gradient(135deg, #a855f7, #ec4899) 1;
                            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.3);
                        "
                        @input="onSearchInput"
                    />

                    <div
                        class="absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300"
                        :class="{
                            'scale-110': searchQuery.length > 0,
                            'text-gray-500': !searchQuery.length,
                        }"
                        :style="
                            searchQuery.length > 0
                                ? 'background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;'
                                : ''
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 md:w-7 md:h-7"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </div>

                    <transition name="slide-down">
                        <div
                            v-if="searchQuery.length > 0"
                            class="absolute -bottom-8 left-0 text-sm font-mono"
                            style="
                                background: linear-gradient(135deg, #a855f7, #ec4899);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                            "
                        >
                            {{ filteredArticles.length }}
                            {{
                                filteredArticles.length > 1
                                    ? translations?.blogContent?.search?.results
                                    : translations?.blogContent?.search?.result
                            }}
                            {{ translations?.blogContent?.search?.found }}
                        </div>
                    </transition>
                </div>

                <div
                    class="absolute -inset-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt pointer-events-none"
                ></div>
            </div>
        </div>

        <div class="font-mono">
            <transition-group name="article-list" tag="ul" class="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10">
                <li
                    v-for="(article, index) in filteredArticles"
                    :key="article.slug"
                    class="article-card border-2 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer overflow-hidden"
                    :style="`animation-delay: ${
                        index * 100
                    }ms; border-image: linear-gradient(135deg, #a855f7, #ec4899) 1;`"
                >
                    <a
                        :href="`/${lang}/blog/${article.slug}`"
                        class="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-8"
                    >
                        <div
                            v-if="article.image"
                            class="image-container flex-shrink-0 overflow-hidden rounded-xl relative"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>
                            <img
                                :src="`${props.strapiUrl}${article.image.formats?.medium?.url || article.image.url}`"
                                :alt="article.title"
                                class="w-full lg:w-40 xl:w-48 h-32 md:h-36 lg:h-32 xl:h-36 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                                loading="lazy"
                            />
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            ></div>
                        </div>

                        <div class="flex-1 min-w-0 space-y-3 md:space-y-4">
                            <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                                <svg class="w-4 h-4 calendar-icon" viewBox="0 0 20 20">
                                    <defs>
                                        <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color: #a855f7; stop-opacity: 1" />
                                            <stop offset="100%" style="stop-color: #ec4899; stop-opacity: 1" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        fill="url(#calendarGradient)"
                                        fill-rule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                {{ formatDate(article.publish_date) }}
                            </div>

                            <div class="flex items-start gap-3 md:gap-4">
                                <h3
                                    class="article-title text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-white font-bold transition-all duration-300 ease-in-out leading-tight flex-1 line-clamp-2"
                                >
                                    {{ article.title }}
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    class="w-5 h-5 md:w-6 md:h-6 arrow-icon text-gray-500 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110 flex-shrink-0 mt-1"
                                >
                                    <defs>
                                        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color: #a855f7; stop-opacity: 1" />
                                            <stop offset="100%" style="stop-color: #ec4899; stop-opacity: 1" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                    />
                                </svg>
                            </div>

                            <div
                                v-if="article.category && article.category.length > 0"
                                class="flex flex-wrap gap-2 mt-3"
                            >
                                <span
                                    v-for="(tag, tagIndex) in article.category"
                                    :key="tag.id"
                                    class="tag-item px-3 py-1.5 text-xs sm:text-sm text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                                    :style="`animation-delay: ${
                                        index * 100 + tagIndex * 50
                                    }ms; background: linear-gradient(135deg, #a855f7, #ec4899); `"
                                >
                                    {{ tag.name }}
                                </span>
                            </div>
                        </div>
                    </a>

                    <div
                        class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform pointer-events-none transition-all duration-1000 ease-out"
                    ></div>
                </li>
            </transition-group>

            <transition name="fade">
                <div v-if="filteredArticles.length === 0 && searchQuery.length > 0" class="text-center py-16 md:py-20">
                    <div class="space-y-4 md:space-y-6">
                        <div
                            class="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 flex items-center justify-center"
                        >
                            <svg
                                class="w-8 h-8 md:w-10 md:h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style="
                                    background: linear-gradient(135deg, #a855f7, #ec4899);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    stroke: url(#gradient);
                                "
                            >
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color: #a855f7; stop-opacity: 1" />
                                        <stop offset="100%" style="stop-color: #ec4899; stop-opacity: 1" />
                                    </linearGradient>
                                </defs>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.11-2.319C5.282 14.165 4.8 15.518 4.8 17c0 .619.053 1.227.156 1.819.114.66.302 1.294.558 1.89.273.635.62 1.238 1.033 1.803A12.004 12.004 0 0012 23c2.59 0 4.973-.82 6.933-2.215.413-.565.76-1.168 1.033-1.803.256-.596.444-1.23.558-1.89.103-.592.156-1.2.156-1.819 0-1.482-.482-2.835-1.29-4.181z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl md:text-2xl text-white font-bold">
                            {{ props.translations?.blogContent?.search?.noArticlesFoundTitle }}
                        </h3>
                        <p class="text-gray-400 text-base md:text-lg max-w-md mx-auto">
                            {{ props.translations?.blogContent?.search?.noArticlesFoundDescription }}
                            <button
                                @click="clearSearch"
                                class="underline underline-offset-2 transition-colors duration-200"
                                style="
                                    background: linear-gradient(135deg, #a855f7, #ec4899);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                "
                            >
                                {{ props.translations?.blogContent?.search?.clearSearch }}
                            </button>
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes tilt {
    0%,
    50%,
    100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(0.5deg);
    }
    75% {
        transform: rotate(-0.5deg);
    }
}

@keyframes pulse-border {
    0%,
    100% {
        box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
    }
    50% {
        box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.8);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
}

.animate-tilt {
    animation: tilt 10s infinite linear;
}

.animate-pulse-border {
    animation: pulse-border 1.5s ease-in-out infinite;
}

/* Gradient text effect */
.gradient-text {
    background: linear-gradient(135deg, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.group:hover .article-title {
    background: linear-gradient(135deg, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.group:hover .arrow-icon path {
    stroke: url(#arrowGradient);
}

.article-card:hover {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
    box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.25);
}

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Enhanced Transitions */
.article-list-enter-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-list-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.article-list-enter-from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
}

.article-list-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
}

.article-list-move {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide down animation for search counter */
.slide-down-enter-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Fade transition for no results */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Search container enhancements */
.search-container {
    position: relative;
}

/* Image container enhancements */
.image-container {
    position: relative;
    background: linear-gradient(135deg, #a855f7, #ec4899);
}

/* Tag hover effects */
.tag-item {
    position: relative;
    overflow: hidden;
}

.tag-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease-in-out;
}

.tag-item:hover::before {
    left: 100%;
}

/* Enhanced focus states for accessibility */
input:focus {
    box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.3);
}

button:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .article-card {
        padding: 1.25rem;
    }

    .search-container input {
        padding: 1rem 1.25rem;
        padding-right: 3rem;
        font-size: 1rem;
    }
}

/* Dark mode optimizations */
@media (prefers-color-scheme: dark) {
    .article-card {
        border-image: linear-gradient(135deg, #a855f7, #ec4899) 1;
    }
}

/* Reduced motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
