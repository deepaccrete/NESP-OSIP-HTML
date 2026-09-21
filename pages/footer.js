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
      <footer class="nesp-footer bg-[#022c22] text-gray-400 py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div
          class="nesp-foot-top max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 lg:mb-12">
          <div class="nesp-foot-brand lg:col-span-2">
            <h3 class="text-white font-bold text-2xl sm:text-3xl mb-4">One-Stop Investment Platform (OSIP)</h3>
            <p class="text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">Supporting transparent, informed, and
              sustainable investment in Nigeria's clean energy future. The Nigerian Energy Support Programme (NESP) is a
              technical assistance programme co-funded by the European Union and the German Federal Ministry for Economic
              Cooperation and Development (BMZ) and implemented by Deutsche Gesellschaft für Internationale
              Zusammenarbeit (GIZ) GmbH in collaboration with the Federal Ministry of Power. It aims to foster
              investments in the domestic renewable energy and energy efficiency sector.</p>
          </div>
          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Quick Links</h4>
            <ul class="nesp-foot-links grid grid-cols-1 gap-y-3">
              <li><a href="{{base}}AboutOSIP.html" class="text-sm sm:text-base hover:text-white transition-colors">About
                  OSIP</a></li>
              <li><a href="{{base}}FAQs.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">FAQs</a></li>
              <li><a href="{{base}}Contact.html" class="text-sm sm:text-base hover:text-white transition-colors">Contact
                  Us</a></li>
              <li><a href="{{base}}News.html" class="text-sm sm:text-base hover:text-white transition-colors">News</a></li>
              <li><a href="{{base}}Event.html"
                  class="text-sm sm:text-base hover:text-white transition-colors">Events</a></li>
              <li><a href="{{base}}HelpDesk.html" class="text-sm sm:text-base hover:text-white transition-colors">OSIP Help
                  Desk</a></li>
              <!-- UX-LOG-01 (item 51): account entry point in the footer as well as
                   the header, so Log in / Register is reachable from every page. -->
              <li><a href="{{base}}Login.html" class="text-sm sm:text-base hover:text-white transition-colors">Log in
                  / Register</a></li>
              <!-- Legal pages (item 93): now published, no longer "coming soon". -->
              <li><a href="{{base}}Privacy.html" class="text-sm sm:text-base hover:text-white transition-colors">Privacy
                  Policy</a></li>
              <li><a href="{{base}}Terms.html" class="text-sm sm:text-base hover:text-white transition-colors">Terms of
                  Use</a></li>
              <li><a href="{{base}}Disclaimer.html" class="text-sm sm:text-base hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
            <ul class="nesp-foot-contact flex flex-col gap-4 mb-6">
              <li class="flex items-start gap-3"><span
                  class="material-symbols-outlined text-[20px] text-white/70 flex-shrink-0">mail</span><a
                  href="mailto:info@osip.gov.ng"
                  class="text-sm sm:text-base hover:text-white transition-colors break-all">info@osip.gov.ng</a></li>
              <!-- UX-TEC-06 (15 Sep 2026): the placeholder phone line (not a dialable
                   number) is removed until a monitored number is confirmed.
                   To restore, add a <li> here matching the email row with a call icon. -->
              <li class="flex items-start gap-3"><span
                  class="material-symbols-outlined text-[20px] text-white/70 flex-shrink-0">location_on</span><span
                  class="text-sm sm:text-base">Federal Ministry of Power, Abuja, Nigeria</span></li>
            </ul>
            <p class="nesp-foot-social-title text-white text-xs font-bold uppercase tracking-widest mb-4">Social Media Links <em>Coming soon</em></p>
            <div class="nesp-foot-socials flex flex-wrap gap-3"><span aria-label="LinkedIn"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.78v2.19h.07c.67-1.2 2.3-2.46 4.74-2.46C21.6 7.73 24 10 24 14.4V24h-5v-8.5c0-2.03-.73-3.42-2.55-3.42-1.39 0-2.22.94-2.58 1.85-.13.32-.17.77-.17 1.22V24h-5V8z" />
                </svg></span><span aria-label="X"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg></span>
              <span aria-label="Instagram"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg></span>
              <span aria-label="YouTube"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg></span>
              <span aria-label="Facebook"
                class="w-9 h-9 border border-white/20 rounded flex items-center justify-center hover:border-white/50 hover:text-white transition-colors"><svg
                  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.325V1.325C24 .593 23.408 0 22.675 0z" />
                </svg></span>
            </div>
          </div>
        </div>
        <div class="nesp-foot-disclaimer max-w-[1440px] mx-auto">
          <p class="nesp-foot-disclaimer-title"><span class="material-symbols-outlined">info</span>General information
            disclaimer</p>
          <p>The content on this platform is published for general information only. It does not constitute legal, tax,
            financial or investment advice, and it is not an offer, solicitation or commitment of any kind. Figures,
            timelines and regulatory references are indicative and may change. Incentives, tariffs, licences and
            financing mechanisms described here are administered by the responsible agencies and institutions named
            alongside them &mdash; a project may be eligible only where it meets that body's own published criteria, and
            eligibility is determined by that body, not by OSIP. Confirm the current position with the relevant agency,
            and take independent professional advice, before making an investment decision.</p>
        </div>
        <div
          class="nesp-foot-bottom max-w-[1440px] mx-auto border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span class="text-xs sm:text-sm">© 2026 OSIP Nigeria. All rights reserved.</span><span
            class="text-xs sm:text-sm">Designed for Nigeria Federal Ministry of Power.</span>
        </div>
      </footer>`;

  var mount = document.getElementById('site-footer');
  if (!mount) return;
  // ---- Self-contained footer stylesheet -------------------------------------
  // Every page in this repo ships its OWN frozen Tailwind build, and they do not
  // all contain the same utilities. The shared footer markup was therefore
  // rendering differently from page to page: on homepage.html the Quick Links list
  // came out as two columns with NO gaps (lg:grid-cols-1, gap-x-6 and gap-y-3 are
  // all missing from that build) while on Contact.html it was one column with
  // gaps, the body font fell back to the system stack instead of Inter, and the
  // social tiles had a 4px radius instead of 2px.
  //
  // So the footer no longer relies on the host page's build. Everything it needs
  // is stated here, scoped to .nesp-footer. The Tailwind classes stay in the
  // markup only so the file still reads like the rest of the site.
  // ---- Redesign (11 Sep 2026) -----------------------------------------------
  // The footer follows the redesigned pages: the deep green ground with a gold
  // hairline along its top. 14 Sep 2026: Inter throughout, as on the homepage.
  // The title, brand line, links and contact lines that were set in Newsreader
  // are Inter held to the serif's x-height (font-size-adjust .515), so nothing
  // grows or rewraps; the title is one step heavier. Stated here for every
  // page, and Inter is loaded here when the host page has not loaded it. The
  // previous footer is kept in OSIP/Backups/footer/.
  if (!document.getElementById('osip-rd-fonts') && !document.querySelector('link[href*="family=Inter"]')) {
    var faces = document.createElement('link');
    faces.id = 'osip-rd-fonts';
    faces.rel = 'stylesheet';
    faces.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    (document.head || document.documentElement).appendChild(faces);
  }
  if (!document.getElementById('nesp-foot-style')) {
    var st = document.createElement('style');
    st.id = 'nesp-foot-style';
    st.textContent = `
      .nesp-footer{position:relative;overflow:hidden;background:#0b2a1f;color:rgba(243,239,230,.72);font-family:Inter,system-ui,sans-serif;padding:4.5rem 1.25rem 2rem}
      .nesp-footer::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(217,165,32,0),rgba(217,165,32,.75) 18%,rgba(217,165,32,.75) 82%,rgba(217,165,32,0))}
      .nesp-footer::after{content:"";position:absolute;right:-12%;top:-45%;width:60%;height:130%;background:radial-gradient(closest-side,rgba(247,190,38,.08),rgba(247,190,38,0));pointer-events:none}
      .nesp-footer>*{position:relative;z-index:1}
      .nesp-footer *{box-sizing:border-box}
      .nesp-footer .nesp-foot-top{max-width:1440px;margin:0 auto 3rem;display:grid;grid-template-columns:minmax(0,1fr);gap:2.75rem}
      .nesp-footer h3{font-family:Inter,system-ui,sans-serif;font-size-adjust:.515;color:#f3efe6;font-weight:500;font-size:2.25rem;line-height:1.06;letter-spacing:-.022em;margin:0 0 1.25rem;max-width:16ch}
      .nesp-footer .nesp-foot-brand p{font-family:Inter,system-ui,sans-serif;font-size-adjust:.515;font-size:1.0625rem;line-height:1.72;color:rgba(243,239,230,.66);margin:0;max-width:40rem}
      .nesp-footer h4,.nesp-footer .nesp-foot-social-title{font-family:Inter,system-ui,sans-serif;color:#d9a520;font-size:.6875rem;font-weight:500;text-transform:uppercase;letter-spacing:.24em;margin:0 0 1.375rem}
      .nesp-footer ul{list-style:none;margin:0;padding:0}
      .nesp-footer .nesp-foot-links{display:grid;grid-template-columns:minmax(0,1fr);row-gap:.75rem}
      /* Links carry an underline that draws in from the left on hover. */
      .nesp-footer a{color:rgba(243,239,230,.82);text-decoration:none;font-family:Inter,system-ui,sans-serif;font-size-adjust:.515;font-size:1.0625rem;line-height:1.4;background-image:linear-gradient(currentColor,currentColor);background-size:0 1px;background-repeat:no-repeat;background-position:0 100%;transition:color .3s ease,background-size .5s cubic-bezier(.16,1,.3,1)}
      .nesp-footer a:hover{color:#ffffff;background-size:100% 1px}
      .nesp-footer a[href^="mailto:"]{word-break:break-all}
      .nesp-footer .nesp-foot-contact{display:flex;flex-direction:column;gap:1rem;margin-bottom:2.25rem}
      .nesp-footer .nesp-foot-contact li{display:flex;align-items:flex-start;gap:.75rem;font-family:Inter,system-ui,sans-serif;font-size-adjust:.515;font-size:1.0625rem;line-height:1.45;color:rgba(243,239,230,.82)}
      .nesp-footer .nesp-foot-contact .material-symbols-outlined{font-size-adjust:none;font-size:19px;color:#d9a520;flex:0 0 auto;margin-top:2px;font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 20}
      .nesp-footer .nesp-foot-socials{display:flex;flex-wrap:wrap;gap:.625rem}
      .nesp-footer .nesp-foot-socials>*{width:2.5rem;height:2.5rem;border:1px solid rgba(243,239,230,.18);border-radius:999px;display:inline-flex;align-items:center;justify-content:center;color:rgba(243,239,230,.55);transition:border-color .3s ease,color .3s ease}
      .nesp-footer .nesp-foot-socials>*:hover{border-color:rgba(217,165,32,.65);color:#f3efe6}
      .nesp-footer .nesp-foot-socials svg{width:.9375rem;height:.9375rem}
      .nesp-footer .nesp-foot-social-title em,.nesp-foot-soon em{font-style:normal;font-family:Inter,system-ui,sans-serif;font-size:9px;line-height:1.8;letter-spacing:.12em;text-transform:uppercase;border:1px dashed rgba(243,239,230,.24);border-radius:999px;padding:0 7px;color:rgba(243,239,230,.55);margin-left:6px;white-space:nowrap;vertical-align:middle}
      /* CON-03 - general information disclaimer, site-wide via the shared footer. */
      .nesp-footer .nesp-foot-disclaimer{max-width:1440px;margin:0 auto 1.75rem;border-top:1px solid rgba(243,239,230,.1);padding-top:1.75rem}
      .nesp-footer .nesp-foot-disclaimer p{font-family:Inter,system-ui,sans-serif;font-size:.75rem;line-height:1.75;color:rgba(243,239,230,.5);margin:0;max-width:none}
      .nesp-footer .nesp-foot-disclaimer-title{display:flex;align-items:center;gap:.5rem;color:rgba(243,239,230,.74)!important;font-weight:500;text-transform:uppercase;letter-spacing:.2em;font-size:.625rem!important;margin:0 0 .625rem!important}
      .nesp-footer .nesp-foot-disclaimer-title .material-symbols-outlined{font-size:14px;color:#d9a520}
      .nesp-footer .nesp-foot-bottom{max-width:1440px;margin:0 auto;border-top:1px solid rgba(243,239,230,.1);padding-top:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:.75rem;text-align:center}
      .nesp-footer .nesp-foot-bottom span{font-family:Inter,system-ui,sans-serif;font-size:.8125rem;color:rgba(243,239,230,.5)}
      /* Policy pages that do not exist yet are labels, not links (HP-08). */
      .nesp-foot-soon{display:block;font-family:Inter,system-ui,sans-serif;font-size-adjust:.515;font-size:1.0625rem;line-height:1.4;color:rgba(243,239,230,.45)}
      .nesp-foot-soon em{display:inline-block;margin-left:0;margin-top:4px}
      @media (width >=40rem){
        .nesp-footer{padding:5.5rem 2rem 2.25rem}
        .nesp-footer .nesp-foot-top{grid-template-columns:repeat(2,minmax(0,1fr))}
        .nesp-footer .nesp-foot-brand{grid-column:span 2}
        .nesp-footer h3{font-size:2.875rem}
        .nesp-footer .nesp-foot-bottom{flex-direction:row;text-align:left}
      }
      @media (width >=64rem){
        .nesp-footer{padding:7rem 2.5rem 2.5rem}
        .nesp-footer .nesp-foot-top{grid-template-columns:minmax(0,1.55fr) minmax(0,1fr) minmax(0,.85fr);gap:4.5rem;margin-bottom:4.5rem}
        .nesp-footer .nesp-foot-brand{grid-column:auto}
        .nesp-footer h3{font-size:3.375rem}
      }`;
    document.head.appendChild(st);
  }

  mount.outerHTML = HTML.replace(/\{\{base\}\}/g, base);
})();
