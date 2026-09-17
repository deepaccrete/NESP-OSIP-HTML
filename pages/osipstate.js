/* =============================================================================
   osipstate.js - the four states every page that shows data needs (UX-FRM-07)

   Loading, empty, error and success, built once and used everywhere, so a list
   behaves the same on Opportunities as it does on News, States or Search.

   The loader is the four-ring loader from the React build
   (OSIP-Frontend/src/components/common/Loader.jsx + styles/loader.css), drawn
   here in plain SVG with the same radii and keyframes.

   ---------------------------------------------------------------------------
   Using it on a page

     <script src="osipstate.js"></script>

     <div id="news-grid" data-osip-list data-osip-label="news items">…</div>

   Attributes on the list container
     data-osip-list              this container has the four states
     data-osip-label="projects"  what its items are called, used in messages
     data-osip-requires="OSIP_X" a global the page's data file must define;
                                 missing or empty after load shows the error state
     data-osip-empty="#id"       the page's own empty message, if it has one;
                                 without it this file draws a standard one
     data-osip-reset="#id"       the control that clears the filters
     data-osip-min="400"         shortest time the loader is shown, ms

   Attributes elsewhere
     data-osip-filters           a filter panel or search field: while the page
                                 re-renders after a change, the list dims

   From script
     OSIPState.busy(el, ms)      show the working state over a container
     OSIPState.ready(el)         content is ready: reveal it
     OSIPState.error(el, opts)   show the error state in a container
     OSIPState.toast(msg, opts)  a success (or failure) confirmation, bottom left

   What is honest about this in a prototype
     Nothing here invents a delay to look busy. The loading state covers the work
     the page really does on first paint - reading its data files, filtering,
     paginating, drawing the map - with a short minimum so it is not a flicker.
     In the real build the same calls hook to the request instead.
   ============================================================================= */
(function () {
    'use strict';

    var CSS = `
    .osip-state { display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 14px; padding: clamp(36px, 6vw, 72px) 24px; text-align: center; }
    .osip-state[hidden] { display: none; }
    .osip-state-icon { display: block; color: #9aa39d; }
    .osip-state-icon svg { width: 38px; height: 38px; display: block; }
    .osip-state h3 { margin: 0; font-family: Inter, system-ui, sans-serif; font-size: 20px; font-weight: 500;
        letter-spacing: -0.01em; color: #13201b; }
    .osip-state p { margin: 0; max-width: 42ch; font-family: Inter, system-ui, sans-serif; font-size: 14.5px;
        line-height: 1.6; color: #6b716c; }
    .osip-state-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 4px; }
    .osip-state-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border: 0;
        border-radius: 999px; background: #004225; color: #fff; font-family: Inter, system-ui, sans-serif;
        font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer;
        transition: background-color .3s ease, transform .3s ease; }
    .osip-state-btn:hover { background: #0b6b45; }
    .osip-state-btn:focus-visible { outline: 2px solid #0b6b45; outline-offset: 3px; }
    .osip-state-btn.is-quiet { background: transparent; color: #3d4742; box-shadow: inset 0 0 0 1px #d8d3c8; }
    .osip-state-btn.is-quiet:hover { background: #f1eee8; color: #13201b; }
    .osip-state--error .osip-state-icon { color: #b3261e; }

    /* the list while it is working: dimmed, with the loader over it */
    .osip-state-host { position: relative; }
    .osip-state-host > .osip-state-veil { position: absolute; inset: 0; z-index: 5; display: flex;
        align-items: flex-start; justify-content: center; padding-top: clamp(28px, 8vh, 90px);
        background: rgba(245, 243, 238, .72); backdrop-filter: blur(1.5px);
        animation: osipStateIn .2s ease both; }
    .osip-state-host.is-busy > *:not(.osip-state-veil) { opacity: .45; transition: opacity .25s ease; }
    @keyframes osipStateIn { from { opacity: 0 } to { opacity: 1 } }

    .osip-loader { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .osip-loader p { margin: 0; font-family: Inter, system-ui, sans-serif; font-size: 13.5px; color: #6b716c; }

    /* The four-ring loader, from the React build. The radii (105, 35, 70) are what
       the stroke-dasharray totals below encode - 2pi*r - so they must stay. */
    .osip-pl { width: 4.5em; height: 4.5em; }
    .osip-pl__ring { animation: osipRingA 2s linear infinite; }
    .osip-pl__ring--a { stroke: #00342b; }
    .osip-pl__ring--b { animation-name: osipRingB; stroke: #dfa800; }
    .osip-pl__ring--c { animation-name: osipRingC; stroke: #1b6d24; }
    .osip-pl__ring--d { animation-name: osipRingD; stroke: #709e91; }

    @media (prefers-reduced-motion: reduce) {
        .osip-pl__ring { animation: none; stroke-dasharray: 40 400; stroke-width: 30; }
        .osip-state-host > .osip-state-veil { animation: none; }
    }

    @keyframes osipRingA {
        from, 4% { stroke-dasharray: 0 660; stroke-width: 20; stroke-dashoffset: -330; }
        12% { stroke-dasharray: 60 600; stroke-width: 30; stroke-dashoffset: -335; }
        32% { stroke-dasharray: 60 600; stroke-width: 30; stroke-dashoffset: -595; }
        40%, 54% { stroke-dasharray: 0 660; stroke-width: 20; stroke-dashoffset: -660; }
        62% { stroke-dasharray: 60 600; stroke-width: 30; stroke-dashoffset: -665; }
        82% { stroke-dasharray: 60 600; stroke-width: 30; stroke-dashoffset: -925; }
        90%, to { stroke-dasharray: 0 660; stroke-width: 20; stroke-dashoffset: -990; }
    }
    @keyframes osipRingB {
        from, 12% { stroke-dasharray: 0 220; stroke-width: 20; stroke-dashoffset: -110; }
        20% { stroke-dasharray: 20 200; stroke-width: 30; stroke-dashoffset: -115; }
        40% { stroke-dasharray: 20 200; stroke-width: 30; stroke-dashoffset: -195; }
        48%, 62% { stroke-dasharray: 0 220; stroke-width: 20; stroke-dashoffset: -220; }
        70% { stroke-dasharray: 20 200; stroke-width: 30; stroke-dashoffset: -225; }
        90% { stroke-dasharray: 20 200; stroke-width: 30; stroke-dashoffset: -305; }
        98%, to { stroke-dasharray: 0 220; stroke-width: 20; stroke-dashoffset: -330; }
    }
    @keyframes osipRingC {
        from { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: 0; }
        8% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -5; }
        28% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -175; }
        36%, 58% { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: -220; }
        66% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -225; }
        86% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -395; }
        94%, to { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: -440; }
    }
    @keyframes osipRingD {
        from, 8% { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: 0; }
        16% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -5; }
        36% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -175; }
        44%, 50% { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: -220; }
        58% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -225; }
        78% { stroke-dasharray: 40 400; stroke-width: 30; stroke-dashoffset: -395; }
        86%, to { stroke-dasharray: 0 440; stroke-width: 20; stroke-dashoffset: -440; }
    }

    /* success and failure confirmations */
    .osip-toasts { position: fixed; left: 24px; bottom: 24px; z-index: 120; display: flex;
        flex-direction: column; gap: 10px; pointer-events: none; }
    .osip-toast { display: flex; align-items: flex-start; gap: 10px; max-width: 24rem; padding: 13px 18px;
        background: #13201b; color: #f3efe6; border-radius: 14px;
        box-shadow: 0 18px 40px -22px rgba(19, 32, 27, .7); pointer-events: auto;
        font-family: Inter, system-ui, sans-serif; font-size: 14.5px; line-height: 1.45;
        animation: osipToastIn .32s cubic-bezier(.22, 1, .36, 1) both; }
    .osip-toast .osip-state-icon { color: #7fd6a8; flex: 0 0 auto; margin-top: 1px; }
    .osip-toast .osip-state-icon svg { width: 19px; height: 19px; }
    .osip-toast--error .osip-state-icon { color: #ffb4ab; }
    .osip-toast.is-going { animation: osipToastOut .3s ease both; }
    @keyframes osipToastIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
    @keyframes osipToastOut { to { opacity: 0; transform: translateY(8px) } }
    @media (max-width: 640px) { .osip-toasts { left: 12px; right: 12px; bottom: 12px; } }
    @media (prefers-reduced-motion: reduce) { .osip-toast, .osip-toast.is-going { animation-duration: .01s } }
    `;

    var style = document.createElement('style');
    style.id = 'osip-state-css';
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);

    var SVG = 'http://www.w3.org/2000/svg';

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    /* Inline, so a page that does not load the icon font still shows a mark and not
       the word for one. */
    var PATHS = {
        'search_off': 'M3 3l18 18M10.5 4a6.5 6.5 0 0 1 5.16 10.46M14.9 14.9A6.5 6.5 0 0 1 5.5 5.6M20 20l-4.6-4.6',
        'cloud_off': 'M3 3l18 18M7 18h9a4 4 0 0 0 1.4-7.75A6 6 0 0 0 8.2 7.2M5.2 9.3A4.5 4.5 0 0 0 6 18',
        'check_circle': 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM8.5 12.3l2.4 2.4 4.6-4.9',
        'error': 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 8v5M12 16.2v.1'
    };

    function icon(name) {
        var wrap = el('span', 'osip-state-icon');
        wrap.setAttribute('aria-hidden', 'true');
        var svg = document.createElementNS(SVG, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        var d = document.createElementNS(SVG, 'path');
        d.setAttribute('d', PATHS[name] || PATHS.error);
        svg.appendChild(d);
        wrap.appendChild(svg);
        return wrap;
    }

    /* ---- the loader ---------------------------------------------------------- */
    function ring(cls, cx, r, dash, offset) {
        var c = document.createElementNS(SVG, 'circle');
        c.setAttribute('class', 'osip-pl__ring ' + cls);
        c.setAttribute('cx', cx); c.setAttribute('cy', '120'); c.setAttribute('r', r);
        c.setAttribute('fill', 'none'); c.setAttribute('stroke-width', '20');
        c.setAttribute('stroke-dasharray', dash); c.setAttribute('stroke-dashoffset', offset);
        c.setAttribute('stroke-linecap', 'round');
        return c;
    }

    function loader(message) {
        var wrap = el('div', 'osip-loader');
        var svg = document.createElementNS(SVG, 'svg');
        svg.setAttribute('class', 'osip-pl');
        svg.setAttribute('viewBox', '0 0 240 240');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.appendChild(ring('osip-pl__ring--a', 120, 105, '0 660', -330));
        svg.appendChild(ring('osip-pl__ring--b', 120, 35, '0 220', -110));
        svg.appendChild(ring('osip-pl__ring--c', 85, 70, '0 440', 0));
        svg.appendChild(ring('osip-pl__ring--d', 155, 70, '0 440', 0));
        wrap.appendChild(svg);
        if (message) wrap.appendChild(el('p', null, message));
        return wrap;
    }

    /* ---- the working state over a container ---------------------------------- */
    function host(target) {
        target.classList.add('osip-state-host');
        return target;
    }

    function busy(target, message) {
        if (!target) return;
        host(target);
        var veil = target.querySelector(':scope > .osip-state-veil');
        if (!veil) {
            veil = el('div', 'osip-state-veil');
            veil.setAttribute('role', 'status');
            veil.setAttribute('aria-live', 'polite');
            veil.appendChild(loader(message || 'Loading…'));
            target.appendChild(veil);
        }
        target.classList.add('is-busy');
        target.setAttribute('aria-busy', 'true');
    }

    function ready(target) {
        if (!target) return;
        var veil = target.querySelector(':scope > .osip-state-veil');
        if (veil) veil.remove();
        target.classList.remove('is-busy');
        target.removeAttribute('aria-busy');
    }

    /* ---- the standard panels -------------------------------------------------- */
    function panel(kind, opts) {
        var box = el('div', 'osip-state osip-state--' + kind);
        box.appendChild(icon(opts.icon || (kind === 'error' ? 'error' : 'search_off')));
        box.appendChild(el('h3', null, opts.title));
        if (opts.note) box.appendChild(el('p', null, opts.note));
        if (opts.actions && opts.actions.length) {
            var row = el('div', 'osip-state-actions');
            opts.actions.forEach(function (a) {
                var b;
                if (a.href) { b = el('a', 'osip-state-btn' + (a.quiet ? ' is-quiet' : ''), a.label); b.href = a.href; }
                else {
                    b = el('button', 'osip-state-btn' + (a.quiet ? ' is-quiet' : ''), a.label);
                    b.type = 'button';
                    if (a.onClick) b.addEventListener('click', a.onClick);
                }
                row.appendChild(b);
            });
            box.appendChild(row);
        }
        return box;
    }

    function error(target, opts) {
        if (!target) return;
        opts = opts || {};
        ready(target);
        var here = target.querySelector(':scope > .osip-state--error');
        if (here) here.remove();
        var actions = [];
        if (opts.retry !== false) {
            actions.push({ label: 'Try again', onClick: opts.onRetry || function () { location.reload(); } });
        }
        actions.push({ label: 'Contact the OSIP team', href: opts.contact || 'Contact.html', quiet: true });
        var box = panel('error', {
            icon: 'cloud_off',
            title: opts.title || 'This did not load',
            note: opts.note || 'Something went wrong on our side, so this list could not be shown. Try again, and tell us if it keeps happening.',
            actions: actions
        });
        box.setAttribute('role', 'alert');
        target.appendChild(box);
        target.setAttribute('data-osip-failed', 'true');
        return box;
    }

    /* ---- success (and failure) confirmations ---------------------------------- */
    var tray = null;
    function toast(message, opts) {
        opts = opts || {};
        if (!tray) {
            tray = el('div', 'osip-toasts');
            document.body.appendChild(tray);
        }
        var t = el('div', 'osip-toast' + (opts.tone === 'error' ? ' osip-toast--error' : ''));
        t.setAttribute('role', opts.tone === 'error' ? 'alert' : 'status');
        t.appendChild(icon(opts.tone === 'error' ? 'error' : 'check_circle'));
        t.appendChild(el('span', null, message));
        tray.appendChild(t);
        var life = opts.duration || 3200;
        setTimeout(function () {
            t.classList.add('is-going');
            setTimeout(function () { t.remove(); }, 320);
        }, life);
        return t;
    }

    /* ---- wiring a page's lists ------------------------------------------------ */
    function labelOf(list) { return list.getAttribute('data-osip-label') || 'items'; }

    function ownEmpty(list) {
        var sel = list.getAttribute('data-osip-empty');
        return sel ? document.querySelector(sel) : null;
    }

    /* A list is empty when nothing inside it is on screen. Pages hide their cards
       in different ways (a class, hidden, display:none), so this asks the browser
       rather than guessing. */
    function visibleCount(list) {
        var items = list.querySelectorAll(':scope > *');
        var n = 0;
        Array.prototype.forEach.call(items, function (item) {
            if (item.classList.contains('osip-state') || item.classList.contains('osip-state-veil')) return;
            if (item.offsetParent === null && item.getClientRects().length === 0) return;
            n++;
        });
        return n;
    }

    function emptyPanel(list) {
        var here = list.querySelector(':scope > .osip-state--empty');
        if (here) return here;
        var reset = list.getAttribute('data-osip-reset');
        var actions = [];
        if (reset && document.querySelector(reset)) {
            actions.push({
                label: 'Clear the filters', onClick: function () {
                    var control = document.querySelector(reset);
                    if (control) control.click();
                }
            });
        }
        var box = panel('empty', {
            icon: 'search_off',
            title: 'No ' + labelOf(list) + ' match your filters',
            note: 'Try removing a filter, or searching for something broader.',
            actions: actions
        });
        box.hidden = true;
        list.appendChild(box);
        return box;
    }

    function checkEmpty(list) {
        if (list.getAttribute('data-osip-failed') === 'true') return;
        var own = ownEmpty(list);
        var none = visibleCount(list) === 0;
        if (own) {
            /* the page has its own message and its own script showing it; this file
               only fills the gap when that message is not on screen */
            var ownShown = !own.hidden && own.offsetParent !== null;
            if (none && ownShown) return;
        }
        var box = emptyPanel(list);
        box.hidden = !none;
    }

    function wire(list) {
        if (list.__osipState) return;
        list.__osipState = true;
        host(list);

        var min = parseInt(list.getAttribute('data-osip-min'), 10) || 650;
        var started = Date.now();
        busy(list, list.getAttribute('data-osip-loading') || 'Loading ' + labelOf(list) + '…');

        function settle() {
            var wait = Math.max(0, min - (Date.now() - started));
            setTimeout(function () {
                var needs = list.getAttribute('data-osip-requires');
                var missing = needs && (!window[needs] || (window[needs].length === 0));
                ready(list);
                if (missing) {
                    error(list, {
                        title: 'These ' + labelOf(list) + ' did not load',
                        note: 'The file this page reads its ' + labelOf(list) + ' from could not be loaded, so there is nothing to show. Try again, and tell us if it keeps happening.'
                    });
                    return;
                }
                checkEmpty(list);
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            }, wait);
        }

        if (document.readyState === 'complete') settle();
        else window.addEventListener('load', settle);

        /* after the page's own filter script has re-rendered, the empty state is
           re-checked; the list tells us by changing its children or their classes */
        if (window.MutationObserver) {
            var pending = null;
            new MutationObserver(function () {
                clearTimeout(pending);
                pending = setTimeout(function () { checkEmpty(list); }, 60);
            }).observe(list, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'hidden', 'style'] });
        }
    }

    /* A filter panel or search box: the list it belongs to shows it is working
       while the page re-renders. */
    function wireFilters(panelEl) {
        if (panelEl.__osipState) return;
        panelEl.__osipState = true;
        var sel = panelEl.getAttribute('data-osip-filters');
        var list = sel ? document.querySelector(sel) : document.querySelector('[data-osip-list]');
        if (!list) return;
        var timer = null;
        function flash() {
            if (list.getAttribute('data-osip-failed') === 'true') return;
            busy(list, 'Updating…');
            clearTimeout(timer);
            timer = setTimeout(function () { ready(list); checkEmpty(list); }, 300);
        }
        panelEl.addEventListener('change', flash);
        panelEl.addEventListener('input', function (e) {
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) flash();
        });
    }

    function start() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-osip-list]'), wire);
        Array.prototype.forEach.call(document.querySelectorAll('[data-osip-filters]'), wireFilters);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    window.OSIPState = {
        loader: loader, busy: busy, ready: ready, error: error, toast: toast,
        empty: checkEmpty, wire: wire, refresh: start
    };
})();
