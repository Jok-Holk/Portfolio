/**
 * Lighthouse CI. Run `yarn audit:perf` (build, then `lhci autorun`). It needs Chrome or
 * Chromium; without one set CHROME_PATH to a chromium or chrome-headless-shell binary.
 * Mobile profile, 3 runs per page, median.
 * Only /en is indexable, so only it must score 100 on SEO. The other pages are
 * `noindex` on purpose, which Lighthouse reports as "page is blocked from indexing" (69).
 */
const common = {
    'categories:performance': ['error', { minScore: 0.95 }],
    'categories:accessibility': ['error', { minScore: 0.95 }],
    'categories:best-practices': ['warn', { minScore: 0.95 }],
    'largest-contentful-paint': ['error', { maxNumericValue: 2600 }],
    'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
    'total-blocking-time': ['error', { maxNumericValue: 150 }],
    'total-byte-weight': ['warn', { maxNumericValue: 500000 }],
    'modern-image-formats': 'warn',
    'unsized-images': 'error',
    'heading-order': 'error',
};

module.exports = {
    ci: {
        collect: {
            staticDistDir: '.vercel/output/static',
            url: [
                'http://localhost/en/index.html',
                'http://localhost/vi/index.html',
                'http://localhost/en/blog/index.html',
            ],
            numberOfRuns: 3,
            settings: {
                chromeFlags: '--no-sandbox --headless=new --disable-gpu',
                onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
            },
        },
        assert: {
            assertMatrix: [
                {
                    matchingUrlPattern: '/en/index\\.html$',
                    assertions: { ...common, 'categories:seo': ['error', { minScore: 1 }] },
                },
                {
                    matchingUrlPattern: '/(vi/index|en/blog/index)\\.html$',
                    assertions: common,
                },
            ],
        },
        upload: {
            target: 'filesystem',
            outputDir: '.lighthouseci',
        },
    },
};
