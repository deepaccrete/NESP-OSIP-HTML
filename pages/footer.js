// Shared site footer — single source of truth for every page's footer.
//
// Usage on any page:
//   1. Put a mount point where the footer should render:  <div id="site-footer"></div>
//   2. Load this script near the end of <body>:            <script src="footer.js"></script>
//      (from the site root use  <script src="pages/footer.js"></script>)
//
// The markup below is copied verbatim from homepage.html's footer. Internal
// links use a {{base}} token that is resolved at load time from this script's
// own URL (document.currentScript.src) — exactly like investflow.js — so the
// footer's links resolve correctly whether the host page sits at the site root
// or inside pages/. Keep this the ONLY place the footer markup lives.
(function () {
  var base = 'pages/'; // fallback if currentScript is unavailable (inlined script)
  try {
    var src = (document.currentScript && document.currentScript.src) || '';
    if (src) base = src.slice(0, src.lastIndexOf('/') + 1); // -> ".../pages/"
  } catch (e) { /* keep fallback */ }

  var HTML = `
      <footer class="bg-[#022c22] text-gray-400 py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div
          class="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 lg:mb-12">
          <div class="lg:col-span-2">
            <h3 class="text-white font-bold text-2xl sm:text-3xl mb-4">One-Stop Investment Platform (OSIP)</h3>
            <p class="text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">Supporting transparent, informed, and
              sustainable investment in Nigeria's clean energy future. The Nigerian Energy Support Programme (NESP) is a
              technical assistance programme co-funded by the European Union and the German Federal Ministry of Economic
              Cooperation and Development (BMZ) and implemented by Deutsche Gesellschaft für Internationale
              Zusammenarbeit (GIZ) GmbH in collaboration with the Federal Ministry of Power. It aims to foster
              investments in the domestic renewable energy and energy efficiency sector.</p>
          </div>
          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Quick Links</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-3">
              <li><a href="{{base}}AboutOSIP.html" class="text-sm sm:text-base hover:text-white transition-colors">About
                  OSIP</a></li>
              <li><a href="{{base}}AboutOSIP.html" class="text-sm sm:text-base hover:text-white transition-colors">About
                  the Platform</a></li>
              <li><a href="{{base}}Contact.html" class="text-sm sm:text-base hover:text-white transition-colors">Investor
                  Support</a></li>
              <li><a href="{{base}}notDecided.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">FAQs</a></li>
              <li><a href="{{base}}Contact.html" class="text-sm sm:text-base hover:text-white transition-colors">Contact
                  Us</a></li>
              <li><a href="{{base}}News.html" class="text-sm sm:text-base hover:text-white transition-colors">News &amp;
                  Events</a></li>
              <li><a href="{{base}}News.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">Announcements</a></li>
              <li><a href="{{base}}Contact.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">Contact</a></li>
              <li><a href="{{base}}Contact.html" class="text-sm sm:text-base hover:text-white transition-colors">OSIP Help
                  Desk</a></li>
              <li><a href="{{base}}notDecided.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">Privacy
                  Policy</a></li>
              <li><a href="{{base}}notDecided.html" class="text-sm sm:text-base hover:text-white transition-colors">Terms
                  of Use</a></li>
              <li><a href="{{base}}notDecided.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
            <ul class="flex flex-col gap-4 mb-6">
              <li class="flex items-start gap-3"><span
                  class="material-symbols-outlined text-[20px] text-white/70 flex-shrink-0">mail</span><a
                  href="mailto:info@osip.gov.ng"
                  class="text-sm sm:text-base hover:text-white transition-colors break-all">info@osip.gov.ng</a></li>
              <li class="flex items-start gap-3"><span
                  class="material-symbols-outlined text-[20px] text-white/70 flex-shrink-0">call</span><a
                  href="tel:+2349000000000" class="text-sm sm:text-base hover:text-white transition-colors">+234 (0)9
                  000 0000</a></li>
              <li class="flex items-start gap-3"><span
                  class="material-symbols-outlined text-[20px] text-white/70 flex-shrink-0">location_on</span><span
                  class="text-sm sm:text-base">Federal Ministry of Power, Abuja, Nigeria</span></li>
            </ul>
            <p class="text-white text-xs font-bold uppercase tracking-widest mb-4">Social Media Links</p>
            <div class="flex flex-wrap gap-3"><a href="#" aria-label="LinkedIn"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.78v2.19h.07c.67-1.2 2.3-2.46 4.74-2.46C21.6 7.73 24 10 24 14.4V24h-5v-8.5c0-2.03-.73-3.42-2.55-3.42-1.39 0-2.22.94-2.58 1.85-.13.32-.17.77-.17 1.22V24h-5V8z" />
                </svg></a><a href="#" aria-label="X"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg></a>
              <a href="#" aria-label="Instagram"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg></a>
              <a href="#" aria-label="YouTube"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg></a>
              <a href="#" aria-label="Facebook"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.325V1.325C24 .593 23.408 0 22.675 0z" />
                </svg></a>
            </div>
          </div>
        </div>
        <div
          class="max-w-[1440px] mx-auto border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span class="text-xs sm:text-sm">© 2026 OSIP Nigeria. All rights reserved.</span><span
            class="text-xs sm:text-sm">Designed for Nigeria Federal Ministry of Power.</span>
        </div>
      </footer>`;

  var mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.outerHTML = HTML.replace(/\{\{base\}\}/g, base);
})();
