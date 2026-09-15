/* =============================================================================
   oppdetail.js - one detail page for every listed opportunity

   detailedOppNew.html is written with Katsina Wind Farm Phase I as its content.
   This script reads ?id= from the address (detailedOppNew.html?id=2025-HYD-01),
   finds that project in oppdata.js and puts its content into the page: title and
   ID, stage tracker, overview and highlights, project details, members-only
   figures, data room and contact. The cards on Opportunities.html, homepage.html
   and InvestorMatch.html link here with their own ID.

   With no id, or one that is not listed, the page shows the default project
   (OSIP_OPPORTUNITY_DEFAULT), so a bare link still lands on a complete page.

   Loaded straight after the page content and before the page's own scripts
   (lightbox, video, sign-in, motion layer), so those see the filled-in content
   exactly as if it had been written into the HTML.
   ============================================================================= */
(function () {
    'use strict';

    var list = window.OSIP_OPPORTUNITIES;
    if (!list || !list.length) return;

    var wanted = '';
    try { wanted = (new URLSearchParams(location.search).get('id') || '').trim().toUpperCase(); } catch (e) { }
    var opp = null;
    var fallback = null;
    list.forEach(function (o) {
        if (o.id === wanted) opp = o;
        if (o.id === window.OSIP_OPPORTUNITY_DEFAULT) fallback = o;
    });
    opp = opp || fallback || list[0];

    var wrap = document.getElementById('page-wrapper');
    var main = wrap ? wrap.querySelector('main') : null;
    if (!main) return;

    function one(root, sel) { return root ? root.querySelector(sel) : null; }
    function every(root, sel) { return root ? Array.prototype.slice.call(root.querySelectorAll(sel)) : []; }
    function setText(el, value) { if (el && value != null) el.textContent = value; }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    /* Replace an element's own words but keep its child elements (the title's
       rule, the status pill's pulsing dot). */
    function setOwnText(el, value) {
        if (!el) return;
        Array.prototype.slice.call(el.childNodes).forEach(function (n) { if (n.nodeType === 3) el.removeChild(n); });
        el.appendChild(document.createTextNode(' ' + value + ' '));
    }

    /* ---- Page title and breadcrumb --------------------------------------------- */
    document.title = opp.title + ' | One-Stop Investment Platform (OSIP)';
    setText(one(wrap, 'nav[aria-label="Breadcrumb"] li:last-child'), opp.title);

    /* ---- Hero ------------------------------------------------------------------ */
    var hero = one(main, ':scope > section');
    setText(one(hero, 'span.uppercase.tracking-widest'), 'Project ID: ' + opp.id);
    var h1 = one(hero, 'h1');
    setOwnText(h1, opp.title);
    setText(one(h1 ? h1.nextElementSibling : null, 'span'), opp.updated);

    /* ---- Stage tracker: rebuilt from the stage number, in the page's own markup -- */
    var STAGES = [
        { name: 'Under Conceptualization', icon: 'lightbulb' },
        { name: 'Under Development', icon: 'gavel' },
        { name: 'Under Implementation', icon: 'engineering' },
        { name: 'Completed', icon: 'flag' }
    ];
    var stage = Math.min(4, Math.max(1, opp.stage | 0));

    function stateOf(i) {
        var cur = stage - 1;
        if (i < cur || (i === cur && stage === 4)) return 'done';
        return i === cur ? 'current' : 'upcoming';
    }

    function twoLines(name) {
        var i = name.indexOf(' ');
        return i < 0 ? name : name.slice(0, i) + '<br>' + name.slice(i + 1);
    }

    function desktopNode(i) {
        var s = STAGES[i];
        var st = stateOf(i);
        if (st === 'done') {
            return '<div class="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center ring-4 ring-white shadow-md">' +
                '<span class="material-symbols-outlined text-white text-[18px]">check</span></div>' +
                '<p class="mt-3 text-[11px] font-bold text-brand-green text-center leading-tight px-1">' + twoLines(s.name) + '</p>' +
                '<span class="mt-1 text-[10px] font-bold text-brand-green/50 uppercase tracking-wider">Done</span>';
        }
        if (st === 'current') {
            return '<span class="osip-current-pill absolute -top-9 bg-brand-gold text-brand-green text-[9px] font-extrabold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">Current Stage</span>' +
                '<div class="osip-node-current w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center ring-4 ring-white shadow-lg">' +
                '<span class="material-symbols-outlined text-brand-green text-[18px]">' + s.icon + '</span></div>' +
                '<p class="mt-3 text-[11px] font-extrabold text-brand-green text-center leading-tight px-1">' + twoLines(s.name) + '</p>' +
                '<span class="mt-1 text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">Active</span>';
        }
        return '<div class="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">' +
            '<span class="material-symbols-outlined text-gray-300 text-[18px]">' + s.icon + '</span></div>' +
            '<p class="mt-3 text-[11px] font-bold text-gray-400 text-center leading-tight px-1">' + twoLines(s.name) + '</p>' +
            '<span class="mt-1 text-[10px] font-bold text-gray-300 uppercase tracking-wider">Upcoming</span>';
    }

    function mobileNode(i) {
        var s = STAGES[i];
        var st = stateOf(i);
        if (st === 'done') {
            return '<div class="relative z-10 w-9 h-9 rounded-full bg-brand-green flex items-center justify-center ring-4 ring-white shadow-md flex-shrink-0">' +
                '<span class="material-symbols-outlined text-white text-[20px]">check</span></div>' +
                '<div class="pt-1 min-w-0"><p class="text-sm font-bold text-brand-green leading-tight">' + s.name + '</p>' +
                '<span class="mt-1 inline-block text-[10px] font-bold text-brand-green/50 uppercase tracking-wider">Done</span></div>';
        }
        if (st === 'current') {
            return '<div class="osip-node-current relative z-10 w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center ring-4 ring-white shadow-lg flex-shrink-0">' +
                '<span class="material-symbols-outlined text-brand-green text-[20px]">' + s.icon + '</span></div>' +
                '<div class="pt-0.5 min-w-0"><span class="inline-flex items-center gap-1 mb-1 bg-brand-gold text-brand-green text-[9px] font-extrabold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md shadow-sm">Current Stage</span>' +
                '<p class="text-sm font-extrabold text-brand-green leading-tight">' + s.name + '</p>' +
                '<span class="mt-1 inline-block text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">Active</span></div>';
        }
        return '<div class="relative z-10 w-9 h-9 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white flex-shrink-0">' +
            '<span class="material-symbols-outlined text-gray-300 text-[20px]">' + s.icon + '</span></div>' +
            '<div class="pt-1 min-w-0"><p class="text-sm font-bold text-gray-400 leading-tight">' + s.name + '</p>' +
            '<span class="mt-1 inline-block text-[10px] font-bold text-gray-300 uppercase tracking-wider">Upcoming</span></div>';
    }

    var fill = one(hero, '.osip-progress-fill');
    var tracker = fill ? fill.closest('.rounded-xl') : null;
    if (tracker) {
        var head = tracker.firstElementChild;
        setOwnText(head ? head.firstElementChild : null, STAGES[stage - 1].name);
        var count = one(head, '.text-right');
        setText(one(count, ':scope > span'), 'Stage ' + stage);
        setText(one(count, ':scope > p'), stage === 4 ? 'Completed' : 'In Progress');

        fill.style.width = (stage - 1) * 25 + '%';
        every(fill.parentElement, ':scope > .relative.z-10').forEach(function (node, i) {
            node.innerHTML = desktopNode(i);
        });

        var steps = one(tracker, 'ol');
        var fillV = one(steps, '.osip-progress-fill-v');
        if (fillV) fillV.style.height = stage === 1 ? '0px' : 'calc((100% - 32px) / 3 * ' + (stage - 1) + ')';
        every(steps, ':scope > li').forEach(function (li, i) {
            li.innerHTML = mobileNode(i);
        });
    }

    /* ---- Project Overview and highlight tiles ---------------------------------- */
    var overview = one(main, ':scope > section > div.space-y-4');
    if (overview && opp.overview) {
        overview.innerHTML = opp.overview.map(function (p, i) {
            var lead = i === 0 ? '<span class="font-semibold text-brand-green">' + esc(opp.title) + '</span> ' : '';
            return '<p>' + lead + p + '</p>';
        }).join('');
    }
    var tiles = every(overview ? overview.parentElement : null, 'div.rounded-lg.bg-brand-sidebar.text-center');
    (opp.highlights || []).forEach(function (h, i) {
        var tile = tiles[i];
        if (!tile) return;
        var ps = every(tile, 'p');
        setText(one(tile, '.material-symbols-outlined'), h[0]);
        setText(ps[0], h[1]);
        setText(ps[1], h[2]);
    });

    /* ---- Project details grid and total cost ----------------------------------- */
    var details = [opp.sector, opp.state, opp.start, opp.end, opp.promoter, opp.status, opp.ministry];
    every(main, '[data-purpose="meta-item"] p').forEach(function (p, i) { setText(p, details[i]); });
    setText(one(main, 'p.text-2xl .text-brand-accent'), opp.cost);

    /* ---- Members-only figures (blurred until sign-in) -------------------------- */
    every(main, '.gated-content .grid > div').forEach(function (tile, i) {
        setText(every(tile, 'p')[1], opp.gated ? opp.gated[i] : null);
    });

    /* ---- Investor data room: brief, imagery, walkthrough, documents ----------- */
    var members = document.getElementById('members-section');
    if (members) {
        var blocks = every(members, ':scope > div');

        var brief = one(blocks[0], 'p');
        if (brief && opp.brief) brief.innerHTML = opp.brief;

        every(blocks[1], 'button[data-lightbox-src]').forEach(function (btn, i) {
            var image = opp.images ? opp.images[i] : null;
            if (!image) return;
            var base = 'https://picsum.photos/seed/' + encodeURIComponent(image[1]);
            btn.setAttribute('aria-label', 'Open image: ' + image[0]);
            btn.setAttribute('data-lightbox-src', base + '/1600/1200');
            btn.setAttribute('data-caption', image[0]);
            var img = one(btn, 'img');
            if (img) { img.src = base + '/800/600'; img.alt = image[0]; }
        });

        var facade = one(blocks[2], '.video-facade');
        if (facade && opp.video) {
            var thumb = one(facade, 'img');
            if (thumb) thumb.src = 'https://picsum.photos/seed/' + encodeURIComponent(opp.video[1]) + '/1600/900';
            setText(one(facade, '.facade-cover > span:last-child > span:first-child'), opp.video[0]);
        }

        every(blocks[3], 'a[download]').forEach(function (a, i) {
            var doc = opp.docs ? opp.docs[i] : null;
            if (!doc) return;
            var ps = every(a, 'p');
            a.setAttribute('download', opp.file + '-' + doc[0].replace(/[^A-Za-z0-9]+/g, '-') + '.pdf');
            setText(ps[0], doc[0]);
            setText(ps[1], 'PDF · ' + doc[1] + ' MB · ' + doc[2] + ' pages');
        });
    }

    /* ---- Contact card (blurred until sign-in) ---------------------------------- */
    var contact = one(wrap, '.grid > aside .gated-content');
    if (contact && opp.contact) {
        var rows = every(contact, ':scope > div');
        setText(every(rows[0], 'p')[1], opp.contact[0]);
        setText(every(rows[1], 'p')[1], opp.contact[1]);
        var tel = one(rows[2], 'a');
        if (tel) { tel.textContent = opp.contact[2]; tel.setAttribute('href', 'tel:' + opp.contact[2].replace(/[^+\d]/g, '')); }
        var mail = one(rows[3], 'a');
        if (mail) { mail.textContent = opp.contact[3]; mail.setAttribute('href', 'mailto:' + opp.contact[3]); }
    }

    document.documentElement.setAttribute('data-opp-id', opp.id);
})();
