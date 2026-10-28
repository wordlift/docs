// Interaction and motion for the docs (client module, no component
// overrides). Runs after every route change.
//
// Approach (aligned with Linear's docs): motion only answers the reader. It
// marks state changes (hover, active, open, copied, loaded) and never
// animates content into place, with one exception: the platform diagram draws
// its edges once, quickly, because the direction of the flow is the point.
// Everything respects prefers-reduced-motion, and every page is complete if
// this script never runs.

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mediumZoom from "medium-zoom";

// Images narrower than this are icons or logos: no frame, no zoom.
const SCREENSHOT_MIN_WIDTH = 480;

let mm;
let zoom;

if (ExecutionEnvironment.canUseDOM) {
    gsap.registerPlugin(ScrollTrigger);

    // Raise the navbar once the page has scrolled.
    const onScroll = () => {
        document.documentElement.classList.toggle("wl-scrolled", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Tabs: keep the sliding underline under the active tab.
    const onTabsChange = () => window.requestAnimationFrame(syncTabs);
    document.addEventListener("click", (e) => {
        if (e.target.closest && e.target.closest(".tabs__item")) onTabsChange();
    });
    document.addEventListener("keyup", (e) => {
        if (e.target.closest && e.target.closest(".tabs")) onTabsChange();
    });
    window.addEventListener("resize", onTabsChange, { passive: true });

    zoom = mediumZoom({ margin: 32, background: "var(--wl-zoom-backdrop)" });
}

function syncTabs() {
    document.querySelectorAll(".theme-tabs-container > .tabs").forEach((list) => {
        const active = list.querySelector(".tabs__item--active");
        if (!active) {
            return;
        }
        list.style.setProperty("--wl-tab-x", `${active.offsetLeft}px`);
        list.style.setProperty("--wl-tab-w", `${active.offsetWidth}px`);
        list.classList.add("wl-tabs-ready");
    });
}

// Screenshots: frame them, fade them in when they finish loading, and make
// them zoomable. Linked images and small images are left alone.
function setUpImages() {
    zoom.detach();
    document.querySelectorAll(".theme-doc-markdown img").forEach((img) => {
        if (img.closest("a") || img.closest('[data-wl="card"]')) {
            return;
        }
        const mark = () => {
            if (img.naturalWidth >= SCREENSHOT_MIN_WIDTH) {
                img.classList.add("wl-shot");
                zoom.attach(img);
            }
        };
        if (img.complete && img.naturalWidth) {
            mark();
            return;
        }
        img.classList.add("wl-img-pending");
        img.addEventListener(
            "load",
            () => {
                mark();
                img.classList.remove("wl-img-pending");
            },
            { once: true },
        );
        img.addEventListener("error", () => img.classList.remove("wl-img-pending"), { once: true });
    });
}

function animatePage() {
    if (mm) {
        mm.revert();
    }
    mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Platform diagram: the edges draw once, in flow order.
        document.querySelectorAll('.theme-doc-markdown [data-wl="diagram"]').forEach((figure) => {
            const edges = figure.querySelectorAll('[data-wl="edge"]');
            const lengths = Array.from(edges, (edge) => (edge.getTotalLength ? edge.getTotalLength() : 100));
            edges.forEach((edge, i) => {
                edge.style.strokeDasharray = `${lengths[i]}`;
            });
            gsap.from(edges, {
                strokeDashoffset: (i) => lengths[i],
                duration: 0.3,
                stagger: 0.1,
                ease: "power1.out",
                scrollTrigger: { trigger: figure, start: "top 85%", once: true },
                onComplete: () => edges.forEach((edge) => {
                    edge.style.strokeDasharray = "";
                    edge.style.strokeDashoffset = "";
                }),
            });
        });
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
        syncTabs();
        setUpImages();
        animatePage();
        ScrollTrigger.refresh();
    });
}
