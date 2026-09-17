/* =============================================================================
   Saved opportunities (16 Sep 2026)

   Two halves of one feature, kept in one file because they share a store:

     1. the "Save opportunity" button on an opportunity detail page
        (pages/detailedOppNew.html), mounted on any [data-save-opp] element;
     2. the shortlist itself, rendered into #osip-saved-list on the profile page
        (pages/AboutMe.html): three figures read off the shortlist, then one line
        per project.

   There is no account table to write to yet, so a save lives in this browser's
   localStorage until there is one - the client's own change log treats an
   investor dashboard as Phase 2 (D9), and this is the smallest version of it.
   The store is an implementation detail and the page says nothing about it:
   where a save is kept is about to change, and it was never the reader's
   problem.
   Private-mode browsers can refuse storage outright; every read and write is
   guarded, and the button still works for the length of the visit.

   Follows the injected-component pattern of glossary.js / videofacade.js: its
   own CSS, a window guard so a double load is a no-op, and no dependency on the
   host page's Tailwind.

   The shortlist used to repeat the full Active Opportunities card from
   pages/Opportunities.html. Nine of those cards is the listing page again, on a
   page whose job is to say what this account holds, so it now reads as a
   dashboard does: the totals first, then the projects as lines that link
   through. Everything a line shows comes from oppdata.js.
   ========================================================================== */
(function () {
    'use strict';
    if (window.__osipOppSave) return;
    window.__osipOppSave = true;

    var KEY = 'osip_saved_opportunities';

    /* ---- store ------------------------------------------------------------- */
    /* Memory mirrors the store so a browser that refuses localStorage still
       behaves normally until the tab closes. */
    var memory = null;

    function read() {
        if (memory) return memory;
        var raw = null;
        try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
        var list = [];
        if (raw) {
            try {
                var parsed = JSON.parse(raw);
                if (Object.prototype.toString.call(parsed) === '[object Array]') {
                    list = parsed.filter(function (row) {
                        return row && typeof row.id === 'string';
                    });
                }
            } catch (e) { list = []; }
        }
        memory = list;
        return list;
    }

    function write(list) {
        memory = list;
        try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* session only */ }
        announce();
    }

    var listeners = [];

    function announce() {
        listeners.forEach(function (fn) {
            try { fn(read()); } catch (e) { /* one bad listener must not stop the rest */ }
        });
    }

    function has(id) {
        return read().some(function (row) { return row.id === id; });
    }

    function add(id) {
        if (!id || has(id)) return false;
        var list = read().slice();
        list.push({ id: id, saved: new Date().toISOString() });
        write(list);
        return true;
    }

    function remove(id) {
        var list = read().filter(function (row) { return row.id !== id; });
        if (list.length === read().length) return false;
        write(list);
        return true;
    }

    var API = {
        ids: function () { return read().map(function (row) { return row.id; }); },
        list: function () { return read().slice(); },
        has: has,
        add: add,
        remove: remove,
        toggle: function (id) { return has(id) ? (remove(id), false) : (add(id), true); },
        count: function () { return read().length; },
        onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); }
    };
    window.OSIPSaved = API;

    /* another tab saving something keeps this one in step */
    window.addEventListener('storage', function (e) {
        if (e.key && e.key !== KEY) return;
        memory = null;
        announce();
    });

    /* ---- CSS --------------------------------------------------------------- */
    function css(text, id) {
        if (document.getElementById(id)) return;
        var tag = document.createElement('style');
        tag.id = id;
        tag.textContent = text;
        (document.head || document.documentElement).appendChild(tag);
    }

    var BUTTON_CSS = [
        '.osip-save-btn{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:10px 18px;',
        'border:1px solid var(--rd-line-2,#cfc9bd);border-radius:999px;background:transparent;',
        'color:var(--rd-green,#004225);font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:500;',
        'line-height:1.2;letter-spacing:.01em;cursor:pointer;white-space:nowrap;',
        'transition:background-color .3s ease,border-color .3s ease,color .3s ease;}',
        '.osip-save-btn:hover{border-color:var(--rd-green,#004225);background:rgba(0,66,37,.06);}',
        '.osip-save-btn:focus-visible{outline:2px solid var(--rd-green-2,#0b6b45);outline-offset:3px;}',
        '.osip-save-btn .material-symbols-outlined{font-size:19px;}',
        /* saved reads as a state, not a second action */
        '.osip-save-btn[aria-pressed="true"]{border-color:var(--rd-green,#004225);background:var(--rd-green,#004225);color:#fff;}',
        '.osip-save-btn[aria-pressed="true"]:hover{background:var(--rd-green-2,#0b6b45);}',
        '.osip-save-note{margin:8px 0 0;font-family:Inter,system-ui,sans-serif;font-size:11.5px;line-height:1.5;',
        'color:var(--rd-ink-3,#6b716c);text-align:right;}',
        '.osip-save-note a{color:var(--rd-green,#004225);text-decoration:underline;',
        'text-decoration-color:rgba(217,165,32,.7);text-underline-offset:3px;}',
        '.osip-save-note a:hover{color:var(--rd-green-2,#0b6b45);}',
        '@media (max-width:639px){.osip-save-note{text-align:left;}}'
    ].join('');

    var LIST_CSS = [
        /* the three figures */
        '.osip-saved-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin:22px 0 0;',
        'background:var(--rd-line,#e2ded5);border:1px solid var(--rd-line,#e2ded5);border-radius:16px;overflow:hidden;}',
        '.osip-stat{padding:18px 20px;background:var(--rd-card,#fbfaf7);}',
        '.osip-stat-value{display:block;font-family:var(--rd-serif,Georgia,serif);font-size:30px;line-height:1.05;',
        'font-weight:400;letter-spacing:-.02em;color:var(--rd-ink,#13201b);font-variant-numeric:tabular-nums;}',
        '.osip-stat-label{display:block;margin-top:8px;font-family:Inter,system-ui,sans-serif;font-size:10.5px;',
        'font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--rd-green-2,#0b6b45);}',
        '@media (max-width:600px){.osip-stat{padding:13px 10px;}.osip-stat-value{font-size:18px;}',
        '.osip-stat-label{font-size:9.5px;letter-spacing:.12em;}}',
        /* one line per saved project */
        '.osip-saved-rows{list-style:none;margin:26px 0 0;padding:0;}',
        '.osip-saved-row{display:flex;align-items:center;gap:16px;padding:14px 4px;',
        'border-bottom:1px solid var(--rd-line,#e2ded5);transition:background-color .25s ease;}',
        '.osip-saved-row:first-child{border-top:1px solid var(--rd-line,#e2ded5);}',
        '.osip-saved-row:hover{background:var(--rd-card-2,#f1eee8);}',
        '.osip-saved-link{flex:1 1 auto;min-width:0;text-decoration:none;}',
        '.osip-saved-link:focus-visible{outline:2px solid var(--rd-green-2,#0b6b45);outline-offset:3px;border-radius:6px;}',
        '.osip-saved-name{display:block;font-family:Inter,system-ui,sans-serif;font-size:14.5px;font-weight:500;',
        'line-height:1.35;color:var(--rd-ink,#13201b);}',
        '.osip-saved-row:hover .osip-saved-name{color:var(--rd-green,#004225);}',
        '.osip-saved-meta{display:block;margin-top:3px;font-family:Inter,system-ui,sans-serif;font-size:12.5px;',
        'line-height:1.5;color:var(--rd-ink-3,#6b716c);}',
        '.osip-saved-cost{flex:0 0 auto;font-family:Inter,system-ui,sans-serif;font-size:13.5px;font-weight:600;',
        'color:var(--rd-green,#004225);white-space:nowrap;font-variant-numeric:tabular-nums;}',
        '.osip-saved-drop{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;',
        'width:30px;height:30px;padding:0;border:0;border-radius:999px;background:none;cursor:pointer;',
        'color:var(--rd-ink-3,#6b716c);transition:background-color .25s ease,color .25s ease;}',
        '.osip-saved-drop:hover{background:#fbeceb;color:#b3261e;}',
        '.osip-saved-drop:focus-visible{outline:2px solid var(--rd-green-2,#0b6b45);outline-offset:2px;}',
        '.osip-saved-drop .material-symbols-outlined{font-size:18px;}',
        '@media (max-width:600px){.osip-saved-cost{display:none;}}',
        /* nothing saved yet */
        '.osip-saved-empty{padding:30px 0 6px;font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.7;',
        'color:var(--rd-ink-3,#6b716c);max-width:44rem;}',
        '.osip-saved-empty a{color:var(--rd-green,#004225);text-decoration:underline;',
        'text-decoration-color:rgba(217,165,32,.7);text-underline-offset:4px;}'
    ].join('');

    /* ---- the line, and the figures above it -------------------------------- */
    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function published(updated) {
        /* '05-May-2026' as the cards write it: '05 May 2026' */
        return String(updated || '').replace(/-/g, ' ');
    }

    /* 'USD 210 m' -> 210 and 'USD 1.2 bn' -> 1200, so the shortlist can carry a
       total. Anything in neither unit counts as nothing rather than as a wrong
       number. */
    function millions(cost) {
        var m = /([\d.,]+)\s*(m|bn)$/i.exec(String(cost || '').trim());
        if (!m) return 0;
        var value = parseFloat(m[1].replace(/,/g, '')) || 0;
        return /^bn$/i.test(m[2]) ? value * 1000 : value;
    }

    function money(total) {
        if (!total) return '\u2014';
        return total >= 1000
            ? 'USD ' + (total / 1000).toFixed(total % 1000 ? 2 : 0) + ' bn'
            : 'USD ' + Math.round(total) + ' m';
    }

    function statsHTML(opps) {
        var total = 0;
        var sectors = [];
        opps.forEach(function (opp) {
            total += millions(opp.cost);
            if (sectors.indexOf(opp.sector) === -1) sectors.push(opp.sector);
        });
        return '<div class="osip-saved-stats">' +
            '<div class="osip-stat"><span class="osip-stat-value">' + opps.length + '</span>' +
            '<span class="osip-stat-label">Saved</span></div>' +
            '<div class="osip-stat"><span class="osip-stat-value">' + money(total) + '</span>' +
            '<span class="osip-stat-label">Combined value</span></div>' +
            '<div class="osip-stat"><span class="osip-stat-value">' + sectors.length + '</span>' +
            /* "Related", because these are the sectors the saved projects happen to
               sit in. Nobody picked them, and a bare "Sectors" reads as if they did. */
            '<span class="osip-stat-label">Related sector' + (sectors.length === 1 ? '' : 's') + '</span></div>' +
            '</div>';
    }

    function rowHTML(opp) {
        return '<li class="osip-saved-row">' +
            '<a class="osip-saved-link" href="detailedOppNew.html?id=' + encodeURIComponent(opp.id) + '">' +
            '<span class="osip-saved-name">' + esc(opp.title) + '</span>' +
            '<span class="osip-saved-meta">' + esc(opp.id) + ' &middot; ' + esc(opp.sector) +
            ' &middot; ' + esc(opp.state) + ' &middot; ' + esc(opp.status) +
            ' &middot; published ' + esc(published(opp.updated)) + '</span></a>' +
            '<span class="osip-saved-cost">' + esc(opp.cost) + '</span>' +
            '<button type="button" class="osip-saved-drop" data-remove="' + esc(opp.id) + '"' +
            ' title="Remove from saved" aria-label="Remove ' + esc(opp.title) + ' from saved">' +
            '<span class="material-symbols-outlined">close</span></button>' +
            '</li>';
    }

    /* ---- the saved list ---------------------------------------------------- */
    function byId() {
        var map = {};
        (window.OSIP_OPPORTUNITIES || []).forEach(function (opp) { map[opp.id] = opp; });
        return map;
    }

    function renderInto(mount) {
        if (!mount) return;
        css(LIST_CSS, 'osip-saved-css');
        var map = byId();
        var rows = read();
        /* newest save first: a shortlist is read from the top */
        var opps = rows.slice().reverse().map(function (row) { return map[row.id]; }).filter(Boolean);
        var count = document.querySelector('[data-saved-count]');
        if (count) count.textContent = opps.length ? String(opps.length) : '0';

        var empty = document.querySelector('[data-saved-empty]');
        if (!opps.length) {
            mount.innerHTML = '';
            if (empty) empty.hidden = false;
            return;
        }
        if (empty) empty.hidden = true;
        mount.innerHTML = statsHTML(opps) +
            '<ul class="osip-saved-rows">' + opps.map(rowHTML).join('') + '</ul>';
    }

    /* The line is a link, so the browser handles the click. Only the remove
       control needs wiring. */
    function wireList(mount) {
        mount.addEventListener('click', function (e) {
            var drop = e.target.closest('[data-remove]');
            if (!drop) return;
            e.preventDefault();
            remove(drop.getAttribute('data-remove'));
        });
    }

    /* ---- the save button --------------------------------------------------- */
    function idFor(btn) {
        return btn.getAttribute('data-save-opp') ||
            document.documentElement.getAttribute('data-opp-id') ||
            (window.OSIP_OPPORTUNITY_DEFAULT || '');
    }

    /* UX-FRM-07: the confirmation after a save or an unsave. osipstate.js draws it;
       a page without that file simply says nothing, as before. */
    function say(message, tone) {
        if (window.OSIPState && window.OSIPState.toast) window.OSIPState.toast(message, { tone: tone });
    }

    function paint(btn) {
        var saved = has(idFor(btn));
        btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
        var icon = btn.querySelector('.material-symbols-outlined');
        var label = btn.querySelector('[data-save-label]');
        if (icon) icon.textContent = saved ? 'bookmark_added' : 'bookmark_add';
        if (label) label.textContent = saved ? 'Saved' : 'Save';
        btn.setAttribute('title', saved
            ? 'Saved. It is listed under Saved opportunities on your profile.'
            : 'Keep this project on a shortlist on your profile.');
    }

    /* Saving belongs to a person, so it asks for the sign-in the gated sections
       ask for - the same modal, opened through one of the page's own login
       triggers - and completes the save once Login.html reports success. A page
       with no login modal saves straight away rather than dead-ending. */
    var pending = null;

    function signedIn() {
        if (document.body && document.body.classList.contains('is-authenticated')) return true;
        try { return !!window.localStorage.getItem('osip_session'); } catch (e) { return false; }
    }

    function gate(done) {
        if (signedIn()) { done(); return; }
        var trigger = document.querySelector('.login-trigger, #connect-btn');
        if (!trigger) { done(); return; }
        pending = done;
        trigger.click();
    }

    window.addEventListener('message', function (e) {
        if (e.data === 'osip-login-success' && pending) {
            var run = pending;
            pending = null;
            run();
        } else if (e.data === 'osip-close') {
            pending = null;   /* closed without signing in: the save is dropped */
        }
    });

    function wireButtons() {
        var buttons = [].slice.call(document.querySelectorAll('[data-save-opp]'));
        if (!buttons.length) return;
        css(BUTTON_CSS, 'osip-save-css');
        buttons.forEach(function (btn) {
            paint(btn);
            btn.addEventListener('click', function () {
                var id = idFor(btn);
                /* an unsave is never gated: only someone signed in can have one */
                if (has(id)) { remove(id); say('Removed from your saved opportunities.'); return; }
                gate(function () { add(id); say('Saved. It is on your profile under Saved opportunities.'); });
            });
        });
        API.onChange(function () { buttons.forEach(paint); });
    }

    function start() {
        wireButtons();
        var mount = document.getElementById('osip-saved-list');
        if (mount) {
            renderInto(mount);
            wireList(mount);
            API.onChange(function () { renderInto(mount); });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
