// Motion and micro-interactions for the docs (client module, no component
// overrides). Runs after every route change.
//
// Principles: motion is quick and quiet, and it only ever starts from the
// page's resting state, so a page is complete if this script never runs.
// Everything sits inside gsap.matchMedia(), so readers who ask for reduced
// motion get none of it, and each route's animations are reverted before the
// next page starts.

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let mm;
let progress;

if (ExecutionEnvironment.canUseDOM) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 0.5 });

    // Raise the navbar once the page has scrolled.
    const onScroll = () => {
        document.documentElement.classList.toggle("wl-scrolled", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

function ensureProgressBar() {
    if (!progress) {
        progress = document.createElement("div");
        progress.className = "wl-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.appendChild(progress);
    }
    return progress;
}

function animatePage() {
    if (mm) {
        mm.revert();
    }
    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        const article = document.querySelector(".theme-doc-markdown");
        if (!article) {
            return;
        }

        // Page entrance: the title block and lede settle into place.
        const header = article.querySelector(":scope > header");
        const lede = header && header.nextElementSibling;
        const intro = [header, lede && lede.tagName === "P" ? lede : null].filter(Boolean);
        if (!window.location.hash && intro.length) {
            gsap.from(intro, { y: 10, opacity: 0, duration: 0.55, stagger: 0.06, clearProps: "transform,opacity" });
        }

        // Cards rise in as their grid scrolls into view.
        article.querySelectorAll('[data-wl="cards"]').forEach((grid) => {
            const cards = grid.querySelectorAll(':scope > [data-wl="card"]');
            gsap.from(cards, {
                y: 14,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                clearProps: "transform,opacity",
                scrollTrigger: { trigger: grid, start: "top 92%", once: true },
            });
        });

        // Steps: the number pops and the connector draws down to the next step.
        article.querySelectorAll('[data-wl="step"]').forEach((step) => {
            gsap.fromTo(
                step,
                { "--wl-pop": 0.6, "--wl-line": 0 },
                {
                    "--wl-pop": 1,
                    "--wl-line": 1,
                    duration: 0.6,
                    ease: "back.out(1.6)",
                    clearProps: "--wl-pop,--wl-line",
                    scrollTrigger: { trigger: step, start: "top 88%", once: true },
                },
            );
        });

        // Platform diagram: nodes fade up, then the edges draw in order.
        article.querySelectorAll('[data-wl="diagram"]').forEach((figure) => {
            const nodes = figure.querySelectorAll('[data-wl="node"]');
            const edges = figure.querySelectorAll('[data-wl="edge"]');
            edges.forEach((edge) => {
                const length = edge.getTotalLength ? edge.getTotalLength() : 100;
                edge.style.strokeDasharray = `${length}`;
                edge.style.strokeDashoffset = "0";
            });
            const tl = gsap.timeline({
                scrollTrigger: { trigger: figure, start: "top 85%", once: true },
                onComplete: () => edges.forEach((edge) => {
                    edge.style.strokeDasharray = "";
                    edge.style.strokeDashoffset = "";
                }),
            });
            tl.from(nodes, { opacity: 0, y: 8, duration: 0.45, stagger: 0.08, clearProps: "opacity,transform" })
                .from(edges, {
                    strokeDashoffset: (i, el) => (el.getTotalLength ? el.getTotalLength() : 100),
                    duration: 0.45,
                    stagger: 0.12,
                    ease: "power2.inOut",
                }, "-=0.2");
        });

        // Reading progress along the navbar edge, on pages long enough to need it.
        const bar = ensureProgressBar();
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.display = scrollable > 600 ? "" : "none";
        const setScale = gsap.quickSetter(bar, "scaleX");
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => setScale(self.progress),
        });

        return () => {
            bar.style.display = "none";
        };
    });
}

export function onRouteDidUpdate({ location, previousLocation }) {
    if (!ExecutionEnvironment.canUseDOM) {
        return;
    }
    if (previousLocation && location.pathname === previousLocation.pathname) {
        return; // same page, only the hash changed
    }
    window.requestAnimationFrame(() => {
        animatePage();
        ScrollTrigger.refresh();
    });
}
