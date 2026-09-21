// Shared "Useful Resources" role notes for the sector pages (feedback item 21).
//
// The #resources block on each sector page lists the relevant Ministries,
// Departments and Agencies as name + link only. The audit asked for a short note
// on each one's role. Rather than hand-edit ten near-identical pages, this adds a
// one-line role under each MDA name from a shared dictionary — the same injected
// pattern as glossary.js / financelinks.js.
//
// Usage: <script src="mdaroles.js"></script> near </body> on the sector pages.
// It states its own CSS (the pages in this repo are not all built the same way)
// and only touches names inside #resources.
(function () {
  if (window.__osipMdaRoles) return;
  window.__osipMdaRoles = true;

  // Keyed by the visible name text, trimmed. Both the acronym and the spelled-out
  // form are listed where a page uses either, so the lookup never misses.
  var ROLES = {
    'NERC': 'Licenses power projects and sets electricity tariffs.',
    'Nigerian Electricity Regulatory Commission': 'Licenses power projects and sets electricity tariffs.',
    'REA': 'Funds and coordinates rural and off-grid electrification.',
    'Rural Electrification Agency': 'Funds and coordinates rural and off-grid electrification.',
    'NIPC': 'Registers investors and administers investment incentives.',
    'Nigerian Investment Promotion Commission': 'Registers investors and administers investment incentives.',
    'SON': 'Sets product standards and issues SONCAP import conformity.',
    'Standards Organisation of Nigeria': 'Sets product standards and issues SONCAP import conformity.',
    'NEMSA': 'Certifies electrical installations and equipment for safety.',
    'Nigerian Electricity Management Services Agency': 'Certifies electrical installations and equipment for safety.',
    'NESREA': 'Enforces environmental standards and reviews compliance.',
    'Federal Ministry of Environment': 'Oversees environmental policy and EIA approvals.',
    'Federal Ministry of Power': 'Leads federal electricity policy and the power sector.',
    'Federal Ministry of Water Resources': 'Oversees water resources and dam use for hydropower.',
    'CAC': 'Registers and incorporates companies in Nigeria.',
    'Corporate Affairs Commission': 'Registers and incorporates companies in Nigeria.',
    'Corporate Affairs Commission (CAC)': 'Registers and incorporates companies in Nigeria.',
    'ECN': 'Coordinates national energy planning and policy.',
    'Energy Commission of Nigeria': 'Coordinates national energy planning and policy.',
    'NEPZA': 'Administers free trade zones and their incentives.',
    'NEPC': 'Promotes and facilitates non-oil exports.',
    'NADDC': 'Drives automotive development, including EV manufacturing.',
    'NUPRC': 'Regulates upstream petroleum, including gas for power.',
    'Nigerian Wind Energy Council (NWEC)': 'Industry council for wind energy development.',
    'Global Wind Atlas – Nigeria': 'Open wind-resource maps for early site screening.',
    'IRENA Renewable Energy Roadmap Nigeria': 'IRENA’s renewable roadmap and data for Nigeria.',
    'Nigeria Energy Transition Plan': 'Nigeria’s roadmap to net-zero emissions by 2060.'
  };

  var CSS = [
    '#resources .rd-links .rd-link-name{display:flex;flex-direction:column;gap:2px}',
    '#resources .rd-links>li>a{align-items:flex-start}',
    '#resources .rd-link-role{font-size:12.5px;font-weight:400;line-height:1.4;color:#5b6b64}'
  ].join('');

  function run() {
    var root = document.getElementById('resources');
    if (!root) return;
    var st = document.getElementById('osip-mdaroles-style');
    if (!st) {
      st = document.createElement('style');
      st.id = 'osip-mdaroles-style';
      st.appendChild(document.createTextNode(CSS));
      (document.head || document.documentElement).appendChild(st);
    }
    var names = root.querySelectorAll('.rd-link-name');
    Array.prototype.forEach.call(names, function (el) {
      if (el.querySelector('.rd-link-role')) return;           // already done
      var key = (el.textContent || '').replace(/\s+/g, ' ').trim();
      var role = ROLES[key];
      if (!role) return;
      var span = document.createElement('span');
      span.className = 'rd-link-role';
      span.textContent = role;
      el.appendChild(span);                                    // second line under the name
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
