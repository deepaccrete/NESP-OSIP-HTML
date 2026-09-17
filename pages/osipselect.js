/* =============================================================================
   osipselect.js - the site's dropdowns

   Every <select class="osip-select"> keeps working exactly as it did: it stays
   in the form, it still holds the value, and it is still what validation, the
   confirmation summary and any other script read. This file only puts a styled
   control in front of it - a rounded button and a rounded panel of options, with
   hover and keyboard selection, a search box once a list is long (countries,
   states), and the short description a category option carries.

   Nothing here is required for the form to work. With JavaScript off, or if this
   file fails to load, the native dropdown is shown instead.

   Markup it expects
     <select class="osip-select" id="country" ...>
       <option value="">Select country</option>        <- the placeholder
       <option value="NG">Nigeria</option>
       <option value="x" data-label="Short name" data-desc="One line of help">
     </select>

   Options honoured on the select
     data-search="off"    never show the search box
     data-search="on"     always show it
   ============================================================================= */
(function () {
    'use strict';

    var SEARCH_FROM = 12;          /* lists longer than this get a search box */
    var open = null;               /* the one open dropdown */

    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    function enhance(select) {
        if (select.__osip) return;
        var options = Array.prototype.slice.call(select.options);
        var wrap = el('div', 'osip-select-wrap');
        select.parentNode.insertBefore(wrap, select);
        wrap.appendChild(select);
        select.classList.add('osip-select-native');
        select.setAttribute('tabindex', '-1');

        var button = el('button', 'osip-select-btn');
        button.type = 'button';
        button.setAttribute('role', 'combobox');
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
        if (select.id) button.id = select.id + '-button';
        var labelled = select.id && document.querySelector('label[for="' + select.id + '"]');
        if (labelled) {
            if (!labelled.id) labelled.id = select.id + '-label';
            button.setAttribute('aria-labelledby', labelled.id + ' ' + (button.id || ''));
        }
        var described = select.getAttribute('aria-describedby');
        if (described) button.setAttribute('aria-describedby', described);

        var value = el('span', 'osip-select-value');
        var chev = el('span', 'material-symbols-outlined osip-select-chev', 'expand_more');
        chev.setAttribute('aria-hidden', 'true');
        button.appendChild(value);
        button.appendChild(chev);
        wrap.appendChild(button);

        var menu = el('div', 'osip-select-menu');
        menu.hidden = true;
        menu.setAttribute('data-lenis-prevent', '');
        var search = null;
        var wantSearch = select.dataset.search === 'on' ||
            (select.dataset.search !== 'off' && options.length > SEARCH_FROM);
        if (wantSearch) {
            var box = el('div', 'osip-select-search');
            search = el('input');
            search.type = 'text';
            search.setAttribute('placeholder', 'Type to filter');
            search.setAttribute('aria-label', 'Filter the list');
            search.autocomplete = 'off';
            box.appendChild(search);
            menu.appendChild(box);
        }
        var list = el('ul', 'osip-select-list');
        list.setAttribute('role', 'listbox');
        if (select.id) list.id = select.id + '-list';
        menu.appendChild(list);
        var none = el('p', 'osip-select-none', 'Nothing matches that.');
        none.hidden = true;
        menu.appendChild(none);
        wrap.appendChild(menu);
        button.setAttribute('aria-controls', list.id || '');

        /* one row per option; the placeholder option is not offered as a choice */
        var rows = [];
        options.forEach(function (opt, i) {
            if (opt.value === '' && i === 0) return;
            var li = el('li', 'osip-select-opt');
            li.setAttribute('role', 'option');
            li.setAttribute('data-value', opt.value);
            var main = el('span', 'osip-select-opt-main', opt.getAttribute('data-label') || opt.text);
            li.appendChild(main);
            var desc = opt.getAttribute('data-desc');
            if (desc) li.appendChild(el('span', 'osip-select-opt-desc', desc));
            var tick = el('span', 'material-symbols-outlined osip-select-tick', 'check');
            tick.setAttribute('aria-hidden', 'true');
            li.appendChild(tick);
            li.addEventListener('click', function () { choose(opt.value); });
            li.addEventListener('mousemove', function () { setActive(rows.indexOf(li)); });
            list.appendChild(li);
            rows.push(li);
        });

        var active = -1;

        function visibleRows() {
            return rows.filter(function (r) { return !r.hidden; });
        }

        function setActive(i) {
            var vis = visibleRows();
            if (!vis.length) { active = -1; return; }
            rows.forEach(function (r) { r.classList.remove('is-active'); });
            var row = rows[i] && !rows[i].hidden ? rows[i] : vis[0];
            row.classList.add('is-active');
            active = rows.indexOf(row);
            if (row.id === '') row.id = (select.id || 'osip') + '-opt-' + active;
            button.setAttribute('aria-activedescendant', row.id || '');
            var top = row.offsetTop, bottom = top + row.offsetHeight;
            if (top < list.scrollTop) list.scrollTop = top;
            else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
        }

        function step(by) {
            var vis = visibleRows();
            if (!vis.length) return;
            var here = vis.indexOf(rows[active]);
            var next = here < 0 ? (by > 0 ? 0 : vis.length - 1) : Math.min(vis.length - 1, Math.max(0, here + by));
            setActive(rows.indexOf(vis[next]));
        }

        function sync() {
            var opt = select.options[select.selectedIndex];
            var chosen = opt && opt.value !== '';
            value.textContent = chosen ? (opt.getAttribute('data-label') || opt.text)
                : (select.options[0] ? select.options[0].text : 'Select');
            wrap.classList.toggle('is-empty', !chosen);
            rows.forEach(function (r) {
                var on = chosen && r.getAttribute('data-value') === select.value;
                r.classList.toggle('is-chosen', on);
                r.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            var invalid = select.getAttribute('aria-invalid') === 'true';
            wrap.classList.toggle('is-invalid', invalid);
            if (invalid) button.setAttribute('aria-invalid', 'true'); else button.removeAttribute('aria-invalid');
            var d = select.getAttribute('aria-describedby');
            if (d) button.setAttribute('aria-describedby', d); else button.removeAttribute('aria-describedby');
        }

        function choose(val) {
            select.value = val;
            select.dispatchEvent(new Event('input', { bubbles: true }));
            select.dispatchEvent(new Event('change', { bubbles: true }));
            sync();
            close(true);
        }

        function filter(text) {
            var q = (text || '').trim().toLowerCase();
            var shown = 0, first = null;
            rows.forEach(function (r) {
                var name = (r.querySelector('.osip-select-opt-main') || r).textContent.toLowerCase();
                var hit = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
                r.hidden = !hit;
                if (!hit) return;
                shown++;
                /* a name that begins with what was typed is the one to land on */
                if (first === null && name.indexOf(q) === 0) first = r;
            });
            none.hidden = shown !== 0;
            list.hidden = shown === 0;
            if (shown) setActive(rows.indexOf(first || visibleRows()[0]));
        }

        function place() {
            /* the panel drops below the field, or above it when there is no room */
            var room = window.innerHeight - button.getBoundingClientRect().bottom;
            wrap.classList.toggle('is-up', room < 260 && button.getBoundingClientRect().top > room);
        }

        function openMenu() {
            if (open && open !== closeThis) open();
            menu.hidden = false;
            place();
            wrap.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            if (search) { search.value = ''; filter(''); }
            var chosenRow = rows.filter(function (r) { return r.classList.contains('is-chosen'); })[0];
            setActive(chosenRow ? rows.indexOf(chosenRow) : rows.indexOf(visibleRows()[0]));
            open = closeThis;
            if (search) search.focus();
            document.addEventListener('mousedown', outside, true);
            window.addEventListener('resize', place);
            window.addEventListener('scroll', place, true);
        }

        function close(refocus) {
            menu.hidden = true;
            wrap.classList.remove('is-open', 'is-up');
            button.setAttribute('aria-expanded', 'false');
            button.removeAttribute('aria-activedescendant');
            if (open === closeThis) open = null;
            document.removeEventListener('mousedown', outside, true);
            window.removeEventListener('resize', place);
            window.removeEventListener('scroll', place, true);
            if (refocus) button.focus();
        }
        function closeThis() { close(false); }
        function outside(e) { if (!wrap.contains(e.target)) close(false); }

        button.addEventListener('click', function () {
            if (menu.hidden) openMenu(); else close(true);
        });

        wrap.addEventListener('keydown', function (e) {
            var isOpen = !menu.hidden;
            if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
                if (e.target === button) { e.preventDefault(); openMenu(); }
                return;
            }
            if (!isOpen) return;
            if (e.key === 'Escape') { e.preventDefault(); close(true); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
            else if (e.key === 'Home') { e.preventDefault(); setActive(rows.indexOf(visibleRows()[0])); }
            else if (e.key === 'End') { e.preventDefault(); var v = visibleRows(); setActive(rows.indexOf(v[v.length - 1])); }
            else if (e.key === 'Enter' || (e.key === ' ' && !search)) {
                e.preventDefault();
                if (rows[active]) choose(rows[active].getAttribute('data-value'));
            } else if (e.key === 'Tab') close(false);
        });

        if (search) search.addEventListener('input', function () { filter(search.value); });

        /* the native control stays the source of truth: anything that sets it, or
           resets the form, is reflected here */
        select.addEventListener('change', sync);
        select.addEventListener('focus', function () { button.focus(); });
        var form = select.form;
        if (form) form.addEventListener('reset', function () { setTimeout(sync, 0); });
        if (window.MutationObserver) {
            new MutationObserver(sync).observe(select, { attributes: true, attributeFilter: ['aria-invalid', 'aria-describedby'] });
        }

        select.__osip = { sync: sync, open: openMenu, close: closeThis };
        sync();
    }

    function start() {
        Array.prototype.forEach.call(document.querySelectorAll('select.osip-select'), enhance);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();

    window.OSIPSelect = { enhance: enhance, refresh: start };
})();
