/* empty css                                  */
import { c as createComponent, m as maybeRenderHead, e as renderScript, b as renderTemplate, a as createAstro, d as addAttribute, u as unescapeHTML, o as objectType, f as dateType, n as numberType, g as arrayType, s as stringType, A as AstroError, U as UnknownContentCollectionError, R as RenderUndefinedEntryError, h as escape, i as renderUniqueStylesheet, j as renderScriptElement, k as createHeadAndContent, r as renderComponent } from '../chunks/astro/server_CHWcxQZ1.mjs';
import { f as fetchApi, $ as $$Layout } from '../chunks/strapi_BqXo463T.mjs';
import 'clsx';
/* empty css                                 */
import { r as removeBase, i as isRemotePath, p as prependForwardSlash } from '../chunks/path_mk0j0CbE.mjs';
import { V as VALID_INPUT_FORMATS } from '../chunks/consts_BmVDRGlB.mjs';
import { u as unflatten } from '../chunks/parse_BMnn4H2B.mjs';
export { renderers } from '../renderers.mjs';

const $$Home = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="home" class="text-gray-300 body-font flex items-center" data-astro-cid-f6nikxld> <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-16 sm:py-24 lg:py-32" data-astro-cid-f6nikxld> <div class="flex flex-col lg:flex-row items-center justify-center" data-astro-cid-f6nikxld> <!-- Text Content --> <div class="w-full lg:w-1/2 lg:pr-8 xl:pr-12 mb-12 lg:mb-0 mobile-center" data-astro-cid-f6nikxld> <!-- Main Heading --> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-2 sm:mb-4 font-mono hover-lift" data-astro-cid-f6nikxld>
Hello,
</h1> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 md:mb-12 font-mono hover-lift" data-astro-cid-f6nikxld>
I'm <span class="gradient-text animate-glow font-mono" data-astro-cid-f6nikxld>Jok</span> </h1> <!-- Typed Text --> <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 font-mono text-gray-400 min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[4rem]" data-astro-cid-f6nikxld> <span class="text-purple-600 hidden sm:inline" data-astro-cid-f6nikxld>&gt;</span> <span id="typed-text" data-astro-cid-f6nikxld></span> </h2> <!-- Description --> <h3 class="text-sm sm:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 font-mono text-gray-400 leading-relaxed max-w-2xl" data-astro-cid-f6nikxld>
Welcome to my digital realm — built with passion. I'm a student of
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>software</span> and
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>game development</span>,
                    creating
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>web</span>,
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>apps</span>, and
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>indie games</span>, with a
                    goal to become a
<span class="text-purple-400 hover:text-purple-300 transition-colors" data-astro-cid-f6nikxld>cybersecurity expert</span>.
</h3> </div> <!-- Avatar Image --> <div class="w-full lg:w-1/2 flex justify-center" data-astro-cid-f6nikxld> <div class="animate-float" data-astro-cid-f6nikxld> <img class="rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover avatar-glow" src="/avatar.png" alt="Jok's Avatar" loading="lazy" data-astro-cid-f6nikxld> </div> </div> </div> </div> </section> ${renderScript($$result, "D:/work/Portfolio/src/components/index/Home.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/work/Portfolio/src/components/index/Home.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate(_a || (_a = __template(["", `<section id="about" class="text-gray-300 body-font pb-16 sm:pb-20 md:pb-32 lg:pb-40" data-astro-cid-olo3l3ll> <div class="container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-12 sm:pt-16 md:pt-24 lg:pt-32 mx-auto" data-astro-cid-olo3l3ll> <!-- Section Header --> <div class="flex items-center text-purple-600 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12" data-astro-cid-olo3l3ll> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 icon-bounce" data-astro-cid-olo3l3ll> <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" data-astro-cid-olo3l3ll></path> </svg> <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-mono" data-astro-cid-olo3l3ll>about me</h1> </div> <!-- Main Content --> <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16" data-astro-cid-olo3l3ll> <!-- Text Content --> <div class="w-full lg:w-1/2 text-left" data-astro-cid-olo3l3ll> <div class="space-y-4 sm:space-y-6 md:space-y-8" data-astro-cid-olo3l3ll> <p class="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-gray-400 leading-relaxed" data-astro-cid-olo3l3ll>
I'm a student studying <span class="highlight-text" data-astro-cid-olo3l3ll>software and game development</span>,
                        constantly learning through building <span class="highlight-text" data-astro-cid-olo3l3ll>apps</span>,
<span class="highlight-text" data-astro-cid-olo3l3ll>websites</span>, and <span class="highlight-text" data-astro-cid-olo3l3ll>indie games</span>. These projects not only fuel my creativity but also strengthen my foundation in
<span class="highlight-text" data-astro-cid-olo3l3ll>programming</span> and <span class="highlight-text" data-astro-cid-olo3l3ll>software design</span>, which I see as essential steps toward my long-term goals.
</p> <p class="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-gray-400 leading-relaxed" data-astro-cid-olo3l3ll>
My main direction is <span class="highlight-text" data-astro-cid-olo3l3ll>cybersecurity</span> \u2014 I aim to dive into system
                        protection, ethical hacking, and defensive strategies to better understand how technology can be
                        safeguarded. At the same time, I take on freelance <span class="highlight-text" data-astro-cid-olo3l3ll>web projects</span>
with modern tools like <span class="highlight-text" data-astro-cid-olo3l3ll>Astro</span> and explore building an
<span class="highlight-text" data-astro-cid-olo3l3ll>indie game studio</span>. These experiences aren't my final
                        destination, but they provide valuable programming practice and broaden my perspective, making
                        me stronger as I move toward a career in cybersecurity.
</p> </div> </div> <!-- Portrait Gallery --> <div class="w-full lg:w-1/2" data-astro-cid-olo3l3ll> <div class="relative mx-auto max-w-sm md:max-w-md lg:max-w-lg" data-astro-cid-olo3l3ll> <div id="image-carousel" class="portrait-gallery rounded-2xl overflow-hidden shadow-2xl" data-astro-cid-olo3l3ll> <!-- Image 1 --> <div class="carousel-item active absolute inset-0 flex items-center justify-center" data-astro-cid-olo3l3ll> <img src="/Image0.jpg" class="portrait-image w-full h-full" alt="Professional Portrait 1" data-loaded="false" onload="this.setAttribute('data-loaded', 'true')" data-astro-cid-olo3l3ll> </div> <!-- Image 2 --> <div class="carousel-item absolute inset-0 flex items-center justify-center" data-astro-cid-olo3l3ll> <img src="/Image1.jpg" class="portrait-image w-full h-full" alt="Professional Portrait 2" data-loaded="false" onload="this.setAttribute('data-loaded', 'true')" data-astro-cid-olo3l3ll> </div> <!-- Image 3 --> <div class="carousel-item absolute inset-0 flex items-center justify-center" data-astro-cid-olo3l3ll> <img src="/Image2.jpg" class="portrait-image w-full h-full" alt="Professional Portrait 3" data-loaded="false" onload="this.setAttribute('data-loaded', 'true')" data-astro-cid-olo3l3ll> </div> <!-- Image 4 --> <div class="carousel-item absolute inset-0 flex items-center justify-center" data-astro-cid-olo3l3ll> <img src="/Image3.jpg" class="portrait-image w-full h-full" alt="Professional Portrait 4" data-loaded="false" onload="this.setAttribute('data-loaded', 'true')" data-astro-cid-olo3l3ll> </div> <!-- Loading overlay --> <div id="loading-overlay" class="absolute inset-0 image-placeholder flex items-center justify-center" data-astro-cid-olo3l3ll> <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" data-astro-cid-olo3l3ll></div> </div> </div> <!-- Enhanced Indicators --> <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3" data-astro-cid-olo3l3ll> <button class="carousel-indicator active" data-slide-to="0" aria-label="Go to slide 1" data-astro-cid-olo3l3ll></button> <button class="carousel-indicator" data-slide-to="1" aria-label="Go to slide 2" data-astro-cid-olo3l3ll></button> <button class="carousel-indicator" data-slide-to="2" aria-label="Go to slide 3" data-astro-cid-olo3l3ll></button> <button class="carousel-indicator" data-slide-to="3" aria-label="Go to slide 4" data-astro-cid-olo3l3ll></button> </div> <!-- Navigation buttons (hidden on mobile, shown on hover for desktop) --> <button id="prevBtn" class="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-all duration-300" data-astro-cid-olo3l3ll> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-olo3l3ll> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-olo3l3ll></path> </svg> </button> <button id="nextBtn" class="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-all duration-300" data-astro-cid-olo3l3ll> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-olo3l3ll> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-olo3l3ll></path> </svg> </button> </div> </div> </div> </div> </section> <script>
    document.addEventListener('DOMContentLoaded', () => {
        const carouselItems = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('[data-slide-to]');
        const totalItems = carouselItems.length;
        let currentSlide = 0;
        let intervalId = null;
        function showSlide(index) {
            carouselItems.forEach((item) => {
                if (item instanceof HTMLElement) {
                    item.classList.remove('active');
                    item.style.display = 'none';
                }
            });
            indicators.forEach((indicator) => indicator.classList.remove('bg-opacity-100'));
            if (carouselItems[index] instanceof HTMLElement) {
                carouselItems[index].classList.add('active');
                carouselItems[index].style.display = 'block';
            }
            indicators[index].classList.add('bg-opacity-100');
        }
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalItems;
            showSlide(currentSlide);
        }
        function startCarousel() {
            intervalId = setInterval(nextSlide, 3000);
        }
        function stopCarousel() {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
        indicators.forEach((indicator) => {
            indicator.addEventListener('click', (e) => {
                stopCarousel();
                const target = e.target;
                let slideIndex = 0;
                if (target && target instanceof HTMLElement && target.dataset.slideTo !== undefined) {
                    slideIndex = parseInt(target.dataset.slideTo);
                }
                currentSlide = slideIndex;
                showSlide(currentSlide);
                startCarousel();
            });
        });
        showSlide(currentSlide);
        startCarousel();
    });
<\/script> `])), maybeRenderHead());
}, "D:/work/Portfolio/src/components/index/About.astro", void 0);

const $$Education = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="education" class="text-gray-300 body-font pb-20 md:pb-40" data-astro-cid-a3gaoa3n> <div class="container px-5 md:px-20 lg:px-32 pt-16 md:pt-24 lg:pt-32 mx-auto" data-astro-cid-a3gaoa3n> <!-- Header with animation --> <div class="flex items-center text-purple-600 gap-4 mb-6 md:mb-8" data-astro-cid-a3gaoa3n> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" data-astro-cid-a3gaoa3n> <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" data-astro-cid-a3gaoa3n></path> </svg> <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-mono ml-2" data-astro-cid-a3gaoa3n>education</h1> </div> <!-- Timeline --> <div class="font-mono" data-astro-cid-a3gaoa3n> <ol class="relative border-s-2 border-gray-600 dark:border-gray-700 space-y-6 md:space-y-8 ml-4 md:ml-0" data-astro-cid-a3gaoa3n> <!-- First Education Item --> <a href="https://funix.edu.vn/" target="_blank" rel="noopener noreferrer" data-astro-cid-a3gaoa3n> <li class="mb-8 md:mb-10 ms-4 md:ms-6 border border-purple-500/40 rounded-lg p-4 md:p-6
                 transform transition-all duration-500 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer" data-astro-cid-a3gaoa3n> <span class="absolute flex items-center justify-center
                                   w-5 h-5 md:w-6 md:h-6
                                   bg-purple-100 rounded-full
                                   -start-3 md:-start-3
                                   ring-4 md:ring-8 ring-gray-900 dark:ring-gray-900 dark:bg-purple-900
                                   transform transition-all duration-300 hover:scale-110" data-astro-cid-a3gaoa3n> <svg class="w-2 h-2 md:w-2.5 md:h-2.5 text-purple-800 dark:text-purple-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-a3gaoa3n> <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" data-astro-cid-a3gaoa3n></path> </svg> </span> <time class="block mb-2 text-sm md:text-base font-normal leading-none text-purple-500 dark:text-purple-400
                                   transform transition-colors duration-300 hover:text-purple-300" data-astro-cid-a3gaoa3n>
October 2023 - Present
</time> <h3 class="flex items-center mb-1 text-lg md:text-xl font-semibold text-gray-900 dark:text-white
                                 transform transition-colors duration-300 hover:text-purple-300" data-astro-cid-a3gaoa3n>
FUNiX Online University
<span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded
                     dark:bg-purple-900 dark:text-purple-300 ml-3 hover:scale-105" data-astro-cid-a3gaoa3n>
Current
</span> </h3> <p class="mb-2 md:mb-4 text-base md:text-lg font-normal text-gray-500 dark:text-gray-400
                                 transform transition-colors duration-300 hover:text-gray-300" data-astro-cid-a3gaoa3n>
Software Engineer Program
</p> <!-- Additional details with stagger animation --> <div class="flex flex-wrap gap-2" data-astro-cid-a3gaoa3n> <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full
                                       dark:bg-purple-900 dark:text-purple-300 transform transition-all duration-300 hover:scale-105" data-astro-cid-a3gaoa3n>
🎓 Online Learning
</span> <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full
                                       dark:bg-blue-900 dark:text-blue-300 transform transition-all duration-300 hover:scale-105" data-astro-cid-a3gaoa3n>
💻 Software Development
</span> </div> </li> </a> <!-- Second Education Item --> <a href="https://caodang.fpt.edu.vn/" target="_blank" rel="noopener noreferrer" data-astro-cid-a3gaoa3n> <li class="ms-4 md:ms-6 border border-purple-500/40 rounded-lg p-4 md:p-6
                 transform transition-all duration-500 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20" data-astro-cid-a3gaoa3n> <span class="absolute flex items-center justify-center
                                   w-5 h-5 md:w-6 md:h-6
                                   bg-purple-100 rounded-full
                                   -start-3 md:-start-3
                                   ring-4 md:ring-8 ring-gray-900 dark:ring-gray-900 dark:bg-purple-900
                                   transform transition-all duration-300 hover:scale-110" data-astro-cid-a3gaoa3n> <svg class="w-2 h-2 md:w-2.5 md:h-2.5 text-purple-800 dark:text-purple-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-a3gaoa3n> <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" data-astro-cid-a3gaoa3n></path> </svg> </span> <time class="block mb-2 text-sm md:text-base font-normal leading-none text-purple-500 dark:text-purple-400
                                   transform transition-colors duration-300 hover:text-purple-300" data-astro-cid-a3gaoa3n>
January 2025 - Present
</time> <h3 class="mb-1 text-lg md:text-xl font-semibold text-gray-900 dark:text-white
                                 transform transition-colors duration-300 hover:text-purple-300" data-astro-cid-a3gaoa3n>
FPT Polytechnic College
<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded
                     dark:bg-green-900 dark:text-green-300 ml-3 hover:scale-105" data-astro-cid-a3gaoa3n>
New
</span> </h3> <p class="text-base md:text-lg font-normal text-gray-500 dark:text-gray-400
                                 transform transition-colors duration-300 hover:text-gray-300 mb-2 md:mb-4" data-astro-cid-a3gaoa3n>
Game Programming
</p> <!-- Additional details with stagger animation --> <div class="flex flex-wrap gap-2" data-astro-cid-a3gaoa3n> <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full
                                       dark:bg-green-900 dark:text-green-300 transform transition-all duration-300 hover:scale-105" data-astro-cid-a3gaoa3n>
🎮 Game Development
</span> <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full
                                       dark:bg-orange-900 dark:text-orange-300 transform transition-all duration-300 hover:scale-105" data-astro-cid-a3gaoa3n>
🏫 Traditional Learning
</span> </div> </li> </a> </ol> </div> </div> </section> ${renderScript($$result, "D:/work/Portfolio/src/components/index/Education.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/work/Portfolio/src/components/index/Education.astro", void 0);

const $$Astro$1 = createAstro();
const $$ExperienceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ExperienceCard;
  const { title, company, time, description, techs, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="block group" target="_blank" rel="noopener noreferrer" data-astro-cid-rozxqogb> <div class="experience-card-container relative flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 space-y-4 lg:space-y-0 lg:space-x-8 font-mono rounded-xl sm:rounded-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]" data-astro-cid-rozxqogb> <!-- Background --> <div class="absolute inset-0 rounded-xl sm:rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm transition-all duration-500 group-hover:border-purple-400/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20" data-astro-cid-rozxqogb> <div class="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:via-purple-500/5 group-hover:to-blue-600/10 transition-all duration-700" data-astro-cid-rozxqogb></div> <div class="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect" data-astro-cid-rozxqogb></div> </div> <!-- Timeline --> <div class="relative flex flex-col items-start lg:w-1/4 xl:w-1/5 z-20" data-astro-cid-rozxqogb> <div class="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-600/50 to-purple-400/30 timeline-line" data-astro-cid-rozxqogb></div> <div class="relative pl-6 lg:pl-0 w-full" data-astro-cid-rozxqogb> <div class="inline-block lg:absolute lg:top-1 lg:right-4 bg-gradient-to-r from-purple-900/80 to-blue-900/80 backdrop-blur-sm border border-purple-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 time-badge group-hover:from-purple-800/90 group-hover:to-blue-800/90 group-hover:border-purple-300/50 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-500" data-astro-cid-rozxqogb> <p class="text-purple-200 font-semibold text-xs sm:text-sm lg:text-right whitespace-nowrap" data-astro-cid-rozxqogb> ${time} </p> </div> </div> </div> <!-- Content --> <div class="relative pl-6 lg:pl-0 flex-1 space-y-3 sm:space-y-4 z-20" data-astro-cid-rozxqogb> <div class="space-y-1" data-astro-cid-rozxqogb> <h3 class="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-tight group-hover:text-purple-300 transition-colors duration-300" data-astro-cid-rozxqogb> <span class="job-title" data-astro-cid-rozxqogb>${title}</span> </h3> <p class="text-gray-300 text-base sm:text-lg font-medium group-hover:text-purple-400 transition-colors duration-300 company-name" data-astro-cid-rozxqogb> ${company} </p> </div> <div class="prose prose-sm sm:prose-base prose-invert prose-purple text-gray-400 group-hover:text-gray-300 transition-colors duration-300 description-content" data-astro-cid-rozxqogb> <div data-astro-cid-rozxqogb>${unescapeHTML(description)}</div> </div> <div class="flex flex-wrap gap-2 pt-3 sm:pt-4 tech-stack" data-astro-cid-rozxqogb> ${techs.map((tech, index) => renderTemplate`<span class="bg-gradient-to-r from-purple-900/80 to-purple-800/80 text-purple-100 text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-purple-700/50 hover:from-purple-800/90 hover:to-purple-700/90 hover:border-purple-500/70 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 tech-tag" data-aos="zoom-in"${addAttribute(`${index * 100}`, "data-aos-delay")} data-astro-cid-rozxqogb> ${tech} </span>`)} </div> <div class="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" data-astro-cid-rozxqogb> <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-rozxqogb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-astro-cid-rozxqogb></path> </svg> </div> </div> </div> </a> `;
}, "D:/work/Portfolio/src/components/index/ExperienceCard.astro", void 0);

var e=e=>Object.prototype.toString.call(e),t=e=>ArrayBuffer.isView(e)&&!(e instanceof DataView),o=t=>"[object Date]"===e(t),n=t=>"[object RegExp]"===e(t),r=t=>"[object Error]"===e(t),s=t=>"[object Boolean]"===e(t),l=t=>"[object Number]"===e(t),i=t=>"[object String]"===e(t),c=Array.isArray,u=Object.getOwnPropertyDescriptor,a=Object.prototype.propertyIsEnumerable,f=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,h=Object.keys;function d(e){const t=h(e),o=f(e);for(let n=0;n<o.length;n++)a.call(e,o[n])&&t.push(o[n]);return t}function b(e,t){return !u(e,t)?.writable}function y(e,u){if("object"==typeof e&&null!==e){let a;if(c(e))a=[];else if(o(e))a=new Date(e.getTime?e.getTime():e);else if(n(e))a=new RegExp(e);else if(r(e))a={message:e.message};else if(s(e)||l(e)||i(e))a=Object(e);else {if(t(e))return e.slice();a=Object.create(Object.getPrototypeOf(e));}const f=u.includeSymbols?d:h;for(const t of f(e))a[t]=e[t];return a}return e}var g={includeSymbols:false,immutable:false};function m(e,t,o=g){const n=[],r=[];let s=true;const l=o.includeSymbols?d:h,i=!!o.immutable;return function e(u){const a=i?y(u,o):u,f={};let h=true;const d={node:a,node_:u,path:[].concat(n),parent:r[r.length-1],parents:r,key:n[n.length-1],isRoot:0===n.length,level:n.length,circular:void 0,isLeaf:false,notLeaf:true,notRoot:true,isFirst:false,isLast:false,update:function(e,t=false){d.isRoot||(d.parent.node[d.key]=e),d.node=e,t&&(h=false);},delete:function(e){delete d.parent.node[d.key],e&&(h=false);},remove:function(e){c(d.parent.node)?d.parent.node.splice(d.key,1):delete d.parent.node[d.key],e&&(h=false);},keys:null,before:function(e){f.before=e;},after:function(e){f.after=e;},pre:function(e){f.pre=e;},post:function(e){f.post=e;},stop:function(){s=false;},block:function(){h=false;}};if(!s)return d;function g(){if("object"==typeof d.node&&null!==d.node){d.keys&&d.node_===d.node||(d.keys=l(d.node)),d.isLeaf=0===d.keys.length;for(let e=0;e<r.length;e++)if(r[e].node_===u){d.circular=r[e];break}}else d.isLeaf=true,d.keys=null;d.notLeaf=!d.isLeaf,d.notRoot=!d.isRoot;}g();const m=t(d,d.node);if(void 0!==m&&d.update&&d.update(m),f.before&&f.before(d,d.node),!h)return d;if("object"==typeof d.node&&null!==d.node&&!d.circular){r.push(d),g();for(const[t,o]of Object.entries(d.keys??[])){n.push(o),f.pre&&f.pre(d,d.node[o],o);const r=e(d.node[o]);i&&p.call(d.node,o)&&!b(d.node,o)&&(d.node[o]=r.node),r.isLast=!!d.keys?.length&&+t==d.keys.length-1,r.isFirst=0==+t,f.post&&f.post(d,r),n.pop();}r.pop();}return f.after&&f.after(d,d.node),d}(e).node}var j=class{#e;#t;constructor(e,t=g){this.#e=e,this.#t=t;}get(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return;t=t[n];}return t}has(e){let t=this.#e;for(let o=0;t&&o<e.length;o++){const n=e[o];if(!p.call(t,n)||!this.#t.includeSymbols&&"symbol"==typeof n)return  false;t=t[n];}return  true}set(e,t){let o=this.#e,n=0;for(n=0;n<e.length-1;n++){const t=e[n];p.call(o,t)||(o[t]={}),o=o[t];}return o[e[n]]=t,t}map(e){return m(this.#e,e,{immutable:true,includeSymbols:!!this.#t.includeSymbols})}forEach(e){return this.#e=m(this.#e,e,this.#t),this.#e}reduce(e,t){const o=1===arguments.length;let n=o?this.#e:t;return this.forEach(((t,r)=>{t.isRoot&&o||(n=e(t,n,r));})),n}paths(){const e=[];return this.forEach((t=>{e.push(t.path);})),e}nodes(){const e=[];return this.forEach((t=>{e.push(t.node);})),e}clone(){const e=[],o=[],n=this.#t;return t(this.#e)?this.#e.slice():function t(r){for(let t=0;t<e.length;t++)if(e[t]===r)return o[t];if("object"==typeof r&&null!==r){const s=y(r,n);e.push(r),o.push(s);const l=n.includeSymbols?d:h;for(const e of l(r))s[e]=t(r[e]);return e.pop(),o.pop(),s}return r}(this.#e)}};

/*
How it works:
`this.#head` is an instance of `Node` which keeps track of its current value and nests another instance of `Node` that keeps the value that comes after it. When a value is provided to `.enqueue()`, the code needs to iterate through `this.#head`, going deeper and deeper to find the last value. However, iterating through every single item is slow. This problem is solved by saving a reference to the last value as `this.#tail` so that it can reference it to add a new value.
*/

class Node {
	value;
	next;

	constructor(value) {
		this.value = value;
	}
}

class Queue {
	#head;
	#tail;
	#size;

	constructor() {
		this.clear();
	}

	enqueue(value) {
		const node = new Node(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue() {
		const current = this.#head;
		if (!current) {
			return;
		}

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	peek() {
		if (!this.#head) {
			return;
		}

		return this.#head.value;

		// TODO: Node.js 18.
		// return this.#head?.value;
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}

	* drain() {
		while (this.#head) {
			yield this.dequeue();
		}
	}
}

function pLimit(concurrency) {
	validateConcurrency(concurrency);

	const queue = new Queue();
	let activeCount = 0;

	const resumeNext = () => {
		if (activeCount < concurrency && queue.size > 0) {
			queue.dequeue()();
			// Since `pendingCount` has been decreased by one, increase `activeCount` by one.
			activeCount++;
		}
	};

	const next = () => {
		activeCount--;

		resumeNext();
	};

	const run = async (function_, resolve, arguments_) => {
		const result = (async () => function_(...arguments_))();

		resolve(result);

		try {
			await result;
		} catch {}

		next();
	};

	const enqueue = (function_, resolve, arguments_) => {
		// Queue `internalResolve` instead of the `run` function
		// to preserve asynchronous context.
		new Promise(internalResolve => {
			queue.enqueue(internalResolve);
		}).then(
			run.bind(undefined, function_, resolve, arguments_),
		);

		(async () => {
			// This function needs to wait until the next microtask before comparing
			// `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
			// after the `internalResolve` function is dequeued and called. The comparison in the if-statement
			// needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
			await Promise.resolve();

			if (activeCount < concurrency) {
				resumeNext();
			}
		})();
	};

	const generator = (function_, ...arguments_) => new Promise(resolve => {
		enqueue(function_, resolve, arguments_);
	});

	Object.defineProperties(generator, {
		activeCount: {
			get: () => activeCount,
		},
		pendingCount: {
			get: () => queue.size,
		},
		clearQueue: {
			value() {
				queue.clear();
			},
		},
		concurrency: {
			get: () => concurrency,

			set(newConcurrency) {
				validateConcurrency(newConcurrency);
				concurrency = newConcurrency;

				queueMicrotask(() => {
					// eslint-disable-next-line no-unmodified-loop-condition
					while (activeCount < concurrency && queue.size > 0) {
						resumeNext();
					}
				});
			},
		},
	});

	return generator;
}

function validateConcurrency(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
		throw new TypeError('Expected `concurrency` to be a number from 1 and up');
	}
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('../chunks/_astro_data-layer-content_CqHi_DCc.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
objectType({
  tags: arrayType(stringType()).optional(),
  maxAge: numberType().optional(),
  lastModified: dateType().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('../chunks/content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('../chunks/content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('../chunks/_astro_assets_BHAHqFRe.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { Path: process.env.Path }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new j(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('../chunks/content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const $$Experience = createComponent(async ($$result, $$props, $$slots) => {
  const experiences = await getCollection("experience");
  return renderTemplate`${maybeRenderHead()}<section id="experience" class="text-gray-300 body-font relative overflow-hidden" data-astro-cid-rkea54vw> <!-- Background decorative elements --> <div class="absolute inset-0 opacity-5" data-astro-cid-rkea54vw> <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" data-astro-cid-rkea54vw></div> <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl" data-astro-cid-rkea54vw></div> </div> <div class="container px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-16 sm:pt-24 md:pt-32 lg:pt-48 xl:pt-64 mx-auto relative z-10" data-astro-cid-rkea54vw> <!-- Header --> <div class="flex items-center text-purple-600 gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16" data-astro-cid-rkea54vw> <div class="relative group" data-astro-cid-rkea54vw> <div class="absolute inset-0 bg-purple-500/20 opacity-0 rounded-lg blur-lg group-hover:bg-purple-400/30 transition-all duration-500" data-astro-cid-rkea54vw></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sm:w-10 sm:h-10 relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" data-astro-cid-rkea54vw> <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" data-astro-cid-rkea54vw></path> </svg> </div> <div class="relative overflow-hidden" data-astro-cid-rkea54vw> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-mono ml-2" data-astro-cid-rkea54vw>experience</h1> </div> </div> <!-- Experience cards --> <div class="flex flex-col space-y-8 sm:space-y-12 lg:space-y-16" data-astro-cid-rkea54vw> ${experiences.map((item, index) => renderTemplate`<div class="experience-card" data-astro-cid-rkea54vw> ${renderComponent($$result, "ExperienceCard", $$ExperienceCard, { "title": item.data.title, "company": item.data.company, "time": item.data.time, "description": item.body, "techs": item.data.techs, "url": item.data.url, "data-astro-cid-rkea54vw": true })} </div>`)} </div> </div> </section>  ${renderScript($$result, "D:/work/Portfolio/src/components/index/Experience.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/work/Portfolio/src/components/index/Experience.astro", void 0);

const $$Astro = createAstro();
const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { title, description, tags, codeLink, demoLink, index = 0 } = Astro2.props;
  const hasDemoLink = demoLink && demoLink.length > 0;
  const buttonWidthClass = hasDemoLink ? "w-1/2" : "w-full";
  return renderTemplate`${maybeRenderHead()}<div class="relative flex flex-col p-6 sm:p-8 space-y-4 font-mono rounded-xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02] w-full h-full group cursor-pointer overflow-hidden" data-astro-cid-rgckkq7s> <!-- Animated Background Gradient --> <div class="absolute inset-0 rounded-xl border-2 border-transparent bg-transparent transition-all duration-500 ease-out group-hover:bg-gradient-to-br group-hover:from-purple-900/20 group-hover:via-blue-900/15 group-hover:to-pink-900/20 group-hover:border-white/30 group-hover:shadow-2xl group-hover:shadow-purple-500/20" data-astro-cid-rgckkq7s></div> <!-- Shimmer Effect --> <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 ease-out" data-astro-cid-rgckkq7s></div> <div class="relative flex-1 space-y-3 sm:space-y-4 z-10" data-astro-cid-rgckkq7s> <h3 class="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight group-hover:text-purple-500 transition-colors duration-300" data-astro-cid-rgckkq7s> ${title} </h3> <div class="prose prose-sm sm:prose-base prose-invert text-gray-400 group-hover:text-gray-300 transition-colors duration-300" data-astro-cid-rgckkq7s>${unescapeHTML(description)}</div> <div class="flex flex-wrap gap-2 pt-2 sm:pt-3" data-astro-cid-rgckkq7s> ${tags.map((tag, i) => renderTemplate`<span class="bg-gray-800/80 border border-gray-600/50 text-gray-200 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/30 hover:border-purple-500/50 hover:text-purple-200 hover:scale-105" data-astro-cid-rgckkq7s> ${tag} </span>`)} </div> </div> <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 z-10" data-astro-cid-rgckkq7s> <a${addAttribute(codeLink, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`w-full sm:w-[calc(50%-0.5rem)] ${buttonWidthClass} transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg`, "class")} data-astro-cid-rgckkq7s> <div class="flex items-center justify-center space-x-2 sm:space-x-3 border border-gray-500/50 text-white font-medium px-4 py-3 sm:py-2.5 rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-lg hover:shadow-white/20 backdrop-blur-sm" data-astro-cid-rgckkq7s> <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-rgckkq7s> <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.867-.013-1.702-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.007.07 1.532 1.03 1.532 1.03.89 1.529 2.34 1.087 2.91.828.092-.643.35-1.087.636-1.334-2.22-.253-4.555-1.113-4.555-4.949 0-1.09.39-1.983 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.704.114 2.504.337 1.909-1.293 2.747-1.025 2.747-1.025.546 1.379.202 2.398.099 2.65.64.699 1.029 1.592 1.029 2.682 0 3.844-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.335-.012 2.41-.012 2.727 0 .268.18.579.688.482C21.137 20.17 24 16.415 24 12.017 24 6.484 19.522 2 14 2h-2z" data-astro-cid-rgckkq7s></path> </svg> <span class="text-sm sm:text-base" data-astro-cid-rgckkq7s>Code</span> </div> </a> ${hasDemoLink && renderTemplate`<a${addAttribute(demoLink, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`w-full sm:w-[calc(50%-0.5rem)] ${buttonWidthClass} transform transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg`, "class")} data-astro-cid-rgckkq7s> <div class="flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium px-4 py-3 sm:py-2.5 rounded-lg transition-all duration-300 hover:from-violet-600 hover:to-fuchsia-600 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group" data-astro-cid-rgckkq7s> <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" data-astro-cid-rgckkq7s></div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6 relative z-10" data-astro-cid-rgckkq7s> <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" data-astro-cid-rgckkq7s></path> </svg> <span class="text-sm sm:text-base relative z-10" data-astro-cid-rgckkq7s>Demo</span> </div> </a>`} </div> </div> `;
}, "D:/work/Portfolio/src/components/index/ProjectCard.astro", void 0);

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  return renderTemplate`${maybeRenderHead()}<section id="projects" class="text-gray-300 font-mono pb-20 md:pb-40" data-astro-cid-p2k3274c> <div class="container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 pt-32 md:pt-48 lg:pt-64 mx-auto" data-astro-cid-p2k3274c> <!-- Header with AOS --> <div class="flex items-center text-purple-600 gap-3 md:gap-4 mb-12 md:mb-16" data-astro-cid-p2k3274c> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 animate-pulse" data-astro-cid-p2k3274c> <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" data-astro-cid-p2k3274c></path> </svg> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white ml-1 md:ml-2" data-astro-cid-p2k3274c>projects</h1> </div> <!-- Projects Grid with AOS --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10" data-astro-cid-p2k3274c> ${projects.map((item, index) => renderTemplate`<div data-astro-cid-p2k3274c> ${renderComponent($$result, "ProjectCard", $$ProjectCard, { "title": item.data.title, "description": item.body, "tags": item.data.tags, "codeLink": item.data.codeLink, "demoLink": item.data.demoLink ?? "", "data-astro-cid-p2k3274c": true })} </div>`)} </div> </div> </section> `;
}, "D:/work/Portfolio/src/components/index/Projects.astro", void 0);

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const articles = await fetchApi({
    endpoint: "articles?populate=*",
    wrappedByKey: "data"
  });
  return renderTemplate`${maybeRenderHead()}<section id="blogs" class="text-gray-300 body-font py-16 md:py-20 lg:py-24" data-astro-cid-5btwlaeg> <div class="container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mx-auto" data-astro-cid-5btwlaeg> <!-- Header --> <div class="flex items-center text-purple-600 gap-3 md:gap-4 mb-12 md:mb-16" data-astro-cid-5btwlaeg> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 md:w-10 md:h-10 animate-pulse" data-astro-cid-5btwlaeg> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" data-astro-cid-5btwlaeg></path> </svg> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-mono ml-1 md:ml-2" data-astro-cid-5btwlaeg>blogs</h1> </div> <!-- Blog Grid --> <ul class="grid grid-cols-1 gap-6 md:gap-8 font-mono" data-astro-cid-5btwlaeg> ${articles.slice(0, 3).map((article, index) => renderTemplate`<li class="blog-card border-2 border-purple-600/30 rounded-xl p-6 md:p-8 transition-all duration-500 ease-out hover:border-purple-500/60 hover:bg-gradient-to-br hover:from-purple-900/10 hover:via-blue-900/5 hover:to-pink-900/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2" data-astro-cid-5btwlaeg> <a${addAttribute(`/blog/${article.slug}/`, "href")} class="group flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 transition-all duration-300 ease-in-out hover:text-purple-400" data-astro-cid-5btwlaeg> ${article.image && renderTemplate`<div class="image-container flex-shrink-0 overflow-hidden rounded-lg aspect-[4/3]" data-astro-cid-5btwlaeg> <img${addAttribute(`${article.image.url}`, "src")}${addAttribute(article.title, "alt")} class="w-full lg:w-32 xl:w-40 h-24 lg:h-24 xl:h-28 object-cover rounded-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110" loading="lazy" data-astro-cid-5btwlaeg> </div>`} <div class="flex-1 min-w-0 space-y-2 md:space-y-3" data-astro-cid-5btwlaeg> <div class="text-xs sm:text-sm text-gray-500 font-medium" data-astro-cid-5btwlaeg> ${new Date(article.publish_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </div> <div class="flex items-start lg:items-center gap-3 lg:gap-4" data-astro-cid-5btwlaeg> <h3 class="text-lg sm:text-xl lg:text-2xl text-white font-bold transition-all duration-300 ease-in-out group-hover:text-purple-400 leading-tight flex-1" data-astro-cid-5btwlaeg> ${article.title} </h3> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-purple-400 group-hover:scale-110 flex-shrink-0 mt-1 lg:mt-0" data-astro-cid-5btwlaeg> <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" data-astro-cid-5btwlaeg></path> </svg> </div> </div> </a> </li>`)} </ul> <!-- View More --> <div class="mt-12 md:mt-16" data-astro-cid-5btwlaeg> <a href="/blog/" class="group relative inline-flex items-center gap-3 text-lg lg:text-xl text-white no-underline transition-all duration-300 hover:text-purple-400 hover:scale-105" data-astro-cid-5btwlaeg> <span class="underline-on-hover font-medium" data-astro-cid-5btwlaeg>View Blogs Archive</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" data-astro-cid-5btwlaeg> <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" data-astro-cid-5btwlaeg></path> </svg> </a> </div> </div> </section> `;
}, "D:/work/Portfolio/src/components/index/Blogs.astro", void 0);

const $$Portfolio = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="portfolio" class="text-gray-300 font-mono min-h-screen py-8 sm:py-16" data-astro-cid-4jemgwmy> <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-32" data-astro-cid-4jemgwmy> <!-- Header with improved responsive spacing --> <div class="flex items-center text-purple-600 gap-3 sm:gap-4 mb-8 sm:mb-12" data-astro-cid-4jemgwmy> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sm:w-10 sm:h-10" data-astro-cid-4jemgwmy> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" data-astro-cid-4jemgwmy></path> </svg> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white" data-astro-cid-4jemgwmy>portfolios</h1> </div> <!-- Grid with improved responsive breakpoints --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10" data-astro-cid-4jemgwmy> <!-- TryHackMe Card --> <a href="https://tryhackme.com/p/JokHolk" class="group card-hover-effect block border-2 border-purple-900/50 rounded-xl p-4 sm:p-6 flex flex-col justify-between backdrop-blur-sm bg-gray-800/30 hover:animate-glow" target="_blank" data-astro-cid-4jemgwmy> <div class="flex-grow" data-astro-cid-4jemgwmy> <div class="flex items-center gap-3 mb-3" data-astro-cid-4jemgwmy> <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse" data-astro-cid-4jemgwmy></div> <h3 class="text-lg sm:text-xl font-semibold text-purple-400 transition-all duration-500 group-hover:text-purple-200" data-astro-cid-4jemgwmy>
TryHackMe Profile
</h3> </div> <p class="text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-100" data-astro-cid-4jemgwmy>
View my cybersecurity journey and achievements on TryHackMe.
</p> </div> <div class="mt-4 sm:mt-6 flex justify-between items-center" data-astro-cid-4jemgwmy> <span class="text-xs text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-4jemgwmy>
Click to explore →
</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 icon-bounce group-hover:text-purple-300" data-astro-cid-4jemgwmy> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" data-astro-cid-4jemgwmy></path> </svg> </div> </a> <!-- Facebook Card --> <a href="https://facebook.com/jokholk.real" class="group card-hover-effect block border-2 border-purple-900/50 rounded-xl p-4 sm:p-6 flex flex-col justify-between backdrop-blur-sm bg-gray-800/30 hover:animate-glow" target="_blank" data-astro-cid-4jemgwmy> <div class="flex-grow" data-astro-cid-4jemgwmy> <div class="flex items-center gap-3 mb-3" data-astro-cid-4jemgwmy> <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse" data-astro-cid-4jemgwmy></div> <h3 class="text-lg sm:text-xl font-semibold text-purple-400 transition-all duration-500 group-hover:text-purple-200" data-astro-cid-4jemgwmy>
Facebook Profile
</h3> </div> <p class="text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-100" data-astro-cid-4jemgwmy>
Let's connect! Follow my latest projects, insights, and everything I'm passionate about
</p> </div> <div class="mt-4 sm:mt-6 flex justify-between items-center" data-astro-cid-4jemgwmy> <span class="text-xs text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-4jemgwmy>
Connect with me →
</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 icon-bounce group-hover:text-purple-300" data-astro-cid-4jemgwmy> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" data-astro-cid-4jemgwmy></path> </svg> </div> </a> <!-- GitHub Card --> <a href="https://github.com/Jok-Holk" class="group card-hover-effect block border-2 border-purple-900/50 rounded-xl p-4 sm:p-6 flex flex-col justify-between backdrop-blur-sm bg-gray-800/30 hover:animate-glow" target="_blank" data-astro-cid-4jemgwmy> <div class="flex-grow" data-astro-cid-4jemgwmy> <div class="flex items-center gap-3 mb-3" data-astro-cid-4jemgwmy> <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-astro-cid-4jemgwmy></div> <h3 class="text-lg sm:text-xl font-semibold text-purple-400 transition-all duration-500 group-hover:text-purple-200" data-astro-cid-4jemgwmy>
GitHub Profile
</h3> </div> <p class="text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-100" data-astro-cid-4jemgwmy>
Explore my open-source contributions and personal projects.
</p> </div> <div class="mt-4 sm:mt-6 flex justify-between items-center" data-astro-cid-4jemgwmy> <span class="text-xs text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-4jemgwmy>
View projects →
</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 icon-bounce group-hover:text-purple-300" data-astro-cid-4jemgwmy> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" data-astro-cid-4jemgwmy></path> </svg> </div> </a> <!-- Discord Card --> <a href="https://discord.com/users/586394957158547456" class="group card-hover-effect block border-2 border-purple-900/50 rounded-xl p-4 sm:p-6 flex flex-col justify-between backdrop-blur-sm bg-gray-800/30 hover:animate-glow" target="_blank" data-astro-cid-4jemgwmy> <div class="flex-grow" data-astro-cid-4jemgwmy> <div class="flex items-center gap-3 mb-3" data-astro-cid-4jemgwmy> <div class="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" data-astro-cid-4jemgwmy></div> <h3 class="text-lg sm:text-xl font-semibold text-purple-400 transition-all duration-500 group-hover:text-purple-200" data-astro-cid-4jemgwmy>
Discord Profile
</h3> </div> <p class="text-sm sm:text-base text-gray-300 leading-relaxed transition-colors duration-500 group-hover:text-gray-100" data-astro-cid-4jemgwmy>
Feel free to connect with me on Discord to chat about tech, projects, or anything else.
</p> </div> <div class="mt-4 sm:mt-6 flex justify-between items-center" data-astro-cid-4jemgwmy> <span class="text-xs text-purple-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-astro-cid-4jemgwmy>
Let's chat →
</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 icon-bounce group-hover:text-purple-300" data-astro-cid-4jemgwmy> <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" data-astro-cid-4jemgwmy></path> </svg> </div> </a> </div> </div> </section>  ${renderScript($$result, "D:/work/Portfolio/src/components/index/Portfolio.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/work/Portfolio/src/components/index/Portfolio.astro", void 0);

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="text-gray-300 font-mono min-h-screen py-8 sm:py-16" data-astro-cid-y3nqplgu> <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-32" data-astro-cid-y3nqplgu> <!-- Header with improved responsive spacing --> <div class="flex items-center text-purple-600 gap-3 sm:gap-4 mb-8 sm:mb-12" data-astro-cid-y3nqplgu> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 sm:w-10 sm:h-10" data-astro-cid-y3nqplgu> <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.903l-11.25 6.75a2.25 2.25 0 01-2.108 0L2.25 9.196V6.75" data-astro-cid-y3nqplgu></path> </svg> <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider" data-astro-cid-y3nqplgu>contact</h1> </div> <!-- Contact Form --> <form id="contact-form" action="https://formspree.io/f/mwpnbnoy" method="POST" class="w-full" data-astro-cid-y3nqplgu> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" data-astro-cid-y3nqplgu> <!-- Left Column - Form Fields --> <div class="flex flex-col gap-6 sm:gap-8" data-astro-cid-y3nqplgu> <!-- Name Fields --> <div class="group" data-astro-cid-y3nqplgu> <label for="firstName" class="block text-lg sm:text-xl md:text-2xl text-white mb-3 font-semibold" data-astro-cid-y3nqplgu> <span class="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" data-astro-cid-y3nqplgu></span>
Name
</label> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-astro-cid-y3nqplgu> <div class="relative" data-astro-cid-y3nqplgu> <input type="text" name="firstName" id="firstName" class="w-full bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-600 rounded-lg py-3 px-4 input-focus-effect focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" placeholder="First Name" required data-astro-cid-y3nqplgu> <div class="absolute inset-y-0 right-0 flex items-center pr-3" data-astro-cid-y3nqplgu> <div class="w-2 h-2 bg-gray-500 rounded-full validation-indicator" data-astro-cid-y3nqplgu></div> </div> </div> <div class="relative" data-astro-cid-y3nqplgu> <input type="text" name="lastName" id="lastName" class="w-full bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-600 rounded-lg py-3 px-4 input-focus-effect focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" placeholder="Last Name" required data-astro-cid-y3nqplgu> <div class="absolute inset-y-0 right-0 flex items-center pr-3" data-astro-cid-y3nqplgu> <div class="w-2 h-2 bg-gray-500 rounded-full validation-indicator" data-astro-cid-y3nqplgu></div> </div> </div> </div> </div> <!-- Email Field --> <div class="group" data-astro-cid-y3nqplgu> <label for="email" class="block text-lg sm:text-xl md:text-2xl text-white mb-3 font-semibold" data-astro-cid-y3nqplgu> <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" data-astro-cid-y3nqplgu></span>
Email
</label> <div class="relative" data-astro-cid-y3nqplgu> <input type="email" name="email" id="email" class="w-full bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-600 rounded-lg py-3 px-4 input-focus-effect focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" placeholder="your.email@example.com" required data-astro-cid-y3nqplgu> <div class="absolute inset-y-0 right-0 flex items-center pr-3" data-astro-cid-y3nqplgu> <div class="w-2 h-2 bg-gray-500 rounded-full validation-indicator" data-astro-cid-y3nqplgu></div> </div> </div> </div> <!-- Phone Field --> <div class="group" data-astro-cid-y3nqplgu> <label for="phone" class="block text-lg sm:text-xl md:text-2xl text-white mb-3 font-semibold" data-astro-cid-y3nqplgu> <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" data-astro-cid-y3nqplgu></span>
Phone <span class="text-sm text-gray-400 font-normal" data-astro-cid-y3nqplgu>(Optional)</span> </label> <div class="relative" data-astro-cid-y3nqplgu> <input type="tel" name="phone" id="phone" class="w-full bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-600 rounded-lg py-3 px-4 input-focus-effect focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" placeholder="e.g. +84 123 456 789" data-astro-cid-y3nqplgu> <div class="absolute inset-y-0 right-0 flex items-center pr-3" data-astro-cid-y3nqplgu> <div class="w-2 h-2 bg-gray-500 rounded-full validation-indicator" data-astro-cid-y3nqplgu></div> </div> </div> </div> </div> <!-- Right Column - Message --> <div class="flex flex-col" data-astro-cid-y3nqplgu> <label for="message" class="block text-lg sm:text-xl md:text-2xl text-white mb-3 font-semibold" data-astro-cid-y3nqplgu> <span class="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" data-astro-cid-y3nqplgu></span>
Message
</label> <div class="relative flex-1" data-astro-cid-y3nqplgu> <textarea name="message" id="message" rows="8" class="w-full h-full min-h-[200px] lg:min-h-[300px] bg-gray-800/50 backdrop-blur-sm text-gray-100 border border-gray-600 rounded-lg p-4 input-focus-effect focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none" placeholder="Tell me about your project, ideas, or just say hello! I'd love to hear from you..." required data-astro-cid-y3nqplgu></textarea> <div class="absolute top-4 right-4" data-astro-cid-y3nqplgu> <div class="w-2 h-2 bg-gray-500 rounded-full validation-indicator" data-astro-cid-y3nqplgu></div> </div> <div class="absolute bottom-4 right-4 text-xs text-gray-500" id="char-count" data-astro-cid-y3nqplgu>
0 / 500 characters
</div> </div> </div> </div> <!-- Submit Button --> <div class="flex justify-center mt-8 sm:mt-12" data-astro-cid-y3nqplgu> <button type="submit" id="submit-btn" class="button-hover-effect bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 px-8 sm:px-12 rounded-xl shadow-lg transition-all duration-300 text-lg relative group" data-astro-cid-y3nqplgu> <span class="relative z-10 flex items-center gap-2" data-astro-cid-y3nqplgu> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-y3nqplgu> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-astro-cid-y3nqplgu></path> </svg>
Send Message
</span> </button> </div> </form> <!-- Success Message --> <div id="contact-success-message" class="hidden text-center text-white mt-12 sm:mt-16" data-aos="fade-up" data-astro-cid-y3nqplgu> <div class="success-message max-w-lg mx-auto p-6 sm:p-8 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl" data-astro-cid-y3nqplgu> <div class="mb-4" data-astro-cid-y3nqplgu> <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-y3nqplgu> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-y3nqplgu></path> </svg> </div> <h2 class="text-2xl sm:text-3xl font-bold mb-4" data-astro-cid-y3nqplgu>Thank you!</h2> <p class="text-lg sm:text-xl text-gray-300 leading-relaxed" data-astro-cid-y3nqplgu>
Your message has been sent successfully. I will get back to you within 24 hours.
</p> <button id="send-another-btn" class="mt-6 text-purple-400 hover:text-purple-300 transition-colors duration-300 underline" data-astro-cid-y3nqplgu>
Send another message
</button> </div> </div> </div> </section> ${renderScript($$result, "D:/work/Portfolio/src/components/index/Contact.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/work/Portfolio/src/components/index/Contact.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Home", $$Home, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Home.astro", "client:component-export": "default" })} ${renderComponent($$result2, "About", $$About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/About.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Education", $$Education, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Education.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Experience", $$Experience, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Experience.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Project", $$Projects, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Projects.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Blog", $$Blogs, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Blogs.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Portfolio", $$Portfolio, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Portfolio.astro", "client:component-export": "default" })} ${renderComponent($$result2, "Contact", $$Contact, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/work/Portfolio/src/components/index/Contact.astro", "client:component-export": "default" })} ` })}`;
}, "D:/work/Portfolio/src/pages/index.astro", void 0);

const $$file = "D:/work/Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
