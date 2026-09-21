/*
 * OSIP InvestNow popup flow (InvestNow1 -> InvestNow2 -> InvestNow3).
 *
 * NOTE: the nav "Invest Now" button no longer opens this popup. It is a plain
 * link to InvestorMatch.html (see nav.js) — the quiz that replaced this flow.
 * What is left here only fires for elements that opt in explicitly with the
 * data-investflow attribute.
 *
 * When it does fire: InvestNow1.html loads inside a popup modal (iframe) with
 * the page behind it blurred — mirroring the login modal in detailedOppNew.html.
 * InvestNow1 -> InvestNow2 navigate inside the iframe (stay in the popup);
 * InvestNow2's "Continue" uses target="_top" to break out to InvestNow3.html as
 * a normal full-screen page.
 */
(function () {
    // Resolve InvestNow1.html relative to this script's own URL, so the iframe
    // src works whether the host page is at the site root (homepage.html) or
    // already inside pages/ (every other site page).
    var thisScript = document.currentScript;
    var scriptSrc = thisScript ? thisScript.src : '';
    var BASE = scriptSrc ? scriptSrc.substring(0, scriptSrc.lastIndexOf('/') + 1) : '';
    var STEP1_URL = BASE + 'InvestNow1.html';

    // ---- Styles -------------------------------------------------------------
    var css = document.createElement('style');
    css.textContent = [
        'body.investflow-open { overflow: hidden; }',
        'body.investflow-open > *:not(#investflow-modal) { filter: blur(6px); pointer-events: none; user-select: none; }',
        'body > *:not(#investflow-modal) { transition: filter .3s ease; }',
        '#investflow-modal { position: fixed; inset: 0; z-index: 1000; display: none; align-items: center; justify-content: center; padding: 16px;}',
        '#investflow-modal.open { display: flex; }',
        '#investflow-backdrop { position: absolute; inset: 0; background: rgba(0,29,23,0.45); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }',
        '#investflow-dialog { position: relative; z-index: 10; width: 100%; max-width: 980px; height: 86vh; background: #fff; border-radius: 0; box-shadow: 0 25px 60px -15px rgba(0,0,0,.45); overflow: hidden; border: 1px solid rgba(0,0,0,.05); animation: investflowIn .22s ease; }',
        '#investflow-close { position: absolute; top: 12px; right: 12px; z-index: 20; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,.92); border: 1px solid #e5e7eb; color: #444; box-shadow: 0 4px 10px rgba(0,0,0,.12); cursor: pointer; transition: background .2s ease, color .2s ease; }',
        '#investflow-close:hover { background: #f3f4f6; color: #001d17; }',
        '#investflow-frame { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; border-radius: 0; }',
        '@keyframes investflowIn { from { opacity: 0; transform: scale(.97); } to { opacity: 1; transform: scale(1); } }'
    ].join('\n');
    document.head.appendChild(css);

    // ---- Modal DOM ----------------------------------------------------------
    var modal = document.createElement('div');
    modal.id = 'investflow-modal';
    modal.innerHTML =
        '<div id="investflow-backdrop"></div>' +
        '<div id="investflow-dialog" role="dialog" aria-modal="true" aria-label="Investment registration" >' +
        '<button id="investflow-close" type="button" aria-label="Close">' +
        '<span class="material-symbols-outlined">close</span>' +
        '</button>' +
        '<iframe id="investflow-frame" title="Invest Now" src="about:blank"></iframe>' +
        '</div>';
    document.body.appendChild(modal);

    var frame = modal.querySelector('#investflow-frame');
    var closeBtn = modal.querySelector('#investflow-close');
    var backdrop = modal.querySelector('#investflow-backdrop');

    // UX-A11-05 (item 88): remember what had focus before the modal opened so it
    // can be restored on close, and keep Tab within the dialog.
    var lastFocus = null;

    function openModal(e) {
        if (e) e.preventDefault();
        lastFocus = document.activeElement;
        var src = frame.getAttribute('src');
        if (!src || src === 'about:blank') frame.setAttribute('src', STEP1_URL);
        modal.classList.add('open');
        document.body.classList.add('investflow-open');
        // Move focus into the dialog so a keyboard user is not left behind it.
        setTimeout(function () { try { closeBtn.focus(); } catch (e) { } }, 0);
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('investflow-open');
        // Reset so the next open always starts back at step 1.
        frame.setAttribute('src', 'about:blank');
        // Return focus to the trigger that opened the modal.
        if (lastFocus && typeof lastFocus.focus === 'function') { try { lastFocus.focus(); } catch (e) { } }
        lastFocus = null;
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('open')) return;
        if (e.key === 'Escape') { closeModal(); return; }
        // Focus trap across the two host-level focusables (close button + iframe).
        // Tab inside the iframe is handled by its own document; this keeps the
        // close button tethered to the dialog rather than the blurred page.
        if (e.key === 'Tab') {
            var f = [closeBtn, frame];
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });
    // Lets the embedded pages close the popup: window.parent.postMessage('investflow-close','*')
    window.addEventListener('message', function (e) {
        if (e.data === 'investflow-close') closeModal();
    });

    // ---- Wire opt-in triggers ----------------------------------------------
    //
    // The nav "Invest Now" button is deliberately NOT wired here any more: it
    // is a normal link to InvestorMatch.html and must be allowed to navigate.
    function wire() {
        // Any element (anywhere on the page) can opt into the popup with
        // data-investflow — used by CTAs like the hero "Start Your Investment
        // Journey" button. Its href stays as a no-JS fallback.
        document.querySelectorAll('[data-investflow]').forEach(function (el) {
            el.addEventListener('click', openModal);
        });
        // Any element (anywhere on the page) can opt into the popup with
        // data-investflow — used by CTAs like the hero "Start Your Investment
        // Journey" button. Its href stays as a no-JS fallback.
        document.querySelectorAll('[data-investflow]').forEach(function (el) {
            el.addEventListener('click', openModal);
        });
        // Any element (anywhere on the page) can opt into the popup with
        // data-investflow — used by CTAs like the hero "Start Your Investment
        // Journey" button. Its href stays as a no-JS fallback.
        document.querySelectorAll('[data-investflow]').forEach(function (el) {
            el.addEventListener('click', openModal);
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
    else wire();
})();
