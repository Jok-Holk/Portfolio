/**
 * Speech bubble logic for <Mascot />. State lives in `data-talking`, not in :hover,
 * because Tailwind v4 turns hover variants off on touch screens.
 */

const SHOW_MS = 2500;
const FADE_MS = 300; // keep in sync with the bubble transition in Mascot.astro

/** Yields one line per call: a shuffled pass over all lines, never the same line twice in a row. */
export function createLinePicker(lines: readonly string[], random: () => number = Math.random): () => string {
    let order: string[] = [];
    let index = 0;
    let last: string | null = null;

    const shuffle = (): string[] => {
        const copy = [...lines];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    return () => {
        if (lines.length === 0) return '';
        if (index >= order.length) {
            order = shuffle();
            index = 0;
            if (order.length > 1 && order[0] === last) {
                // Avoid repeating the previous line across the cycle boundary.
                const swap = order.findIndex((line) => line !== last);
                if (swap > 0) [order[0], order[swap]] = [order[swap], order[0]];
            }
        }
        last = order[index++];
        return last;
    };
}

function parseLines(raw: string | undefined): string[] {
    try {
        const parsed: unknown = JSON.parse(raw ?? '[]');
        return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string' && x.length > 0) : [];
    } catch {
        return [];
    }
}

function setup(root: HTMLElement): void {
    const button = root.querySelector<HTMLButtonElement>('[data-mascot-button]');
    const text = root.querySelector<HTMLElement>('[data-mascot-text]');
    const lines = parseLines(root.dataset.lines);
    if (!button || !text || lines.length === 0) return;

    const nextLine = createLinePicker(lines);
    let hideTimer: number | undefined;
    let clearTimer: number | undefined;
    let mouseInside = false;
    // Set by a hover; the click that follows keeps that line instead of picking another.
    let hoverFresh = false;

    const hide = () => {
        window.clearTimeout(hideTimer);
        root.dataset.talking = 'false';
        window.clearTimeout(clearTimer);
        // Clear after the fade so a screen reader announces the next line.
        clearTimer = window.setTimeout(() => {
            text.textContent = '';
        }, FADE_MS);
    };

    const scheduleHide = () => {
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => {
            // Stay open while the mouse is over the cat.
            if (mouseInside) return;
            hide();
        }, SHOW_MS);
    };

    const say = () => {
        window.clearTimeout(clearTimer);
        text.textContent = nextLine();
        root.dataset.talking = 'true';
        scheduleHide();
    };

    button.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        mouseInside = true;
        hoverFresh = true;
        say();
    });

    button.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        mouseInside = false;
        hoverFresh = false;
        hide();
    });

    // Taps, clicks and Enter/Space all arrive as click on the button.
    button.addEventListener('click', () => {
        if (hoverFresh) {
            hoverFresh = false;
            scheduleHide();
            return;
        }
        say();
    });

    button.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && root.dataset.talking === 'true') hide();
    });
}

let visibility: IntersectionObserver | null = null;

/** Pause the animations of mascots that are off screen. */
function watchVisibility(root: HTMLElement): void {
    if (!('IntersectionObserver' in window)) return;
    visibility ??= new IntersectionObserver((entries) => {
        for (const entry of entries) {
            (entry.target as HTMLElement).dataset.visible = entry.isIntersecting ? 'true' : 'false';
        }
    });
    visibility.observe(root);
}

const ready = new WeakSet<HTMLElement>();

export function initMascots(scope: ParentNode = document): void {
    scope.querySelectorAll<HTMLElement>('[data-mascot]').forEach((root) => {
        if (ready.has(root)) return;
        ready.add(root);
        setup(root);
        watchVisibility(root);
    });
}

if (typeof document !== 'undefined') {
    initMascots();
    document.addEventListener('astro:page-load', () => initMascots());
}
