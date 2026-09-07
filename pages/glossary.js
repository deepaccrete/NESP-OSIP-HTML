// Shared glossary hovers for the sector pages.
//
// Usage: <script src="glossary.js"></script> just before </body>. Nothing else.
// No markup changes are needed and none are made: the script only WRAPS the first
// mention of a term in an <abbr class="osip-term">. Text is never replaced,
// reordered or removed, and a term that appears ten times still reads normally
// the other nine.
//
// Ported from NewDetailedSectorTesting.html. Like nav.js and footer.js it states
// its own CSS, because the pages in this repo are not all built the same way and
// a shared component that relies on the host page's build renders differently on
// every one of them.
//
// The definition shows on hover, on keyboard focus, and on tap (touch devices
// have no hover, so a tap toggles it). The plain `title` attribute is set too,
// so the meaning is still reachable if the CSS never loads.
(function () {
  if (window.__osipGlossary) return;   // a page that loads this twice gets it once
  window.__osipGlossary = true;

  var TERMS = {
    'NERC': 'Nigerian Electricity Regulatory Commission. The national regulator that issues generation licences and sets electricity tariffs.',
    'REA': 'Rural Electrification Agency. The federal agency that funds and coordinates off-grid and rural electrification.',
    'REF': 'Rural Electrification Fund. The REA-managed pot of grants and subsidies used to extend electricity access.',
    'REBF': 'Renewable Energy Blended Finance Facility. A facility that mixes concessional and commercial money to lower the cost of renewable projects.',
    'DARES': 'Distributed Access through Renewable Energy Scale-up. A US$750 million programme funding mini-grids and solar home systems.',
    'CAC': 'Corporate Affairs Commission. The registry where a company is legally incorporated in Nigeria.',
    'NIPC': 'Nigerian Investment Promotion Commission. Registers investors and administers investment incentives such as Pioneer Status.',
    'NEMSA': 'Nigerian Electricity Management Services Agency. Certifies that electrical installations and equipment meet safety standards.',
    'NESREA': 'National Environmental Standards and Regulations Enforcement Agency. Enforces Nigeria’s environmental rules.',
    'SONCAP': 'The Standards Organisation of Nigeria’s conformity assessment programme. The certificate imported goods need to clear customs.',
    'SON': 'Standards Organisation of Nigeria. Sets and certifies product quality standards.',
    'TCN': 'Transmission Company of Nigeria. Operates the national high-voltage transmission grid.',
    'EIA': 'Environmental Impact Assessment. A study of a project’s environmental effects, approved before construction can start.',
    'IPP': 'Independent Power Producer. A privately owned company that generates electricity for sale rather than for its own use.',
    'PPAs': 'Power Purchase Agreements. Long-term contracts to buy the electricity a project generates, which is what makes it bankable.',
    'BOO': 'Build-Own-Operate. The developer builds the asset, keeps ownership of it, and runs it for the life of the concession.',
    'SHS': 'Solar Home Systems. A small standalone solar kit sized for one home or shop, with no grid connection.',
    'DRE': 'Distributed Renewable Energy. Generation sited at or near where the power is used, rather than on the national grid.',
    'NIEP': 'National Integrated Electricity Policy 2025. The umbrella policy for Nigeria’s electricity sector.',
    'NREEEP': 'National Renewable Energy and Energy Efficiency Policy 2015. The standing policy for renewables and efficiency.',
    'REMP': 'Renewable Energy Master Plan. The national plan setting renewable capacity targets.',
    'ETP': 'Energy Transition Plan 2022. Nigeria’s roadmap to net zero by 2060.',
    'NDCs': 'Nationally Determined Contributions. The emissions-reduction pledges Nigeria has filed under the Paris Agreement.',
    'CET': 'Common External Tariff. The shared import-duty schedule ECOWAS members apply to goods from outside the bloc.',
    'ECOWAS': 'Economic Community of West African States. The fifteen-country West African regional bloc.',
    'VAT': 'Value Added Tax. The consumption tax charged on goods and services in Nigeria.',
    'IFC': 'International Finance Corporation. The World Bank Group’s private-sector investment arm.',
    'MIGA': 'Multilateral Investment Guarantee Agency. The World Bank Group arm that insures investors against political risk.',
    'AfDB': 'African Development Bank. The continent’s multilateral development bank.',
    'AFC': 'Africa Finance Corporation. An Africa-focused infrastructure investment institution.',
    'NSIA': 'Nigeria Sovereign Investment Authority. The country’s sovereign wealth fund.',
    'BOI': 'Bank of Industry. Nigeria’s development finance institution, lending on concessional terms.'
  };

  // ---- CSS, stated here rather than assumed from the host page ------------
  var CSS = [
    '.osip-term{border-bottom:1px dotted #0a5a37;cursor:help;position:relative;text-decoration:none;font-weight:600;color:inherit}',
    '.osip-term::after{content:attr(data-def);position:absolute;left:0;top:calc(100% + 9px);z-index:60;',
    'width:max-content;max-width:min(320px,78vw);background:#0d2318;color:#fff;font-family:Inter,sans-serif;',
    'font-size:13px;font-weight:400;line-height:1.55;letter-spacing:0;text-transform:none;padding:10px 12px;',
    'border-radius:8px;box-shadow:0 18px 34px -18px rgba(6,20,16,.55);opacity:0;visibility:hidden;',
    'transform:translateY(-4px);transition:opacity .18s ease,transform .18s ease,visibility .18s ease;pointer-events:none}',
    '.osip-term::before{content:"";position:absolute;left:14px;top:calc(100% + 4px);z-index:61;',
    'border:5px solid transparent;border-bottom-color:#0d2318;opacity:0;visibility:hidden;',
    'transition:opacity .18s ease,visibility .18s ease}',
    '.osip-term:hover::after,.osip-term:focus-visible::after,.osip-term.is-open::after,',
    '.osip-term:hover::before,.osip-term:focus-visible::before,.osip-term.is-open::before',
    '{opacity:1;visibility:visible;transform:translateY(0)}',
    '.osip-term:focus-visible{outline:2px solid #1b6d24;outline-offset:2px}',
    /* Near the right edge the tooltip would run off the screen; these flip it. */
    '.osip-term.osip-term--right::after{left:auto;right:0}',
    '.osip-term.osip-term--right::before{left:auto;right:14px}'
  ].join('');

  function addStyle() {
    if (document.getElementById('osip-glossary-style')) return;
    var st = document.createElement('style');
    st.id = 'osip-glossary-style';
    st.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(st);
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function run() {
    addStyle();

    var root = document.querySelector('main') || document.body;
    if (!root) return;

    var order = Object.keys(TERMS).sort(function (a, b) { return b.length - a.length; });
    var done = {};

    function esc(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function skip(node) {
      var p = node.parentNode;
      while (p && p !== root.parentNode) {
        var n = p.nodeName;
        if (n === 'SCRIPT' || n === 'STYLE' || n === 'ABBR' || n === 'TITLE') return true;
        // Opt-out for blocks that already say what the acronym means. The Key
        // Regulatory Agencies cards spell the agency out and put the short form
        // in brackets right after it, so a hover there explains nothing.
        if (p.hasAttribute && p.hasAttribute('data-no-glossary')) return true;
        // An <abbr> is not valid inside SVG and would not render, so leave the
        // workflow diagrams and inline icons alone.
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

      var term = m[1];
      done[term] = true;

      var tail = node.splitText(m.index);
      tail.nodeValue = tail.nodeValue.slice(term.length);

      var el = document.createElement('abbr');
      el.className = 'osip-term';
      el.setAttribute('tabindex', '0');
      el.setAttribute('title', TERMS[term]);   // works with no CSS at all
      el.setAttribute('data-def', TERMS[term]);
      el.textContent = term;
      tail.parentNode.insertBefore(el, tail);
      wrapped++;

      // Side is decided again in place() once the page has finished loading.
      try {
        if (el.getBoundingClientRect().left > document.documentElement.clientWidth - 340) {
          el.classList.add('osip-term--right');
        }
      } catch (e) { /* layout not ready; place() will sort it out */ }

      queue.unshift(tail);   // the rest of this node may hold more terms
    }

    window.__osipGlossaryCount = wrapped;

    // Which side the tooltip opens on has to be settled AFTER layout, not while
    // the terms are being wrapped: web fonts and images land later and move
    // everything. A tooltip left on the wrong side hangs past the right edge,
    // which the body's overflow-x clip then hides rather than fixes.
    function place() {
      var w = document.documentElement.clientWidth;
      Array.prototype.forEach.call(document.querySelectorAll('.osip-term'), function (el) {
        var r = el.getBoundingClientRect();
        if (r.left > w - 340) { el.classList.add('osip-term--right'); }
        else { el.classList.remove('osip-term--right'); }
      });
    }
    place();
    window.addEventListener('load', place);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(place); }
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(place, 150);
    });

    // Touch has no hover, so a tap toggles the definition open.
    document.addEventListener('click', function (e) {
      var hit = e.target.closest ? e.target.closest('.osip-term') : null;
      Array.prototype.forEach.call(document.querySelectorAll('.osip-term.is-open'), function (el) {
        if (el !== hit) el.classList.remove('is-open');
      });
      if (hit) hit.classList.toggle('is-open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      Array.prototype.forEach.call(document.querySelectorAll('.osip-term.is-open'), function (el) {
        el.classList.remove('is-open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
