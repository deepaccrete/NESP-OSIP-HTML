/* =============================================================================
   listbox.js - a native <select> shown as the pathway finder's listbox (22 Sep 2026)

   A native select opens a list the operating system draws - a wheel on an
   iPhone, a dialog on Android, a grey menu on Windows - that no CSS can reach, so
   it never matches the page. Find Your Regulatory Pathway on Regulation.html
   (pathwayfinder.js) replaced its selects with a button and a styled list; this
   is that control, for any select marked data-listbox:

       <select id="opp-sort" data-listbox> ... </select>

   The select stays in the page, hidden, as the source of truth: picking an option
   sets its value and fires input and change, so every script already listening
   to it keeps working, and a form still submits and validates it.

   Stacking: the list is drawn under its field, but content after it that holds an
   animated transform (a card rising in with fill-mode both) is a stacking layer
   of its own and paints over it. While the list is open, the nearest element
   marked data-listbox-lift - or else the field's own wrapper - is lifted above
   what follows it.

   Keyboard: arrows move, Home/End jump, Enter or Space picks, Escape and Tab
   close. The label points at the button, so clicking the label opens the list.

   Follows the injected-component pattern of glossary.js / cardrail.js: its own
   CSS, a window guard so a double load is a no-op, no host Tailwind.
   ============================================================================= */
(function () {
    'use strict';
    if (window.__osipListbox) return;
    window.__osipListbox = true;

    var CSS = [
        '.lbx{position:relative;display:inline-block;max-width:100%;}',
        '.lbx-native{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;',
        'border:0!important;opacity:0;pointer-events:none;}',

        /* the field */
        '.lbx-trigger{position:relative;display:inline-flex;align-items:center;width:100%;min-width:220px;height:42px;',
        'margin:0;padding:0 42px 0 14px;border:1px solid var(--rd-line-2,#cfc9bd);border-radius:12px;',
        'background:var(--rd-card,#fbfaf7);color:var(--rd-ink,#13201b);font-family:Inter,system-ui,sans-serif;',
        'font-size:14px;font-weight:500;line-height:1.2;text-align:left;white-space:nowrap;overflow:hidden;',
        'text-overflow:ellipsis;cursor:pointer;-webkit-tap-highlight-color:transparent;',
        'transition:border-color .25s ease,box-shadow .25s ease,background-color .25s ease;}',
        '.lbx-trigger:hover{border-color:#b9b2a4;}',
        '.lbx-trigger:focus-visible,.lbx.is-open .lbx-trigger{outline:none;border-color:var(--rd-green-2,#0b6b45);',
        'background:#fff;box-shadow:0 0 0 4px rgba(11,107,69,.12);}',
        '.lbx-chevron{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:20px!important;',
        'color:var(--rd-ink-3,#6b716c);pointer-events:none;transition:transform .18s ease,color .18s ease;}',
        '.lbx.is-open .lbx-chevron{transform:translateY(-50%) rotate(180deg);color:var(--rd-green-2,#0b6b45);}',

        /* the list */
        '.lbx-list{position:absolute;top:calc(100% + 6px);left:0;z-index:40;min-width:100%;width:max-content;',
        'max-width:min(360px,calc(100vw - 32px));max-height:280px;margin:0;padding:6px;overflow-y:auto;',
        'overscroll-behavior:contain;list-style:none;background:#fff;border:1px solid var(--rd-line-2,#cfc9bd);',
        'border-radius:14px;box-shadow:0 18px 40px -16px rgba(6,20,16,.28);}',
        '.lbx-option{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:40px;',
        'padding:8px 12px;border-radius:9px;font-family:Inter,system-ui,sans-serif;font-size:14px;font-weight:500;',
        'color:var(--rd-ink,#13201b);cursor:pointer;white-space:nowrap;-webkit-tap-highlight-color:transparent;}',
        '.lbx-option.is-active{background:#f1f8f4;color:var(--rd-green,#004225);}',
        '.lbx-option.is-selected{font-weight:600;color:var(--rd-green,#004225);}',
        '.lbx-check{font-size:18px!important;color:var(--rd-green-2,#0b6b45);visibility:hidden;}',
        '.lbx-option.is-selected .lbx-check{visibility:visible;}',

        /* the lifted wrapper */
        '.lbx-lift{position:relative!important;z-index:60!important;}',

        /* a thumb needs a bigger row than a pointer does */
        '@media(max-width:639px){.lbx-option{min-height:46px;font-size:15px;}.lbx-trigger{height:44px;}}',
        '@media(prefers-reduced-motion:reduce){.lbx-trigger,.lbx-chevron{transition:none;}}'
    ].join('');

    function injectCSS() {
        if (document.getElementById('osip-listbox-css')) return;
        var tag = document.createElement('style');
        tag.id = 'osip-listbox-css';
        tag.textContent = CSS;
        (document.head || document.documentElement).appendChild(tag);
    }

    var uid = 0;

    function enhance(select) {
        if (select.__listbox) return;
        select.__listbox = true;

        var n = ++uid;
        var id = (select.id || 'lbx' + n) + '-lbx';
        var options = Array.prototype.filter.call(select.options, function (o) { return !o.disabled && o.value !== ''; });
        var placeholderOpt = Array.prototype.filter.call(select.options, function (o) { return o.disabled || o.value === ''; })[0];
        var placeholder = placeholderOpt ? placeholderOpt.textContent.trim() : '';

        /* the field sits where the select sat */
        var wrap = document.createElement('span');
        wrap.className = 'lbx';
        select.parentNode.insertBefore(wrap, select);
        wrap.appendChild(select);

        var button = document.createElement('button');
        button.type = 'button';
        button.id = id;
        button.className = 'lbx-trigger';
        button.setAttribute('role', 'combobox');
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');

        var label = select.id ? document.querySelector('label[for="' + select.id + '"]') : null;
        if (label) {
            label.id = label.id || id + '-label';
            label.setAttribute('for', id);
            button.setAttribute('aria-labelledby', label.id + ' ' + id);
        } else if (select.getAttribute('aria-label')) {
            button.setAttribute('aria-label', select.getAttribute('aria-label'));
        }

        var text = document.createElement('span');
        text.className = 'lbx-text';
        button.appendChild(text);
        var chevron = document.createElement('span');
        chevron.className = 'material-symbols-outlined lbx-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.textContent = 'expand_more';

        wrap.insertBefore(button, select);
        wrap.appendChild(chevron);

        select.classList.add('lbx-native');
        select.setAttribute('tabindex', '-1');
        select.setAttribute('aria-hidden', 'true');

        var lift = select.closest('[data-listbox-lift]') || wrap.parentElement;
        var list = null;
        var active = 0;

        function current() {
            for (var i = 0; i < options.length; i++) if (options[i].value === select.value) return i;
            return -1;
        }

        function show() {
            var i = current();
            text.textContent = i > -1 ? options[i].textContent.trim() : placeholder;
            button.classList.toggle('is-placeholder', i === -1);
        }

        function paint() {
            if (!list) return;
            var sel = current();
            Array.prototype.forEach.call(list.children, function (li, i) {
                li.className = 'lbx-option' + (i === active ? ' is-active' : '') + (i === sel ? ' is-selected' : '');
                li.setAttribute('aria-selected', i === sel ? 'true' : 'false');
            });
            var row = list.children[active];
            if (row) {
                var top = row.offsetTop, bottom = top + row.offsetHeight;
                if (top < list.scrollTop) list.scrollTop = top - 6;
                else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 6;
            }
            button.setAttribute('aria-activedescendant', id + '-opt-' + active);
        }

        function close() {
            if (!list) return;
            list.parentNode.removeChild(list);
            list = null;
            wrap.classList.remove('is-open');
            if (lift) lift.classList.remove('lbx-lift');
            button.setAttribute('aria-expanded', 'false');
            button.removeAttribute('aria-activedescendant');
        }

        function pick(i) {
            if (!options[i]) return;
            var changed = select.value !== options[i].value;
            select.value = options[i].value;
            show();
            close();
            button.focus();
            if (changed) {
                select.dispatchEvent(new Event('input', { bubbles: true }));
                select.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        function open() {
            if (list) return;
            list = document.createElement('ul');
            list.className = 'lbx-list';
            list.id = id + '-list';
            list.setAttribute('role', 'listbox');
            if (label) list.setAttribute('aria-labelledby', label.id);
            options.forEach(function (o, i) {
                var li = document.createElement('li');
                li.id = id + '-opt-' + i;
                li.setAttribute('role', 'option');
                li.innerHTML = '<span></span><span class="material-symbols-outlined lbx-check" aria-hidden="true">check</span>';
                li.firstChild.textContent = o.textContent.trim();
                /* mousedown, so the pick lands before the button loses focus;
                   a touch that scrolls the list never sends one */
                li.addEventListener('mousedown', function (e) { e.preventDefault(); pick(i); });
                li.addEventListener('mouseenter', function () { active = i; paint(); });
                list.appendChild(li);
            });
            wrap.appendChild(list);
            wrap.classList.add('is-open');
            if (lift) lift.classList.add('lbx-lift');
            button.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-controls', list.id);

            /* a list that would run past the right edge of a phone opens to the left */
            list.style.left = '';
            list.style.right = '';
            var r = list.getBoundingClientRect();
            if (r.right > window.innerWidth - 12) { list.style.left = 'auto'; list.style.right = '0'; }

            active = Math.max(0, current());
            paint();
        }

        button.addEventListener('click', function () { if (list) close(); else open(); });
        button.addEventListener('keydown', function (e) {
            var k = e.key;
            if (k === 'ArrowDown' || k === 'ArrowUp') {
                e.preventDefault();
                if (!list) { open(); return; }
                active = (active + (k === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
                paint();
            } else if (k === 'Home' || k === 'End') {
                if (!list) return;
                e.preventDefault();
                active = k === 'Home' ? 0 : options.length - 1;
                paint();
            } else if (k === 'Enter' || k === ' ') {
                e.preventDefault();
                if (list) pick(active); else open();
            } else if (k === 'Escape' || k === 'Tab') {
                close();
            }
        });
        document.addEventListener('mousedown', function (e) {
            if (list && !wrap.contains(e.target)) close();
        });

        /* anything that sets the select's value in code still shows on the button */
        select.addEventListener('change', show);
        if (select.form) select.form.addEventListener('reset', function () { setTimeout(show, 0); });
        show();
    }

    function start() {
        var found = document.querySelectorAll('select[data-listbox]');
        if (!found.length) return;
        injectCSS();
        Array.prototype.forEach.call(found, enhance);
    }

    window.OSIPListbox = { enhance: function (select) { injectCSS(); enhance(select); } };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
