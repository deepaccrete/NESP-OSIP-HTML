/* =============================================================================
   cardrail.js - a long group of cards becomes one row that scrolls (17 Sep 2026)

   A card group that runs past one row stops stacking and becomes a row of three
   that scrolls sideways, with a button at each side and a pager underneath (a
   hairline that fills, and the count). On the sector pages this takes several
   rows off the page: Key Regulatory Agencies alone was three rows of nine cards.

   What it picks up, with no per-page wiring:
     - `main .rd-cards` on the sector detail pages (the card system), and
     - anything marked `data-cardrail` (the quiz result page's two grids).
   A group of three or fewer is left exactly as it is - a plain row, no controls.

   Two shapes of card:
     - fluid (the default): three to a view, two from 640px, one below;
     - `data-cardrail="fixed"`: the card keeps the width it already had (the
       Opportunities card is 314px and must stay 314px), and as many fit as fit.
   Either way the group's own gap is kept, read off the page before the swap.

   Groups rendered by script later (the quiz results) are picked up by a
   MutationObserver, and `window.OSIPCardRail.scan()` forces a pass.

   Follows the injected-component pattern of glossary.js / videofacade.js: its
   own CSS, a window guard so a double load is a no-op, no host Tailwind.
   ============================================================================= */
(function () {
    'use strict';
    if (window.__osipCardRail) return;
    window.__osipCardRail = true;

    var PER_ROW = 3;
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- CSS ---------------------------------------------------------------- */
    var CSS = [
        /* the row. display and gap fight a page's own grid rules, so they insist. */
        '[data-rail]{display:flex!important;grid-template-columns:none!important;',
        'gap:var(--rail-gap,16px)!important;overflow-x:auto;scroll-snap-type:x mandatory;',
        'scroll-behavior:smooth;scrollbar-width:none;-ms-overflow-style:none;}',
        '[data-rail]::-webkit-scrollbar{display:none;}',
        '[data-rail]>*{scroll-snap-align:start;}',
        '[data-rail]:focus-visible{outline:2px solid var(--rd-green-2,#0b6b45);outline-offset:6px;border-radius:18px;}',

        /* fluid: three to a view */
        '[data-rail]:not([data-rail-fixed])>*{flex:0 0 100%;max-width:100%;}',
        '@media(min-width:640px){[data-rail]:not([data-rail-fixed])>*{',
        'flex-basis:calc((100% - var(--rail-gap,16px))/2);max-width:calc((100% - var(--rail-gap,16px))/2);}}',
        '@media(min-width:1024px){[data-rail]:not([data-rail-fixed])>*{',
        'flex-basis:calc((100% - 2*var(--rail-gap,16px))/3);max-width:calc((100% - 2*var(--rail-gap,16px))/3);}}',

        /* fixed: the card keeps the width it was built at */
        '[data-rail][data-rail-fixed]>*{flex:0 0 var(--rail-card,314px)!important;',
        'width:var(--rail-card,314px)!important;max-width:var(--rail-card,314px)!important;margin-inline:0!important;}',

        /* a button at each side of the row, in the section's gutter so it never
           covers a card's own title */
        '.rd-rail-wrap{position:relative;}',
        '.rd-rail-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:2;',
        'display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;',
        'border:1px solid var(--rd-line-2,#cfc9bd);border-radius:999px;',
        'background:var(--rd-paper,#f5f3ee);color:var(--rd-green,#004225);cursor:pointer;',
        'transition:border-color .3s ease,background-color .3s ease,opacity .3s ease;}',
        '.rd-rail-btn[data-dir="-1"]{left:-20px;}',
        '.rd-rail-btn[data-dir="1"]{right:-20px;}',
        '.rd-rail-btn:hover:not(:disabled){border-color:var(--rd-green,#004225);background:rgba(0,66,37,.06);}',
        '.rd-rail-btn:disabled{opacity:.3;cursor:default;}',
        '.rd-rail-btn .material-symbols-outlined{font-size:19px;}',

        /* the pager: the hairline that fills, and the count */
        '.rd-rail-pager{display:flex;align-items:center;gap:20px;margin-top:22px;}',
        '.rd-rail-track{position:relative;flex:1 1 auto;height:1px;overflow:hidden;background:var(--rd-line-2,#cfc9bd);}',
        '.rd-rail-fill{position:absolute;top:0;bottom:0;left:0;background:var(--rd-green,#004225);',
        'transition:width .45s cubic-bezier(.16,1,.3,1);}',
        '.rd-rail-count{font-family:var(--rd-sans,Inter,system-ui,sans-serif);font-size:12px;letter-spacing:.14em;',
        'color:var(--rd-ink-3,#6b716c);font-variant-numeric:tabular-nums;white-space:nowrap;}',
        '.rd-rail-count b{font-weight:500;color:var(--rd-ink,#13201b);}',

        /* A phone shows one card at a time and has no margin to stand a button in:
           flanking the row there would put it on top of the card's title. The pair
           drops into the pager row instead, and the cards are swiped. */
        '@media(max-width:639px){',
        '.rd-rail-pager{gap:14px;min-height:40px;padding-right:92px;}',
        '.rd-rail-btn{top:auto;bottom:-60px;transform:none;width:36px;height:36px;}',
        '.rd-rail-btn[data-dir="-1"]{left:auto;right:44px;}',
        '.rd-rail-btn[data-dir="1"]{right:0;}}',

        '@media(prefers-reduced-motion:reduce){[data-rail]{scroll-behavior:auto;}',
        '.rd-rail-fill{transition:none;}}'
    ].join('');

    function injectCSS() {
        if (document.getElementById('osip-cardrail-css')) return;
        var tag = document.createElement('style');
        tag.id = 'osip-cardrail-css';
        tag.textContent = CSS;
        (document.head || document.documentElement).appendChild(tag);
    }

    /* ---- one rail ----------------------------------------------------------- */
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    function build(rail) {
        var cards = Array.prototype.slice.call(rail.children);
        var first = cards[0];
        var cs = getComputedStyle(rail);
        var gap = parseFloat(cs.columnGap || cs.gap) || 16;
        var fixed = rail.getAttribute('data-cardrail') === 'fixed';

        /* measured before the swap, while the group is still laid out as it was */
        var cardWidth = Math.round(first.getBoundingClientRect().width);

        rail.style.setProperty('--rail-gap', gap + 'px');
        if (fixed) {
            rail.style.setProperty('--rail-card', cardWidth + 'px');
            rail.setAttribute('data-rail-fixed', '');
        }
        rail.setAttribute('data-rail', '');
        rail.setAttribute('tabindex', '0');
        rail.setAttribute('role', 'group');

        var heading = rail.previousElementSibling;
        while (heading && !/^H[1-4]$/.test(heading.tagName)) {
            heading = heading.querySelector ? (heading.querySelector('h1,h2,h3,h4') || heading.previousElementSibling) : heading.previousElementSibling;
            if (heading && /^H[1-4]$/.test(heading.tagName)) break;
        }
        rail.setAttribute('aria-label', (heading ? heading.textContent.trim() : 'Cards') + ': side-scrolling list');

        var wrap = document.createElement('div');
        wrap.className = 'rd-rail-wrap';
        rail.parentNode.insertBefore(wrap, rail);
        wrap.appendChild(rail);
        /* UX-A11-08: a page with four rails had four buttons called "Previous
           cards" and four called "Next cards" - eight identical entries in a
           screen reader's list, none of them saying which row they scroll. Each
           pair is named after the heading its rail sits under. */
        var railName = '';
        for (var up = rail.parentNode, hop = 0; up && hop < 5 && !railName; up = up.parentNode, hop++) {
            var h = up.querySelector && up.querySelector('h2, h3');
            if (h) railName = (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
        }
        var prevLabel = railName ? 'Previous ' + railName + ' cards' : 'Previous cards';
        var nextLabel = railName ? 'Next ' + railName + ' cards' : 'Next cards';

        wrap.insertAdjacentHTML('beforeend',
            '<button type="button" class="rd-rail-btn" data-dir="-1" aria-label="' + prevLabel + '">' +
            '<span class="material-symbols-outlined" aria-hidden="true">arrow_back</span></button>' +
            '<button type="button" class="rd-rail-btn" data-dir="1" aria-label="' + nextLabel + '">' +
            '<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></button>');

        var pager = document.createElement('div');
        pager.className = 'rd-rail-pager';
        pager.innerHTML =
            '<span class="rd-rail-track"><span class="rd-rail-fill"></span></span>' +
            '<span class="rd-rail-count" aria-live="polite"><b>01</b> / 01</span>';
        wrap.parentNode.insertBefore(pager, wrap.nextSibling);

        var fill = pager.querySelector('.rd-rail-fill');
        var count = pager.querySelector('.rd-rail-count');
        var buttons = Array.prototype.slice.call(wrap.querySelectorAll('.rd-rail-btn'));

        function step() {
            var card = rail.children[0];
            if (!card) return { size: rail.clientWidth, perView: 1 };
            var w = card.getBoundingClientRect().width;
            var g = parseFloat(getComputedStyle(rail).columnGap || getComputedStyle(rail).gap) || gap;
            var perView = Math.max(1, Math.round((rail.clientWidth + g) / (w + g)));
            return { size: perView * (w + g), perView: perView };
        }

        function sync() {
            var s = step();
            var max = rail.scrollWidth - rail.clientWidth;
            var total = rail.children.length;
            var pages = Math.max(1, Math.ceil(total / s.perView));
            /* at the end it is the last page, whatever the arithmetic rounds to: a
               group of four scrolled to its end sits one card along, not one page */
            var page = 0;
            if (max > 4) {
                page = rail.scrollLeft >= max - 2
                    ? pages - 1
                    : Math.min(pages - 1, Math.round(rail.scrollLeft / s.size));
            }

            pager.hidden = max <= 4;
            buttons.forEach(function (b) { b.hidden = max <= 4; });
            count.innerHTML = '<b>' + pad(page + 1) + '</b> / ' + pad(pages);
            fill.style.width = ((page + 1) / pages * 100) + '%';
            buttons.forEach(function (b) {
                var dir = parseInt(b.getAttribute('data-dir'), 10);
                b.disabled = dir < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max - 2;
            });
        }

        buttons.forEach(function (b) {
            b.addEventListener('click', function () {
                rail.scrollBy({
                    left: parseInt(b.getAttribute('data-dir'), 10) * step().size,
                    behavior: still ? 'auto' : 'smooth'
                });
                /* an instant scroll, or one clamped at an end, may dispatch no scroll
                   event at all; settle the pager from the position itself */
                sync();
                setTimeout(sync, 450);
            });
        });

        rail.addEventListener('scroll', sync, { passive: true });
        window.addEventListener('resize', sync);
        rail.__railSync = sync;

        /* a re-render (new quiz answers) changes how many cards the row holds */
        if (typeof MutationObserver !== 'undefined') {
            new MutationObserver(function () { sync(); }).observe(rail, { childList: true });
        }
        sync();
    }

    /* ---- the sweep ---------------------------------------------------------- */
    function candidates() {
        var found = [];
        Array.prototype.push.apply(found, document.querySelectorAll('main .rd-cards'));
        Array.prototype.push.apply(found, document.querySelectorAll('[data-cardrail]'));
        return found;
    }

    /* Builds new rails only. It must not touch a rail it has already built: the
       page-wide observer below fires on the pager's own updates, and re-syncing
       here would chase its own tail. Each rail watches its own cards instead. */
    function scan() {
        injectCSS();
        candidates().forEach(function (el) {
            if (el.hasAttribute('data-rail')) return;
            if (el.children.length <= PER_ROW) return;
            if (!el.getBoundingClientRect().width) return;   /* hidden: wait until it is shown */
            build(el);
        });
    }

    window.OSIPCardRail = { scan: scan };

    /* Groups written by script - the quiz results - arrive after this runs, and a
       hidden section has no width to measure, so watch for both. */
    var pending = null;
    function later() {
        if (pending) return;
        pending = setTimeout(function () { pending = null; scan(); }, 60);
    }

    function start() {
        scan();
        if (typeof MutationObserver === 'undefined') return;
        new MutationObserver(later).observe(document.body, {
            childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'style']
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
