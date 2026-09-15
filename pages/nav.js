// Shared site header/nav: single source of truth for every page's top navigation.
//
// Usage on any page:
//   1. Put a mount point where the nav should render:  <div id="site-nav"></div>
//   2. Load this script (order doesn't matter, investflow.js defers its wiring
//      to DOMContentLoaded):
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

  // The signed-in identity the header shows. It mirrors the mock profile
  // AboutMe.html renders (username adaeze_invest, adaeze.okoye@), so the initials
  // in the bar and the name on the profile page are the same person rather than
  // two unrelated placeholders. One name here changes both marks.
  var USER = { name: 'Adaeze Okoye' };
  var INITIALS = USER.name.split(/\s+/).slice(0, 2).map(function (w) {
    return w.charAt(0);
  }).join('').toUpperCase();
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
  // Labels are Title Case rather than the old all-caps. Eight shouting items in
  // a row was the single biggest reason the bar read as heavy. Menu lookups and
  // the active-tab map still key off the UPPERCASE form, so nothing downstream
  // had to change.
  //
  // 14 Sep 2026: eight tabs made the bar too wide and too busy. Regulations,
  // Financing and Data & Insights are all places an investor looks things up,
  // so they now sit under one tab, Resources, whose panel keeps each of them as
  // its own titled section (see MENU.RESOURCES). Nothing was removed: every
  // destination the three tabs had is in that panel.
  //
  // `menuOnly: true` is a tab with no page of its own. It renders as a button
  // that opens its panel (hover, focus or click) and, on mobile, an accordion.
  //
  // An item with `href: null` still renders blurred and unclickable, which is
  // how Financing was shown while it has no page (HP-08/HP-09 rule out the
  // Coming Soon placeholder). Inside Resources, Financing keeps that state as a
  // `soon` section.
  var TOP = [
    { label: 'Invest', href: url.opportunities },
    { label: 'Sectors', href: url.sectors },
    { label: 'States', href: url.states },
    { label: 'Resources', menuOnly: true },
    // News, Events and Announcements are three separate pages; one tab now
    // holds all three, the same way Resources holds its sections.
    { label: 'Newsroom', menuOnly: true },
    { label: 'Support', href: url.contact }
  ];

  // ---- States (NAV-03) ---------------------------------------------------
  // All 36 states plus the FCT, in their six geopolitical zones, exactly as
  // States.html groups them. Enugu is the one published profile and links
  // straight to it; every other state opens States.html at its own hash, which
  // that page now reads to select the territory on the map and scroll to it.
  // That is a real destination, not the general page the audit complained about
  // in UX-NAV-04: you land on the state you clicked.
  var ZONES = [
    ['North Central', ['Benue', 'FCT Abuja', 'Kogi', 'Kwara', 'Nasarawa', 'Niger', 'Plateau']],
    ['North East', ['Adamawa', 'Bauchi', 'Borno', 'Gombe', 'Taraba', 'Yobe']],
    ['North West', ['Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Sokoto', 'Zamfara']],
    ['South East', ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo']],
    ['South South', ['Akwa Ibom', 'Bayelsa', 'Cross River', 'Delta', 'Edo', 'Rivers']],
    ['South West', ['Ekiti', 'Lagos', 'Ogun', 'Ondo', 'Osun', 'Oyo']]
  ];
  var LIVE_STATES = { 'Enugu': base + 'Enugu.html' };

  function slug(s) { return s.toLowerCase().replace(/\s+/g, '-'); }

  var STATE_GROUPS = ZONES.map(function (z) {
    return {
      head: z[0],
      href: base + 'States.html#' + slug(z[0]),
      items: z[1].map(function (name) {
        return {
          t: name,
          href: LIVE_STATES[name] || (base + 'States.html#' + slug(name)),
          live: !!LIVE_STATES[name]
        };
      })
    };
  });

  // ---- Hover-dropdown menu data (single source) --------------------------
  // Every menu renders identically: one column, capped at 340px, scrolling with
  // a visible bar once it holds more than fits. A short menu never reaches the
  // cap, so DATA and REGULATIONS never scroll while NEWS and SECTORS do instead
  // of running down the page.
  //
  // `compact: true` is still honoured: it drops the item descriptions.
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
    // `groups` instead of `items` renders the wide three-column panel. Nothing
    // else in the file needs to know which shape a menu is: both renderers
    // branch on it once.
    'STATES': {
      head: 'States & Territories', mega: true, groups: STATE_GROUPS
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
    // Resources: the former Regulations, Data & Insights and Financing tabs as
    // the sections of one panel. `sections` renders a titled column per
    // section on desktop and subheaded groups on mobile; each section title
    // links to its page. `wide: true` lays a section's entries out in two
    // columns. A `soon: true` section has no page yet and shows as coming soon.
    'RESOURCES': {
      head: 'Investment Resources', sections: [
        // UX-NAV-04: all four entries used to open Regulation.html itself, so the
        // menu promised detail and delivered a general page. Each entry now opens
        // the section it names, which REG-01 gave the page.
        {
          head: 'Regulations & Compliance', href: url.regulations, wide: true, items: [
            { t: 'Core Laws & Policies', d: 'Electricity Act, PIA, NIEP & the core energy laws.', href: base + 'Regulation.html#core-laws' },
            { t: 'Business Registration', d: 'CAC incorporation, NIPC registration & licensing.', href: base + 'Regulation.html#registration' },
            { t: 'Tax & Fiscal Policy', d: 'Rates, Pioneer Status & equipment reliefs.', href: base + 'Regulation.html#tax' },
            { t: 'Import & Export', d: 'Duty treatment, SONCAP conformity & free zones.', href: base + 'Regulation.html#trade' },
            { t: 'Treaties & Immigration', d: 'Investment guarantees, CERPAC & expatriate quota.', href: base + 'Regulation.html#treaties' },
            { t: 'Regulatory Bodies', d: 'NERC, REA & NIPC.', href: base + 'Regulation.html#bodies' }
          ]
        },
        {
          head: 'Data & Insights', href: url.data, items: [
            { t: 'National Intelligence', d: 'Indicators, maps and trends for the whole country.', href: base + 'Data.html#national-intelligence' },
            { t: 'Geographic Hotspots', d: 'Where each sector is concentrated, state by state.', href: base + 'Data.html#hotspots' },
            { t: 'Open Data Downloads', d: 'Planned datasets, and where to get data today.', href: base + 'Data.html#downloads' }
          ]
        },
        { head: 'Financing', soon: true }
      ]
    },
    // Newsroom: the News page's categories as one section, and the Events and
    // Announcements pages side by side in the other. A section without an href
    // shows its title as a plain heading.
    'NEWSROOM': {
      head: 'News, Events & Announcements', sections: [
        {
          head: 'News', href: url.news, wide: true, items: [
            { t: 'Policy & Legislation', d: 'Regulatory and policy developments.', href: base + 'News.html' },
            { t: 'Power & Energy', d: 'Generation, supply & market news.', href: base + 'News.html' },
            { t: 'Renewables', d: 'Solar, wind & clean-energy coverage.', href: base + 'News.html' },
            { t: 'Oil & Gas', d: 'Upstream and downstream updates.', href: base + 'News.html' },
            { t: 'Infrastructure', d: 'Projects, grids & facilities.', href: base + 'News.html' }
          ]
        },
        {
          head: 'Events & Announcements', items: [
            { t: 'Events', d: 'Forums, workshops & roadshows.', href: url.events },
            { t: 'Announcements', d: 'Calls, deadlines & official notices.', href: url.announcements }
          ]
        }
      ]
    }
  };

  // Which top-level tab is "active" for a given page (basename -> label).
  var PAGE_ACTIVE = {
    'sector.html': 'SECTORS', 'detailedsector.html': 'SECTORS',
    'wind.html': 'SECTORS', 'storage.html': 'SECTORS', 'smallhydro.html': 'SECTORS',
    'greenmobility.html': 'SECTORS', 'energyefficiency.html': 'SECTORS', 'cleancooking.html': 'SECTORS',
    'bioenergy.html': 'SECTORS', 'agriculturepue.html': 'SECTORS', 'greenhydrogen.html': 'SECTORS',
    'regulation.html': 'RESOURCES', 'data.html': 'RESOURCES',
    'news.html': 'NEWSROOM', 'newsindetail.html': 'NEWSROOM',
    'announcements.html': 'NEWSROOM', 'individualannouncement.html': 'NEWSROOM',
    'event.html': 'NEWSROOM', 'individualevent.html': 'NEWSROOM',
    'opportunities.html': 'INVEST', 'opportunitiesnew.html': 'INVEST',
    'detailedoppnew.html': 'INVEST', 'investormatch.html': 'INVEST',
    'states.html': 'STATES', 'enugu.html': 'STATES',
    'contact.html': 'SUPPORT', 'faqs.html': 'SUPPORT'
  };

  // ---- Header markup -----------------------------------------------------
  // The markup carries almost no Tailwind utilities on purpose: homepage.html
  // ships a FROZEN Tailwind build with no xl:* utilities and no arbitrary
  // values, so anything expressed as a utility silently did nothing there. Every
  // rule the header needs is written as real CSS below, keyed off nesp-*
  // classes. `bg-white` is the one utility kept, because two pages still run
  // their own `nav.bg-white` scroll-shadow script against it.
  function topItem(item) {
    var hasMenu = !!MENU[item.label.toUpperCase()];
    if (item.menuOnly) {
      return '<li><button type="button" class="nesp-top" aria-haspopup="true" aria-expanded="false">' +
        '<span class="nesp-top-t">' + item.label + '</span><span class="nesp-caret" aria-hidden="true"></span></button></li>';
    }
    if (!item.href) {
      return '<li><span class="nesp-top nesp-nav-soon" aria-disabled="true" title="' +
        item.label + ' is not published yet"><span class="nesp-top-t">' + item.label + '</span></span></li>';
    }
    return '<li><a href="' + item.href + '" class="nesp-top"><span class="nesp-top-t">' + item.label + '</span>' +
      (hasMenu ? '<span class="nesp-caret" aria-hidden="true"></span>' : '') + '</a></li>';
  }

  // Mobile gets the same information architecture as desktop rather than a
  // flattened list: any item with a hover menu becomes an accordion, so the
  // sector and news sub-pages are reachable on a phone at all. They were not
  // before.
  function mobileItem(item) {
    var menu = MENU[item.label.toUpperCase()];
    if (!item.href && !item.menuOnly) {
      return '<li class="nesp-m-item"><div class="nesp-m-row">' +
        '<span class="nesp-m-link nesp-nav-soon">' + item.label + '<em>Coming soon</em></span></div></li>';
    }
    var exp = menu ? '<button type="button" class="nesp-m-exp" aria-expanded="false" aria-label="Show ' +
      item.label + ' sections"><span aria-hidden="true"></span></button>' : '';
    // A tab with no page of its own: the label opens the accordion too.
    var row = item.menuOnly
      ? '<div class="nesp-m-row"><button type="button" class="nesp-m-link nesp-m-toggle" aria-expanded="false">' + item.label + '</button>' + exp + '</div>'
      : '<div class="nesp-m-row"><a class="nesp-m-link" href="' + item.href + '">' + item.label + '</a>' + exp + '</div>';
    if (!menu) return '<li class="nesp-m-item">' + row + '</li>';
    var subs = '';
    if (menu.sections) {
      menu.sections.forEach(function (sec) {
        if (sec.soon) {
          subs += '<span class="nesp-m-subhead">' + sec.head + '</span><span class="nesp-m-soon">Coming soon</span>';
          return;
        }
        subs += sec.href
          ? '<a class="nesp-m-subhead" href="' + sec.href + '">' + sec.head + '</a>'
          : '<span class="nesp-m-subhead">' + sec.head + '</span>';
        sec.items.forEach(function (it) { subs += '<a href="' + it.href + '">' + it.t + '</a>'; });
      });
    } else if (menu.groups) {
      // The zones survive on mobile too. 37 flat names would be a wall.
      menu.groups.forEach(function (g) {
        subs += '<a class="nesp-m-subhead" href="' + g.href + '">' + g.head + '</a>';
        g.items.forEach(function (it) { subs += '<a href="' + it.href + '">' + it.t + '</a>'; });
      });
    } else {
      menu.items.forEach(function (it) {
        subs += '<a href="' + it.href + '">' + it.t + '</a>';
      });
    }
    return '<li class="nesp-m-item">' + row +
      '<div class="nesp-m-sub"><div><div class="nesp-m-sublist">' + subs + '</div></div></div></li>';
  }

  var NAV =
    '<nav class="nesp-header bg-white">' +
    '<div class="nesp-nav-wrap">' +
    '<div class="nesp-nav-row">' +
    // Both logos sit together on the left, separated by a hairline so they read
    // as two marks rather than one wordmark.
    '<div class="nesp-nav-brand">' +
    '<div class="nesp-nav-marks">' +
    '<img alt="Partner" src="' + base + 'logoNESP.png">' +
    '<span class="nesp-nav-rule" aria-hidden="true"></span>' +
    '<a class="nesp-nav-home" href="' + HOME + '" aria-label="One-Stop Investment Platform (OSIP), home"><img alt="Logo" src="' + base + 'Text.png"></a>' +
    '</div></div>' +
    '<ul class="nesp-nav-top">' + TOP.map(topItem).join('') + '</ul>' +
    '<div class="nesp-nav-actions">' +
    '<a href="' + url.invest + '" class="nesp-cta">Invest Now</a>' +
    '<a href="' + url.profile + '" class="nesp-avatar" title="My Profile" aria-label="My Profile">' +
    '<span aria-hidden="true">' + INITIALS + '</span></a>' +
    '</div>' +
    '<button id="mobile-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"' +
    ' class="nesp-nav-toggle"><span class="nesp-burger" aria-hidden="true"><i></i><i></i><i></i></span></button>' +
    '</div>' +
    '<div id="mobile-nav" class="nesp-mnav"><ul>' + TOP.map(mobileItem).join('') + '</ul>' +
    '<div class="nesp-m-foot">' +
    '<a href="' + url.profile + '" class="nesp-m-profile">' +
    '<span class="nesp-avatar nesp-avatar--sm"><span aria-hidden="true">' + INITIALS + '</span></span>' +
    '<span class="nesp-m-profile-t"><b>' + USER.name + '</b><em>View profile</em></span></a>' +
    '<a href="' + url.invest + '" class="nesp-cta">Invest Now</a>' +
    '</div></div>' +
    '</div></nav>';

  // ---- Stylesheet --------------------------------------------------------
  // Appended to the END OF BODY, not to <head>. Around twenty pages still carry
  // a dead inline copy of the old nav CSS in a <style> inside <body>; a
  // stylesheet in <head> loses every specificity tie to those, so the redesign
  // would have rendered on some pages and not others. Descendant rules are also
  // scoped under .nesp-header for the same reason.
  // ---- Redesign tokens (11 Sep 2026) ---------------------------------------
  // The header now speaks the redesigned pages' language: warm paper instead of
  // white, the deep green, a gold hairline for "you are here", Inter for the
  // interface and Newsreader for the words inside the menus. Every page gets it,
  // redesigned or not, so the two faces are loaded here whenever the host page
  // has not loaded them already. The previous header is kept in OSIP/Backups/nav/.
  var SANS = "Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
  // 14 Sep 2026: the header is Inter throughout, desktop and mobile, as on the
  // homepage. What used to be set in Newsreader (menu entries, descriptions,
  // state names, the mobile index, panel titles) is Inter held to the serif's
  // x-height by font-size-adjust, so nothing grows or rewraps.
  var ADJUST = '.515';
  var FONT = SANS;
  var GREEN = '#004225';
  var GREEN2 = '#0b6b45';
  var INK = '#13201b';
  var INK2 = '#3d4742';
  var INK3 = '#6b716c';
  var CARD = '#fbfaf7';
  var TINT = '#f1eee8';
  var LINE = '#e2ded5';
  var LINE2 = '#cfc9bd';
  var GOLD = '#d9a520';
  if (!document.getElementById('osip-rd-fonts') && !document.querySelector('link[href*="family=Inter"]')) {
    var faces = document.createElement('link');
    faces.id = 'osip-rd-fonts';
    faces.rel = 'stylesheet';
    faces.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    (document.head || document.documentElement).appendChild(faces);
  }
  if (!document.getElementById('nesp-nav-style')) {
    var st = document.createElement('style');
    st.id = 'nesp-nav-style';
    st.textContent = [
      // ---- shell ---------------------------------------------------------
      // Same mechanics as before: the surface is a layer (::before) under the
      // content, and only that layer contracts into the floating card, so the
      // document never re-lays-out while the header changes state.
      '.nesp-header{position:sticky;top:0;z-index:50;background:transparent;font-family:' + SANS + '}',
      '.nesp-header>*{position:relative;z-index:1}',
      // A 2px deep green rule along the very top of the page at rest.
      '.nesp-header::after{content:"";position:absolute;top:0;left:0;right:0;height:2px;z-index:2;background:' + GREEN + ';transition:opacity .32s ease}',
      'nav.nesp-header.is-stuck::after,nav.nesp-header.osip-scrolled::after{opacity:0}',
      '.nesp-header::before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background:rgba(251,250,247,.96);border:1px solid transparent;border-bottom-color:' + LINE + ';border-radius:0;box-shadow:none;transition:top .16s cubic-bezier(.4,0,.2,1),right .16s cubic-bezier(.4,0,.2,1),bottom .16s cubic-bezier(.4,0,.2,1),left .16s cubic-bezier(.4,0,.2,1),border-radius .16s cubic-bezier(.4,0,.2,1),background-color .16s ease,border-color .16s ease,box-shadow .16s ease}',
      '.nesp-header *,.nesp-header *::before,.nesp-header *::after{box-sizing:border-box}',
      // Legacy reset for the dead inline copies of the old nav CSS on older pages.
      '.nesp-header .nesp-has-menu>a::after{content:none}',
      'nav.nesp-header.is-stuck,nav.nesp-header.osip-scrolled{background:transparent;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}',
      // Scrolled: a frosted paper card floating over the page.
      'nav.nesp-header.is-stuck::before,nav.nesp-header.osip-scrolled::before{transition-duration:.32s;top:7px;right:16px;bottom:7px;left:16px;border-radius:20px;background:rgba(251,250,247,.84);-webkit-backdrop-filter:saturate(170%) blur(18px);backdrop-filter:saturate(170%) blur(18px);border-color:rgba(19,32,27,.08);box-shadow:0 1px 2px rgba(19,32,27,.04),0 18px 44px -24px rgba(19,32,27,.36)}',
      '.nesp-header.nesp-overlays::before{transition-duration:.32s}',
      // Mobile sheet open: the surface goes solid. Frosted, the page showed
      // through the tall open sheet, so wherever the page behind it changed from
      // a dark hero to the light body there was a pale patch across the menu.
      'nav.nesp-header.nesp-sheet-open::before{background:' + CARD + '!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}',
      'nav.nesp-header.is-stuck .nesp-dropdown,nav.nesp-header.osip-scrolled .nesp-dropdown{margin-top:2px}',
      '.nesp-nav-wrap{max-width:1440px;margin:0 auto;padding:0 2rem}',
      '.nesp-nav-row{display:flex;align-items:stretch;gap:1.25rem;height:64px}',

      // ---- brand ---------------------------------------------------------
      '.nesp-header .nesp-nav-brand{display:flex;align-items:center;flex:0 0 auto}',
      '.nesp-header .nesp-nav-marks{display:flex;align-items:center;gap:1rem}',
      '.nesp-header .nesp-nav-marks img{display:block;width:auto;object-fit:contain}',
      '.nesp-header .nesp-nav-marks img[alt="Partner"]{height:2.125rem}',
      '.nesp-header .nesp-nav-marks img[alt="Logo"]{height:1.375rem}',
      '.nesp-header .nesp-nav-rule{width:1px;height:1.5rem;background:linear-gradient(180deg,transparent,' + LINE2 + ' 25%,' + LINE2 + ' 75%,transparent)}',
      '.nesp-header .nesp-nav-home{display:inline-flex;align-items:center;transition:opacity .3s ease}',
      '.nesp-header .nesp-nav-home:hover{opacity:.7}',

      // ---- desktop top level ---------------------------------------------
      // Quiet ink labels in Inter; a warm pill on hover; the page you are on in
      // deep green with a gold hairline under the word itself.
      '.nesp-header .nesp-nav-top{display:none;flex:1 1 auto;min-width:0;align-items:stretch;justify-content:center;gap:2px;list-style:none;margin:0;padding:0}',
      '.nesp-header .nesp-nav-top>li{position:relative;display:flex}',
      '.nesp-header .nesp-top{position:relative;display:inline-flex;align-items:center;gap:.35rem;padding:0 .6875rem;font-family:' + SANS + ';font-size:13px;font-weight:500;line-height:1;letter-spacing:0;color:' + INK2 + ';text-decoration:none;white-space:nowrap;transition:color .3s ease}',
      '.nesp-header .nesp-top::before{content:"";position:absolute;left:.1875rem;right:.1875rem;top:1rem;bottom:1rem;border-radius:999px;background:transparent;transition:background-color .3s ease}',
      '.nesp-header .nesp-top>*{position:relative}',
      // A tab with no page of its own is a button; it looks exactly like the links.
      '.nesp-header button.nesp-top{-webkit-appearance:none;appearance:none;margin:0;border:0;background:transparent;cursor:pointer}',
      '.nesp-header a.nesp-top:hover,.nesp-header button.nesp-top:hover,.nesp-header .nesp-has-menu:hover>.nesp-top,.nesp-header .nesp-has-menu.is-open>.nesp-top{color:' + INK + '}',
      '.nesp-header a.nesp-top:hover::before,.nesp-header button.nesp-top:hover::before,.nesp-header .nesp-has-menu:hover>.nesp-top::before,.nesp-header .nesp-has-menu.is-open>.nesp-top::before{background:' + TINT + '}',
      '.nesp-header .nesp-top:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:-8px;border-radius:999px}',
      '.nesp-header .nesp-top.is-active{color:' + GREEN + ';font-weight:600}',
      '.nesp-header .nesp-top-bar{position:absolute;left:0;right:0;top:calc(100% + 6px);height:1.5px;border-radius:999px;background:' + GOLD + '}',
      '.nesp-header .nesp-caret{width:6px;height:6px;border-right:1.4px solid currentColor;border-bottom:1.4px solid currentColor;transform:translateY(-2px) rotate(45deg);opacity:.45;transition:transform .3s ease,opacity .3s ease}',
      '.nesp-header .nesp-has-menu:hover .nesp-caret{transform:translateY(1px) rotate(225deg);opacity:.85}',
      // NAV-01: entries with no page yet stay blurred and unclickable.
      '.nesp-header .nesp-nav-soon{opacity:.4;filter:blur(.5px);cursor:default;user-select:none}',
      '.nesp-header .nesp-nav-soon:hover{opacity:.55;filter:blur(.25px)}',

      // ---- actions -------------------------------------------------------
      // The primary action is the redesigned pages' pill: deep green, its label
      // in Newsreader held to the sans' visual size, and the light sweep on hover.
      '.nesp-header .nesp-nav-actions{display:none;align-items:center;gap:.75rem;flex:0 0 auto;margin-left:auto}',
      '.nesp-header .nesp-cta{position:relative;overflow:hidden;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;height:42px;padding:0 1.375rem;border-radius:999px;background:' + GREEN + ';color:#fff;font-family:' + SANS + ';font-size-adjust:none;font-size:14px;font-weight:500;letter-spacing:0;text-decoration:none;white-space:nowrap;box-shadow:none;transition:background-color .35s ease}',
      '.nesp-header .nesp-cta::before{content:"";position:absolute;top:0;bottom:0;left:-120%;width:55%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.26),transparent);transform:skewX(-22deg);transition:left .9s ease;z-index:1;pointer-events:none}',
      '.nesp-header .nesp-cta:hover::before{left:130%}',
      '.nesp-header .nesp-cta:hover{background:#062f1f}',
      '.nesp-header .nesp-avatar{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:0 0 auto;border-radius:999px;background:' + CARD + ';border:1px solid ' + LINE2 + ';color:' + GREEN + ';text-decoration:none;font-family:' + SANS + ';font-size:11.5px;font-weight:600;letter-spacing:.06em;line-height:1;transition:background-color .3s ease,color .3s ease,border-color .3s ease}',
      '.nesp-header a.nesp-avatar:hover{background:' + GREEN + ';border-color:' + GREEN + ';color:#fff}',
      '.nesp-header .nesp-avatar--sm{width:36px;height:36px;font-size:11px}',

      // ---- dropdown ------------------------------------------------------
      // A warm card; entry names in Newsreader, their one-liners under them.
      '.nesp-header .nesp-has-menu{position:relative}',
      '.nesp-header .nesp-dropdown{position:absolute;top:100%;left:50%;margin-top:10px;min-width:320px;max-width:390px;background:' + CARD + ';border:1px solid ' + LINE + ';border-radius:20px;box-shadow:0 1px 2px rgba(19,32,27,.04),0 24px 50px -26px rgba(19,32,27,.32);padding:.5rem;opacity:0;visibility:hidden;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(10px) scale(.985);transform-origin:top center;transition:opacity .26s ease,transform .36s cubic-bezier(.16,1,.3,1),visibility .36s ease;z-index:60}',
      '.nesp-header .nesp-has-menu:hover .nesp-dropdown,.nesp-header .nesp-dropdown:hover,.nesp-header .nesp-has-menu:focus-within .nesp-dropdown,.nesp-header .nesp-has-menu.is-open .nesp-dropdown{opacity:1;visibility:visible;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(0) scale(1)}',
      '.nesp-header .nesp-has-menu.is-open .nesp-caret{transform:translateY(1px) rotate(225deg);opacity:.85}',
      // Invisible bridge so the pointer can cross the gap without the panel closing.
      '.nesp-header .nesp-dropdown::before{content:"";position:absolute;top:-16px;left:0;right:0;height:18px}',
      '.nesp-header .nesp-dropdown::after{content:"";position:absolute;top:-7px;left:calc(50% - var(--nesp-dx,0px));width:13px;height:13px;background:' + CARD + ';border-top:1px solid ' + LINE + ';border-left:1px solid ' + LINE + ';border-radius:4px 0 0 0;transform:translateX(-50%) rotate(45deg)}',
      '.nesp-header .nesp-menu-head{font-family:' + SANS + ';font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:' + GREEN2 + ';padding:.75rem .875rem .5rem}',
      '.nesp-header .nesp-menu-item{position:relative;display:block;padding:.625rem 1.75rem .625rem .875rem;border-radius:12px;text-decoration:none;transition:background-color .25s ease}',
      '.nesp-header .nesp-menu-item:hover{background:' + TINT + '}',
      '.nesp-header .nesp-menu-item .t{display:block;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:17px;font-weight:500;line-height:1.25;letter-spacing:-.006em;color:' + INK + ';transition:color .25s ease}',
      '.nesp-header .nesp-menu-item:hover .t{color:' + GREEN + '}',
      '.nesp-header .nesp-menu-item .d{display:block;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:14px;line-height:1.45;color:' + INK3 + ';margin-top:2px}',
      '.nesp-header .nesp-menu-item::after{content:"";position:absolute;right:.875rem;top:50%;width:5px;height:5px;border-right:1.5px solid ' + GREEN2 + ';border-top:1.5px solid ' + GREEN2 + ';transform:translate(-5px,-50%) rotate(45deg);opacity:0;transition:transform .3s ease,opacity .3s ease}',
      '.nesp-header .nesp-menu-item:hover::after{transform:translate(0,-50%) rotate(45deg);opacity:.8}',
      '.nesp-header .nesp-menu-list{display:grid;grid-template-columns:1fr}',
      '.nesp-header .nesp-dropdown--compact .nesp-menu-item{padding-top:.5rem;padding-bottom:.5rem}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list{max-height:340px;overflow-y:auto;overscroll-behavior:contain;padding-right:6px;scrollbar-width:thin;scrollbar-color:' + LINE2 + ' transparent}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar{width:6px}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-track{background:transparent;margin:6px 0}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb{background:' + LINE2 + ';border-radius:999px}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb:hover{background:' + GREEN2 + '}',

      // ---- wide panel (STATES) -------------------------------------------
      '.nesp-header .nesp-dropdown--mega{min-width:min(700px,calc(100vw - 2rem));max-width:min(700px,calc(100vw - 2rem));padding:.625rem}',
      '.nesp-header .nesp-menu-groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 1rem;max-height:min(480px,calc(100vh - 140px));overflow-y:auto;overscroll-behavior:contain;padding-right:6px;scrollbar-width:thin;scrollbar-color:' + LINE2 + ' transparent}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar{width:6px}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-track{background:transparent;margin:6px 0}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-thumb{background:' + LINE2 + ';border-radius:999px}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-thumb:hover{background:' + GREEN2 + '}',
      '.nesp-header .nesp-menu-group{padding-bottom:.5rem}',
      '.nesp-header .nesp-group-head{display:block;font-family:' + SANS + ';font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:' + GREEN2 + ';padding:.625rem .625rem .375rem;text-decoration:none;transition:color .25s ease}',
      '.nesp-header .nesp-group-head:hover{color:' + GREEN + '}',
      '.nesp-header .nesp-state{display:flex;align-items:center;gap:.375rem;padding:.3125rem .625rem;border-radius:10px;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:15px;font-weight:400;color:' + INK2 + ';text-decoration:none;transition:background-color .25s ease,color .25s ease}',
      '.nesp-header .nesp-state:hover{background:' + TINT + ';color:' + GREEN + '}',
      '.nesp-header .nesp-state-live{margin-left:auto;font-family:' + SANS + ';font-size:8.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:' + GREEN + ';background:#e6efe8;border-radius:999px;padding:1px 7px}',

      // ---- sectioned panel (RESOURCES) ------------------------------------
      // A serif title, then one titled column per section with a hairline
      // between them; the section title is the link to its page. A section
      // with no page yet sits along the bottom as a quiet coming-soon strip.
      '.nesp-header .nesp-dropdown--resources{min-width:min(840px,calc(100vw - 2rem));max-width:min(840px,calc(100vw - 2rem));padding:.625rem}',
      '.nesp-header .nesp-dropdown--resources .nesp-menu-head{font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:21px;font-weight:400;letter-spacing:-.012em;text-transform:none;color:' + INK + ';padding:.625rem .875rem .75rem;margin:0 .25rem .25rem;border-bottom:1px solid ' + LINE + '}',
      '.nesp-header .nesp-res{max-height:min(560px,calc(100vh - 130px));overflow-y:auto;overscroll-behavior:contain;padding-right:4px;scrollbar-width:thin;scrollbar-color:' + LINE2 + ' transparent}',
      '.nesp-header .nesp-res-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:0}',
      '.nesp-header .nesp-res-sec{min-width:0;padding:.25rem .25rem .375rem}',
      '.nesp-header .nesp-res-sec+.nesp-res-sec{border-left:1px solid ' + LINE + ';padding-left:.5rem}',
      '.nesp-header .nesp-res-head{display:flex;align-items:center;gap:.5rem;padding:.625rem .875rem .375rem;font-family:' + SANS + ';font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:' + GREEN2 + ';text-decoration:none;transition:color .25s ease}',
      '.nesp-header a.nesp-res-head:hover{color:' + GREEN + '}',
      '.nesp-header .nesp-res-go{width:5px;height:5px;border-right:1.5px solid currentColor;border-top:1.5px solid currentColor;transform:translateX(-3px) rotate(45deg);opacity:0;transition:transform .3s ease,opacity .3s ease}',
      '.nesp-header .nesp-res-head:hover .nesp-res-go{transform:translateX(0) rotate(45deg);opacity:.9}',
      '.nesp-header .nesp-res-items{display:grid;grid-template-columns:minmax(0,1fr);gap:0 .25rem}',
      '.nesp-header .nesp-res-sec--wide .nesp-res-items{grid-template-columns:repeat(2,minmax(0,1fr))}',
      '.nesp-header .nesp-dropdown--resources .nesp-menu-item .t{font-size:16px}',
      '.nesp-header .nesp-dropdown--resources .nesp-menu-item .d{font-size:13.5px;line-height:1.4}',
      '.nesp-header .nesp-res-foot{display:flex;align-items:center;gap:.75rem;margin:.375rem .25rem .125rem;padding:.75rem .875rem;border-radius:14px;background:' + TINT + ';cursor:default;user-select:none}',
      '.nesp-header .nesp-res-foot-h{font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:16px;font-weight:500;color:' + INK3 + '}',
      '.nesp-header .nesp-res-soon{font-family:' + SANS + ';font-size:9.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:' + INK3 + ';border:1px dashed ' + LINE2 + ';border-radius:999px;padding:2px .5rem}',
      '@media (max-width:60rem){.nesp-header .nesp-res-grid{grid-template-columns:minmax(0,1fr)}.nesp-header .nesp-res-sec+.nesp-res-sec{border-left:0;padding-left:.25rem;border-top:1px solid ' + LINE + '}}',

      // ---- hamburger -----------------------------------------------------
      '.nesp-header .nesp-nav-toggle{display:inline-flex;align-items:center;justify-content:center;align-self:center;width:44px;height:44px;margin-left:auto;margin-right:-.5rem;padding:0;border:0;background:transparent;border-radius:999px;color:' + GREEN + ';cursor:pointer;transition:background-color .3s ease}',
      '.nesp-header .nesp-nav-toggle:hover{background:' + TINT + '}',
      '.nesp-header .nesp-burger{position:relative;display:block;width:20px;height:14px}',
      '.nesp-header .nesp-burger i{position:absolute;left:0;height:1.5px;width:100%;border-radius:2px;background:currentColor;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .2s ease,width .3s ease}',
      '.nesp-header .nesp-burger i:nth-child(1){top:0}',
      '.nesp-header .nesp-burger i:nth-child(2){top:6px;width:70%}',
      '.nesp-header .nesp-burger i:nth-child(3){top:12px}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(1){transform:translateY(6px) rotate(45deg)}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(2){opacity:0;transform:translateX(-8px)}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(3){transform:translateY(-6px) rotate(-45deg);width:100%}',

      // ---- mobile sheet --------------------------------------------------
      // The sections read as a large serif index, the way the redesigned pages
      // set their headings.
      '.nesp-header .nesp-mnav{display:none;border-top:1px solid ' + LINE + ';padding:.5rem 0 1.25rem;max-height:calc(100svh - 64px);overflow-y:auto;overscroll-behavior:contain}',
      '.nesp-header button.nesp-m-link{-webkit-appearance:none;appearance:none;margin:0;border:0;background:transparent;text-align:left;cursor:pointer}',
      '.nesp-header .nesp-m-sublist span.nesp-m-subhead{display:block;font-family:' + SANS + ';font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:' + INK3 + ';padding:.75rem .625rem .25rem}',
      '.nesp-header .nesp-m-soon{display:inline-block;margin:.25rem .625rem .5rem;font-family:' + SANS + ';font-size:9.5px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:' + INK3 + ';border:1px dashed ' + LINE2 + ';border-radius:999px;padding:1px .5rem}',
      '.nesp-header .nesp-mnav.is-open{display:block;animation:nespSheetIn .36s cubic-bezier(.16,1,.3,1)}',
      '@keyframes nespSheetIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
      '.nesp-header .nesp-mnav ul{list-style:none;margin:0;padding:0}',
      '.nesp-header .nesp-m-row{display:flex;align-items:center;border-radius:14px;transition:background-color .25s ease}',
      // Hover tints only where there is a real pointer: on a phone a tap leaves
      // :hover stuck on the row you touched, which read as a second open section.
      '@media (hover:hover){.nesp-header .nesp-m-row:hover{background:' + TINT + '}}',
      '.nesp-header .nesp-m-link{flex:1 1 auto;display:flex;align-items:center;gap:.5rem;padding:.625rem .75rem;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:22px;font-weight:400;line-height:1.2;letter-spacing:-.012em;color:' + INK + ';text-decoration:none}',
      '.nesp-header .nesp-m-link.is-active{color:' + GREEN + '}',
      '.nesp-header .nesp-m-item.is-current>.nesp-m-row{background:' + TINT + '}',
      '.nesp-header .nesp-m-exp{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:0;background:transparent;border-radius:999px;color:' + INK3 + ';cursor:pointer}',
      '.nesp-header .nesp-m-exp:hover{color:' + GREEN + '}',
      '.nesp-header .nesp-m-exp>span{width:7px;height:7px;border-right:1.6px solid currentColor;border-bottom:1.6px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .3s ease}',
      '.nesp-header .nesp-m-item.is-open>.nesp-m-row{background:' + TINT + '}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-exp{color:' + GREEN + '}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-exp>span{transform:translateY(1px) rotate(225deg)}',
      '.nesp-header .nesp-m-sub{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.16,1,.3,1)}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-sub{grid-template-rows:1fr}',
      '.nesp-header .nesp-m-sub>div{overflow:hidden}',
      '.nesp-header .nesp-m-sublist{margin:.25rem 0 .625rem 1rem;padding-left:.875rem;border-left:1px solid ' + LINE + '}',
      '.nesp-header .nesp-m-sublist a{display:block;padding:.5rem .625rem;border-radius:10px;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:16.5px;font-weight:400;color:' + INK2 + ';text-decoration:none;transition:background-color .25s ease,color .25s ease}',
      '.nesp-header .nesp-m-sublist a:hover{background:' + TINT + ';color:' + GREEN + '}',
      '.nesp-header .nesp-m-sublist a.nesp-m-subhead{font-family:' + SANS + ';font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:' + GREEN2 + ';padding:.75rem .625rem .25rem}',
      '.nesp-header .nesp-m-sublist a.nesp-m-subhead:hover{background:transparent;color:' + GREEN + '}',
      '.nesp-header .nesp-m-foot{margin-top:.75rem;padding-top:1rem;border-top:1px solid ' + LINE + ';display:flex;flex-direction:column;gap:.625rem}',
      '.nesp-header .nesp-m-foot .nesp-cta{height:50px;font-size:15px}',
      '.nesp-header .nesp-m-profile{display:flex;align-items:center;gap:.75rem;padding:.625rem .75rem;border-radius:14px;text-decoration:none;transition:background-color .25s ease}',
      '.nesp-header .nesp-m-profile:hover{background:' + TINT + '}',
      '.nesp-header .nesp-m-profile-t b{display:block;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:18px;font-weight:500;color:' + INK + ';line-height:1.2}',
      '.nesp-header .nesp-m-profile-t em{display:block;font-style:normal;font-family:' + SANS + ';font-size:11.5px;font-weight:500;color:' + INK3 + ';margin-top:2px}',
      '.nesp-header .nesp-m-profile:hover .nesp-m-profile-t b{color:' + GREEN + '}',
      '.nesp-header .nesp-mnav .nesp-nav-soon em{font-style:normal;font-family:' + SANS + ';font-size:9.5px;letter-spacing:.1em;border:1px dashed ' + LINE2 + ';border-radius:999px;padding:0 .5rem;color:' + INK3 + ';filter:blur(0)}',

      // ---- breakpoints ---------------------------------------------------
      // Six tabs fit a narrower bar than eight did, so the desktop bar takes
      // over at 1152px rather than 1248px.
      '@media (min-width:72rem){',
      '.nesp-header .nesp-nav-top{display:flex}',
      '.nesp-header .nesp-nav-actions{display:flex}',
      '.nesp-header .nesp-nav-toggle{display:none}',
      '.nesp-header .nesp-mnav{display:none!important}',
      '}',
      '@media (min-width:85rem){.nesp-header .nesp-top{padding:0 .875rem;font-size:14px}}',
      '@media (min-width:95rem){.nesp-header .nesp-top{padding:0 1.0625rem}}',
      '@media (max-width:47.9375rem){.nesp-nav-wrap{padding:0 1.5rem}}',
      '@media (max-width:39.9375rem){',
      '.nesp-nav-wrap{padding:0 1.125rem}',
      '.nesp-nav-row{height:58px}',
      '.nesp-header .nesp-nav-marks{gap:.625rem}',
      '.nesp-header .nesp-nav-marks img[alt="Partner"]{height:1.625rem}',
      '.nesp-header .nesp-nav-marks img[alt="Logo"]{height:1rem}',
      '.nesp-header .nesp-nav-rule{height:1.375rem}',
      '.nesp-header .nesp-mnav{max-height:calc(100svh - 58px)}',
      'nav.nesp-header.is-stuck::before,nav.nesp-header.osip-scrolled::before{top:5px;right:10px;bottom:5px;left:10px;border-radius:16px}',
      '}',
      '@media (max-width:22.5rem){.nesp-header .nesp-nav-marks img[alt="Partner"],.nesp-header .nesp-nav-rule{display:none}}',
      '@media (prefers-reduced-motion:reduce){.nesp-header *,.nesp-header *::before,.nesp-header *::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}',
      // The header is sticky, so every anchor target keeps its height clear.
      '[id]{scroll-margin-top:var(--osip-nav-offset,7.5rem)}'
    ].join('');
    (document.body || document.head || document.documentElement).appendChild(st);
  }

  // ---- Inject + wire -----------------------------------------------------
  var mount = document.getElementById('site-nav');
  if (!mount) return;
  mount.outerHTML = NAV;
  var nav = document.querySelector('nav.nesp-header');
  if (!nav) return;

  // ---- Sticky-header offset for in-page anchors --------------------------
  // The header height is not a constant: it changes with the breakpoint, and
  // again when the webfont lands and the labels settle. Re-measure on load, on
  // fonts.ready and on resize.
  function measureNav() {
    var h = nav.getBoundingClientRect().height;
    if (h > 0) {
      document.documentElement.style.setProperty('--osip-nav-offset', (Math.round(h) + 20) + 'px');
    }
  }
  measureNav();
  window.addEventListener('load', measureNav);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(measureNav); }
  var navT;
  window.addEventListener('resize', function () {
    clearTimeout(navT);
    navT = setTimeout(function () {
      measureNav();
      if (typeof thresholds === 'function') thresholds();
      if (typeof clampPanels === 'function') clampPanels();
    }, 150);
  });

  // ---- Scroll state ------------------------------------------------------
  // Every page gets the frosted lift now. Two pages ran their own copy of this
  // against `nav.bg-white`; that class is still on the element, so they keep
  // working and simply agree with this.
  // Two details that separate this from a naive toggle:
  //
  // 1. Hysteresis. One threshold means a reader parked at exactly that offset,
  //    or a trackpad's rubber-banding across it, flips the card on and off
  //    repeatedly. It engages at 16px and only releases below 4px, so the state
  //    cannot chatter.
  // 2. rAF throttling. The handler is called once per frame at most, and reads
  //    the scroll position inside the frame rather than on every scroll event.
  // 3. The band. On homepage the header sits in a position:fixed wrapper, so the
  //    hero runs underneath it and there is always real content behind the bar.
  //    Everywhere else the header is in normal flow and reserves a slot the
  //    height of itself: behind the bar, near the top of the page, there is
  //    nothing but empty body background. Contract the card there and its 7px
  //    gaps open onto that empty band, whose bottom edge then slides through
  //    them as you scroll. That sliding edge is the white shutter.
  //
  //    The band is exactly the header's own height, so it is fully out of view
  //    once you have scrolled past it. Pages that reserve a slot therefore only
  //    take the card once the band is gone; pages that overlay content (the
  //    homepage) keep engaging immediately, since they have no band to reveal.
  var overlays = (function () {
    var e = nav;
    while (e && e !== document.documentElement) {
      if (getComputedStyle(e).position === 'fixed') return true;
      e = e.parentElement;
    }
    return false;
  })();
  if (overlays) nav.classList.add('nesp-overlays');

  var onAt = 16, offAt = 4;
  function thresholds() {
    if (overlays) return;
    var h = Math.round(nav.getBoundingClientRect().height) || 68;
    onAt = h + 24;
    offAt = h + 8;
  }
  thresholds();

  var stuck = false;
  var ticking = false;
  function readScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (!stuck && y > onAt) { stuck = true; nav.classList.add('is-stuck'); }
    else if (stuck && y < offAt) { stuck = false; nav.classList.remove('is-stuck'); }
    ticking = false;
  }
  readScroll();
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(readScroll);
  }, { passive: true });

  var file = (location.pathname.split('/').pop() || '').toLowerCase();
  var active = PAGE_ACTIVE[file];

  // ---- Desktop: active tab + hover dropdowns -----------------------------
  nav.querySelectorAll('.nesp-nav-top .nesp-top').forEach(function (a) {
    var label = ((a.querySelector('.nesp-top-t') || a).textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();

    if (active && label === active) {
      a.classList.add('is-active');
      if (a.tagName === 'A') a.setAttribute('aria-current', 'page');
      var bar = document.createElement('span');
      bar.className = 'nesp-top-bar';
      // Into the label span, not the link: the underline should be the width of
      // the word, not of the word plus its padding and dropdown caret.
      (a.querySelector('.nesp-top-t') || a).appendChild(bar);
    }

    var menu = MENU[label];
    if (!menu || (a.tagName !== 'A' && a.tagName !== 'BUTTON')) return;
    var li = a.closest('li'); if (!li) return;
    li.classList.add('nesp-has-menu');
    var panel = document.createElement('div');
    var body;
    if (menu.sections) {
      var cols = '', foot = '';
      menu.sections.forEach(function (sec) {
        if (sec.soon) {
          foot += '<div class="nesp-res-foot" aria-disabled="true" title="' + sec.head + ' is not published yet">' +
            '<span class="nesp-res-foot-h">' + sec.head + '</span><span class="nesp-res-soon">Coming soon</span></div>';
          return;
        }
        var rows = '';
        sec.items.forEach(function (it) {
          rows += '<a class="nesp-menu-item" href="' + it.href + '"><span class="t">' + it.t + '</span>' +
            (it.d ? '<span class="d">' + it.d + '</span>' : '') + '</a>';
        });
        cols += '<div class="nesp-res-sec' + (sec.wide ? ' nesp-res-sec--wide' : '') + '">' +
          (sec.href
            ? '<a class="nesp-res-head" href="' + sec.href + '"><span>' + sec.head + '</span><span class="nesp-res-go" aria-hidden="true"></span></a>'
            : '<div class="nesp-res-head"><span>' + sec.head + '</span></div>') +
          '<div class="nesp-res-items">' + rows + '</div></div>';
      });
      panel.className = 'nesp-dropdown nesp-dropdown--resources';
      body = '<div class="nesp-res"><div class="nesp-res-grid">' + cols + '</div>' + foot + '</div>';
    } else if (menu.groups) {
      var cols = '';
      menu.groups.forEach(function (g) {
        var rows = '';
        g.items.forEach(function (it) {
          rows += '<a class="nesp-state" href="' + it.href + '">' + it.t +
            (it.live ? '<span class="nesp-state-live" title="Profile published">Live</span>' : '') + '</a>';
        });
        cols += '<div class="nesp-menu-group"><a class="nesp-group-head" href="' + g.href + '">' +
          g.head + '</a>' + rows + '</div>';
      });
      panel.className = 'nesp-dropdown nesp-dropdown--mega';
      body = '<div class="nesp-menu-groups">' + cols + '</div>';
    } else {
      var items = '';
      menu.items.forEach(function (it) {
        items += '<a class="nesp-menu-item" href="' + it.href + '"><span class="t">' + it.t + '</span>' +
          (it.d && !menu.compact ? '<span class="d">' + it.d + '</span>' : '') + '</a>';
      });
      panel.className = 'nesp-dropdown nesp-dropdown--scroll' + (menu.compact ? ' nesp-dropdown--compact' : '');
      body = '<div class="nesp-menu-list">' + items + '</div>';
    }
    panel.innerHTML = '<div class="nesp-menu-head">' + menu.head + '</div>' + body;
    li.appendChild(panel);

    // A button tab has no page to go to, so a click (or tap on a touch laptop)
    // opens and closes its panel. Hover and keyboard focus still open it too;
    // leaving, clicking elsewhere and Esc close it.
    if (a.tagName === 'BUTTON') {
      var setMenu = function (open) {
        li.classList.toggle('is-open', open);
        a.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      a.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenu(!li.classList.contains('is-open'));
      });
      li.addEventListener('mouseenter', function () { a.setAttribute('aria-expanded', 'true'); });
      li.addEventListener('mouseleave', function () { setMenu(false); });
      document.addEventListener('click', function (e) { if (!li.contains(e.target)) setMenu(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') { setMenu(false); }
      });
    }
  });

  // ---- Keep the panels inside the viewport -------------------------------
  // Every panel is centred under its own item, which puts the right-hand menus
  // (News & Events, Support) partly off-screen on a 1280 laptop, the narrowest
  // width that still shows the desktop bar at all. Each panel gets a horizontal
  // nudge just big enough to clear the edge; --nesp-dx feeds the transform, so
  // the open/close animation is untouched. Measured with offsetWidth rather than
  // the transformed rect, so the scale in the closed state cannot skew it.
  function clampPanels() {
    var vw = document.documentElement.clientWidth;
    var edge = 14;
    nav.querySelectorAll('.nesp-has-menu').forEach(function (li) {
      var panel = li.querySelector('.nesp-dropdown');
      if (!panel || !li.offsetWidth) return;
      var centre = li.getBoundingClientRect().left + li.offsetWidth / 2;
      var half = panel.offsetWidth / 2;
      var dx = 0;
      if (centre + half > vw - edge) dx = (vw - edge) - (centre + half);
      else if (centre - half < edge) dx = edge - (centre - half);
      panel.style.setProperty('--nesp-dx', Math.round(dx) + 'px');
    });
  }
  clampPanels();
  window.addEventListener('load', clampPanels);
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(clampPanels); }

  // ---- Mobile: active item + accordions ----------------------------------
  var mobile = nav.querySelector('#mobile-nav');
  var toggle = nav.querySelector('#mobile-nav-toggle');

  if (mobile) {
    mobile.querySelectorAll('.nesp-m-link').forEach(function (a) {
      var label = (a.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
      if (active && label === active) {
        a.classList.add('is-active');
        if (a.tagName === 'A') a.setAttribute('aria-current', 'page');
        var li = a.closest('.nesp-m-item');
        if (li) { li.classList.add('is-current'); li.classList.add('is-open'); } // open the section you are in
      }
    });
    mobile.querySelectorAll('.nesp-m-item.is-open .nesp-m-exp, .nesp-m-item.is-open .nesp-m-toggle').forEach(function (b) {
      b.setAttribute('aria-expanded', 'true');
    });

    // One section open at a time: the sheet is already long on a phone. The
    // chevron opens a section; so does the label of a tab with no page.
    var OPENERS = '.nesp-m-exp, .nesp-m-toggle';
    mobile.addEventListener('click', function (e) {
      var btn = e.target.closest(OPENERS);
      if (!btn) return;
      e.preventDefault();
      var li = btn.closest('.nesp-m-item');
      var willOpen = !li.classList.contains('is-open');
      mobile.querySelectorAll('.nesp-m-item.is-open').forEach(function (other) {
        if (other === li) return;
        other.classList.remove('is-open');
        other.querySelectorAll(OPENERS).forEach(function (ob) { ob.setAttribute('aria-expanded', 'false'); });
      });
      li.classList.toggle('is-open', willOpen);
      li.querySelectorAll(OPENERS).forEach(function (b) { b.setAttribute('aria-expanded', willOpen ? 'true' : 'false'); });
    });
  }

  // ---- Mobile sheet open/close -------------------------------------------
  // Panel, button icon and aria-expanded all route through setOpen() so they
  // can never disagree. Don't toggle the open class from anywhere else.
  if (toggle && mobile) {
    var setOpen = function (open) {
      mobile.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      nav.classList.toggle('nesp-sheet-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!mobile.classList.contains('is-open'));
    });

    // Tapping a destination closes the sheet behind you. The accordion buttons
    // are not destinations, so they are excluded.
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('.nesp-m-exp')) return;
      if (e.target.closest('a')) setOpen(false);
    });

    // Tap-away and Esc, the two things people try when a mobile menu is open.
    document.addEventListener('click', function (e) {
      if (!mobile.classList.contains('is-open')) return;
      if (mobile.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') setOpen(false);
    });

    // Crossing into desktop must reset the button too, not just hide the panel.
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1152px)').matches) setOpen(false);
    });
  }
})();
