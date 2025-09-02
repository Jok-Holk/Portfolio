function initScrollAnimations() {
    const map = {
        left: { x: [-65, 0] },
        right: { x: [65, 0] },
        top: { y: [-65, 0] },
        bottom: { y: [65, 0] },
    };

    Motion.inView('[data-animate]', ({ target }) => {
        const dir = target.dataset.direction || 'bottom';
        Motion.animate(target, { opacity: [0, 1], ...map[dir] }, { duration: 2, easing: 'ease-in-out' });
    });
}

function waitForLoader() {
    const loader = document.getElementById('loader');

    if (!loader) {
        initScrollAnimations();
        return;
    }

    const obs = new MutationObserver(() => {
        const style = window.getComputedStyle(loader);
        if (style.display === 'none') {
            initScrollAnimations();
            obs.disconnect();
        }
    });

    obs.observe(loader, { attributes: true, attributeFilter: ['style'] });

    if (window.getComputedStyle(loader).display === 'none') {
        initScrollAnimations();
        obs.disconnect();
    }
}

window.addEventListener('load', waitForLoader);
