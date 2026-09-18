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
  // One magnifier, used by the header button, the open search bar and the
  // mobile sheet's search field.
  var SEARCH_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>';
  var CLOSE_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  function initialsOf(name) {
    return (name || '').split(/\s+/).slice(0, 2).map(function (w) {
      return w.charAt(0);
    }).join('').toUpperCase();
  }

  // ---- Session (16 Sep 2026) ---------------------------------------------
  // There is no backend to authenticate against yet, so "signed in" is a flag
  // this prototype keeps in localStorage under osip_session - the same place
  // InvestNow1 already keeps the sectors someone picked. Login.html writes it,
  // Sign out clears it, and every header reads it, so the state survives a
  // refresh, a new tab and moving between pages. Where storage is blocked
  // (private windows, some file:// setups) it falls back to memory and simply
  // lasts as long as the tab.
  //
  // It is a display flag and nothing more: no page keeps anything private
  // behind it, and real authentication replaces readSession/writeSession
  // without touching anything else.
  var SESSION_KEY = 'osip_session';
  var memorySession = null;

  function readSession() {
    try {
      var raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) return JSON.parse(raw);
      return null;
    } catch (e) { return memorySession; }
  }

  function writeSession(value) {
    memorySession = value;
    try {
      if (value) window.localStorage.setItem(SESSION_KEY, JSON.stringify(value));
      else window.localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* memory only */ }
  }

  var session = readSession();
  var USER_NAME = (session && session.name) || USER.name;
  var INITIALS = initialsOf(USER_NAME);

  // Shared with Login.html, AboutMe.html's Sign out and the opportunity page's
  // members-only sections, all of which load this file.
  window.OSIPSession = {
    key: SESSION_KEY,
    get: function () { return readSession(); },
    signIn: function (who) {
      var value = {
        name: (who && who.name) || USER.name,
        email: (who && who.email) || '',
        at: new Date().toISOString()
      };
      writeSession(value);
      return value;
    },
    signOut: function () { writeSession(null); }
  };
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
    // The primary action ("Register your interest") opens the InvestorMatch
    // quiz rather than the old InvestNow1-3 popup flow (see investflow.js).
    invest: base + 'InvestorMatch.html',
    faqs: base + 'FAQs.html',
    events: base + 'Event.html',
    announcements: base + 'Announcements.html',
    // UX-NAV-06: one search box in the header, one results page behind it.
    search: base + 'Search.html',
    // UX-10: login could not be reached from any menu. It can now.
    login: base + 'Login.html'
  };

  // Log in comes back to the page it was opened from, so signing in does not
  // cost the reader their place. Only a path inside the site is ever passed on
  // (see Login.html), never a full URL.
  function loginHref() {
    try {
      var path = window.location.pathname;
      var file = path.split('/').pop() || 'homepage.html';
      var next = (/\/pages\/[^\/]*$/.test(path) ? '' : '../') + file +
        window.location.search + window.location.hash;
      return url.login + '?next=' + encodeURIComponent(next);
    } catch (e) { return url.login; }
  }

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
    // News and Events are separate pages; one tab holds both, the same way
    // Resources holds its sections.
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
    // 16 Sep 2026: three of five entries used to open the same unfiltered
    // Opportunities page, and Grid Infrastructure had nothing behind it at all -
    // no OSIP sector covers transmission.
    //
    // 17 Sep 2026: down to the two halves of the Opportunities page, named as that
    // page names them. Sector-filtered views and the matcher were a second way of
    // saying the same thing; the page's own filters do the first, and the header's
    // "Register your interest" button does the second.
    'INVEST': {
      head: 'Investment Opportunities', items: [
        { t: 'Opportunity Areas', d: 'Business models open to investors, sector by sector.', href: base + 'Opportunities.html#opportunity-areas' },
        { t: 'Active Opportunities', d: 'Published projects with figures, stage and location.', href: base + 'Opportunities.html#active-opportunities' }
      ]
    },
    'SUPPORT': {
      head: 'Help and Support', items: [
        { t: 'Contact us', d: 'Reach the OSIP team directly.', href: base + 'Contact.html' },
        { t: 'FAQs', d: 'Answers to the questions we are asked most.', href: base + 'FAQs.html' },
        { t: 'OSIP Help Desk', d: 'Investor support services.', href: base + 'HelpDesk.html' }
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
          head: 'Regulations', href: url.regulations, wide: true, items: [
            { t: 'Core Laws & Policies', d: 'Electricity Act, PIA, NIEP & the core energy laws.', href: base + 'Regulation.html#core-laws' },
            { t: 'Business Registration', d: 'CAC incorporation, NIPC registration & licensing.', href: base + 'Regulation.html#registration' },
            { t: 'Tax & Fiscal Policy', d: 'Rates, Pioneer Status & equipment reliefs.', href: base + 'Regulation.html#tax' },
            { t: 'Import & Export', d: 'Duty treatment, SONCAP conformity & free zones.', href: base + 'Regulation.html#trade' },
            { t: 'Treaties & Immigration', d: 'Investment guarantees, CERPAC & expatriate quota.', href: base + 'Regulation.html#treaties' },
            { t: 'Regulatory Bodies', d: 'NERC, REA & NIPC.', href: base + 'Regulation.html#bodies' },
            { t: 'Pathway Finder', d: 'Your approvals, by sector, model and connection.', href: base + 'Regulation.html#pathway' }
          ]
        },
        {
          head: 'Data & Insights', href: url.data, items: [
            { t: 'National Intelligence', d: 'Indicators, maps and trends for the whole country.', href: base + 'Data.html#national-intelligence' },
            { t: 'Geographic Hotspots', d: 'Where each sector is concentrated, state by state.', href: base + 'Data.html#hotspots' },
            { t: 'Open Data Downloads', d: 'Planned datasets, and where to get data today.', href: base + 'Data.html#downloads' }
          ]
        },
        // Financing has no page, so it stays a coming-soon strip rather than a
        // link: a menu entry that opens something else is a promise the platform
        // does not keep. The climate finance route GOPA-INV-01 asks for is on
        // Invest Now, where the reader is already being routed.
        { head: 'Financing', soon: true },
      ]
    },
    // Newsroom (17 Sep 2026): News and Events. Announcements was the third item
    // here and is no longer published, so the menu no longer offers it. The page
    // and its breadcrumbs are left in place for anything that still holds a
    // link; nothing in the header points at them.
    'NEWSROOM': {
      head: 'Newsroom', items: [
        { t: 'News', d: 'Policy, market and sector updates.', href: url.news },
        { t: 'Events', d: 'Forums, workshops & roadshows.', href: url.events }
      ]
    }
  };

  var FILE = (location.pathname.split('/').pop() || '').toLowerCase() || 'homepage.html';

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
    'contact.html': 'SUPPORT', 'faqs.html': 'SUPPORT', 'helpdesk.html': 'SUPPORT'
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

  // ---- Breadcrumbs (UX-NAV-07) -------------------------------------------
  // Only two pages carried a trail, so on a sector or a notice there was nothing
  // saying where you were or how to step back up. The trail is declared here, with
  // the rest of the site's structure, rather than pasted into thirty pages.
  //
  // It is NOT a bar under the header. A full-width strip between the header and
  // the page is another horizontal line to get past before the page begins, and
  // it reads as chrome rather than as part of the page. Instead the trail is set
  // into the page's own header, in the slot the eyebrow already occupies:
  //
  //   - a big dark hero (Sector, States, Data, the notices and events, a sector
  //     page): it REPLACES the eyebrow, in white on the photograph;
  //   - a paper page (Opportunities, News, Contact): it sits directly above the
  //     title, small and grey, exactly as the opportunity detail pages have it;
  //   - Regulations: it takes the place of the gold rule above the title.
  //
  // Each entry is the path ABOVE the page; Home is added in front of every trail
  // and the page itself closes it. `self` names the page; where it is left out the
  // page's own <h1> (or its <title>) names it, so an article or a notice reads as
  // itself. Pages with no entry - the homepage, the quiz, the sign-in and pop-up
  // steps - get no trail.
  var SECTORS_UP = [{ t: 'Sectors', href: url.sectors }];
  var NEWSROOM_UP = { t: 'Newsroom' };
  var CRUMBS = {
    'sector.html': { self: 'Sectors' },
    'detailedsector.html': { up: SECTORS_UP },
    'wind.html': { up: SECTORS_UP },
    'storage.html': { up: SECTORS_UP },
    'smallhydro.html': { up: SECTORS_UP },
    'bioenergy.html': { up: SECTORS_UP },
    'cleancooking.html': { up: SECTORS_UP },
    'greenmobility.html': { up: SECTORS_UP },
    'greenhydrogen.html': { up: SECTORS_UP },
    'energyefficiency.html': { up: SECTORS_UP },
    'agriculturepue.html': { up: SECTORS_UP },
    'newdetailedsectortesting.html': { up: SECTORS_UP },
    'opportunities.html': { self: 'Investment Opportunities' },
    'states.html': { self: 'Invest by State' },
    'enugu.html': { up: [{ t: 'Invest by State', href: url.states }] },
    'regulation.html': { self: 'Regulations' },
    'data.html': { self: 'Data & Insights' },
    'news.html': { up: [NEWSROOM_UP], self: 'News' },
    'newsindetail.html': { up: [NEWSROOM_UP, { t: 'News', href: url.news }] },
    'announcements.html': { up: [NEWSROOM_UP], self: 'Announcements' },
    'individualannouncement.html': { up: [NEWSROOM_UP, { t: 'Announcements', href: url.announcements }] },
    'event.html': { up: [NEWSROOM_UP], self: 'Events & Engagements' },
    'individualevent.html': { up: [NEWSROOM_UP, { t: 'Events', href: url.events }] },
    'contact.html': { up: [{ t: 'Support' }], self: 'Contact Us' },
    'faqs.html': { up: [{ t: 'Support' }], self: 'FAQs' },
    'helpdesk.html': { up: [{ t: 'Support' }], self: 'OSIP Help Desk' },
    'aboutosip.html': { self: 'About OSIP' },
    'aboutme.html': { self: 'My Profile' },
    'search.html': { self: 'Search' }
  };

  // Where the trail goes on each page, and in what tone.
  //   replace - stand in for this element (an eyebrow, a back-link, a gold rule)
  //   before  - sit immediately above it
  //   title   - sit above the block that holds the page title
  // `light` is the white-on-photograph tone for a dark hero.
  var HERO_EYEBROW = '.max-w-3xl > div.flex.items-center.gap-3';   // dash + label
  var CRUMB_MOUNT = {
    'sector.html': { mode: 'replace', sel: '.sec-hero-copy .sec-eyebrow', tone: 'light' },
    'detailedsector.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'wind.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'storage.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'smallhydro.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'bioenergy.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'cleancooking.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'greenmobility.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'greenhydrogen.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'energyefficiency.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'agriculturepue.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'newdetailedsectortesting.html': { mode: 'before', sel: 'main > section:first-of-type .max-w-3xl h1', tone: 'light' },
    'states.html': { mode: 'replace', sel: '.max-w-3xl > span.text-tertiary-fixed-dim', tone: 'light' },
    'enugu.html': { mode: 'replace', sel: '.max-w-3xl > a[href="States.html"]', tone: 'light' },
    'data.html': { mode: 'replace', sel: '.max-w-3xl > .osip-hero-eyebrow', tone: 'light' },
    'announcements.html': { mode: 'replace', sel: HERO_EYEBROW, tone: 'light' },
    'event.html': { mode: 'replace', sel: HERO_EYEBROW, tone: 'light' },
    'faqs.html': { mode: 'replace', sel: HERO_EYEBROW, tone: 'light' },
    'individualannouncement.html': { mode: 'replace', sel: '.max-w-3xl > a[href="Announcements.html"]', tone: 'light' },
    'individualevent.html': { mode: 'replace', sel: '.max-w-3xl > a[href="Event.html"]', tone: 'light' },
    'aboutosip.html': { mode: 'replace', sel: '.ab-hero-inner > .ab-eyebrow', tone: 'light' },
    // Paper pages: above the title. Regulations' gold rule is the slot itself.
    'regulation.html': { mode: 'replace', sel: 'main > div:first-child > .flex > .w-1' },
    'opportunities.html': { mode: 'title' },
    'news.html': { mode: 'title' },
    'contact.html': { mode: 'title' },
    'newsindetail.html': { mode: 'replace', sel: 'body > div > nav:first-child' },
    'helpdesk.html': { mode: 'replace', sel: '.hd-eyebrow' },
    'search.html': { mode: 'replace', sel: '.sr-eyebrow' }
  };

  // A chevron, the one the opportunity pages draw.
  var CRUMB_SEP = '<svg class="nesp-crumb-sep" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
    '<path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg>';

  function crumbLabel(cfg) {
    if (cfg.self) return cfg.self;
    var h1 = document.querySelector('main h1, h1');
    var text = h1 ? h1.textContent : '';
    if (!text) text = (document.title || '').split('|')[0];
    return text.replace(/\s+/g, ' ').trim() || 'This page';
  }

  function crumbsHtml(light) {
    var cfg = CRUMBS[FILE];
    if (!cfg) return '';
    var links = [{ t: 'Home', href: HOME }].concat(cfg.up || []);
    var items = links.map(function (c) {
      return '<li>' + (c.href
        ? '<a href="' + c.href + '">' + c.t + '</a>'
        : '<span class="nesp-crumb-step">' + c.t + '</span>') + CRUMB_SEP + '</li>';
    }).join('');
    return '<nav class="nesp-crumbs' + (light ? ' nesp-crumbs--light' : '') + '" aria-label="Breadcrumb"><ol>' + items +
      '<li><span class="nesp-crumb-here" aria-current="page">' + crumbLabel(cfg) + '</span></li>' +
      '</ol></nav>';
  }

  // The block that carries the page title: climb from the <h1> to the child of
  // <main> (or of the body) that contains it, so the trail clears the whole
  // header row - title, count line and search field - rather than landing inside it.
  function titleBlock() {
    var h1 = document.querySelector('main h1') || document.querySelector('h1');
    if (!h1) return null;
    var node = h1;
    while (node.parentNode && node.parentNode.nodeType === 1) {
      var tag = node.parentNode.tagName;
      if (tag === 'MAIN' || tag === 'BODY' || tag === 'HTML') return node;
      node = node.parentNode;
    }
    return null;
  }

  function mountCrumbs() {
    var at = CRUMB_MOUNT[FILE];
    if (!at || !CRUMBS[FILE] || document.querySelector('.nesp-crumbs')) return;
    var target = at.mode === 'title' ? titleBlock() : document.querySelector(at.sel);
    if (!target || !target.parentNode) return;

    var html = crumbsHtml(at.tone === 'light');
    if (!html) return;
    var holder = document.createElement('div');
    holder.innerHTML = html;
    var crumbs = holder.firstChild;

    if (at.mode === 'replace') target.parentNode.replaceChild(crumbs, target);
    else target.parentNode.insertBefore(crumbs, target);

    // In a flex or grid header the parent's own gap already sets the distance to
    // the title; the trail's margin would be added on top of it.
    var pd = '';
    try { pd = window.getComputedStyle(crumbs.parentNode).display || ''; } catch (e) { }
    if (pd.indexOf('flex') > -1 || pd.indexOf('grid') > -1) crumbs.style.marginBottom = '0';

    // The hero pages hold their copy at opacity 0 until the motion layer takes
    // over (html.rd-intro). The trail waits with them and then arrives on its
    // own, so it is never the one thing already on screen.
    var root = document.documentElement;
    if (!root.classList.contains('rd-intro')) { crumbs.classList.add('is-in'); return; }
    var done = false;
    function show() {
      if (done) return;
      done = true;
      crumbs.classList.add('is-in');
    }
    if (window.MutationObserver) {
      var mo = new MutationObserver(function () {
        if (!root.classList.contains('rd-intro')) { mo.disconnect(); show(); }
      });
      mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    }
    setTimeout(show, 1600);
  }

  var NAV =
    '<nav class="nesp-header bg-white">' +
    // UX-A11-07: the first Tab stop on every page. Off-screen until it takes
    // focus, then a pill in the top-left corner. Its target is worked out below,
    // because not every page has a <main> (the homepage builds itself inside
    // #root instead).
    '<a class="nesp-skip" href="#osip-main">Skip to main content</a>' +
    '<div class="nesp-nav-wrap">' +
    '<div class="nesp-nav-row">' +
    // Both logos sit together on the left, separated by a hairline so they read
    // as two marks rather than one wordmark.
    '<div class="nesp-nav-brand">' +
    '<div class="nesp-nav-marks">' +
    '<img class="nesp-mark-partner" alt="Federal Ministry of Power" src="' + base + 'logoNESP.png">' +
    '<span class="nesp-nav-rule" aria-hidden="true"></span>' +
    '<a class="nesp-nav-home" href="' + HOME + '" aria-label="One-Stop Investment Platform (OSIP), home"><img class="nesp-mark-osip" alt="" src="' + base + 'Text.png"></a>' +
    '</div></div>' +
    '<ul class="nesp-nav-top">' + TOP.map(topItem).join('') + '</ul>' +
    '<div class="nesp-nav-actions">' +
    '<button type="button" class="nesp-icon-btn nesp-search-btn" aria-label="Search this site"' +
    ' aria-expanded="false" aria-controls="nesp-search">' + SEARCH_SVG + '</button>' +
    // UX-08-13: the biggest label on the site used to be "Invest Now", and you
    // cannot invest here. It names what the button actually does now.
    '<a href="' + url.invest + '" class="nesp-cta">Register your interest</a>' +
    // One or the other, never both: the profile mark only means anything to
    // someone who is signed in, and Log in only to someone who is not.
    (session
      ? '<a href="' + url.profile + '" class="nesp-avatar" title="' + USER_NAME + '" aria-label="My profile: ' + USER_NAME + '">' +
      '<span aria-hidden="true">' + INITIALS + '</span></a>'
      : '<a href="' + loginHref() + '" class="nesp-login">Log in</a>') +
    '</div>' +
    // UX-13: on a phone the primary action used to be buried in the menu sheet.
    // It now sits in the bar itself, next to the burger, and only shortens its
    // label on the narrowest screens.
    '<a href="' + url.invest + '" class="nesp-cta nesp-cta--m" aria-label="Register your interest">' +
    '<span class="nesp-cta-long">Register your interest</span>' +
    '<span class="nesp-cta-short">Register interest</span></a>' +
    '<button id="mobile-nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"' +
    ' class="nesp-nav-toggle"><span class="nesp-burger" aria-hidden="true"><i></i><i></i><i></i></span></button>' +
    '</div>' +
    '<div id="mobile-nav" class="nesp-mnav">' +
    '<form class="nesp-m-search" role="search" method="get" action="' + url.search + '">' +
    '<span aria-hidden="true">' + SEARCH_SVG + '</span>' +
    '<label class="nesp-sr-only" for="nesp-m-search-q">Search OSIP</label>' +
    '<input id="nesp-m-search-q" type="search" name="q" autocomplete="off" placeholder="Search OSIP">' +
    '<button type="submit">Search</button></form>' +
    '<ul>' + TOP.map(mobileItem).join('') + '</ul>' +
    '<div class="nesp-m-foot">' +
    (session
      ? '<a href="' + url.profile + '" class="nesp-m-profile">' +
      '<span class="nesp-avatar nesp-avatar--sm"><span aria-hidden="true">' + INITIALS + '</span></span>' +
      '<span class="nesp-m-profile-t"><b>' + USER_NAME + '</b><em>View profile</em></span></a>'
      : '') +
    '<a href="' + url.invest + '" class="nesp-cta">Register your interest</a>' +
    (session
      ? '<button type="button" class="nesp-login nesp-login--m" data-osip-signout>Sign out</button>'
      : '<a href="' + loginHref() + '" class="nesp-login nesp-login--m">Log in or register</a>') +
    '</div></div>' +
    '</div></nav>';

  // UX-NAV-06: one site-wide search. It is not part of the header: opening it
  // lays a blurred sheet over the whole window, header included, and puts the
  // box a third of the way down the screen where the eye already is. The layer
  // lives on the body rather than inside the nav, because a child of the
  // header can never paint over the header it belongs to.
  var SEARCH_LAYER =
    '<div class="nesp-search-layer" role="dialog" aria-modal="true" aria-label="Search OSIP" hidden>' +
    '<form id="nesp-search" class="nesp-search" role="search" method="get" action="' + url.search + '">' +
    '<span class="nesp-search-ico" aria-hidden="true">' + SEARCH_SVG + '</span>' +
    '<label class="nesp-sr-only" for="nesp-search-q">Search OSIP</label>' +
    '<input id="nesp-search-q" class="nesp-search-input" type="search" name="q" autocomplete="off"' +
    ' placeholder="Search sectors, opportunities, regulations, states, data and news">' +
    '<button type="submit" class="nesp-search-go">Search</button>' +
    '<button type="button" class="nesp-search-close" aria-label="Close search">' + CLOSE_SVG + '</button>' +
    '</form>' +
    '<p class="nesp-search-hint">Press Enter for all results, Esc to close</p>' +
    '</div>';

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
      '.nesp-nav-row{position:relative;display:flex;align-items:stretch;gap:1.25rem;height:64px}',

      // ---- brand ---------------------------------------------------------
      '.nesp-header .nesp-nav-brand{display:flex;align-items:center;flex:0 0 auto}',
      '.nesp-header .nesp-nav-marks{display:flex;align-items:center;gap:1rem}',
      '.nesp-header .nesp-nav-marks img{display:block;width:auto;object-fit:contain}',
      '.nesp-header .nesp-nav-marks .nesp-mark-partner{height:2.125rem}',
      '.nesp-header .nesp-nav-marks .nesp-mark-osip{height:1.375rem}',
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
      // ---- skip to content (UX-A11-07) ------------------------------------
      // Moved out of sight with a transform rather than display:none, which
      // would take it out of the tab order and defeat the point.
      '.nesp-header .nesp-skip{position:absolute;top:10px;left:14px;z-index:80;display:inline-flex;align-items:center;height:40px;padding:0 1.125rem;border-radius:999px;background:' + GREEN + ';color:#fff;font-family:' + SANS + ';font-size:14px;font-weight:500;letter-spacing:0;text-decoration:none;white-space:nowrap;box-shadow:0 10px 30px -12px rgba(19,32,27,.5);opacity:0;pointer-events:none;transform:translateY(-160%);transition:transform .24s cubic-bezier(.16,1,.3,1),opacity .24s ease}',
      '.nesp-header .nesp-skip:focus{opacity:1;pointer-events:auto;transform:none;outline:2px solid ' + GREEN2 + ';outline-offset:3px}',
      '@media (prefers-reduced-motion:reduce){.nesp-header .nesp-skip{transition:none}}',
      // ---- search, log in, mobile action (16 Sep 2026) --------------------
      // The bell went: nothing in the brief asks for notifications. What the audit does
      // ask for - search, a way to log in, and the main action visible on a
      // phone - takes its place.
      '.nesp-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}',
      '.nesp-header .nesp-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex:0 0 auto;padding:0;border-radius:999px;background:' + CARD + ';border:1px solid ' + LINE2 + ';color:' + GREEN + ';cursor:pointer;transition:background-color .3s ease,color .3s ease,border-color .3s ease}',
      '.nesp-header .nesp-icon-btn:hover{background:' + GREEN + ';border-color:' + GREEN + ';color:#fff}',
      '.nesp-header .nesp-icon-btn:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:2px}',
      '.nesp-header .nesp-icon-btn svg{display:block}',
      '.nesp-header .nesp-login{display:inline-flex;align-items:center;justify-content:center;height:42px;padding:0 1.125rem;border-radius:999px;background:transparent;border:1px solid ' + LINE2 + ';color:' + GREEN + ';font-family:' + SANS + ';font-size-adjust:none;font-size:14px;font-weight:500;letter-spacing:0;white-space:nowrap;text-decoration:none;transition:background-color .3s ease,border-color .3s ease,color .3s ease}',
      '.nesp-header .nesp-login:hover{background:' + TINT + ';border-color:' + GREEN2 + '}',
      '.nesp-header .nesp-login:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:2px}',
      // The search bar covers the row it opens over.
      // The layer sits above everything, including the sticky header, so the
      // whole page goes soft behind it and only the box is in focus.
      '.nesp-search-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:70;display:flex;flex-direction:column;align-items:center;padding:0 1.25rem;background:rgba(19,32,27,.28);-webkit-backdrop-filter:blur(9px) saturate(115%);backdrop-filter:blur(9px) saturate(115%);opacity:0;transition:opacity .26s ease}',
      '.nesp-search-layer[hidden]{display:none}',
      '.nesp-search-layer.is-open{opacity:1}',
      // A third of the way down: the line the hero headline sits on.
      '.nesp-header .nesp-search,.nesp-search-layer .nesp-search{width:min(720px,100%);margin-top:clamp(120px,30vh,300px);display:flex;align-items:center;gap:.5rem;padding:.4375rem .4375rem .4375rem 1.25rem;background:' + CARD + ';border:1px solid ' + LINE + ';border-radius:999px;box-shadow:0 2px 6px rgba(19,32,27,.06),0 40px 80px -40px rgba(19,32,27,.55);transform:translateY(-10px) scale(.99);transition:transform .38s cubic-bezier(.16,1,.3,1)}',
      '.nesp-search-layer.is-open .nesp-search{transform:none}',
      '.nesp-search-ico{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;color:' + GREEN2 + '}',
      '.nesp-search-input{flex:1 1 auto;min-width:0;height:44px;border:0;background:transparent;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:17px;font-weight:400;letter-spacing:-.006em;color:' + INK + ';outline:0;-webkit-appearance:none;appearance:none}',
      '.nesp-search-input::placeholder{color:' + INK3 + ';opacity:1}',
      '.nesp-search-input::-webkit-search-cancel-button{-webkit-appearance:none}',
      '.nesp-search-go{flex:0 0 auto;height:40px;padding:0 1.25rem;border:0;border-radius:999px;background:' + GREEN + ';color:#fff;font-family:' + SANS + ';font-size:13.5px;font-weight:500;cursor:pointer;transition:background-color .3s ease}',
      '.nesp-search-go:hover{background:#062f1f}',
      '.nesp-search-close{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:0;border-radius:999px;background:transparent;color:' + INK3 + ';cursor:pointer;transition:background-color .3s ease,color .3s ease}',
      '.nesp-search-close:hover{background:' + TINT + ';color:' + INK + '}',
      '.nesp-search-go:focus-visible,.nesp-search-close:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:2px}',
      '.nesp-search-hint{margin:.875rem 0 0;font-family:' + SANS + ';font-size:12px;font-weight:500;letter-spacing:.04em;color:rgba(255,255,255,.72);text-shadow:0 1px 10px rgba(19,32,27,.45)}',
      '@media (max-width:30rem){.nesp-search-layer .nesp-search{margin-top:18vh;flex-wrap:wrap}.nesp-search-go{width:100%;order:3}}',
      '@media (prefers-reduced-motion:reduce){.nesp-search-layer{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(19,32,27,.5)}.nesp-search-layer .nesp-search{transform:none}}',
      // Mobile: the action pill in the bar, the search field in the sheet.
      '.nesp-header .nesp-cta--m{align-self:center;margin-left:auto;height:38px;padding:0 1rem;font-size:13px}',
      '.nesp-header .nesp-cta--m + .nesp-nav-toggle{margin-left:.25rem}',
      '.nesp-header .nesp-cta--m .nesp-cta-short{display:none}',
      '.nesp-header .nesp-m-search{display:flex;align-items:center;gap:.5rem;margin:.25rem .25rem 1rem;padding:.3125rem .3125rem .3125rem .875rem;border:1px solid ' + LINE + ';border-radius:999px;background:' + CARD + '}',
      '.nesp-header .nesp-m-search:focus-within{border-color:' + GREEN2 + '}',
      '.nesp-header .nesp-m-search>span{display:inline-flex;flex:0 0 auto;color:' + GREEN2 + '}',
      '.nesp-header .nesp-m-search input{flex:1 1 auto;min-width:0;height:40px;border:0;background:transparent;font-family:' + SANS + ';font-size-adjust:' + ADJUST + ';font-size:16.5px;color:' + INK + ';outline:0;-webkit-appearance:none;appearance:none}',
      '.nesp-header .nesp-m-search input::placeholder{color:' + INK3 + ';opacity:1}',
      '.nesp-header .nesp-m-search button{flex:0 0 auto;height:38px;padding:0 1rem;border:0;border-radius:999px;background:' + GREEN + ';color:#fff;font-family:' + SANS + ';font-size:13.5px;font-weight:500;cursor:pointer}',
      '.nesp-header .nesp-login--m{height:46px;width:100%}',
      // Keyboard: every menu entry shows where the focus is.
      '.nesp-header .nesp-menu-item:focus-visible,.nesp-header .nesp-state:focus-visible,.nesp-header .nesp-group-head:focus-visible,.nesp-header .nesp-res-head:focus-visible,.nesp-header .nesp-m-sublist a:focus-visible,.nesp-header .nesp-m-link:focus-visible,.nesp-header .nesp-m-exp:focus-visible,.nesp-header .nesp-m-profile:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:-2px;background:' + TINT + '}',
      // ---- dropdown ------------------------------------------------------
      // A warm card; entry names in Newsreader, their one-liners under them.
      '.nesp-header .nesp-has-menu{position:relative}',
      '.nesp-header .nesp-dropdown{position:absolute;top:100%;left:50%;margin-top:10px;min-width:320px;max-width:390px;background:' + CARD + ';border:1px solid ' + LINE + ';border-radius:20px;box-shadow:0 1px 2px rgba(19,32,27,.04),0 24px 50px -26px rgba(19,32,27,.32);padding:.5rem;opacity:0;visibility:hidden;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(10px) scale(.985);transform-origin:top center;transition:opacity .26s ease,transform .36s cubic-bezier(.16,1,.3,1),visibility 0s linear .36s;z-index:60}',
      '.nesp-header .nesp-has-menu:hover .nesp-dropdown,.nesp-header .nesp-dropdown:hover,.nesp-header .nesp-dropdown:focus-within,.nesp-header .nesp-has-menu.is-open .nesp-dropdown{opacity:1;visibility:visible;transition:opacity .26s ease,transform .36s cubic-bezier(.16,1,.3,1),visibility 0s linear 0s;transform:translateX(calc(-50% + var(--nesp-dx,0px))) translateY(0) scale(1)}',
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
      '.nesp-header .nesp-cta--m{display:none}',
      '.nesp-header .nesp-mnav{display:none!important}',
      '}',
      '@media (min-width:85rem){.nesp-header .nesp-top{padding:0 .875rem;font-size:14px}}',
      '@media (min-width:95rem){.nesp-header .nesp-top{padding:0 1.0625rem}}',
      '@media (max-width:47.9375rem){.nesp-nav-wrap{padding:0 1.5rem}}',
      // UX-MOB-01: on a phone the action drops one word, to "Register interest".
      // At 390px the full label made the pill 156px - two fifths of the bar -
      // which squeezed the ministry mark and left the burger on the edge. It is
      // "Register interest" and not "Register" because this opens the investor
      // match, not a sign-up: bare "Register" reads as create-an-account, which
      // is what Log in is for. The anchor's aria-label keeps the full phrase.
      // 30rem, not the old 23.75rem: every phone in portrait is under it.
      '@media (max-width:30rem){',
      '.nesp-header .nesp-cta--m .nesp-cta-long{display:none}',
      '.nesp-header .nesp-cta--m .nesp-cta-short{display:inline}',
      '}',
      '@media (max-width:39.9375rem){',
      '.nesp-nav-wrap{padding:0 1.125rem}',
      '.nesp-header .nesp-cta--m{height:36px;padding:0 .875rem;font-size:12.5px}',
      '.nesp-nav-row{height:58px}',
      '.nesp-header .nesp-nav-marks{gap:.625rem}',
      '.nesp-header .nesp-nav-marks .nesp-mark-partner{height:1.625rem}',
      '.nesp-header .nesp-nav-marks .nesp-mark-osip{height:1rem}',
      '.nesp-header .nesp-nav-rule{height:1.375rem}',
      '.nesp-header .nesp-mnav{max-height:calc(100svh - 58px)}',
      'nav.nesp-header.is-stuck::before,nav.nesp-header.osip-scrolled::before{top:5px;right:10px;bottom:5px;left:10px;border-radius:16px}',
      '}',
      '@media (max-width:22.5rem){.nesp-header .nesp-nav-marks .nesp-mark-partner,.nesp-header .nesp-nav-rule{display:none}}',
      '@media (prefers-reduced-motion:reduce){.nesp-header *,.nesp-header *::before,.nesp-header *::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}',
      // The header is sticky, so every anchor target keeps its height clear.
      // ---- breadcrumbs (UX-NAV-07) ---------------------------------------
      // Small, grey and quiet, set in the page's own header rather than in a
      // strip of its own: 13px, a chevron between steps, and the page you are
      // on in ink at the end. On a dark hero the same trail in white.
      '.nesp-crumbs{font-family:' + SANS + ';margin:0 0 clamp(18px,2.2vw,26px)}',
      '.nesp-crumbs ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;margin:0;padding:0}',
      '.nesp-crumbs li{display:inline-flex;align-items:center;min-width:0}',
      '.nesp-crumbs a,.nesp-crumbs .nesp-crumb-step,.nesp-crumbs .nesp-crumb-here{font-size:13px;font-weight:500;line-height:1.35;letter-spacing:.01em;text-transform:none}',
      '.nesp-crumbs a{color:' + INK3 + ';text-decoration:none;transition:color .25s ease}',
      '.nesp-crumbs a:hover{color:' + GREEN + '}',
      '.nesp-crumbs a:focus-visible{outline:2px solid ' + GREEN2 + ';outline-offset:3px;border-radius:4px}',
      '.nesp-crumbs .nesp-crumb-step{color:' + INK3 + '}',
      '.nesp-crumbs .nesp-crumb-here{color:' + INK + ';font-weight:600;max-width:min(54ch,74vw);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.nesp-crumbs .nesp-crumb-sep{width:15px;height:15px;flex:0 0 auto;margin:0 .375rem;color:' + INK3 + ';opacity:.5}',
      '.nesp-crumbs li:last-child .nesp-crumb-sep{display:none}',
      // On a photograph: white, and a touch more air under it.
      '.nesp-crumbs--light{margin-bottom:clamp(16px,2vw,24px)}',
      '.nesp-crumbs--light a,.nesp-crumbs--light .nesp-crumb-step{color:rgba(255,255,255,.72)}',
      '.nesp-crumbs--light a:hover{color:#fff}',
      '.nesp-crumbs--light .nesp-crumb-here{color:#fff}',
      '.nesp-crumbs--light .nesp-crumb-sep{color:#fff;opacity:.45}',
      '.nesp-crumbs.is-in{animation:nesp-crumb-in .7s cubic-bezier(.22,.61,.36,1) both}',
      '@keyframes nesp-crumb-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
      '@media (max-width:39.9375rem){.nesp-crumbs a,.nesp-crumbs .nesp-crumb-step,.nesp-crumbs .nesp-crumb-here{font-size:12.5px}.nesp-crumbs .nesp-crumb-sep{margin:0 .25rem}}',
      '@media (prefers-reduced-motion:reduce){.nesp-crumbs.is-in{animation:none}}',
      // ---- UX-A11-01: a focus ring you can see, on every page ------------
      // Several pages set `outline: none` on :focus-visible and put nothing in
      // its place, so a keyboard user had no idea where they were. This is the
      // one indicator for the whole site, declared here because nav.js is the
      // only stylesheet every page loads.
      //
      // Two rings rather than one colour: a dark hairline against the element
      // and the site's gold outside it. Backgrounds run from cream to a
      // photograph to near-black, and no single colour clears 3:1 against all
      // of them - but one of these two always does, whatever is behind it.
      //
      // The selector carries two :not(#id) so it outweighs the id-level rules on
      // the pages that switched the outline off; it is the only way to win
      // without editing thirty stylesheets. Mouse and touch are untouched:
      // :focus-visible fires for the keyboard (and for text fields), not for a
      // click on a button.
      // The dark ring is the outline and the gold one the shadow, not the other
      // way round: a page that suppresses box-shadow on a component (the
      // opportunity cards' buttons do) then still leaves a ring behind, and so
      // does a page that suppresses the outline. Either survives alone.
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) :focus-visible{outline:3px solid #0b2a1f!important;outline-offset:2px!important;box-shadow:0 0 0 2px #f7be26!important}',
      // A control that already has an edge of its own does not want a ring around
      // it: an audit of eight pages found a border or a rounded ground on almost
      // every field, dropdown and icon button, so the pair drew a second and a
      // third line outside one control. These take a single green edge instead -
      // their own border turns green and a 2px outline sits flush against it,
      // reading as one thicker line. #0b6b45 clears 6:1 on the white and cream
      // grounds these controls sit on, past the 3:1 the pair is there to
      // guarantee.
      //
      // Not listed, and so still on the pair: links, the filled green buttons and
      // the controls on dark ground (the hero rail's arrows, the alert button),
      // where green would vanish into the fill or fail against the ground.
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) input:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) select:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) textarea:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) [role="combobox"]:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .osip-select-btn:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .nesp-icon-btn:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .d-lb-btn:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .rd-filters-hide:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .osip-sx-arrow:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .osip-states-arrow:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .osip-nw-scrollbtn:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .sr-go:focus-visible' +
      '{outline:2px solid #0b6b45!important;outline-offset:0!important;box-shadow:none!important;border-color:#0b6b45!important}',

      // The search field is the one place the two rings are not needed, and the
      // one place they showed as a fault: the field has no border of its own, so
      // the dark ring and the gold one drew a double edge inside a pill that
      // already has an edge. The two exist because no single colour clears 3:1
      // against every ground on the site - but this ground is known. The ring
      // goes on the pill instead, in the site's green: #0b6b45 on the pill's
      // #fbfaf7 is 5.9:1, well past the 3:1 the pair is there to guarantee.
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .nesp-search-input:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) .nesp-header .nesp-m-search input:focus-visible' +
      '{outline:0!important;outline-offset:0!important;box-shadow:none!important}',
      // The contact form is the second known ground, and for the same reason: a
      // white field that already carries its own border, so the dark ring and the
      // gold one drew a third and fourth edge around one control. The field turns
      // its own border green and thickens it instead - #0b6b45 on #ffffff is
      // 6.1:1, past the 3:1 the pair is there to guarantee. Every other focusable
      // thing on the page, links and buttons included, keeps the two rings.
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) #contactForm input:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) #contactForm select:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) #contactForm textarea:focus-visible,' +
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) #contactForm .osip-select-btn:focus-visible' +
      '{outline:0!important;outline-offset:0!important;box-shadow:none!important}',
      '.nesp-header .nesp-search:focus-within,.nesp-search-layer .nesp-search:focus-within{border-color:' + GREEN2 +
      ';box-shadow:0 0 0 2px rgba(11,107,69,.34),0 2px 6px rgba(19,32,27,.06),0 40px 80px -40px rgba(19,32,27,.55)}',
      '.nesp-header .nesp-m-search:focus-within{border-color:' + GREEN2 + ';box-shadow:0 0 0 2px rgba(11,107,69,.3)}',
      // Containers that are focused programmatically (a panel, a dialog, a
      // scroll target) are not a place the user has navigated to.
      'html body:not(#osip-a11y-a):not(#osip-a11y-b) [tabindex="-1"]:focus-visible{outline:none!important;box-shadow:none!important}',
      // In forced-colours modes the shadows are dropped, so the ring goes back
      // to being an outline in the colour the user chose.
      '@media (forced-colors:active){html body:not(#osip-a11y-a):not(#osip-a11y-b) :focus-visible{outline:3px solid Highlight!important;outline-offset:2px!important;box-shadow:none!important}}',
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCrumbs);
  } else {
    mountCrumbs();
  }

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

    // ---- keyboard (UX-12) ------------------------------------------------
    // The panels used to open on hover and on focus, but there was no way to
    // walk one: Tab fell through the entries in source order and Esc did
    // nothing on the six tabs that are links. Every tab is now a disclosure:
    // Down opens it and lands on the first entry, Up/Down walk the entries,
    // Home/End jump, Esc closes and puts the focus back on the tab, and moving
    // the focus out of the tab closes it behind you.
    panel.id = 'nesp-menu-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-controls', panel.id);
    a.setAttribute('aria-expanded', 'false');

    var entries = function () {
      return Array.prototype.slice.call(panel.querySelectorAll('a[href],button:not([disabled])'));
    };
    var setMenu = function (open, focusFirst) {
      li.classList.toggle('is-open', open);
      a.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open || !focusFirst) return;
      var first = entries()[0];
      if (first) first.focus();
    };

    a.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'Down') { e.preventDefault(); setMenu(true, true); }
      else if (e.key === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault(); setMenu(true);
        var list = entries(); var last = list[list.length - 1];
        if (last) last.focus();
      } else if (e.key === 'Escape' || e.key === 'Esc') { setMenu(false); }
    });

    panel.addEventListener('keydown', function (e) {
      var list = entries();
      var i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'Down') { e.preventDefault(); (list[i + 1] || list[0]).focus(); }
      else if (e.key === 'ArrowUp' || e.key === 'Up') { e.preventDefault(); (list[i - 1] || list[list.length - 1]).focus(); }
      else if (e.key === 'Home') { e.preventDefault(); if (list[0]) list[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); if (list.length) list[list.length - 1].focus(); }
      else if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); setMenu(false); a.focus(); }
    });

    li.addEventListener('focusout', function (e) {
      if (!li.contains(e.relatedTarget)) setMenu(false);
    });
    li.addEventListener('mouseenter', function () { a.setAttribute('aria-expanded', 'true'); });
    li.addEventListener('mouseleave', function () {
      if (!li.contains(document.activeElement)) setMenu(false);
    });

    // A button tab has no page to go to, so a click (or tap on a touch laptop)
    // opens and closes its panel.
    if (a.tagName === 'BUTTON') {
      a.addEventListener('click', function (e) {
        e.stopPropagation();
        setMenu(!li.classList.contains('is-open'));
      });
      document.addEventListener('click', function (e) { if (!li.contains(e.target)) setMenu(false); });
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

  // ---- Keeping the keyboard inside an open overlay (UX-A11-02) -----------
  // The sheet and the search layer both cover the page. Tabbing past their last
  // control used to land on the links behind them - invisible under the blur, and
  // out of reach of the Esc that would have closed the thing on top. Tab now
  // cycles within whichever of the two is open, and Esc hands the focus back to
  // the button that opened it.
  function focusable(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'),
      function (el) {
        return el.offsetWidth || el.offsetHeight || el.getClientRects().length;
      });
  }

  function trapTab(e, list) {
    if (e.key !== 'Tab' || !list.length) return;
    var at = list.indexOf(document.activeElement);
    if (e.shiftKey && at <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
    else if (!e.shiftKey && (at === -1 || at === list.length - 1)) { e.preventDefault(); list[0].focus(); }
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
      var open = !mobile.classList.contains('is-open');
      setOpen(open);
      // A click with no pointer behind it came from Enter or Space: the sheet was
      // opened by keyboard, so the keyboard is put inside it.
      if (open && e.detail === 0) {
        var first = focusable(mobile)[0];
        if (first) first.focus();
      }
    });

    // Tab cycles the button and the sheet, and nothing behind them.
    mobile.addEventListener('keydown', function (e) {
      if (!mobile.classList.contains('is-open')) return;
      trapTab(e, [toggle].concat(focusable(mobile)));
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
      if (e.key !== 'Escape' && e.key !== 'Esc') return;
      if (!mobile.classList.contains('is-open')) return;
      var inside = mobile.contains(document.activeElement) || toggle.contains(document.activeElement);
      setOpen(false);
      if (inside) toggle.focus();
    });

    // Crossing into desktop must reset the button too, not just hide the panel.
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1152px)').matches) setOpen(false);
    });
  }

  // ---- Alerts (UX-SUP-04) -------------------------------------------------
  // The bell in the bottom-right corner lives in notify.js and is loaded from
  // here so that every page carrying the header carries it too, without another
  // script tag in thirty-eight files.
  if (!document.getElementById('osip-alerts-js')) {
    var alerts = document.createElement('script');
    alerts.id = 'osip-alerts-js';
    alerts.src = base + 'notify.js';
    alerts.defer = true;
    document.body.appendChild(alerts);
  }

  // ---- Skip to content (UX-A11-07) ---------------------------------------
  // The link needs something to skip TO. Most pages have a <main>; the homepage
  // does not, so the first block of the page after the header stands in. Whatever
  // it turns out to be gets the id the link points at and tabindex="-1", so the
  // focus can actually be put there rather than the page merely scrolling.
  var skip = nav.querySelector('.nesp-skip');
  if (skip) {
    var main = document.querySelector('main');
    if (!main) {
      var after = (nav.parentNode === document.body ? nav : nav.closest('header') || nav).nextElementSibling;
      while (after && !/^(section|article|div)$/i.test(after.tagName)) after = after.nextElementSibling;
      main = after;
    }
    if (!main) {
      skip.parentNode.removeChild(skip);
    } else {
      if (!main.id) main.id = 'osip-main';
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');
      skip.setAttribute('href', '#' + main.id);
      // Done by hand: the page's smooth-scrolling would swallow the default jump,
      // and the focus has to move with it or the next Tab starts from the header
      // again. The address bar is left alone - States.html and the detail pages
      // read the hash for their own purposes.
      skip.addEventListener('click', function (e) {
        e.preventDefault();
        var y = main.getBoundingClientRect().top + window.pageYOffset - 8;
        if (window.__rdLenis && window.__rdLenis.scrollTo) window.__rdLenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, Math.max(0, y));
        try { main.focus({ preventScroll: true }); } catch (err) { main.focus(); }
      });
    }
  }

  // ---- Site-wide search (UX-NAV-06) --------------------------------------
  // The magnifier opens the search layer over the whole window; Enter submits
  // the form to Search.html, which is a real page with real results, so the box
  // never silently does nothing. Esc, the close button and a click on the
  // blurred page put everything back and return the focus to the magnifier.
  var searchBtn = nav.querySelector('.nesp-search-btn');
  if (searchBtn && !document.querySelector('.nesp-search-layer')) {
    document.body.insertAdjacentHTML('beforeend', SEARCH_LAYER);
  }
  var searchLayer = document.querySelector('.nesp-search-layer');
  var searchBar = searchLayer && searchLayer.querySelector('#nesp-search');
  if (searchBtn && searchBar) {
    var searchInput = searchBar.querySelector('.nesp-search-input');
    var setSearch = function (open) {
      searchBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        searchLayer.hidden = false;
        // The box takes the focus in the same beat the layer is shown. Waiting a
        // frame for it left a keyboard user typing into the page behind on any
        // frame that ran late.
        if (searchInput) searchInput.focus();
        window.requestAnimationFrame(function () { searchLayer.classList.add('is-open'); });
        return;
      }
      searchLayer.classList.remove('is-open');
      // Kept out of the tab order while it is closing, not only once it has.
      searchLayer.hidden = true;
    };
    // The blurred page behind the box is a way out, the box itself is not.
    searchLayer.addEventListener('click', function (e) {
      if (searchBar.contains(e.target)) return;
      setSearch(false);
      searchBtn.focus();
    });
    searchBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setSearch(searchLayer.hidden);
    });
    searchBar.querySelector('.nesp-search-close').addEventListener('click', function () {
      setSearch(false);
      searchBtn.focus();
    });
    searchLayer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') { setSearch(false); searchBtn.focus(); return; }
      trapTab(e, focusable(searchBar));
    });
    // An empty box has nothing to search for; the page would only say so.
    searchBar.addEventListener('submit', function (e) {
      if (!searchInput || searchInput.value.trim()) return;
      e.preventDefault();
      searchInput.focus();
    });
    document.addEventListener('click', function (e) {
      if (searchLayer.hidden || searchLayer.contains(e.target) || searchBtn.contains(e.target)) return;
      setSearch(false);
    });
    // Arriving on the results page, the box carries the query it was given.
    if (searchInput && /(^|\/)search\.html$/i.test(file)) {
      try {
        var q = new URLSearchParams(window.location.search).get('q');
        if (q) searchInput.value = q;
      } catch (e) { /* older browsers: the field just starts empty */ }
    }
  }

  // Sign out, wherever the header offers it.
  nav.querySelectorAll('[data-osip-signout]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.OSIPSession.signOut();
      window.location.href = HOME;
    });
  });

  var mSearch = nav.querySelector('.nesp-m-search');
  if (mSearch) {
    mSearch.addEventListener('submit', function (e) {
      var input = mSearch.querySelector('input');
      if (input && !input.value.trim()) { e.preventDefault(); input.focus(); }
    });
  }
})();
