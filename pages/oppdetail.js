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
    /* UX-FRM-07: an id we do not list is an error. Without it the page used to show
       the default project under the wrong address. A bare link (no id) still lands on
       the default project. */
    if (wanted && !opp) {
        document.addEventListener('DOMContentLoaded', function () {
            var wrapEl = document.getElementById('page-wrapper');
            var mainEl = wrapEl ? wrapEl.querySelector('main') : document.querySelector('main');
            if (!mainEl) return;
            mainEl.textContent = '';
            if (window.OSIPState && window.OSIPState.error) {
                window.OSIPState.error(mainEl, {
                    title: 'That opportunity is not listed',
                    note: 'The address asked for a project that is not on the platform. It may have closed, or the link may be mistyped.',
                    retry: false
                });
                var back = document.createElement('p');
                back.className = 'osip-state';
                back.innerHTML = '<a class="osip-state-btn" href="Opportunities.html">All opportunities</a>';
                mainEl.appendChild(back);
            } else {
                mainEl.innerHTML = '<h1>That opportunity is not listed</h1>' +
                    '<p><a href="Opportunities.html">Back to all opportunities</a></p>';
            }
            document.title = 'Opportunity not found | OSIP, One-Stop Investment Platform';
        });
        return;
    }

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
    document.title = opp.title + ' | OSIP, One-Stop Investment Platform';

    /* GOPA-OPP-03: who owns this project, whether its information has been
       cleared, and how to reach the agency without an account. The clearance
       list lives in oppdata.js and is illustrative - see the note there. */
    (function () {
        var cleared = (window.OSIP_OPPORTUNITY_CLEARED || []).indexOf(opp.id) > -1;
        var agency = opp.ministry || 'the responsible agency';
        setText(document.getElementById('agency-name'), agency);
        var mark = document.getElementById('agency-clear');
        if (mark) {
            mark.setAttribute('data-clear', cleared ? 'cleared' : 'pending');
            var icon = mark.querySelector('.material-symbols-outlined');
            var words = mark.querySelector('span:last-child');
            if (icon) icon.textContent = cleared ? 'verified_user' : 'hourglass_empty';
            if (words) words.textContent = cleared ? 'Cleared by ' + agency : 'Clearance pending';
        }
        var go = document.getElementById('agency-contact');
        if (go) go.setAttribute('aria-label', 'Contact ' + agency + ' about ' + opp.title);
    })();
    setText(one(wrap, 'nav[aria-label="Breadcrumb"] li:last-child'), opp.title);

    /* ---- Hero ------------------------------------------------------------------ */
    var hero = one(main, ':scope > section');
    setText(one(hero, 'span.uppercase.tracking-widest'), 'Project ID: ' + opp.id);
    var h1 = one(hero, 'h1');
    setOwnText(h1, opp.title);
    setText(one(h1 ? h1.nextElementSibling : null, 'span'), opp.updated);

    /* ---- Tracker: two axes, one component ----------------------------------------
       A project has a lifecycle stage and a readiness tag, and they answer
       different questions:

         stage      where the project itself has got to - conceptualisation,
                    development, implementation, completed. The prototype's own
                    four-step lifecycle.
         readiness  what the project needs from an investor right now - the
                    client's six tags (Concept, Under preparation, Seeking
                    investor interest, Tender / procurement, Financing sought,
                    Requires validation), from Change Tracker OPP-02 and Change
                    Log D10, in the order the Change Log lists them.

       While the design is being reviewed both are on the table, so each record
       says which axis its page shows: `track: 'readiness'` in oppdata.js picks
       the six tags, anything else (the default) keeps the four stages. The card
       for that project on Opportunities.html carries the same axis, and the
       filter rail offers both.

       Everything below is written against the chosen list, so the track is as
       long as the list is: four nodes or six, desktop rail and phone rail alike. */
    var STAGES = [
        { name: 'Under Conceptualisation', icon: 'lightbulb' },
        { name: 'Under Development', icon: 'gavel' },
        { name: 'Under Implementation', icon: 'engineering' },
        { name: 'Completed', icon: 'flag' }
    ];
    var READINESS = [
        { name: 'Concept', icon: 'lightbulb' },
        { name: 'Under preparation', icon: 'draw' },
        { name: 'Seeking investor interest', icon: 'handshake' },
        { name: 'Tender / procurement', icon: 'gavel' },
        { name: 'Financing sought', icon: 'payments' },
        { name: 'Requires validation', icon: 'fact_check' }
    ];

    function tagKey(name) { return String(name || '').toLowerCase().replace(/\s*\/\s*/g, '/').trim(); }

    var onReadiness = tagKey(opp.track) === 'readiness';
    var TRACK = onReadiness ? READINESS : STAGES;
    var LAST = TRACK.length - 1;

    var idx = 0;
    if (onReadiness) {
        READINESS.forEach(function (r, i) { if (tagKey(r.name) === tagKey(opp.status)) idx = i; });
    } else {
        idx = Math.min(TRACK.length, Math.max(1, opp.stage | 0)) - 1;
    }

    /* On the lifecycle, the last stage is Completed: reaching it is finishing it.
       On the readiness list nothing is "finished" - a tag is where the project
       stands - so the tag it is on is the current one and no more. */
    function stateOf(i) {
        if (i < idx || (!onReadiness && i === idx && idx === LAST)) return 'done';
        return i === idx ? 'current' : 'upcoming';
    }

    /* The lifecycle ticks off what is behind it and names what is ahead; the
       readiness list fills the tags passed and leaves the wording to the tag. */
    function doneIcon(step) { return onReadiness ? step.icon : 'check'; }
    function caption(state) {
        if (state === 'current') return 'Active';
        if (onReadiness) return '';
        return state === 'done' ? 'Done' : 'Upcoming';
    }
    var CURRENT_LABEL = onReadiness ? 'Current tag' : 'Current Stage';

    /* A name too long for one line breaks after its first word on the desktop
       rail, where each node is only a fraction of the card wide. */
    function twoLines(name) {
        var i = name.indexOf(' ');
        return i < 0 || onReadiness ? esc(name) : esc(name.slice(0, i)) + '<br>' + esc(name.slice(i + 1));
    }

    function desktopNode(i) {
        var step = TRACK[i];
        var st = stateOf(i);
        var cap = caption(st);
        if (st === 'done') {
            return '<div class="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center ring-4 ring-white shadow-md">' +
                '<span class="material-symbols-outlined text-white text-[18px]">' + doneIcon(step) + '</span></div>' +
                '<p class="mt-3 text-[11px] font-bold text-brand-green text-center leading-tight px-1">' + twoLines(step.name) + '</p>' +
                (cap ? '<span class="mt-1 text-[10px] font-bold text-brand-green/50 uppercase tracking-wider">' + cap + '</span>' : '');
        }
        if (st === 'current') {
            return '<span class="osip-current-pill absolute -top-9 bg-brand-gold text-brand-green text-[9px] font-extrabold uppercase tracking-[0.1em] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">' + CURRENT_LABEL + '</span>' +
                '<div class="osip-node-current w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center ring-4 ring-white shadow-lg">' +
                '<span class="material-symbols-outlined text-brand-green text-[18px]">' + step.icon + '</span></div>' +
                '<p class="mt-3 text-[11px] font-extrabold text-brand-green text-center leading-tight px-1">' + twoLines(step.name) + '</p>' +
                '<span class="mt-1 text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">' + cap + '</span>';
        }
        return '<div class="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white">' +
            '<span class="material-symbols-outlined text-gray-300 text-[18px]">' + step.icon + '</span></div>' +
            '<p class="mt-3 text-[11px] font-bold text-gray-400 text-center leading-tight px-1">' + twoLines(step.name) + '</p>' +
            (cap ? '<span class="mt-1 text-[10px] font-bold text-gray-300 uppercase tracking-wider">' + cap + '</span>' : '');
    }

    function mobileNode(i) {
        var step = TRACK[i];
        var st = stateOf(i);
        var cap = caption(st);
        if (st === 'done') {
            return '<div class="relative z-10 w-9 h-9 rounded-full bg-brand-green flex items-center justify-center ring-4 ring-white shadow-md flex-shrink-0">' +
                '<span class="material-symbols-outlined text-white text-[20px]">' + doneIcon(step) + '</span></div>' +
                '<div class="pt-1 min-w-0"><p class="text-sm font-bold text-brand-green leading-tight">' + esc(step.name) + '</p>' +
                (cap ? '<span class="mt-1 inline-block text-[10px] font-bold text-brand-green/50 uppercase tracking-wider">' + cap + '</span>' : '') +
                '</div>';
        }
        if (st === 'current') {
            return '<div class="osip-node-current relative z-10 w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center ring-4 ring-white shadow-lg flex-shrink-0">' +
                '<span class="material-symbols-outlined text-brand-green text-[20px]">' + step.icon + '</span></div>' +
                '<div class="pt-0.5 min-w-0"><span class="inline-flex items-center gap-1 mb-1 bg-brand-gold text-brand-green text-[9px] font-extrabold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md shadow-sm">' + CURRENT_LABEL + '</span>' +
                '<p class="text-sm font-extrabold text-brand-green leading-tight">' + esc(step.name) + '</p>' +
                '<span class="mt-1 inline-block text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">' + cap + '</span></div>';
        }
        return '<div class="relative z-10 w-9 h-9 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center ring-4 ring-white flex-shrink-0">' +
            '<span class="material-symbols-outlined text-gray-300 text-[20px]">' + step.icon + '</span></div>' +
            '<div class="pt-1 min-w-0"><p class="text-sm font-bold text-gray-400 leading-tight">' + esc(step.name) + '</p>' +
            (cap ? '<span class="mt-1 inline-block text-[10px] font-bold text-gray-300 uppercase tracking-wider">' + cap + '</span>' : '') +
            '</div>';
    }

    /* The markup ships four nodes; a readiness page needs six. The track is built
       from the list rather than the list cut to fit the track. */
    function fitNodes(parent, existing, make) {
        var nodes = existing.slice();
        while (nodes.length > TRACK.length) { parent.removeChild(nodes.pop()); }
        while (nodes.length < TRACK.length) { nodes.push(parent.appendChild(make())); }
        return nodes;
    }

    var fill = one(hero, '.osip-progress-fill');
    var tracker = fill ? fill.closest('.rounded-xl') : null;
    if (tracker) {
        var head = tracker.firstElementChild;
        /* The pill says where the project is on the axis this page shows, and the
           count says which step of how many that is. */
        setOwnText(head ? head.firstElementChild : null,
            onReadiness ? (opp.status || TRACK[idx].name) : TRACK[idx].name);
        var count = one(head, '.text-right');
        setText(one(count, ':scope > span'), (onReadiness ? 'Tag ' : 'Stage ') + (idx + 1));
        setText(one(count, ':scope > span:nth-of-type(2)'), ' / ' + TRACK.length);
        setText(one(count, ':scope > p'), onReadiness ? 'Readiness' : (idx === LAST ? 'Completed' : 'In Progress'));

        /* Horizontal rail: it runs between the first and last node's centres, so
           both ends move with the number of steps. */
        var pitch = 100 / TRACK.length;
        var edge = pitch / 2;
        var track = fill.parentElement;
        var rail = one(track, ':scope > .bg-gray-200');
        if (rail) { rail.style.left = edge + '%'; rail.style.right = edge + '%'; }
        fill.style.left = edge + '%';
        fill.style.width = (idx * pitch) + '%';

        fitNodes(track, every(track, ':scope > .relative.z-10'), function () {
            var d = document.createElement('div');
            d.className = 'relative z-10 flex flex-col items-center';
            return d;
        }).forEach(function (node, i) {
            node.style.width = pitch + '%';
            node.innerHTML = desktopNode(i);
        });

        /* Vertical rail, phone width. */
        var steps = one(tracker, 'ol');
        var fillV = one(steps, '.osip-progress-fill-v');
        if (fillV) fillV.style.height = idx === 0 ? '0px' : 'calc((100% - 32px) / ' + LAST + ' * ' + idx + ')';
        fitNodes(steps, every(steps, ':scope > li'), function () {
            var li = document.createElement('li');
            li.className = 'relative flex items-start gap-4';
            return li;
        }).forEach(function (li, i) {
            li.innerHTML = mobileNode(i);
        });
    }

    /* ---- Project Overview and highlight tiles ---------------------------------- */
    var overview = one(main, ':scope > section > div.space-y-4');
    if (overview && opp.overview) {
        overview.innerHTML = opp.overview.map(function (p, i) {
            var lead = i === 0 && opp.lead !== false ? '<span class="font-semibold text-brand-green">' + esc(opp.title) + '</span> ' : '';
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

    /* ---- Investment details block (item 33) -----------------------------------
       Standard investor terms per project. Qualitative fields come from the
       record's `terms`; the minimum investment reuses the members-only ticket,
       the financing status reuses the project's own status, and the currency
       falls back to whatever the cost is quoted in. */
    (function () {
        var t = opp.terms || {};
        var costCur = (String(opp.cost || '').match(/^[A-Za-z$]+/) || [''])[0];
        var vals = {
            min: t.min || (opp.gated && opp.gated[2]) || '—',
            type: t.type || 'Equity and/or debt',
            share: t.share || '—',
            financing: t.financing || opp.status || '—',
            deadline: t.deadline || 'Rolling — register to be notified',
            currency: t.currency || costCur || '—',
            eligibility: t.eligibility || 'Open to local and foreign investors; NIPC registration applies'
        };
        every(main, '[data-purpose="invest-details"] [data-inv]').forEach(function (el) {
            var k = el.getAttribute('data-inv');
            if (vals[k] != null) el.textContent = vals[k];
        });
    })();

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

        /* UX-LNK-07: each row opens the sample file for its slot - the investment case,
           the study, the environmental summary, the terms - because no project's real
           paperwork is published yet. The line under the title states that file's own
           size; it used to state an invented size and page count for a link that went
           nowhere. */
        var SAMPLES = [
            ['docs/sample-project-investment-memorandum.pdf', '2.0 KB'],
            ['docs/sample-project-technical-study.pdf', '2.0 KB'],
            ['docs/sample-project-environmental-summary.pdf', '2.0 KB'],
            ['docs/sample-project-term-sheet.pdf', '2.0 KB']
        ];
        every(blocks[3], 'a[download]').forEach(function (a, i) {
            var doc = opp.docs ? opp.docs[i] : null;
            var sample = SAMPLES[i];
            if (!doc || !sample) return;
            var ps = every(a, 'p');
            a.setAttribute('href', sample[0]);
            a.setAttribute('download', opp.file + '-' + doc[0].replace(/[^A-Za-z0-9]+/g, '-') + '.pdf');
            setText(ps[0], doc[0]);
            setText(ps[1], 'PDF \u00b7 ' + sample[1] + ' \u00b7 sample');
        });
    }

    /* ---- Contact card (blurred until sign-in) ---------------------------------- */
    var contact = one(wrap, '.grid > aside .gated-content');
    if (contact && opp.contact) {
        var rows = every(contact, ':scope > div');
        setText(every(rows[0], 'p')[1], opp.contact[0]);
        setText(every(rows[1], 'p')[1], opp.contact[1]);
        // UX-TRU (item 78): only render a tel:/mailto when the value is a real
        // phone/email. Prototype records carry "Provided to registered investors"
        // rather than a fabricated number, so those show as plain text.
        var tel = one(rows[2], 'a');
        if (tel) {
            var phone = opp.contact[2] || '';
            if (/\d/.test(phone)) { tel.textContent = phone; tel.setAttribute('href', 'tel:' + phone.replace(/[^+\d]/g, '')); }
            else { tel.textContent = phone; tel.removeAttribute('href'); tel.removeAttribute('class'); }
        }
        var mail = one(rows[3], 'a');
        if (mail) {
            var email = opp.contact[3] || '';
            if (email.indexOf('@') > -1) { mail.textContent = email; mail.setAttribute('href', 'mailto:' + email); }
            else { mail.textContent = email; mail.removeAttribute('href'); mail.removeAttribute('class'); }
        }
    }

    /* ---- Where to go next: this project's sector and state --------------------- */
    var SECTOR_PAGES = {
        'Solar': 'DetailedSector.html', 'Wind': 'Wind.html', 'Storage': 'Storage.html',
        'Small Hydro': 'SmallHydro.html', 'Bioenergy': 'Bioenergy.html',
        'Clean Cooking': 'CleanCooking.html', 'Green Mobility': 'GreenMobility.html',
        'Green Hydrogen': 'GreenHydrogen.html', 'Energy Efficiency': 'EnergyEfficiency.html',
        'Agriculture PUE': 'AgriculturePUE.html'
    };

    var nextSector = one(wrap, '[data-purpose="next-sector"]');
    if (nextSector) {
        nextSector.setAttribute('href', SECTOR_PAGES[opp.sector] || 'Sector.html');
        setText(one(nextSector, '.osip-next-t'), opp.sector + ' sector guide');
    }

    /* GOPA-OPP-02: the row goes to this project's own sector, at the section that
       holds the incentives - not to the top of the sector guide, and not to a copy
       of the incentives on this page. A project in a sector the platform does not
       publish a page for has nowhere to send anybody, so the row goes rather than
       pointing at a hub that does not answer the question. */
    var nextFinance = one(wrap, '[data-purpose="next-finance"]');
    if (nextFinance) {
        var sectorPage = SECTOR_PAGES[opp.sector];
        if (sectorPage) {
            nextFinance.setAttribute('href', sectorPage + '#finance');
            setText(one(nextFinance, '.osip-next-t'), opp.sector + ' finance and incentives');
        } else {
            var row = nextFinance.closest('[data-purpose="next-finance-row"]');
            if (row && row.parentNode) row.parentNode.removeChild(row);
        }
    }

    var nextState = one(wrap, '[data-purpose="next-state"]');
    if (nextState) {
        var st = opp.state || '';
        var slug = st.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        /* Enugu is the one state with a profile of its own; a multi-state project
           has no single one to send anybody to, so it goes to the hub. */
        if (/multi/i.test(st)) {
            nextState.setAttribute('href', 'States.html');
            setText(one(nextState, '.osip-next-t'), 'Invest by state');
        } else {
            nextState.setAttribute('href', st === 'Enugu' ? 'Enugu.html' : 'States.html#' + slug);
            setText(one(nextState, '.osip-next-t'), st + ' state profile');
        }
    }

    document.documentElement.setAttribute('data-opp-id', opp.id);
})();
