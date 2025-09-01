<template>
    <div class="space-y-8 md:space-y-12">
        <!-- Enhanced Search Bar -->
        <div class="search-container animate-fade-in-up">
            <div class="relative w-full max-w-2xl mx-auto">
                <div class="relative group">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search blogs by title or tags..."
                        class="w-full px-6 py-4 pr-14 text-base md:text-lg text-gray-300 bg-gray-800/80 backdrop-blur-sm border-2 border-purple-600/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400 transition-all duration-500 placeholder-gray-500 hover:border-purple-500/70 hover:bg-gray-800/90 font-mono"
                        :class="{
                            'border-purple-400 ring-4 ring-purple-500/30': searchQuery.length > 0,
                            'animate-pulse-border': isSearching,
                        }"
                        @input="onSearchInput"
                    />

                    <!-- Search Icon -->
                    <div
                        class="absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300"
                        :class="{
                            'scale-110 text-purple-400': searchQuery.length > 0,
                            'text-gray-500': !searchQuery.length,
                        }"
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

                    <!-- Search Results Counter -->
                    <transition name="slide-down">
                        <div
                            v-if="searchQuery.length > 0"
                            class="absolute -bottom-8 left-0 text-sm text-purple-300 font-mono"
                        >
                            {{ filteredArticles.length }} result{{ filteredArticles.length !== 1 ? 's' : '' }} found
                        </div>
                    </transition>
                </div>

                <!-- Decorative Elements -->
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt pointer-events-none"
                ></div>
            </div>
        </div>

        <!-- Enhanced Articles Grid -->
        <div class="font-mono">
            <transition-group name="article-list" tag="ul" class="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10">
                <li
                    v-for="(article, index) in filteredArticles"
                    :key="article.slug"
                    class="article-card border-2 border-purple-600/30 rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out hover:border-purple-500/60 hover:bg-gradient-to-br hover:from-purple-900/10 hover:via-blue-900/5 hover:to-pink-900/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer overflow-hidden"
                    :style="`animation-delay: ${index * 100}ms`"
                >
                    <a
                        :href="`/blog/${article.slug}/`"
                        class="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-8"
                    >
                        <!-- Enhanced Image -->
                        <div
                            v-if="article.image"
                            class="image-container flex-shrink-0 overflow-hidden rounded-xl relative"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            ></div>
                            <img
                                :src="article.image.formats?.medium?.url || article.image.url"
                                :alt="article.title"
                                class="w-full lg:w-40 xl:w-48 h-32 md:h-36 lg:h-32 xl:h-36 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                                loading="lazy"
                            />
                            <!-- Image Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            ></div>
                        </div>

                        <!-- Content Section -->
                        <div class="flex-1 min-w-0 space-y-3 md:space-y-4">
                            <!-- Date -->
                            <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                                <svg class="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                {{ formatDate(article.publish_date) }}
                            </div>

                            <!-- Title with Arrow -->
                            <div class="flex items-start gap-3 md:gap-4">
                                <h3
                                    class="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl text-white font-bold transition-all duration-300 ease-in-out group-hover:text-purple-400 leading-tight flex-1 line-clamp-2"
                                >
                                    {{ article.title }}
                                </h3>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-all duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-purple-400 group-hover:scale-110 flex-shrink-0 mt-1"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                    />
                                </svg>
                            </div>

                            <!-- Tags -->
                            <div v-if="article.Article && article.Article.length > 0" class="flex flex-wrap gap-2 mt-3">
                                <span
                                    v-for="(tag, tagIndex) in article.Article"
                                    :key="tag.id"
                                    class="tag-item px-3 py-1.5 text-xs sm:text-sm text-purple-200 rounded-full bg-purple-900/50 border border-purple-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/60 hover:border-purple-600/70 hover:scale-105 hover:-translate-y-0.5"
                                    :style="`animation-delay: ${index * 100 + tagIndex * 50}ms`"
                                >
                                    {{ tag.name }}
                                </span>
                            </div>
                        </div>
                    </a>

                    <!-- Shimmer Effect -->
                    <div
                        class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 ease-out pointer-events-none"
                    ></div>
                </li>
            </transition-group>

            <!-- Enhanced No Results -->
            <transition name="fade">
                <div v-if="filteredArticles.length === 0 && searchQuery.length > 0" class="text-center py-16 md:py-20">
                    <div class="space-y-4 md:space-y-6">
                        <div
                            class="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 flex items-center justify-center"
                        >
                            <svg
                                class="w-8 h-8 md:w-10 md:h-10 text-purple-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.11-2.319C5.282 14.165 4.8 15.518 4.8 17c0 .619.053 1.227.156 1.819.114.66.302 1.294.558 1.89.273.635.62 1.238 1.033 1.803A12.004 12.004 0 0012 23c2.59 0 4.973-.82 6.933-2.215.413-.565.76-1.168 1.033-1.803.256-.596.444-1.23.558-1.89.103-.592.156-1.2.156-1.819 0-1.482-.482-2.835-1.29-4.181z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl md:text-2xl text-white font-bold">No articles found</h3>
                        <p class="text-gray-400 text-base md:text-lg max-w-md mx-auto">
                            Try searching with different keywords or
                            <button
                                @click="clearSearch"
                                class="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors duration-200"
                            >
                                clear your search
                            </button>
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    articles: {
        type: Array,
        required: true,
    },
});

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
</script>

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
        border-color: rgb(147 51 234 / 0.5);
    }
    50% {
        border-color: rgb(147 51 234 / 0.8);
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

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    box-shadow: 0 0 0 4px rgb(147 51 234 / 0.3);
}

button:focus {
    outline: 2px solid rgb(147 51 234);
    outline-offset: 2px;
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
        border-color: rgb(147 51 234 / 0.4);
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
