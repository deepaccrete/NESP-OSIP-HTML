// Shared financial-institution links for the sector Finance sections (GOPA-FIN-01
// / feedback item 107). The sector pages name banks and development-finance
// institutions inside the Finance card fan as plain narrative text; this wraps
// the FIRST mention of each known institution — inside #finance only — in an
// external link to its official site, so each becomes a short, scannable, linked
// summary instead of an unlinked name.
//
// Usage: <script src="financelinks.js"></script> just BEFORE glossary.js, near
// </body>. No markup changes are needed and none are made beyond wrapping the
// name in an <a>. Load order matters: this runs before glossary.js so the links
// it creates carry data-no-glossary and glossary.js then leaves their text alone
// (no dotted-underline tooltip layered inside a link). Any acronym mentioned
// elsewhere on the page still gets its glossary definition as normal.
//
// Like nav.js/footer.js/glossary.js it states its own CSS, because the pages in
// this repo are not all built the same way and a shared component that relies on
// the host page's build renders differently on each one.
(function () {
  if (window.__osipFinLinks) return;   // a page that loads this twice gets it once
  window.__osipFinLinks = true;

  // name → official site. Full names are listed alongside their acronyms so the
  // longest, most specific match wins (see the length sort in run()). URLs are
  // the institutions' own primary sites; swap in a contact page at deploy if a
  // named contact person is preferred over the homepage.
  var INSTS = {
    'Bank of Industry': 'https://www.boi.ng/',
    'BOI': 'https://www.boi.ng/',
    'Rural Electrification Agency': 'https://rea.gov.ng/',
    'Rural Electrification Fund': 'https://rea.gov.ng/rural-electrification-fund/',
    'REA': 'https://rea.gov.ng/',
    'REF': 'https://rea.gov.ng/rural-electrification-fund/',
    'Nigeria Sovereign Investment Authority': 'https://nsia.com.ng/',
    'NSIA': 'https://nsia.com.ng/',
    'Access Bank': 'https://www.accessbankplc.com/',
    'FCMB': 'https://www.fcmb.com/',
    'Sterling Bank': 'https://sterling.ng/',
    'Sterling': 'https://sterling.ng/',
    'Fidelity Bank': 'https://www.fidelitybank.ng/',
    'Fidelity': 'https://www.fidelitybank.ng/',
    'Ecobank': 'https://ecobank.com/',
    'Lotus Bank': 'https://www.lotusbank.com/',
    'International Finance Corporation': 'https://www.ifc.org/',
    'IFC': 'https://www.ifc.org/',
    'African Development Bank': 'https://www.afdb.org/',
    'AfDB': 'https://www.afdb.org/',
    'Africa Finance Corporation': 'https://www.africafc.org/',
    'AFC': 'https://www.africafc.org/',
    'Africa50': 'https://www.africa50.com/',
    'InfraCredit': 'https://infracredit.ng/',
    'Multilateral Investment Guarantee Agency': 'https://www.miga.org/',
    'MIGA': 'https://www.miga.org/',
    'World Bank Group': 'https://www.worldbank.org/',
    'World Bank': 'https://www.worldbank.org/'
  };

  // ---- CSS, stated here rather than assumed from the host page ------------
  // Finance names sit both on the dark-green card fan (white text) and in
  // light-background prose, so the link uses currentColor with a gold underline
  // that reads on either. The trailing ↗ marks it as leaving the site.
  var CSS = [
    '.osip-finlink{color:inherit;font-weight:700;text-decoration:underline;',
    'text-decoration-color:rgba(247,190,38,.9);text-underline-offset:2px;text-decoration-thickness:1px}',
    '.osip-finlink:hover{text-decoration-thickness:2px}',
    '.osip-finlink:focus-visible{outline:2px solid #f7be26;outline-offset:2px;border-radius:2px}',
    '.osip-finlink::after{content:"\\2197";font-size:.8em;margin-left:1px;opacity:.85;font-weight:600}'
  ].join('');

  function addStyle() {
    if (document.getElementById('osip-finlinks-style')) return;
    var st = document.createElement('style');
    st.id = 'osip-finlinks-style';
    st.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(st);
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function run() {
    var root = document.getElementById('finance');   // scoped to the Finance section only
    if (!root) return;
    addStyle();

    var order = Object.keys(INSTS).sort(function (a, b) { return b.length - a.length; });
    var done = {};

    function esc(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function skip(node) {
      var p = node.parentNode;
      while (p && p !== root.parentNode) {
        var n = p.nodeName;
        // never touch text already inside a link, an acronym tooltip, script,
        // style, headings we do not want decorated, or SVG/icon glyphs.
        if (n === 'A' || n === 'ABBR' || n === 'SCRIPT' || n === 'STYLE' || n === 'TITLE' || n === 'H2') return true;
        if (p.hasAttribute && p.hasAttribute('data-no-glossary')) return true;
        if (p.namespaceURI === SVG_NS) return true;
        if (p.classList && p.classList.contains('material-symbols-outlined')) return true;
        p = p.parentNode;
      }
      return false;
    }

    // Collect first, wrap second: mutating while walking invalidates the walker.
    var queue = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      var n = walker.currentNode;
      if (n.nodeValue && n.nodeValue.trim() && !skip(n)) queue.push(n);
    }

    var wrapped = 0;
    while (queue.length) {
      var node = queue.shift();
      if (!node.parentNode) continue;
      var left = order.filter(function (t) { return !done[t]; });
      if (!left.length) break;

      var re = new RegExp('\\b(' + left.map(esc).join('|') + ')\\b');
      var m = re.exec(node.nodeValue);
      if (!m) continue;

      var name = m[1];
      done[name] = true;
      // an acronym and its full name share a URL; once one is linked, retire the
      // other so the same institution is not linked twice under two labels.
      order.forEach(function (t) { if (INSTS[t] === INSTS[name]) done[t] = true; });

      var tail = node.splitText(m.index);
      tail.nodeValue = tail.nodeValue.slice(name.length);

      var a = document.createElement('a');
      a.className = 'osip-finlink';
      a.setAttribute('href', INSTS[name]);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.setAttribute('data-no-glossary', '');          // keep glossary.js off this text
      a.setAttribute('aria-label', name + ' — official website (opens in a new tab)');
      a.setAttribute('title', name + ' — official website (opens in a new tab)');
      a.textContent = name;
      tail.parentNode.insertBefore(a, tail);
      wrapped++;

      queue.unshift(tail);   // the rest of this node may hold more institutions
    }

    window.__osipFinLinksCount = wrapped;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
