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
  // FINANCING still has no page in this build. Rather than send people to the
  // Coming Soon placeholder (HP-08/HP-09 rule that out) it renders blurred and
  // unclickable, so the full menu the client asked for is visible while it stays
  // obvious which part is not built yet. Give an item an href here and it
  // becomes a normal link with no other change.
  var TOP = [
    { label: 'Invest', href: url.opportunities },
    { label: 'Sectors', href: url.sectors },
    { label: 'States', href: url.states },
    { label: 'Regulations', href: url.regulations },
    { label: 'Financing', href: null },
    { label: 'Data & Insights', href: url.data },
    { label: 'News & Events', href: url.news },
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
    // UX-NAV-04: all four entries used to open Regulation.html itself, so the
    // menu promised detail and delivered a general page. Each entry now opens
    // the section it names, which REG-01 gave the page.
    'REGULATIONS': {
      head: 'Regulations & Compliance', items: [
        { t: 'Core Laws & Policies', d: 'Electricity Act, PIA, NIEP & the core energy laws.', href: base + 'Regulation.html#core-laws' },
        { t: 'Business Registration', d: 'CAC incorporation, NIPC registration & licensing.', href: base + 'Regulation.html#registration' },
        { t: 'Tax & Fiscal Policy', d: 'Rates, Pioneer Status & equipment reliefs.', href: base + 'Regulation.html#tax' },
        { t: 'Import & Export', d: 'Duty treatment, SONCAP conformity & free zones.', href: base + 'Regulation.html#trade' },
        { t: 'Treaties & Immigration', d: 'Investment guarantees, CERPAC & expatriate quota.', href: base + 'Regulation.html#treaties' },
        { t: 'Regulatory Bodies', d: 'NERC, REA & NIPC.', href: base + 'Regulation.html#bodies' }
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
    if (!item.href) {
      return '<li class="nesp-m-item"><div class="nesp-m-row">' +
        '<span class="nesp-m-link nesp-nav-soon">' + item.label + '<em>Coming soon</em></span></div></li>';
    }
    var row = '<div class="nesp-m-row"><a class="nesp-m-link" href="' + item.href + '">' + item.label + '</a>' +
      (menu ? '<button type="button" class="nesp-m-exp" aria-expanded="false" aria-label="Show ' +
        item.label + ' sections"><span aria-hidden="true"></span></button>' : '') + '</div>';
    if (!menu) return '<li class="nesp-m-item">' + row + '</li>';
    var subs = '';
    if (menu.groups) {
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
    '<a class="nesp-nav-home" href="' + HOME + '" aria-label="OSIP home"><img alt="Logo" src="' + base + 'Text.png"></a>' +
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
  var FONT = "Manrope,Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
  var GREEN = '#047857';
  if (!document.getElementById('nesp-nav-style')) {
    var st = document.createElement('style');
    st.id = 'nesp-nav-style';
    st.textContent = [
      // ---- shell ---------------------------------------------------------
      // The header itself paints nothing. Its surface is a separate layer
      // underneath the content (::before), and that layer is what contracts into
      // the floating card. The old version animated the nav's padding and the
      // row's height, which meant the browser re-laid-out the whole document on
      // every frame of the transition and the logos and links visibly resized
      // while it ran. Now the content never moves and the document is never
      // re-laid-out: an absolutely positioned layer changing its own insets
      // costs one repaint. That is the whole difference in how it reads.
      //
      // `background:transparent` here also has to beat the `bg-white` utility
      // still on the element (two pages script against `nav.bg-white`, so the
      // class stays). This stylesheet is appended at the end of <body>, so it
      // wins the tie. Without it a white slab would sit behind the card.
      '.nesp-header{position:sticky;top:0;z-index:50;background:transparent;font-family:' + FONT + '}',
      '.nesp-header>*{position:relative;z-index:1}',
      // A 3px brand rule along the very top of the page. It is what the at-rest
      // bar was missing: a plain white slab with a grey line under it reads as
      // unfinished, and this is the convention official portals use to frame the
      // page. It belongs to the page edge, not to the card, so it fades out as
      // the header detaches and comes back when you return to the top.
      '.nesp-header::after{content:"";position:absolute;top:0;left:0;right:0;height:3px;z-index:2;background:' + GREEN + ';transition:opacity .32s ease}',
      'nav.nesp-header.is-stuck::after,nav.nesp-header.osip-scrolled::after{opacity:0}',
      // The 1px border is present in BOTH states, transparent on three sides at
      // rest, so the card's outline fades in instead of stepping the surface.
      // At rest the edge is a soft shadow plus a very light hairline, not the
      // flat grey rule it was. A hard line reads as a cheap seam where the bar
      // meets a dark hero; this separates the bar from whatever is under it
      // without drawing a border across the page.
      '.nesp-header::before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;background:#fff;border:1px solid transparent;border-bottom-color:rgba(9,40,30,.07);border-radius:0;box-shadow:0 1px 3px rgba(6,20,16,.035);transition:top .16s cubic-bezier(.4,0,.2,1),right .16s cubic-bezier(.4,0,.2,1),bottom .16s cubic-bezier(.4,0,.2,1),left .16s cubic-bezier(.4,0,.2,1),border-radius .16s cubic-bezier(.4,0,.2,1),background-color .16s ease,border-color .16s ease,box-shadow .16s ease}',
      '.nesp-header *,.nesp-header *::before,.nesp-header *::after{box-sizing:border-box}',
      // Legacy reset. Around twenty pages carry a dead inline copy of the OLD
      // nav CSS, which drew the caret and the dropdown arrow notch as ::after
      // pseudo-elements. This build draws its own caret as a real element and
      // has no notch, so without these two the old pages rendered two carets
      // and an arrow nothing points with. Both selectors outrank the inline
      // ones on specificity, so no !important is needed.
      '.nesp-header .nesp-has-menu>a::after{content:none}',
      // Scrolled: the surface contracts by 8px vertically and 16px horizontally
      // and rounds off, so the page runs past a floating card instead of butting
      // against a full-width slab. The content row is untouched at 76px; the
      // card is 60px of that, and the tallest thing in the row (the 40px pill)
      // clears it comfortably. Nothing in the document moves, at any point.
      //
      // Two pages toggle `osip-scrolled` from their own scroll scripts. Both
      // classes drive the same rules, and the legacy full-width background and
      // shadow those pages declare are reset here.
      'nav.nesp-header.is-stuck,nav.nesp-header.osip-scrolled{background:transparent;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}',
      'nav.nesp-header.is-stuck::before,nav.nesp-header.osip-scrolled::before{transition-duration:.32s;top:7px;right:16px;bottom:7px;left:16px;border-radius:16px;background:rgba(255,255,255,.86);-webkit-backdrop-filter:saturate(180%) blur(16px);backdrop-filter:saturate(180%) blur(16px);border-color:rgba(9,40,30,.07);box-shadow:0 1px 2px rgba(6,20,16,.04),0 10px 24px -12px rgba(6,20,16,.2),0 30px 60px -30px rgba(2,44,34,.55)}',
      // The panel hangs off the bottom of the row, which is 8px below the card
      // once it contracts. Trimming its own offset by the same 8px keeps the
      // gap under the arrow visually identical in both states.
      // A page whose header overlays its content has no band to reveal, so it
      // keeps the same unhurried timing in both directions. Pages that reserve a
      // slot expand fast (the .16s base above) so the gaps are shut before the
      // band's edge can travel through them on the way back up.
      '.nesp-header.nesp-overlays::before{transition-duration:.32s}',
      'nav.nesp-header.is-stuck .nesp-dropdown,nav.nesp-header.osip-scrolled .nesp-dropdown{margin-top:2px}',
      '.nesp-nav-wrap{max-width:1440px;margin:0 auto;padding:0 2rem}',
      '.nesp-nav-row{display:flex;align-items:stretch;gap:1.25rem;height:68px}',

      // ---- brand ---------------------------------------------------------
      '.nesp-header .nesp-nav-brand{display:flex;align-items:center;flex:0 0 auto}',
      '.nesp-header .nesp-nav-marks{display:flex;align-items:center;gap:1rem}',
      '.nesp-header .nesp-nav-marks img{display:block;width:auto;object-fit:contain}',
      // Both marks come up a step. At 32px the crest was detail with nowhere to
      // go, and the lockup sat light against the actions on the other side.
      '.nesp-header .nesp-nav-marks img[alt="Partner"]{height:2.125rem}',
      '.nesp-header .nesp-nav-marks img[alt="Logo"]{height:1.375rem}',
      // Hairline fades at both ends rather than stopping dead.
      '.nesp-header .nesp-nav-rule{width:1px;height:1.5rem;background:linear-gradient(180deg,transparent,#e3eae6 25%,#e3eae6 75%,transparent)}',
      '.nesp-header .nesp-nav-home{display:inline-flex;align-items:center;transition:opacity .2s ease}',
      '.nesp-header .nesp-nav-home:hover{opacity:.7}',

      // ---- desktop top level ---------------------------------------------
      // Idle labels are ink, not green. Eight green items read as eight
      // highlighted links with nothing to choose between them; green now means
      // "you are here" or "you are hovering this", which is the only job it has.
      '.nesp-header .nesp-nav-top{display:none;flex:1 1 auto;min-width:0;align-items:stretch;justify-content:center;gap:2px;list-style:none;margin:0;padding:0}',
      '.nesp-header .nesp-nav-top>li{position:relative;display:flex}',
      '.nesp-header .nesp-top{position:relative;display:inline-flex;align-items:center;gap:.35rem;padding:0 .6875rem;font-family:' + FONT + ';font-size:13px;font-weight:600;line-height:1;letter-spacing:.005em;color:#38463f;text-decoration:none;white-space:nowrap;transition:color .2s ease}',
      // Hover pill, inset from the full-height hit area so the bar keeps a
      // generous click target without a full-height block of colour.
      '.nesp-header .nesp-top::before{content:"";position:absolute;left:.1875rem;right:.1875rem;top:.9375rem;bottom:.9375rem;border-radius:9px;background:transparent;transition:background-color .2s ease}',
      '.nesp-header .nesp-top>*{position:relative}',
      '.nesp-header a.nesp-top:hover,.nesp-header .nesp-has-menu:hover>.nesp-top{color:' + GREEN + '}',
      '.nesp-header a.nesp-top:hover::before,.nesp-header .nesp-has-menu:hover>.nesp-top::before{background:#f1f8f4}',
      '.nesp-header .nesp-top:focus-visible{outline:2px solid ' + GREEN + ';outline-offset:-8px;border-radius:12px}',
      // Active tab: the gold accent sits 5px under the label itself, not down on
      // the header's bottom border. It lives INSIDE the label span, so it is
      // exactly as wide as the word it underlines and needs no per-breakpoint
      // offsets when the item padding changes.
      '.nesp-header .nesp-top.is-active{color:' + GREEN + ';font-weight:700}',
      '.nesp-header .nesp-top-bar{position:absolute;left:0;right:0;top:calc(100% + 5px);height:2.5px;border-radius:999px;background:#FFB955}',
      '.nesp-header .nesp-caret{width:6px;height:6px;border-right:1.6px solid currentColor;border-bottom:1.6px solid currentColor;transform:translateY(-2px) rotate(45deg);opacity:.4;transition:transform .24s ease,opacity .24s ease}',
      '.nesp-header .nesp-has-menu:hover .nesp-caret{transform:translateY(1px) rotate(225deg);opacity:.85}',
      // NAV-01: entries with no page yet. Blurred and unclickable rather than
      // linked to the Coming Soon placeholder.
      '.nesp-header .nesp-nav-soon{opacity:.4;filter:blur(.5px);cursor:default;user-select:none}',
      '.nesp-header .nesp-nav-soon:hover{opacity:.55;filter:blur(.25px)}',

      // ---- actions -------------------------------------------------------
      // Pill and circle share one radius language, where the old square button
      // sat next to a round icon and neither looked deliberate.
      '.nesp-header .nesp-nav-actions{display:none;align-items:center;gap:.75rem;flex:0 0 auto;margin-left:auto}',
      // The CTA now uses the same shine sweep as the homepage's primary buttons
      // (.osip-shine there) instead of lifting off the bar. The lift was the
      // loudest thing in the header and it read as a web-button rather than as
      // part of an institutional bar; a light sweep says the same "this is the
      // primary action" without moving anything. Homepage's own script skips the
      // nav when it applies .osip-shine, so this has to carry its own copy: the
      // header ships with every page, most of which never load that CSS.
      '.nesp-header .nesp-cta{position:relative;overflow:hidden;isolation:isolate;display:inline-flex;align-items:center;justify-content:center;padding:.5625rem 1.25rem;border-radius:999px;background:' + GREEN + ';color:#fff;font-family:' + FONT + ';font-size:13px;font-weight:600;letter-spacing:.01em;text-decoration:none;white-space:nowrap;box-shadow:0 1px 2px rgba(4,120,87,.18);transition:background-color .2s ease,box-shadow .2s ease}',
      '.nesp-header .nesp-cta::before{content:"";position:absolute;top:0;bottom:0;left:-120%;width:55%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-22deg);transition:left .9s ease;z-index:1;pointer-events:none}',
      '.nesp-header .nesp-cta:hover::before{left:130%}',
      '.nesp-header .nesp-cta:hover{background:#036a4d;box-shadow:0 1px 2px rgba(4,120,87,.24)}',
      // Account: the outlined person glyph read as an empty placeholder, which
      // is what it was. Initials say a specific person is signed in, and they
      // are the same person AboutMe.html shows.
      '.nesp-header .nesp-avatar{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;flex:0 0 auto;border-radius:999px;background:#eaf5f0;border:1px solid rgba(4,120,87,.14);color:' + GREEN + ';text-decoration:none;font-family:' + FONT + ';font-size:11.5px;font-weight:800;letter-spacing:.03em;line-height:1;transition:background-color .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease}',
      '.nesp-header a.nesp-avatar:hover{background:' + GREEN + ';border-color:' + GREEN + ';color:#fff;box-shadow:0 10px 18px -12px rgba(4,120,87,1)}',
      '.nesp-header .nesp-avatar--sm{width:34px;height:34px;font-size:11px}',

      // ---- dropdown ------------------------------------------------------
      '.nesp-header .nesp-has-menu{position:relative}',
      '.nesp-header .nesp-dropdown{position:absolute;top:100%;left:50%;margin-top:10px;min-width:320px;max-width:390px;background:#fff;border:1px solid rgba(9,40,30,.07);border-radius:16px;box-shadow:0 1px 2px rgba(6,20,16,.04),0 12px 26px -10px rgba(6,20,16,.16),0 30px 60px -24px rgba(6,20,16,.28);padding:.5rem;opacity:0;visibility:hidden;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(10px) scale(.985);transform-origin:top center;transition:opacity .22s ease,transform .26s cubic-bezier(.2,.8,.3,1),visibility .26s ease;z-index:60}',
      '.nesp-header .nesp-has-menu:hover .nesp-dropdown,.nesp-header .nesp-dropdown:hover,.nesp-header .nesp-has-menu:focus-within .nesp-dropdown{opacity:1;visibility:visible;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(0) scale(1)}',
      // Invisible bridge so the pointer can cross the gap without the panel
      // closing under it. It has to cover the full 10px offset plus the arrow.
      '.nesp-header .nesp-dropdown::before{content:"";position:absolute;top:-16px;left:0;right:0;height:18px}',
      // The arrow tying the panel to the item it belongs to: a square rotated
      // 45deg, carrying the panel's own background and two of its borders, so it
      // reads as the panel's corner rather than as a separate triangle.
      //
      // It is offset by MINUS the panel's own clamp (--nesp-dx), so when a panel
      // near the viewport edge slides sideways to stay on screen, the arrow
      // stays put over the nav item it points at instead of travelling with it.
      '.nesp-header .nesp-dropdown::after{content:"";position:absolute;top:-7px;left:calc(50% - var(--nesp-dx,0px));width:13px;height:13px;background:#fff;border-top:1px solid rgba(9,40,30,.07);border-left:1px solid rgba(9,40,30,.07);border-radius:4px 0 0 0;transform:translateX(-50%) rotate(45deg)}',
      '.nesp-header .nesp-menu-head{font-family:' + FONT + ';font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9aa8a1;padding:.625rem .875rem .5rem}',
      '.nesp-header .nesp-menu-item{position:relative;display:block;padding:.625rem 1.75rem .625rem .875rem;border-radius:10px;text-decoration:none;transition:background-color .16s ease}',
      '.nesp-header .nesp-menu-item:hover{background:#f4faf7}',
      '.nesp-header .nesp-menu-item .t{display:block;font-family:' + FONT + ';font-size:13.5px;font-weight:700;color:#15241d;transition:color .16s ease}',
      '.nesp-header .nesp-menu-item:hover .t{color:' + GREEN + '}',
      '.nesp-header .nesp-menu-item .d{display:block;font-size:11.5px;line-height:1.45;color:#6b746f;margin-top:2px}',
      // Chevron that slides in on hover: says "this goes somewhere" without
      // printing an arrow beside every row at rest.
      '.nesp-header .nesp-menu-item::after{content:"";position:absolute;right:.875rem;top:50%;width:5px;height:5px;border-right:1.7px solid ' + GREEN + ';border-top:1.7px solid ' + GREEN + ';transform:translate(-5px,-50%) rotate(45deg);opacity:0;transition:transform .2s ease,opacity .2s ease}',
      '.nesp-header .nesp-menu-item:hover::after{transform:translate(0,-50%) rotate(45deg);opacity:.75}',
      '.nesp-header .nesp-menu-list{display:grid;grid-template-columns:1fr}',
      '.nesp-header .nesp-dropdown--compact .nesp-menu-item{padding-top:.5rem;padding-bottom:.5rem}',
      // Height-capped and scrollable, applied to EVERY dropdown. The scrollbar is
      // deliberately visible: the list is cut off mid-item with no other cue.
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list{max-height:340px;overflow-y:auto;overscroll-behavior:contain;padding-right:6px;scrollbar-width:thin;scrollbar-color:#cbd8d2 transparent}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar{width:6px}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-track{background:transparent;margin:6px 0}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb{background:#d3ded9;border-radius:999px}',
      '.nesp-header .nesp-dropdown--scroll .nesp-menu-list::-webkit-scrollbar-thumb:hover{background:' + GREEN + '}',

      // ---- wide panel (STATES) -------------------------------------------
      // 37 territories will not read as one scrolling column, so this panel
      // keeps them in their six zones across three columns. It is capped and
      // scrolls like every other panel; at these row heights the six groups fit
      // inside the cap, so in practice it never does.
      '.nesp-header .nesp-dropdown--mega{min-width:min(700px,calc(100vw - 2rem));max-width:min(700px,calc(100vw - 2rem));padding:.625rem}',
      '.nesp-header .nesp-menu-groups{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 1rem;max-height:min(480px,calc(100vh - 140px));overflow-y:auto;overscroll-behavior:contain;padding-right:6px;scrollbar-width:thin;scrollbar-color:#cbd8d2 transparent}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar{width:6px}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-track{background:transparent;margin:6px 0}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-thumb{background:#d3ded9;border-radius:999px}',
      '.nesp-header .nesp-menu-groups::-webkit-scrollbar-thumb:hover{background:' + GREEN + '}',
      '.nesp-header .nesp-menu-group{padding-bottom:.5rem}',
      // The zone heading is itself a link: States.html already carries an anchor
      // per zone in its directory below the map.
      '.nesp-header .nesp-group-head{display:block;font-family:' + FONT + ';font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#9aa8a1;padding:.5rem .625rem .3125rem;text-decoration:none;transition:color .16s ease}',
      '.nesp-header .nesp-group-head:hover{color:' + GREEN + '}',
      '.nesp-header .nesp-state{display:flex;align-items:center;gap:.375rem;padding:.3125rem .625rem;border-radius:8px;font-family:' + FONT + ';font-size:12.5px;font-weight:600;color:#33413b;text-decoration:none;transition:background-color .16s ease,color .16s ease}',
      '.nesp-header .nesp-state:hover{background:#f4faf7;color:' + GREEN + '}',
      // One published profile among 37 is worth marking. The rest need no badge:
      // the absence of one is the message.
      '.nesp-header .nesp-state-live{margin-left:auto;font-size:8.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:' + GREEN + ';background:#e7f5ee;border-radius:999px;padding:1px 6px}',

      // ---- hamburger -----------------------------------------------------
      // Three real bars that fold into a cross, instead of the old text glyph
      // swap. Same 44px target.
      '.nesp-header .nesp-nav-toggle{display:inline-flex;align-items:center;justify-content:center;align-self:center;width:44px;height:44px;margin-left:auto;margin-right:-.5rem;padding:0;border:0;background:transparent;border-radius:12px;color:' + GREEN + ';cursor:pointer;transition:background-color .2s ease}',
      '.nesp-header .nesp-nav-toggle:hover{background:#f1f8f4}',
      '.nesp-header .nesp-burger{position:relative;display:block;width:20px;height:14px}',
      '.nesp-header .nesp-burger i{position:absolute;left:0;height:2px;width:100%;border-radius:2px;background:currentColor;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .2s ease,width .3s ease}',
      '.nesp-header .nesp-burger i:nth-child(1){top:0}',
      '.nesp-header .nesp-burger i:nth-child(2){top:6px;width:70%}',
      '.nesp-header .nesp-burger i:nth-child(3){top:12px}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(1){transform:translateY(6px) rotate(45deg)}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(2){opacity:0;transform:translateX(-8px)}',
      '.nesp-header .nesp-nav-toggle.is-open .nesp-burger i:nth-child(3){transform:translateY(-6px) rotate(-45deg);width:100%}',

      // ---- mobile sheet --------------------------------------------------
      '.nesp-header .nesp-mnav{display:none;border-top:1px solid #eef1f0;padding:.5rem 0 1rem;max-height:calc(100svh - 68px);overflow-y:auto;overscroll-behavior:contain}',
      '.nesp-header .nesp-mnav.is-open{display:block;animation:nespSheetIn .26s cubic-bezier(.2,.8,.3,1)}',
      '@keyframes nespSheetIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
      '.nesp-header .nesp-mnav ul{list-style:none;margin:0;padding:0}',
      '.nesp-header .nesp-m-row{display:flex;align-items:center;border-radius:12px;transition:background-color .18s ease}',
      '.nesp-header .nesp-m-row:hover{background:#f6faf8}',
      '.nesp-header .nesp-m-link{flex:1 1 auto;display:flex;align-items:center;gap:.5rem;padding:.8125rem .75rem;font-family:' + FONT + ';font-size:14.5px;font-weight:600;letter-spacing:.005em;color:#1c2b24;text-decoration:none}',
      '.nesp-header .nesp-m-link.is-active{color:' + GREEN + ';font-weight:700}',
      '.nesp-header .nesp-m-item.is-current>.nesp-m-row{background:#f1f8f4}',
      '.nesp-header .nesp-m-exp{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0;border:0;background:transparent;border-radius:12px;color:#8b978f;cursor:pointer}',
      '.nesp-header .nesp-m-exp:hover{color:' + GREEN + '}',
      '.nesp-header .nesp-m-exp>span{width:7px;height:7px;border-right:1.8px solid currentColor;border-bottom:1.8px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .26s ease}',
      '.nesp-header .nesp-m-item.is-open>.nesp-m-row{background:#f1f8f4}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-exp{color:' + GREEN + '}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-exp>span{transform:translateY(1px) rotate(225deg)}',
      // grid-template-rows 0fr -> 1fr animates to the content's real height, so
      // the accordion never needs a hardcoded max-height per menu.
      '.nesp-header .nesp-m-sub{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.2,.8,.3,1)}',
      '.nesp-header .nesp-m-item.is-open .nesp-m-sub{grid-template-rows:1fr}',
      '.nesp-header .nesp-m-sub>div{overflow:hidden}',
      '.nesp-header .nesp-m-sublist{margin:.125rem 0 .5rem 1rem;padding-left:.875rem;border-left:1px solid #e6ece9}',
      '.nesp-header .nesp-m-sublist a{display:block;padding:.5rem .625rem;border-radius:8px;font-size:13px;font-weight:500;color:#5c6b64;text-decoration:none;transition:background-color .16s ease,color .16s ease}',
      '.nesp-header .nesp-m-sublist a:hover{background:#f6faf8;color:' + GREEN + '}',
      '.nesp-header .nesp-m-sublist a.nesp-m-subhead{font-size:9.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#9aa8a1;padding:.625rem .625rem .25rem}',
      '.nesp-header .nesp-m-sublist a.nesp-m-subhead:hover{background:transparent;color:' + GREEN + '}',
      '.nesp-header .nesp-m-foot{margin-top:.75rem;padding-top:.875rem;border-top:1px solid #eef1f0;display:flex;flex-direction:column;gap:.5rem}',
      '.nesp-header .nesp-m-foot .nesp-cta{padding:.8125rem 1.25rem;font-size:14px}',
      '.nesp-header .nesp-m-profile{display:flex;align-items:center;gap:.75rem;padding:.625rem .75rem;border-radius:12px;text-decoration:none;transition:background-color .18s ease}',
      '.nesp-header .nesp-m-profile:hover{background:#f6faf8}',
      '.nesp-header .nesp-m-profile-t b{display:block;font-family:' + FONT + ';font-size:14px;font-weight:700;color:#1c2b24;line-height:1.2}',
      '.nesp-header .nesp-m-profile-t em{display:block;font-style:normal;font-size:11.5px;font-weight:600;color:#8b978f;margin-top:2px}',
      '.nesp-header .nesp-m-profile:hover .nesp-m-profile-t b{color:' + GREEN + '}',
      '.nesp-header .nesp-mnav .nesp-nav-soon em{font-style:normal;font-size:9.5px;letter-spacing:.08em;border:1px dashed #cfd8d4;border-radius:999px;padding:0 .5rem;color:#6b746f;filter:blur(0)}',

      // ---- breakpoints ---------------------------------------------------
      // The desktop/mobile switch is stated HERE, not left to Tailwind's xl:*,
      // which homepage.html's frozen build does not contain.
      '@media (min-width:78rem){',
      '.nesp-header .nesp-nav-top{display:flex}',
      '.nesp-header .nesp-nav-actions{display:flex}',
      '.nesp-header .nesp-nav-toggle{display:none}',
      '.nesp-header .nesp-mnav{display:none!important}',
      '}',
      // Eight items only get room to breathe on a genuinely wide screen, so the
      // padding grows with the viewport instead of being one cramped constant.
      '@media (min-width:85rem){.nesp-header .nesp-top{padding:0 .875rem;font-size:13.5px}}',
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
      '.nesp-header .nesp-m-link{font-size:15px}',
      // Tighter card inset on a phone, where 16px of side gutter is a lot of the
      // screen.
      'nav.nesp-header.is-stuck::before,nav.nesp-header.osip-scrolled::before{top:5px;right:10px;bottom:5px;left:10px;border-radius:13px}',
      '}',
      // Very narrow: drop the partner mark rather than let the row wrap.
      '@media (max-width:22.5rem){.nesp-header .nesp-nav-marks img[alt="Partner"],.nesp-header .nesp-nav-rule{display:none}}',
      '@media (prefers-reduced-motion:reduce){.nesp-header *,.nesp-header *::before,.nesp-header *::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}',
      // The header is sticky, so an in-page jump used to park the target under
      // it. Every anchor target keeps the header height clear; measureNav()
      // fills the variable in from the real rendered height.
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
    if (!menu || a.tagName !== 'A') return;
    var li = a.closest('li'); if (!li) return;
    li.classList.add('nesp-has-menu');
    var panel = document.createElement('div');
    var body;
    if (menu.groups) {
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
    mobile.querySelectorAll('.nesp-m-item.is-open .nesp-m-exp').forEach(function (b) {
      b.setAttribute('aria-expanded', 'true');
    });

    // One section open at a time: the sheet is already long on a phone.
    mobile.addEventListener('click', function (e) {
      var btn = e.target.closest('.nesp-m-exp');
      if (!btn) return;
      e.preventDefault();
      var li = btn.closest('.nesp-m-item');
      var willOpen = !li.classList.contains('is-open');
      mobile.querySelectorAll('.nesp-m-item.is-open').forEach(function (other) {
        if (other === li) return;
        other.classList.remove('is-open');
        var ob = other.querySelector('.nesp-m-exp');
        if (ob) ob.setAttribute('aria-expanded', 'false');
      });
      li.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  }

  // ---- Mobile sheet open/close -------------------------------------------
  // Panel, button icon and aria-expanded all route through setOpen() so they
  // can never disagree. Don't toggle the open class from anywhere else.
  if (toggle && mobile) {
    var setOpen = function (open) {
      mobile.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
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
      if (window.matchMedia('(min-width: 1248px)').matches) setOpen(false);
    });
  }
})();
