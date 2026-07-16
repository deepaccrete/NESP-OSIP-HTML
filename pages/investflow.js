/*
 * OSIP "Invest Now" flow.
 * Clicking any nav "Invest Now" button opens InvestNow1.html inside a popup
 * modal (iframe) with the page behind it blurred — mirroring the login modal
 * in detailedOppNew.html. InvestNow1 -> InvestNow2 navigate inside the iframe
 * (stay in the popup); InvestNow2's "Continue" uses target="_top" to break out
 * to InvestNow3.html as a normal full-screen page.
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

    function openModal(e) {
        if (e) e.preventDefault();
        var src = frame.getAttribute('src');
        if (!src || src === 'about:blank') frame.setAttribute('src', STEP1_URL);
        modal.classList.add('open');
        document.body.classList.add('investflow-open');
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('investflow-open');
        // Reset so the next open always starts back at step 1.
        frame.setAttribute('src', 'about:blank');
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
    // Lets the embedded pages close the popup: window.parent.postMessage('investflow-close','*')
    window.addEventListener('message', function (e) {
        if (e.data === 'investflow-close') closeModal();
    });

    // ---- Wire nav "Invest Now" triggers ------------------------------------
    function wire() {
        document.querySelectorAll('nav a, nav button').forEach(function (el) {
            var t = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
            if (t === 'invest now') el.addEventListener('click', openModal);
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
