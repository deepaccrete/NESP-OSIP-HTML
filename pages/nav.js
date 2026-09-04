// Shared site header/nav — single source of truth for every page's top navigation.
//
// Usage on any page:
//   1. Put a mount point where the nav should render:  <div id="site-nav"></div>
//   2. Load this script (order doesn't matter — investflow.js defers its wiring
//      to DOMContentLoaded, so the injected "Invest Now" link is still picked up):
//         from pages/*:      <script src="nav.js"></script>
//         from the root:     <script src="pages/nav.js"></script>
//
// Like footer.js, internal links resolve from this script's own URL, so paths
// work whether the host page is at the site root (homepage.html) or in pages/.
// Keep this the ONLY place the header markup + hover-dropdown data live.
(function () {
  var base = 'pages/'; // fallback if currentScript is unavailable
  try {
    var src = (document.currentScript && document.currentScript.src) || '';
    if (src) base = src.slice(0, src.lastIndexOf('/') + 1); // -> ".../pages/"
  } catch (e) { /* keep fallback */ }

  var HOME = base + '../homepage.html';
  var url = {
    sectors: base + 'Sector.html',
    // NAV-03: the state overview. Live profiles are links there, every state
    // still in the pipeline is marked "profile in preparation".
    states: base + 'States.html',
    opportunities: base + 'Opportunities.html',
    regulations: base + 'Regulation.html',
    data: base + 'Data.html',
    news: base + 'News.html',
    contact: base + 'Contact.html',
    profile: base + 'AboutMe.html',
    // "Invest Now" now opens the InvestorMatch quiz rather than the old
    // InvestNow1-3 popup flow (see investflow.js).
    invest: base + 'InvestorMatch.html',
    faqs: base + 'FAQs.html',
    events: base + 'Event.html',
    announcements: base + 'Announcements.html'
  };

  // NAV-01 asks for: Invest, Sectors, States, Regulations, Financing,
  // Data & Insights, News & Events, Support.
  //
  // FINANCING still has no page in this build. Rather than send people to the
  // Coming Soon placeholder (HP-08/HP-09 rule that out) it renders blurred and
  // unclickable, so the full menu the client asked for is visible while it stays
  // obvious which part is not built yet. Give an item an href here and it
  // becomes a normal link with no other change.
  // STATES stopped being one of those at NAV-03, when States.html was added.
  var TOP = [
    { label: 'INVEST', href: url.opportunities },
    { label: 'SECTORS', href: url.sectors },
    { label: 'STATES', href: url.states },
    { label: 'REGULATIONS', href: url.regulations },
    { label: 'FINANCING', href: null },
    { label: 'DATA & INSIGHTS', href: url.data },
    { label: 'NEWS & EVENTS', href: url.news },
    { label: 'SUPPORT', href: url.contact }
  ];

  // ---- Hover-dropdown menu data (single source) --------------------------
  // Every menu renders identically: one column, capped at 320px, scrolling
  // with a visible bar once it holds more than that fits. There is nothing to
  // opt into — a short menu simply never reaches the cap, so DATA and
  // REGULATIONS look exactly as they always did, while NEWS and SECTORS scroll
  // instead of running down the page. The panel used to have a `wide` variant
  // too; it is gone, because a 660px three-column panel cannot coexist with a
  // capped single-column scrolling one and the two silently fought.
  //
  // `compact: true` is still honoured: it drops the item descriptions and
  // tightens the rows.
  var MENU = {
    'SECTORS': {
      head: 'Strategic Priority Sectors', items: [
        { t: 'Solar', d: 'Utility-scale and distributed solar PV generation projects.', href: base + 'DetailedSector.html' },
        { t: 'Bioenergy', d: 'Biomass, biogas & waste-to-energy power generation.', href: base + 'Bioenergy.html' },
        { t: 'Wind', d: 'Onshore wind generation across high-potential corridors.', href: base + 'Wind.html' },
        { t: 'Green Mobility', d: 'Electric vehicles, charging infrastructure & clean transport.', href: base + 'GreenMobility.html' },
        { t: 'Clean Cooking', d: 'Improved cookstoves & clean fuel alternatives to biomass.', href: base + 'CleanCooking.html' },
        { t: 'Storage', d: 'Battery energy storage systems (BESS) & grid balancing.', href: base + 'Storage.html' },
        { t: 'Small Hydro', d: 'Run-of-river & small-scale hydropower generation.', href: base + 'SmallHydro.html' },
        { t: 'Energy Efficiency', d: 'Demand-side efficiency, ISO 50001 & industrial energy savings.', href: base + 'EnergyEfficiency.html' },
        { t: 'Green Hydrogen', d: 'Electrolysis-based hydrogen production & export potential.', href: base + 'GreenHydrogen.html' },
        { t: 'Agricultural PUE', d: 'Productive use of energy for agro-processing & rural livelihoods.', href: base + 'AgriculturePUE.html' }
      ]
    },
    'INVEST': {
      head: 'Investment Opportunities', items: [
        { t: 'Renewable Generation', d: 'Solar, wind & off-grid investment projects.', href: base + 'Opportunities.html' },
        { t: 'Grid Infrastructure', d: 'Transmission & distribution tenders.', href: base + 'Opportunities.html' },
        { t: 'Energy Storage', d: 'Battery & storage deployment projects.', href: base + 'Opportunities.html' },
        { t: 'Browse all opportunities', d: 'View every open opportunity.', href: base + 'Opportunities.html' },
        { t: 'Investor match', d: 'Answer a few questions and get matched.', href: base + 'InvestorMatch.html' }
      ]
    },
    'SUPPORT': {
      head: 'Help and Support', items: [
        { t: 'Contact us', d: 'Reach the OSIP team directly.', href: base + 'Contact.html' },
        { t: 'FAQs', d: 'Answers to the questions we are asked most.', href: base + 'FAQs.html' },
        { t: 'OSIP Help Desk', d: 'Investor support services.', href: base + 'Contact.html' }
      ]
    },
    'REGULATIONS': {
      head: 'Regulations & Compliance', items: [
        { t: 'Legislation & Acts', d: 'Electricity Act, PIA & core energy laws.', href: base + 'Regulation.html' },
        { t: 'Technical Guidelines', d: 'Licensing & mini-grid rules.', href: base + 'Regulation.html' },
        { t: 'Tax & Fiscal Policy', d: 'Incentives & pioneer status.', href: base + 'Regulation.html' },
        { t: 'Regulatory Bodies', d: 'NERC, REA, NIPC & more.', href: base + 'Regulation.html' }
      ]
    },
    'DATA & INSIGHTS': {
      head: 'Data & Insights', items: [
        { t: 'Investment & Capacity', d: 'Investment and capacity indicators by sector.', href: base + 'Data.html' },
        { t: 'State-wise Performance', d: 'Project, capacity & growth by state.', href: base + 'Data.html' },
        { t: 'Open Data Downloads', d: 'CSV, XLSX & API datasets.', href: base + 'Data.html' }
      ]
    },
    'NEWS & EVENTS': {
      head: 'News and Events', items: [
        { t: 'Policy & Legislation', d: 'Regulatory and policy developments.', href: base + 'News.html' },
        { t: 'Power & Energy', d: 'Generation, supply & market news.', href: base + 'News.html' },
        { t: 'Renewables', d: 'Solar, wind & clean-energy coverage.', href: base + 'News.html' },
        { t: 'Oil & Gas', d: 'Upstream and downstream updates.', href: base + 'News.html' },
        { t: 'Infrastructure', d: 'Projects, grids & facilities.', href: base + 'News.html' },
        { t: 'Announcements', d: 'Calls, deadlines & official notices.', href: base + 'Announcements.html' },
        { t: 'Events', d: 'Forums, workshops & roadshows.', href: base + 'Event.html' }
      ]
    }
  };

  // Which top-level tab is "active" for a given page (basename -> label).
  var PAGE_ACTIVE = {
    'sector.html': 'SECTORS', 'detailedsector.html': 'SECTORS',
    'wind.html': 'SECTORS', 'storage.html': 'SECTORS', 'smallhydro.html': 'SECTORS',
    'greenmobility.html': 'SECTORS', 'energyefficiency.html': 'SECTORS', 'cleancooking.html': 'SECTORS',
    'bioenergy.html': 'SECTORS', 'agriculturepue.html': 'SECTORS', 'greenhydrogen.html': 'SECTORS',
    'regulation.html': 'REGULATIONS', 'data.html': 'DATA & INSIGHTS',
    'news.html': 'NEWS & EVENTS', 'newsindetail.html': 'NEWS & EVENTS',
    'announcements.html': 'NEWS & EVENTS', 'individualannouncement.html': 'NEWS & EVENTS',
    'event.html': 'NEWS & EVENTS', 'individualevent.html': 'NEWS & EVENTS',
    'opportunities.html': 'INVEST', 'opportunitiesnew.html': 'INVEST',
    'detailedoppnew.html': 'INVEST', 'investormatch.html': 'INVEST',
    'contact.html': 'SUPPORT', 'faqs.html': 'SUPPORT'
  };

  // ---- Header markup -----------------------------------------------------
  // Eight top-level items do not fit at the old px-5/13px, so the row is tightened
  // and the desktop menu now appears at xl (1280px) instead of lg. Below that the
  // hamburger takes over, which it already did well.
  // `nesp-top` marks a desktop top-level item: the dropdown injector keys off that
  // rather than off a padding utility, so spacing can change without breaking it.
  var linkCls = 'nesp-top relative px-3.5 py-7 text-[12px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition-all text-[#047857]';
  var mLinkCls = 'block px-2 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#047857]';

  function top(item) {
    if (!item.href) {
      return '<li><span class="nesp-nav-soon ' + linkCls + '" aria-disabled="true"' +
        ' title="' + item.label.charAt(0) + item.label.slice(1).toLowerCase() + ' is not published yet">' +
        item.label + '</span></li>';
    }
    return '<li><a href="' + item.href + '" class="' + linkCls + '">' + item.label + '</a></li>';
  }

  function mtop(item) {
    if (!item.href) {
      return '<li><span class="nesp-nav-soon ' + mLinkCls + '" aria-disabled="true">' + item.label +
        '<em>Coming soon</em></span></li>';
    }
    return '<li><a href="' + item.href + '" class="' + mLinkCls + '">' + item.label + '</a></li>';
  }

  var topItems = TOP.map(top).join('');
  var mobileItems = TOP.map(mtop).join('');

  var NAV =
    '<nav class="bg-white border-b border-gray-100 sticky top-0 z-50">' +
    '<div class="nesp-nav-wrap max-w-[1440px] mx-auto px-6 lg:px-8">' +
    '<div class="nesp-nav-row flex items-center justify-between h-[74px]">' +
    // Both logos sit together on the left, separated by a hairline so they
    // read as two marks rather than one wordmark. The partner logo is stepped
    // down to h-8 here: at its old h-9 it out-weighed the OSIP mark it now
    // stands beside, which it never did alone on the far right.
    '<div class="nesp-nav-brand flex items-center gap-10">' +
    '<div class="nesp-nav-marks flex items-center gap-4">' +
    '<img alt="Partner" class="h-8 w-auto object-contain" src="' + base + 'logoNESP.png">' +
    '<span class="w-px h-6 bg-gray-200" aria-hidden="true"></span>' +
    '<a href="' + HOME + '"><img alt="Logo" class="h-5 w-auto" src="' + base + 'Text.png"></a>' +
    '</div>' +
    '<ul class="nesp-nav-top hidden xl:flex items-center">' + topItems +
    '</ul></div>' +
    '<div class="nesp-nav-actions hidden xl:flex items-center gap-5">' +
    // The standalone "Contact" link is gone: SUPPORT covers it in the menu now.
    '<a href="' + url.invest + '" class="bg-[#047857] text-white px-6 py-2.5 text-[13px] font-semibold rounded-sm transition hover:opacity-90">Invest Now</a>' +
    // Account: icon only, 36px, outlined rather than filled. With the partner
    // logo moved left this is the single mark on the right, so the row ends on
    // one round shape instead of an icon and a logo competing side by side.
    '<a href="' + url.profile + '" title="My Profile" aria-label="My Profile"' +
    ' class="w-9 h-9 flex items-center justify-center rounded-full border border-[#047857]/25 text-[#047857] transition hover:bg-[#047857] hover:text-white hover:border-[#047857]">' +
    '<span class="material-symbols-outlined text-[20px]">person</span></a>' +
    '</div>' +
    '<button id="mobile-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"' +
    ' class="nesp-nav-toggle xl:hidden text-[#047857]"><span class="nesp-nav-toggle-icon" aria-hidden="true">☰</span></button>' +
    '</div>' +
    '<div id="mobile-nav" class="hidden xl:hidden border-t border-gray-100 py-3"><ul class="flex flex-col">' +
    mobileItems +
    '<li class="nesp-m-group"><a href="' + url.profile + '" class="block px-2 py-3 text-sm font-semibold text-[#047857]">My Profile</a></li>' +
    '<li class="px-2 pt-2"><a href="' + url.invest + '" class="block text-center bg-[#047857] text-white px-6 py-2.5 text-[13px] font-semibold rounded-sm hover:opacity-90">Invest Now</a></li>' +
    '</ul></div>' +
    '</div></nav>';

  // ---- Dropdown CSS (self-contained; safe to duplicate on pages that already have it) ----
  if (!document.getElementById('nesp-nav-style')) {
    var st = document.createElement('style');
    st.id = 'nesp-nav-style';
    st.textContent = [
      '.nesp-has-menu{position:relative}',
      '.nesp-dropdown{position:absolute;top:100%;left:50%;min-width:300px;background:#fff;border:1px solid #e7e7e7;border-radius:12px;box-shadow:0 18px 40px -16px rgba(6,20,16,.22);margin-top:8px;padding:10px;opacity:0;visibility:hidden;transform:translateX(-50%) translateY(8px);transition:opacity .22s ease,transform .22s ease,visibility .22s ease;z-index:60}',
      '.nesp-has-menu:hover .nesp-dropdown,.nesp-dropdown:hover{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}',
      '.nesp-dropdown::before{content:"";position:absolute;top:-12px;left:0;right:0;height:14px}',
      '.nesp-dropdown::after{content:"";position:absolute;top:-7px;left:50%;width:13px;height:13px;background:#fff;border-top:1px solid #e7e7e7;border-left:1px solid #e7e7e7;border-radius:3px 0 0 0;transform:translateX(-50%) rotate(45deg)}',
      '.nesp-menu-head{font-family:Manrope,sans-serif;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9aa39e;padding:8px 12px 6px}',
      '.nesp-menu-item{display:block;padding:10px 12px;border-radius:8px;text-decoration:none;transition:background .15s ease}',
      '.nesp-menu-item:hover{background:#f1f8f4}',
      '.nesp-menu-item .t{display:block;font-family:Manrope,sans-serif;font-size:13.5px;font-weight:700;color:#15241d}',
      '.nesp-menu-item:hover .t{color:#047857}',
      '.nesp-menu-item .d{display:block;font-size:11.5px;line-height:1.45;color:#6b746f;margin-top:2px}',
      '.nesp-has-menu>a::after{content:"";display:inline-block;width:6px;height:6px;margin-left:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);opacity:.6;vertical-align:middle;transition:transform .2s ease}',
      '.nesp-has-menu:hover>a::after{transform:translateY(0) rotate(225deg)}',
      '.nesp-menu-list{display:grid;grid-template-columns:1fr}',
      '.nesp-dropdown--compact .nesp-menu-item{padding:8px 12px}',
      // Single-column, height-capped, scrollable list — applied to EVERY
      // dropdown. The scrollbar is deliberately VISIBLE: the list
      // is cut off mid-item with no other cue, so hiding it left readers with
      // no way to know the menu continued past what they could see. Kept thin
      // and in the palette so it reads as part of the panel.
      // overscroll-behavior stops the page underneath scrolling on once the
      // list reaches its end.
      '.nesp-dropdown--scroll .nesp-menu-list{grid-template-columns:1fr;max-height:320px;overflow-y:auto;overscroll-behavior:contain;padding-right:6px;scrollbar-width:thin;scrollbar-color:#cbd8d2 transparent}',
      '.nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar{width:6px}',
      '.nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-track{background:transparent;margin:6px 0}',
      '.nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb{background:#cbd8d2;border-radius:999px}',
      '.nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb:hover{background:#047857}',

      // ---- Responsive header ------------------------------------------------
      // The hamburger is a real 42px tap target (it was a bare glyph before) and
      // swaps its own icon, so "open" is visible rather than inferred.
      // NOTE: no `display` in the base rule. This stylesheet is unlayered and
      // Tailwind's utilities live in @layer utilities, so an unlayered
      // `display:inline-flex` here would beat `lg:hidden` and leak the
      // hamburger onto desktop. Only turn it on below the lg breakpoint.
      '.nesp-nav-toggle{align-items:center;justify-content:center;width:42px;height:42px;margin-right:-8px;border-radius:8px;font-size:26px;font-weight:300;line-height:1;transition:background .18s ease,color .18s ease}',
      '.nesp-nav-toggle:hover{background:#f1f8f4}',
      '.nesp-nav-toggle-icon{display:block;pointer-events:none}',
      // NAV-01: menu entries with no page yet. Blurred and unclickable rather
      // than linked to the Coming Soon placeholder.
      '.nesp-nav-soon{opacity:.42;filter:blur(.6px);cursor:default;user-select:none}',
      '.nesp-nav-soon:hover{opacity:.6;filter:blur(.3px)}',
      '#mobile-nav .nesp-nav-soon{display:flex;align-items:center;gap:8px}',
      '#mobile-nav .nesp-nav-soon em{font-style:normal;font-size:9.5px;letter-spacing:.08em;border:1px dashed #cfd8d4;border-radius:999px;padding:0 7px;color:#6b746f;filter:blur(0)}',
      // The desktop/mobile switch is stated HERE, not left to `hidden xl:flex`.
      // homepage.html's frozen Tailwind build has lg:* but NO xl:* utilities, so
      // relying on them hid the whole menu at 1440 and leaked the hamburger onto
      // desktop. These rules are unlayered, so they hold on every page whether it
      // ships a frozen build or the CDN.
      '.nesp-nav-top{display:none;gap:0}',
      // Same reason as the breakpoint above: px-3.5, text-[12px] and
      // tracking-[0.08em] are not in homepage.html's frozen build, so the items
      // rendered with no padding at all and ran into each other. Stated here.
      '.nesp-nav-top .nesp-top{position:relative;display:inline-block;padding:1.75rem .875rem;font-size:12px;font-weight:700;line-height:1;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;color:#047857;text-decoration:none;transition:color .2s ease,opacity .2s ease}',
      '.nesp-nav-actions{display:none}',
      // "Invest Now" broke onto two lines on every CDN-Tailwind page once the
      // real webfont loaded. Stated here rather than as a utility class so it
      // holds on the frozen-build pages too.
      '.nesp-nav-actions a{white-space:nowrap}',
      '.nesp-nav-toggle{display:inline-flex}',
      '@media (width >=78rem){',
      '.nesp-nav-top{display:flex;align-items:center}',
      '.nesp-nav-actions{display:flex;align-items:center;gap:1.25rem}',
      '.nesp-nav-toggle{display:none}',
      '#mobile-nav{display:none}',
      '}',
      '@media (width >=90rem){.nesp-nav-top .nesp-top{padding-left:1.2rem;padding-right:1.2rem;font-size:12.5px}}',
      // A long menu must not push the page: cap it to the viewport and scroll.
      '#mobile-nav{max-height:calc(100svh - 74px);overflow-y:auto;overscroll-behavior:contain}',
      '#mobile-nav a{border-radius:6px}',
      // Contact + My Profile read as account business rather than site sections,
      // so a hairline sets them off from the uppercase nav list above.
      '#mobile-nav .nesp-m-group{margin-top:.5rem;padding-top:.5rem;border-top:1px solid #f0f2f1}',
      '#mobile-nav a:hover{background:#f1f8f4}',
      // Tablet / large phone: tighten the gutters the desktop bar assumes.
      '@media (width < 78rem){.nesp-nav-brand{gap:0}}',
      // Phone: shorter bar, smaller marks, so the logos stop crowding the toggle.
      '@media (width < 40rem){' +
      '.nesp-nav-wrap{padding-left:1rem;padding-right:1rem}' +
      '.nesp-nav-row{height:62px}' +
      '.nesp-nav-marks{gap:.625rem}' +
      '.nesp-nav-marks img[alt="Partner"]{height:1.5rem}' +
      '.nesp-nav-marks img[alt="Logo"]{height:.9375rem}' +
      '#mobile-nav{max-height:calc(100svh - 62px)}' +
      '}',
      // Very narrow (<=360px): drop the partner mark rather than let the row wrap.
      '@media (width < 22.5rem){.nesp-nav-marks img[alt="Partner"],.nesp-nav-marks span[aria-hidden]{display:none}}'
    ].join('');
    document.head.appendChild(st);
  }

  // ---- Inject + wire -----------------------------------------------------
  var mount = document.getElementById('site-nav');
  if (!mount) return;
  mount.outerHTML = NAV;
  var nav = document.querySelector('nav.bg-white');
  if (!nav) return;

  var file = (location.pathname.split('/').pop() || '').toLowerCase();
  var active = PAGE_ACTIVE[file];

  nav.querySelectorAll('a').forEach(function (a) {
    if ((a.className || '').indexOf('nesp-top') === -1) return; // desktop top-level only
    var label = (a.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();

    // Active-tab gold underline.
    if (active && label === active) {
      var bar = document.createElement('span');
      bar.className = 'absolute left-0 bottom-4 w-full h-[2px] bg-[#FFB955]';
      a.appendChild(bar);
    }

    // Hover dropdown.
    var menu = MENU[label];
    if (!menu) return;
    var li = a.closest('li'); if (!li) return;
    li.classList.add('nesp-has-menu');
    var items = '';
    menu.items.forEach(function (it) {
      items += '<a class="nesp-menu-item" href="' + it.href + '"><span class="t">' + it.t + '</span>' +
        (it.d && !menu.compact ? '<span class="d">' + it.d + '</span>' : '') + '</a>';
    });
    var panel = document.createElement('div');
    // --scroll is unconditional: see the note on MENU above. Short menus
    // never reach the cap, so this changes nothing for them.
    panel.className = 'nesp-dropdown nesp-dropdown--scroll' + (menu.compact ? ' nesp-dropdown--compact' : '');
    panel.innerHTML = '<div class="nesp-menu-head">' + menu.head + '</div><div class="nesp-menu-list">' + items + '</div>';
    li.appendChild(panel);
  });

  // Mobile hamburger toggle.
  //
  // The panel's open/closed state now drives three things at once : the panel
  // itself, the button's icon (hamburger <-> cross) and `aria-expanded`, so
  // they can never disagree. Everything routes through setOpen() for that
  // reason; don't toggle the 'hidden' class from anywhere else.
  var toggle = nav.querySelector('#mobile-nav-toggle');
  var mobile = nav.querySelector('#mobile-nav');
  if (toggle && mobile) {
    var icon = toggle.querySelector('.nesp-nav-toggle-icon') || toggle;

    function setOpen(open) {
      mobile.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      icon.textContent = open ? '✕' : '☰';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(mobile.classList.contains('hidden'));
    });

    // Tapping a destination should close the sheet behind you.
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Tap-away and Esc, the two things people try when a mobile menu is open.
    document.addEventListener('click', function (e) {
      if (mobile.classList.contains('hidden')) return;
      if (mobile.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') setOpen(false);
    });

    // Crossing into desktop must also reset the icon, not just hide the panel.
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1248px)').matches) setOpen(false);
    });
  }
})();
