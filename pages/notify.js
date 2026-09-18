// Alerts (UX-SUP-04): a bell in the header, top-right, with the number of
// unread alerts on it, and a small card of them when it is pressed.
//
// Usage: nothing. nav.js loads this file after it renders the header, so every
// page that has the header has the bell. The bell sits in the header's action
// row on desktop (next to the search icon) and beside the burger on a phone;
// the card drops down from the top-right corner.
//
// There is no alerts service behind this yet. ALERTS below is a mock, and every
// line of it is content that exists on the site: the newest published
// opportunity in oppdata.js, the three projects on the one live state profile
// (Enugu.html), the newest story in newsdata.js and the forum on
// IndividualEvent.html. Point this array at a feed when there is one; nothing
// else has to change.
//
// The unread mark is per tab (sessionStorage), so opening the card quiets the
// badge for that visit and a fresh visit shows it again.
(function () {
    if (window.self !== window.top) return;          // not inside the login modal
    if (document.getElementById('osip-alert-card')) return;

    var base = 'pages/';
    try {
        var src = (document.currentScript && document.currentScript.src) || '';
        if (src) base = src.slice(0, src.lastIndexOf('/') + 1);
    } catch (e) { /* keep the fallback */ }

    var ALERTS = [
        {
            kind: 'Opportunity',
            title: 'Benue Biomass-to-Power Plant is now published',
            when: '26 Aug 2026',
            href: base + 'detailedOppNew.html?id=2025-BIO-05'
        },
        {
            kind: 'State',
            title: 'Enugu State profile: three projects now listed',
            when: '08 Jul 2026',
            href: base + 'Enugu.html'
        },
        {
            kind: 'News',
            title: 'Govt upbeat on Nyerere Hydropower Project completion',
            when: '08 Sep 2026',
            href: base + 'NewsInDetail.html?id=nyerere-hydropower'
        },
        {
            kind: 'Event',
            title: 'Nigeria Renewable Energy Investment Forum 2027, Abuja',
            when: '15-17 Mar 2027',
            href: base + 'IndividualEvent.html'
        }
    ];

    var SEEN_KEY = 'osip_alerts_seen';
    // These mirror nav.js's tokens so the bell reads as part of the header.
    var GREEN = '#004225';
    var GREEN2 = '#0b6b45';
    var INK = '#13201b';
    var INK2 = '#3d4742';
    var INK3 = '#6b716c';
    var CARD = '#fbfaf7';
    var TINT = '#f1eee8';
    var LINE = '#e2ded5';
    var LINE2 = '#cfc9bd';
    var RED = '#d92d20';
    var RED2 = '#b42318';
    var SANS = "Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";

    function seen() {
        try { return window.sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
    }
    function markSeen() {
        try { window.sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* memory only */ }
    }

    // ---- styles -------------------------------------------------------------
    if (!document.getElementById('osip-alerts-style')) {
        var st = document.createElement('style');
        st.id = 'osip-alerts-style';
        st.textContent = [
            // the bell — a header icon button, sized like the search one but red,
            // to read as an alert. The bell rings (swings) while there is unread.
            '.osip-alert-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:0 0 auto;padding:0;border:1px solid ' + RED + ';border-radius:999px;background:' + CARD + ';color:' + RED + ';cursor:pointer;transition:background-color .3s ease,color .3s ease,border-color .3s ease}',
            '.osip-alert-btn:hover{background:' + RED + ';border-color:' + RED + ';color:#fff}',
            '.osip-alert-btn:focus-visible{outline:2px solid ' + RED2 + ';outline-offset:2px}',
            '.osip-alert-btn svg{display:block;transform-origin:50% 18%}',
            // rings only while there is something unread (the badge is showing)
            '.osip-alert-btn:has(.osip-alert-count:not([hidden])) svg{animation:osip-bell-ring 2.6s ease-in-out infinite}',
            '.osip-alert-btn[aria-expanded="true"] svg{animation:none}',
            '@keyframes osip-bell-ring{0%,60%,100%{transform:rotate(0)}5%{transform:rotate(15deg)}10%{transform:rotate(-13deg)}15%{transform:rotate(10deg)}20%{transform:rotate(-8deg)}25%{transform:rotate(5deg)}30%{transform:rotate(-3deg)}35%{transform:rotate(0)}}',
            // the badge pulses gently to match
            '.osip-alert-btn:has(.osip-alert-count:not([hidden])) .osip-alert-count{animation:osip-badge-pulse 2.6s ease-in-out infinite}',
            '@keyframes osip-badge-pulse{0%,100%{transform:scale(1)}45%{transform:scale(1)}50%{transform:scale(1.18)}55%{transform:scale(1)}}',
            // the mobile bell sits beside the burger; hidden once the desktop row shows
            '.osip-alert-btn--m{margin-left:.25rem}',
            '@media (min-width:72rem){.osip-alert-btn--m{display:none}}',
            // the number on it
            '.osip-alert-count{position:absolute;top:-4px;right:-4px;min-width:19px;height:19px;padding:0 5px;border-radius:999px;background:#d92d20;border:2px solid ' + CARD + ';color:#fff;font-size:10.5px;font-weight:600;line-height:15px;text-align:center;box-sizing:border-box;font-family:' + SANS + '}',
            '.osip-alert-count[hidden]{display:none}',
            // the card — drops down from the top-right corner, under the header
            '.osip-alert-card{position:fixed;top:70px;right:24px;z-index:65;width:340px;max-width:calc(100vw - 32px);background:' + CARD + ';border:1px solid ' + LINE + ';border-radius:20px;box-shadow:0 1px 2px rgba(19,32,27,.04),0 28px 60px -30px rgba(19,32,27,.45);padding:.375rem;transform-origin:top right;opacity:0;transform:translateY(-10px) scale(.985);transition:opacity .24s ease,transform .34s cubic-bezier(.16,1,.3,1);font-family:' + SANS + '}',
            '.osip-alert-card[hidden]{display:none}',
            '.osip-alert-card.is-open{opacity:1;transform:none}',
            '.osip-alert-head{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.75rem .5rem .625rem .875rem;margin:0 .125rem;border-bottom:1px solid ' + LINE + '}',
            '.osip-alert-head span{font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:' + GREEN2 + '}',
            '.osip-alert-close{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:999px;background:transparent;color:' + INK3 + ';cursor:pointer;transition:background-color .25s ease,color .25s ease}',
            '.osip-alert-close:hover{background:' + TINT + ';color:' + INK + '}',
            '.osip-alert-close:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:2px}',
            // one row per alert, parted by a hairline
            '.osip-alert-item{position:relative;display:block;padding:.6875rem 1.75rem .6875rem .875rem;border-radius:12px;text-decoration:none;transition:background-color .25s ease}',
            '.osip-alert-item:hover{background:' + TINT + '}',
            '.osip-alert-item + .osip-alert-item::before{content:"";position:absolute;top:0;left:.875rem;right:.875rem;height:1px;background:' + LINE + '}',
            '.osip-alert-item .k{display:block;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:' + GREEN2 + ';margin-bottom:3px}',
            '.osip-alert-item .k em{font-style:normal;color:' + INK3 + '}',
            '.osip-alert-item .t{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:15px;font-weight:400;line-height:1.35;color:' + INK2 + ';transition:color .25s ease}',
            '.osip-alert-item:hover .t{color:' + GREEN + '}',
            '.osip-alert-item .go{position:absolute;right:.875rem;top:50%;width:6px;height:6px;border-right:1.5px solid ' + GREEN2 + ';border-top:1.5px solid ' + GREEN2 + ';transform:translate(-4px,-50%) rotate(45deg);opacity:.35;transition:transform .3s ease,opacity .3s ease}',
            '.osip-alert-item:hover .go{transform:translate(0,-50%) rotate(45deg);opacity:.9}',
            '.osip-alert-all{display:flex;align-items:center;gap:.4375rem;margin:.125rem;padding:.6875rem .875rem .5rem;border-top:1px solid ' + LINE + ';font-size:12.5px;font-weight:500;color:' + GREEN + ';text-decoration:none}',
            '.osip-alert-all span{width:6px;height:6px;border-right:1.5px solid currentColor;border-top:1.5px solid currentColor;transform:translateX(-2px) rotate(45deg);opacity:.7;transition:transform .3s ease}',
            '.osip-alert-all:hover span{transform:translateX(1px) rotate(45deg)}',
            '.osip-alert-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
            // out of the way of the phone menu and of the search layer
            'body:has(.nesp-mnav.is-open) .osip-alert-card{opacity:0;pointer-events:none}',
            '@media (max-width:39.9375rem){.osip-alert-card{top:64px;right:16px}}',
            '@media (prefers-reduced-motion:reduce){.osip-alert-btn,.osip-alert-card,.osip-alert-item,.osip-alert-close,.osip-alert-all span,.osip-alert-item .go,.osip-alert-item .t{transition:none!important}.osip-alert-btn svg,.osip-alert-count{animation:none!important}}'
        ].join('\n');
        (document.head || document.documentElement).appendChild(st);
    }

    // ---- markup -------------------------------------------------------------
    var BELL = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>' +
        '<path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
    var CLOSE = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" ' +
        'stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

    function esc(t) {
        return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var rows = ALERTS.map(function (a) {
        return '<a class="osip-alert-item" href="' + esc(a.href) + '">' +
            '<span class="k">' + esc(a.kind) + ' <em>· ' + esc(a.when) + '</em></span>' +
            '<span class="t">' + esc(a.title) + '</span>' +
            '<span class="go" aria-hidden="true"></span></a>';
    }).join('');

    // The card lives on the body, once, positioned in the top-right corner.
    var card = document.createElement('div');
    card.className = 'osip-alert-card';
    card.id = 'osip-alert-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'false');
    card.setAttribute('aria-label', 'Alerts');
    card.hidden = true;
    card.innerHTML =
        '<div class="osip-alert-head"><span>Alerts</span>' +
        '<button type="button" class="osip-alert-close" aria-label="Close alerts">' + CLOSE + '</button></div>' +
        '<div class="osip-alert-list">' + rows + '</div>' +
        '<a class="osip-alert-all" href="' + base + 'Opportunities.html">View all opportunities<span aria-hidden="true"></span></a>';

    // A bell can appear in two slots (desktop actions, mobile bar); both drive
    // the one card. Track their badges together so opening quiets every one.
    var bells = [];
    function makeBell(modifier) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'osip-alert-btn' + (modifier ? ' ' + modifier : '');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'osip-alert-card');
        btn.innerHTML = BELL +
            '<span class="osip-alert-count" aria-hidden="true">' + ALERTS.length + '</span>' +
            '<span class="osip-alert-sr">Alerts</span>';
        return btn;
    }

    function badgesHidden(hidden) {
        bells.forEach(function (b) {
            var c = b.querySelector('.osip-alert-count');
            if (c) c.hidden = hidden;
            var unread = hidden ? 0 : ALERTS.length;
            var lbl = unread ? 'Alerts, ' + unread + ' unread' : 'Alerts';
            b.setAttribute('aria-label', lbl);
            b.setAttribute('title', lbl);
        });
    }

    function setOpen(open) {
        bells.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
        if (open) {
            card.hidden = false;
            window.requestAnimationFrame(function () {
                card.classList.add('is-open');
                var first = card.querySelector('.osip-alert-item');
                if (first) first.focus();
            });
            // Reading them is what clears the number, for this tab.
            markSeen();
            badgesHidden(true);
            return;
        }
        card.classList.remove('is-open');
        card.hidden = true;
    }

    function mount() {
        var header = document.querySelector('.nesp-header');
        if (!header) return;                             // header not rendered yet
        document.body.appendChild(card);

        // Desktop: in the action row, right after the search icon (or first).
        var actions = header.querySelector('.nesp-nav-actions');
        if (actions) {
            var deskBell = makeBell('');
            bells.push(deskBell);
            var searchBtn = actions.querySelector('.nesp-search-btn');
            if (searchBtn && searchBtn.nextSibling) actions.insertBefore(deskBell, searchBtn.nextSibling);
            else if (searchBtn) actions.appendChild(deskBell);
            else actions.insertBefore(deskBell, actions.firstChild);
        }

        // Phone: beside the burger, so it survives the collapsed action row.
        var toggle = header.querySelector('.nesp-nav-toggle');
        if (toggle && toggle.parentNode) {
            var mobBell = makeBell('osip-alert-btn--m');
            bells.push(mobBell);
            toggle.parentNode.insertBefore(mobBell, toggle);
        }

        if (!bells.length) return;                       // nowhere to hang it

        badgesHidden(seen());

        bells.forEach(function (b) {
            b.addEventListener('click', function (e) {
                e.stopPropagation();
                setOpen(card.hidden);
            });
        });
        card.querySelector('.osip-alert-close').addEventListener('click', function () {
            setOpen(false);
            if (bells[0]) bells[0].focus();
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.key === 'Esc') { setOpen(false); if (bells[0]) bells[0].focus(); }
        });
        document.addEventListener('keydown', function (e) {
            if ((e.key === 'Escape' || e.key === 'Esc') && !card.hidden) { setOpen(false); if (bells[0]) bells[0].focus(); }
        });
        document.addEventListener('click', function (e) {
            if (card.hidden) return;
            if (card.contains(e.target)) return;
            for (var i = 0; i < bells.length; i++) { if (bells[i].contains(e.target)) return; }
            setOpen(false);
        });
    }

    // nav.js renders the header synchronously before it loads this file, so the
    // header is normally in the DOM already; the retries cover a slow paint.
    if (document.querySelector('.nesp-header')) mount();
    else if (document.readyState !== 'loading') window.requestAnimationFrame(mount);
    else document.addEventListener('DOMContentLoaded', mount);
})();
