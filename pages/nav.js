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
    opportunities: base + 'Opportunities.html',
    regulations: base + 'Regulation.html',
    data: base + 'Data.html',
    news: base + 'News.html',
    contact: base + 'Contact.html'
  };

  // ---- Hover-dropdown menu data (single source) --------------------------
  // Set `wide: true` on a menu to render its items in two columns.
  var MENU = {
    'SECTORS': {
      head: 'Strategic Priority Sectors', wide: true, scroll: true, items: [
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
    'OPPORTUNITIES': {
      head: 'Investment Opportunities', items: [
        { t: 'Renewable Generation', d: 'Solar, wind & off-grid investment projects.', href: base + 'Opportunities.html' },
        { t: 'Grid Infrastructure', d: 'Transmission & distribution tenders.', href: base + 'Opportunities.html' },
        { t: 'Energy Storage', d: 'Battery & storage deployment projects.', href: base + 'Opportunities.html' },
        { t: 'Browse all opportunities', d: 'View every open opportunity.', href: base + 'Opportunities.html' }
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
    'DATA': {
      head: 'Data & Insights', items: [
        { t: 'Investment & Capacity', d: 'Live metrics across energy sectors.', href: base + 'Data.html' },
        { t: 'State-wise Performance', d: 'Project, capacity & growth by state.', href: base + 'Data.html' },
        { t: 'Open Data Downloads', d: 'CSV, XLSX & API datasets.', href: base + 'Data.html' }
      ]
    },
    'NEWS': {
      head: 'News Categories', items: [
        { t: 'Policy & Legislation', d: 'Regulatory and policy developments.', href: base + 'News.html' },
        { t: 'Power & Energy', d: 'Generation, supply & market news.', href: base + 'News.html' },
        { t: 'Renewables', d: 'Solar, wind & clean-energy coverage.', href: base + 'News.html' },
        { t: 'Oil & Gas', d: 'Upstream and downstream updates.', href: base + 'News.html' },
        { t: 'Infrastructure', d: 'Projects, grids & facilities.', href: base + 'News.html' }
      ]
    }
  };

  // Which top-level tab is "active" for a given page (basename -> label).
  var PAGE_ACTIVE = {
    'sector.html': 'SECTORS', 'detailedsector.html': 'SECTORS',
    'wind.html': 'SECTORS', 'storage.html': 'SECTORS', 'smallhydro.html': 'SECTORS',
    'greenmobility.html': 'SECTORS', 'energyefficiency.html': 'SECTORS', 'cleancooking.html': 'SECTORS',
    'bioenergy.html': 'SECTORS', 'agriculturepue.html': 'SECTORS', 'greenhydrogen.html': 'SECTORS',
    'regulation.html': 'REGULATIONS', 'data.html': 'DATA',
    'news.html': 'NEWS', 'newsindetail.html': 'NEWS',
    'opportunities.html': 'OPPORTUNITIES', 'opportunitiesnew.html': 'OPPORTUNITIES',
    'detailedoppnew.html': 'OPPORTUNITIES', 'contact.html': 'CONTACT'
  };

  // ---- Header markup -----------------------------------------------------
  var linkCls = 'relative px-5 py-7 text-[13px] font-bold uppercase tracking-[0.12em] transition-all text-[#047857]';
  var mLinkCls = 'block px-2 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#047857]';
  function top(label, href) { return '<li><a href="' + href + '" class="' + linkCls + '">' + label + '</a></li>'; }
  function mtop(label, href) { return '<li><a href="' + href + '" class="' + mLinkCls + '">' + label + '</a></li>'; }

  var NAV =
    '<nav class="bg-white border-b border-gray-100 sticky top-0 z-50">' +
    '<div class="max-w-[1440px] mx-auto px-6 lg:px-8">' +
    '<div class="flex items-center justify-between h-[74px]">' +
    '<div class="flex items-center gap-10"><a href="' + HOME + '"><img alt="Logo" class="h-5 w-auto" src="' + base + 'Text.png"></a>' +
    '<ul class="hidden lg:flex items-center">' +
    top('SECTORS', url.sectors) + top('OPPORTUNITIES', url.opportunities) + top('REGULATIONS', url.regulations) +
    top('DATA', url.data) + top('NEWS', url.news) +
    '</ul></div>' +
    '<div class="hidden lg:flex items-center gap-5">' +
    '<a href="' + url.contact + '" class="text-sm font-semibold text-[#047857]">Contact</a>' +
    '<a href="' + url.opportunities + '" class="bg-[#047857] text-white px-6 py-2.5 text-[13px] font-semibold rounded-sm transition hover:opacity-90">Invest Now</a>' +
    '<img alt="Partner" class="h-9 object-contain" src="' + base + 'logoNESP.png"></div>' +
    '<button id="mobile-nav-toggle" aria-label="Open menu" class="lg:hidden text-[#047857] text-3xl font-light leading-none">☰</button>' +
    '</div>' +
    '<div id="mobile-nav" class="hidden lg:hidden border-t border-gray-100 py-3"><ul class="flex flex-col">' +
    mtop('SECTORS', url.sectors) + mtop('OPPORTUNITIES', url.opportunities) + mtop('REGULATIONS', url.regulations) +
    mtop('DATA', url.data) + mtop('NEWS', url.news) +
    '<li><a href="' + url.contact + '" class="block px-2 py-3 text-sm font-semibold text-[#047857]">Contact</a></li>' +
    '<li class="px-2 pt-2"><a href="' + url.opportunities + '" class="block text-center bg-[#047857] text-white px-6 py-2.5 text-[13px] font-semibold rounded-sm hover:opacity-90">Invest Now</a></li>' +
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
      // Two-column wide variant, left-anchored so it never runs off the left edge.
      '.nesp-dropdown--wide{left:0;right:auto;min-width:660px;max-width:calc(100vw - 48px);transform:translateX(0) translateY(8px)}',
      '.nesp-has-menu:hover .nesp-dropdown--wide{transform:translateX(0) translateY(0)}',
      '.nesp-dropdown--wide::after{left:38px;transform:rotate(45deg)}',
      '.nesp-dropdown--wide .nesp-menu-list{grid-template-columns:1fr 1fr 1fr;gap:0 4px}',
      '.nesp-dropdown--compact .nesp-menu-item{padding:8px 12px}',
      // Single-column, height-capped, scrollable variant (all 10 sectors reachable by scroll).
      '.nesp-dropdown--scroll .nesp-menu-list{grid-template-columns:1fr;max-height:320px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}',
      '.nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar{width:0;height:0;display:none}'
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
    if ((a.className || '').indexOf('px-5') === -1) return; // desktop top-level only
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
    panel.className = 'nesp-dropdown' + (menu.wide ? ' nesp-dropdown--wide' : '') + (menu.compact ? ' nesp-dropdown--compact' : '') + (menu.scroll ? ' nesp-dropdown--scroll' : '');
    panel.innerHTML = '<div class="nesp-menu-head">' + menu.head + '</div><div class="nesp-menu-list">' + items + '</div>';
    li.appendChild(panel);
  });

  // Mobile hamburger toggle.
  var toggle = nav.querySelector('#mobile-nav-toggle');
  var mobile = nav.querySelector('#mobile-nav');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () { mobile.classList.toggle('hidden'); });
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1024px)').matches) mobile.classList.add('hidden');
    });
  }
})();
