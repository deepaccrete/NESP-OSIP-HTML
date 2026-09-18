// Regulatory pathway finder (REG-03).
//
// Usage: a mount point plus two scripts, in this order:
//   <div id="osip-pathway"></div>
//   <script src="pathwaydata.js"></script>
//   <script src="pathwayfinder.js"></script>
//
// Sector -> Business model -> Project size -> Connection type -> Jurisdiction
// -> Result, which is what the tracker row asks for.
//
// The rule this file follows: it may only repeat what a sector page already
// publishes. Steps, requirements and agencies all come out of pathwaydata.js,
// which is generated from those pages. The finder chooses what to show; it never
// authors a requirement. That is deliberate. The UX audit's standing complaint
// is controls that do nothing and claims with no source, so every answer changes
// the output, and every result names the page it came from.
//
// Two things are borrowed rather than invented:
//
//   The dropdowns are the frontend's country field, ported. A native <select>
//   opens an OS-drawn list that no CSS can reach, which is why the React app
//   replaced it with a listbox (see OSIP-Frontend CountryField.jsx). The field,
//   the popup and the option rows use that component's exact measurements.
//
//   The steps are the sector page's own workflow list, icon, number badge,
//   dotted connector and all, so the pathway a reader sees here is the same
//   drawing they see on the sector page rather than a retyped summary.
//
// Like nav.js, footer.js and glossary.js it states its own CSS, because the
// pages in this repo are not all built the same way.
(function () {
  if (window.__osipPathwayFinder) return;
  window.__osipPathwayFinder = true;

  var SIZES = [
    { id: 'up-to-100kw', label: 'Up to 100 kW', tag: 'small' },
    { id: '100kw-1mw', label: '100 kW to 1 MW', tag: 'small' },
    { id: 'above-1mw', label: 'Above 1 MW', tag: 'large' },
    { id: 'not-generation', label: 'Not an electricity generation project', tag: null }
  ];

  var CONNECTIONS = [
    { id: 'grid', label: 'Grid-connected', tag: 'grid' },
    { id: 'mini', label: 'Mini-grid, isolated or interconnected', tag: 'mini' },
    { id: 'offgrid', label: 'Off-grid or standalone', tag: 'offgrid' },
    { id: 'none', label: 'Not connected to electricity supply', tag: null }
  ];

  var JURISDICTIONS = [
    { id: 'federal', label: 'Federal requirements only', state: false },
    { id: 'both', label: 'Federal and state requirements', state: true }
  ];

  // Field measurements below are the frontend's, from styles/auth.css.
  var CSS = [
    '#osip-pathway{--pf-ink:#1a1c1b;--pf-line:#d6dcd9;--pf-deep:#00342b;--pf-mute:#717976}',

    /* ---- field grid ---- */
    '#osip-pathway .pf-grid{display:grid;grid-template-columns:1fr;gap:18px}',
    '@media (min-width:768px){#osip-pathway .pf-grid{grid-template-columns:1fr 1fr}}',
    '@media (min-width:1024px){#osip-pathway .pf-grid{grid-template-columns:repeat(3,1fr)}}',

    /* ---- one field ---- */
    '#osip-pathway .pf-label{display:block;font-family:Inter,sans-serif;font-size:11.5px;font-weight:700;',
    'color:#404846;margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase}',
    '#osip-pathway .pf-control{position:relative}',
    '#osip-pathway .pf-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--pf-mute);',
    'font-size:20px!important;pointer-events:none;transition:color .18s ease}',
    '#osip-pathway .pf-control:focus-within .pf-icon{color:var(--pf-deep)}',
    '#osip-pathway .pf-chevron{position:absolute;right:14px;top:50%;transform:translateY(-50%);',
    'color:var(--pf-mute);pointer-events:none;font-size:20px!important;transition:transform .18s ease}',
    '#osip-pathway .pf-control.is-open .pf-chevron{transform:translateY(-50%) rotate(180deg)}',

    '#osip-pathway .pf-input{width:100%;height:48px;border-radius:12px;border:1px solid var(--pf-line);',
    'background:#fff;padding:0 40px 0 44px;font-family:Inter,sans-serif;font-size:14px;font-weight:500;',
    'color:var(--pf-ink);text-align:left;cursor:pointer;',
    'box-shadow:inset 0 1px 0 rgba(0,0,0,.02);',
    'transition:border-color .18s ease,box-shadow .18s ease,background .18s ease;',
    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#osip-pathway .pf-input:hover:not(:disabled){border-color:#a1d0c3}',
    '#osip-pathway .pf-input:focus{outline:none;border-color:var(--pf-deep);box-shadow:0 0 0 4px rgba(0,52,43,.1)}',
    '#osip-pathway .pf-input:disabled{background:#f3f4f2;color:var(--pf-mute);cursor:not-allowed}',
    '#osip-pathway .pf-input.is-placeholder{color:#9aa39e;font-weight:400}',

    /* ---- the popup ---- */
    '#osip-pathway .pf-listbox{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:30;',
    'max-height:240px;overflow-y:auto;overscroll-behavior:contain;background:#fff;',
    'border:1px solid var(--pf-line);border-radius:12px;box-shadow:0 18px 40px -16px rgba(6,20,16,.28);',
    'padding:6px;margin:0;list-style:none}',
    '#osip-pathway .pf-option{padding:9px 12px;border-radius:8px;font-family:Inter,sans-serif;',
    'font-size:13.5px;font-weight:500;color:var(--pf-ink);cursor:pointer}',
    '#osip-pathway .pf-option.is-active{background:#f1f8f4;color:var(--pf-deep)}',
    '#osip-pathway .pf-option.is-selected{font-weight:700;color:var(--pf-deep)}',

    /* ---- actions ---- */
    '#osip-pathway .pf-actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:22px}',
    '#osip-pathway .pf-reset{height:40px;border:1px solid var(--pf-line);background:#fff;color:var(--pf-ink);',
    'border-radius:999px;padding:0 20px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;cursor:pointer;',
    'transition:background .18s ease,border-color .18s ease}',
    '#osip-pathway .pf-reset:hover{background:#f3f4f2;border-color:#a1d0c3}',
    '#osip-pathway .pf-reset:focus-visible{outline:2px solid var(--pf-deep);outline-offset:2px}',
    '#osip-pathway .pf-status{font-family:Inter,sans-serif;font-size:13px;color:#404846}',

    /* ---- result ---- */
    '#osip-pathway .pf-result{margin-top:30px;border:1px solid var(--pf-line);border-top:4px solid #f7be26;',
    'border-radius:14px;background:#fff;padding:24px}',
    '@media (min-width:768px){#osip-pathway .pf-result{padding:32px}}',
    '#osip-pathway .pf-result h4{font-family:Manrope,sans-serif;font-size:22px;font-weight:700;',
    'color:#001d17;margin:0 0 6px}',
    '#osip-pathway .pf-answer{font-family:Inter,sans-serif;font-size:13px;color:#404846;margin:0 0 24px;line-height:1.6}',
    '#osip-pathway .pf-sub{font-family:Manrope,sans-serif;font-size:12px;font-weight:700;letter-spacing:.14em;',
    'text-transform:uppercase;color:#1b6d24;margin:28px 0 14px}',
    '#osip-pathway .pf-sub:first-of-type{margin-top:0}',

    /* ---- steps: the sector pages' own workflow diagram, values and all ----
       Desktop gets the zigzag track, narrow screens get the vertical list, and
       the 900px switch is the sector pages' own breakpoint. The only value that
       differs is .wf-num's background: it masks the badge ring behind the
       numeral, so it has to match whatever sits behind it, and the result panel
       is white where the sector section is #f3f4f2. */
    '#osip-pathway .wf-badge{width:52px;height:52px;border-radius:50%;display:flex;',
    'align-items:center;justify-content:center;background:#fff;border:2px solid #004225;color:#004225;',
    'box-shadow:0 4px 14px rgba(0,66,37,.10);position:relative}',
    '#osip-pathway .wf-badge svg{width:22px;height:22px}',
    '#osip-pathway .wf-num{position:absolute;top:-11px;left:50%;transform:translateX(-50%);',
    'font-family:Inter,sans-serif;font-size:12px;font-weight:800;letter-spacing:.03em;color:#0f6b3f;',
    'background:#fff;padding:0 6px}',

    '#osip-pathway .wf-track{position:relative;display:none}',
    '@media (min-width:900px){#osip-pathway .wf-track{display:block}}',
    '#osip-pathway .wf-row{position:relative;display:flex;align-items:flex-start;',
    'justify-content:space-between;gap:25px;padding-top:10px;padding-bottom:10px}',
    '#osip-pathway .wf-svg{position:absolute;inset:0;width:100%;height:100%;z-index:0;',
    'pointer-events:none;overflow:visible}',
    '#osip-pathway .wf-path{fill:none;stroke:#8a8f8c;stroke-width:2;stroke-dasharray:5 6;stroke-linecap:round}',
    '#osip-pathway .wf-dot{fill:#8a8f8c}',
    '#osip-pathway .wf-node{position:relative;z-index:1;display:flex;flex-direction:column;',
    'align-items:center;width:150px;text-align:center}',
    '#osip-pathway .wf-node.up{align-self:flex-start}',
    '#osip-pathway .wf-node.down{align-self:flex-end}',
    '#osip-pathway .wf-node.down .wf-num{top:auto;bottom:-11px}',
    '#osip-pathway .wf-label{margin-top:14px;font-family:Inter,sans-serif;font-size:13px;',
    'font-weight:700;color:#111827;line-height:1.4}',
    '#osip-pathway .wf-node.down .wf-label{order:-1;margin-top:0;margin-bottom:14px}',

    '#osip-pathway .wf-list{display:flex;flex-direction:column}',
    '@media (min-width:900px){#osip-pathway .wf-list{display:none}}',
    '#osip-pathway .wf-item{display:flex;gap:16px;align-items:flex-start}',
    '#osip-pathway .wf-item .wf-badge{width:44px;height:44px;flex:none}',
    '#osip-pathway .wf-item .wf-badge svg{width:19px;height:19px}',
    '#osip-pathway .wf-item .wf-num{position:static;background:none;padding:0;display:block;margin-bottom:2px}',
    '#osip-pathway .wf-item-text{padding-top:4px}',
    '#osip-pathway .wf-item-label{font-family:Inter,sans-serif;font-size:13px;font-weight:700;',
    'color:#111827;line-height:1.4}',
    '#osip-pathway .wf-connector{width:2px;min-height:28px;margin-left:21px;',
    'background-image:linear-gradient(#8a8f8c 55%,rgba(255,255,255,0) 0%);background-position:left;',
    'background-size:2px 10px;background-repeat:repeat-y}',

    /* ---- requirements, agencies, notes ---- */
    '#osip-pathway .pf-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}',
    '#osip-pathway .pf-list li{border:1px solid #e5e7eb;border-radius:10px;padding:13px 15px;',
    'font-family:Inter,sans-serif;font-size:14px;line-height:1.6;color:#404846;background:#f9f9f7}',
    /* ---- who you would be dealing with ----------------------------------------
       Nine to twelve agencies, and each one used to be a bordered box in a
       two-column grid 10px apart: a wall of little boxes under a result that is
       already a diagram, a list and a note. They are a list now, on the pattern
       the sector pages use for Useful Resources and Data (DetailedSector.html,
       .rd-list.rd-links): hairlines instead of boxes, the count in its own
       column, the agency and then its role, and room to breathe between rows. */
    '#osip-pathway .pf-ag{display:grid;grid-template-columns:1fr;column-gap:48px;',
    'border-top:1px solid var(--pf-line);counter-reset:pf-ag}',
    '@media (min-width:768px){#osip-pathway .pf-ag{grid-template-columns:1fr 1fr}}',
    '#osip-pathway .pf-ag a{counter-increment:pf-ag;display:grid;grid-template-columns:40px 1fr;',
    'align-items:baseline;padding:16px 0;border-bottom:1px solid #e8ebe9;background:none;',
    'border-radius:0;text-decoration:none;color:inherit}',
    '#osip-pathway .pf-ag a::before{content:counter(pf-ag,decimal-leading-zero);',
    'font-family:Inter,sans-serif;font-size:12px;font-weight:500;letter-spacing:.06em;',
    'font-variant-numeric:tabular-nums;color:var(--pf-mute);transition:color .35s ease}',
    '#osip-pathway .pf-ag a[href]:hover::before{color:#d9a520}',
    '#osip-pathway .pf-ag .n{display:block;font-family:Inter,sans-serif;font-size:15px;font-weight:500;',
    'line-height:1.4;color:#1a1c1b;transition:color .35s ease}',
    '#osip-pathway .pf-ag a[href]:hover .n{color:var(--pf-deep)}',
    /* the count holds column one, so the name and the role both sit in column two */
    '#osip-pathway .pf-ag .n{grid-column:2}',
    '#osip-pathway .pf-ag .r{grid-column:2;display:block;font-family:Inter,sans-serif;font-size:13px;',
    'line-height:1.55;color:#5f6368;margin-top:4px}',
    '#osip-pathway .pf-note{margin-top:28px;border-top:1px solid #e8ebe9;padding-top:18px;',
    'font-family:Inter,sans-serif;font-size:12.5px;line-height:1.65;color:#5f6368}',
    '#osip-pathway .pf-note p{margin:0}',
    '#osip-pathway .pf-note p + p{margin-top:10px}',
    '#osip-pathway .pf-note strong{color:#1a1c1b}',
    '#osip-pathway .pf-note a{color:#004225;font-weight:600}',
    '#osip-pathway .pf-empty{font-family:Inter,sans-serif;font-size:14px;line-height:1.6;color:#404846;margin:0}'
  ].join('');

  function addStyle() {
    if (document.getElementById('osip-pathway-style')) return;
    var st = document.createElement('style');
    st.id = 'osip-pathway-style';
    st.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(st);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function find(list, id) {
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  var uid = 0;

  // ---- listbox ------------------------------------------------------------
  // A button plus a styled <ul role="listbox">, because a native select's popup
  // is drawn by the operating system and cannot be made to match the rest of
  // the page. Keyboard behaviour matches the frontend's country field.
  function Listbox(opts) {
    var self = this;
    var id = 'pf-lb-' + (++uid);
    this.items = [];
    this.value = '';
    this.disabled = true;
    this.onChange = opts.onChange || function () { };
    this.placeholder = opts.placeholder;

    var wrap = document.createElement('div');
    wrap.className = 'pf-field';
    wrap.innerHTML =
      '<span class="pf-label" id="' + id + '-lab">' + esc(opts.label) + '</span>' +
      '<div class="pf-control">' +
      '<span class="material-symbols-outlined pf-icon">' + esc(opts.icon) + '</span>' +
      '<button type="button" class="pf-input is-placeholder" id="' + id + '" role="combobox" ' +
      'aria-haspopup="listbox" aria-expanded="false" aria-labelledby="' + id + '-lab ' + id + '" disabled>' +
      esc(opts.placeholder) + '</button>' +
      '<span class="material-symbols-outlined pf-chevron">expand_more</span>' +
      '</div>';

    var control = wrap.querySelector('.pf-control');
    var button = wrap.querySelector('button');
    var list = null;
    var active = 0;

    this.el = wrap;
    this.button = button;

    function close() {
      if (!list) return;
      list.parentNode.removeChild(list);
      list = null;
      control.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }

    function paint() {
      if (!list) return;
      var rows = list.children;
      for (var i = 0; i < rows.length; i++) {
        rows[i].className = 'pf-option' +
          (i === active ? ' is-active' : '') +
          (self.items[i] && self.items[i].id === self.value ? ' is-selected' : '');
      }
      if (rows[active]) rows[active].scrollIntoView({ block: 'nearest' });
    }

    function open() {
      if (list || self.disabled || !self.items.length) return;
      list = document.createElement('ul');
      list.className = 'pf-listbox';
      list.setAttribute('role', 'listbox');
      list.id = id + '-list';
      for (var i = 0; i < self.items.length; i++) {
        var li = document.createElement('li');
        li.className = 'pf-option';
        li.setAttribute('role', 'option');
        li.textContent = self.items[i].label;
        li.setAttribute('aria-selected', self.items[i].id === self.value ? 'true' : 'false');
        (function (index) {
          // mousedown, so the pick lands before the button loses focus
          li.addEventListener('mousedown', function (e) { e.preventDefault(); pick(index); });
          li.addEventListener('mouseenter', function () { active = index; paint(); });
        })(i);
        list.appendChild(li);
      }
      control.appendChild(list);
      control.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-controls', id + '-list');
      active = 0;
      for (var j = 0; j < self.items.length; j++) { if (self.items[j].id === self.value) active = j; }
      paint();
    }

    function pick(index) {
      var item = self.items[index];
      if (!item) return;
      close();
      self.set(item.id);
      self.onChange(item.id);
    }

    button.addEventListener('click', function () { if (list) { close(); } else { open(); } });
    button.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!list) { open(); return; }
        active = (active + (e.key === 'ArrowDown' ? 1 : -1) + self.items.length) % self.items.length;
        paint();
      } else if (e.key === 'Home' || e.key === 'End') {
        if (!list) return;
        e.preventDefault();
        active = e.key === 'Home' ? 0 : self.items.length - 1;
        paint();
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (list) { e.preventDefault(); pick(active); }
      } else if (e.key === 'Escape') {
        close();
      } else if (e.key === 'Tab') {
        close();
      }
    });
    document.addEventListener('click', function (e) {
      if (!list) return;
      if (!control.contains(e.target)) close();
    });

    this.close = close;

    this.setItems = function (items) {
      this.items = items || [];
      this.set('');
    };

    this.set = function (v) {
      this.value = v || '';
      var item = find(this.items, this.value);
      button.textContent = item ? item.label : this.placeholder;
      button.className = 'pf-input' + (item ? '' : ' is-placeholder');
      button.title = item ? item.label : '';
    };

    this.setDisabled = function (d) {
      this.disabled = !!d;
      button.disabled = !!d;
      if (d) close();
    };
  }

  function run() {
    var mount = document.getElementById('osip-pathway');
    if (!mount) return;
    var DATA = window.OSIP_PATHWAYS;
    if (!DATA || !DATA.sectors || !DATA.sectors.length) {
      // No data means no tool. Showing empty dropdowns would be the dead control
      // the audit objects to, so remove the block instead.
      mount.parentNode.removeChild(mount);
      return;
    }
    addStyle();

    var grid = document.createElement('div');
    grid.className = 'pf-grid';

    var fields = {};
    function add(key, label, icon, placeholder) {
      var lb = new Listbox({
        label: label, icon: icon, placeholder: placeholder,
        onChange: function () { changed(key); }
      });
      fields[key] = lb;
      grid.appendChild(lb.el);
      return lb;
    }

    add('sector', 'Sector', 'category', 'Select a sector');
    add('model', 'Business model', 'account_tree', 'Select a sector first');
    add('size', 'Project size', 'straighten', 'Select a size');
    add('conn', 'Connection type', 'power', 'Select a connection type');
    add('juris', 'Jurisdiction', 'gavel', 'Select a jurisdiction');

    fields.sector.setItems(DATA.sectors.map(function (s) { return { id: s.id, label: s.label }; }));
    fields.sector.setDisabled(false);
    fields.size.setItems(SIZES);
    fields.conn.setItems(CONNECTIONS);
    fields.juris.setItems(JURISDICTIONS);

    var actions = document.createElement('div');
    actions.className = 'pf-actions';
    actions.innerHTML =
      '<button type="button" class="pf-reset" id="pf-reset">Start again</button>' +
      '<span class="pf-status" id="pf-status" role="status">Answer all five to see the pathway.</span>';

    var result = document.createElement('div');
    result.id = 'pf-result';

    mount.appendChild(grid);
    mount.appendChild(actions);
    mount.appendChild(result);

    var status = document.getElementById('pf-status');
    var order = ['sector', 'model', 'size', 'conn', 'juris'];

    function sector() { return find(DATA.sectors, fields.sector.value); }

    function changed(key) {
      if (key === 'sector') {
        var s = sector();
        fields.model.setItems(s ? s.models.map(function (m) { return { id: m.id, label: m.label }; }) : []);
        fields.model.placeholder = s ? 'Select a business model' : 'Select a sector first';
        fields.model.set('');
      }
      gate();
      update();
    }

    // Each answer unlocks the next one, so nobody is faced with five dropdowns
    // where four cannot yet produce a sensible answer.
    function gate() {
      for (var i = 1; i < order.length; i++) {
        var prev = fields[order[i - 1]];
        var cur = fields[order[i]];
        var lock = !prev.value;
        cur.setDisabled(lock);
        if (lock && cur.value) cur.set('');
      }
    }

    function complete() {
      for (var i = 0; i < order.length; i++) { if (!fields[order[i]].value) return false; }
      return true;
    }

    function update() {
      if (!complete()) {
        result.innerHTML = '';
        var left = 0;
        for (var i = 0; i < order.length; i++) { if (!fields[order[i]].value) left++; }
        status.textContent = left === 5
          ? 'Answer all five to see the pathway.'
          : left + (left === 1 ? ' answer left.' : ' answers left.');
        return;
      }
      status.textContent = 'Showing the published pathway for your answers.';
      result.innerHTML = render(sector());
      drawTracks();
    }

    // Ported from the sector pages' own workflow script. The dashed line is not
    // markup: it is measured from the rendered badge centres, so it has to be
    // redrawn whenever the layout can move. Below 900px the track is display:none
    // and measures zero, which is the guard below.
    function drawTrack(track) {
      var row = track.querySelector('[data-pf-row]');
      var svg = track.querySelector('[data-pf-svg]');
      var nodes = row ? row.querySelectorAll('[data-pf-node]') : [];
      if (!nodes.length) return;

      var rowRect = row.getBoundingClientRect();
      if (!rowRect.width || !rowRect.height) return;   // hidden at this width

      var pts = [];
      Array.prototype.forEach.call(nodes, function (node) {
        var badge = node.querySelector('.wf-badge');
        var r = badge.getBoundingClientRect();
        pts.push({
          x: (r.left + r.width / 2) - rowRect.left,
          y: (r.top + r.height / 2) - rowRect.top
        });
      });

      var ns = 'http://www.w3.org/2000/svg';
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute('viewBox', '0 0 ' + rowRect.width + ' ' + rowRect.height);

      for (var i = 0; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1];
        var midX = a.x + (b.x - a.x) * 0.5;
        var rad = Math.min(20, Math.abs(b.y - a.y) * 0.5);
        var goingDown = b.y > a.y;
        var d;
        if (Math.abs(b.y - a.y) < 1) {
          d = 'M ' + a.x + ' ' + a.y + ' L ' + b.x + ' ' + b.y;
        } else {
          var turn1x = midX - rad, turn2x = midX + rad;
          var cy1 = goingDown ? a.y + rad : a.y - rad;
          var cy2 = goingDown ? b.y - rad : b.y + rad;
          d = 'M ' + a.x + ' ' + a.y +
            ' L ' + turn1x + ' ' + a.y +
            ' Q ' + midX + ' ' + a.y + ' ' + midX + ' ' + cy1 +
            ' L ' + midX + ' ' + cy2 +
            ' Q ' + midX + ' ' + b.y + ' ' + turn2x + ' ' + b.y +
            ' L ' + b.x + ' ' + b.y;
        }
        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', 'wf-path');
        svg.appendChild(path);
      }

      pts.forEach(function (p, i) {
        if (i === 0 || i === pts.length - 1) {
          var c = document.createElementNS(ns, 'circle');
          c.setAttribute('cx', p.x);
          c.setAttribute('cy', p.y);
          c.setAttribute('r', 3);
          c.setAttribute('class', 'wf-dot');
          svg.appendChild(c);
        }
      });
    }

    function drawTracks() {
      var tracks = result.querySelectorAll('[data-pf-track]');
      Array.prototype.forEach.call(tracks, drawTrack);
    }

    var drawTimer;
    window.addEventListener('resize', function () {
      clearTimeout(drawTimer);
      drawTimer = setTimeout(drawTracks, 120);
    });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(drawTracks); }

    function render(s) {
      var model = find(s.models, fields.model.value);
      var size = find(SIZES, fields.size.value);
      var conn = find(CONNECTIONS, fields.conn.value);
      var juris = find(JURISDICTIONS, fields.juris.value);
      if (!model) return '';

      var reqs = s.requirements.filter(function (r) {
        if (r.connection.length && (!conn.tag || r.connection.indexOf(conn.tag) === -1)) return false;
        if (r.size.length && (!size.tag || r.size.indexOf(size.tag) === -1)) return false;
        if (r.state && !juris.state) return false;
        return true;
      });

      var h = '<div class="pf-result">';
      h += '<h4>' + esc(model.label) + '</h4>';
      h += '<p class="pf-answer">' + esc(s.label) + ' &middot; ' + esc(size.label) + ' &middot; ' +
        esc(conn.label) + ' &middot; ' + esc(juris.label) + '</p>';

      h += '<p class="pf-sub">Steps published for this pathway</p>';

      // Desktop: the zigzag track, node directions and all, exactly as the
      // sector page lays it out. The dashed path between badges is drawn after
      // the markup lands, by the same geometry the sector page uses.
      h += '<div class="wf-track" data-pf-track><svg class="wf-svg" data-pf-svg></svg>' +
        '<div class="wf-row" data-pf-row>';
      for (var i = 0; i < model.steps.length; i++) {
        var st = model.steps[i];
        h += '<div class="wf-node ' + esc(st.dir) + '" data-pf-node>' +
          '<div class="wf-badge"><span class="wf-num">' + esc(st.n) + '</span>' + st.svg + '</div>' +
          '<div class="wf-label">' + esc(st.label) + '</div>' +
          '</div>';
      }
      h += '</div></div>';

      // Below 900px the same steps as the sector page's vertical fallback.
      h += '<div class="wf-list">';
      for (var m2 = 0; m2 < model.steps.length; m2++) {
        var sm = model.steps[m2];
        if (m2) h += '<div class="wf-connector"></div>';
        h += '<div class="wf-item">' +
          '<div class="wf-badge"><span class="wf-num">' + esc(sm.n) + '</span>' + sm.svg + '</div>' +
          '<div class="wf-item-text"><div class="wf-item-label">' +
          esc(sm.labelMobile || sm.label) + '</div></div>' +
          '</div>';
      }
      h += '</div>';

      h += '<p class="pf-sub">What may apply to a project like this</p>';
      if (reqs.length) {
        h += '<ul class="pf-list">';
        for (var j = 0; j < reqs.length; j++) { h += '<li>' + esc(reqs[j].text) + '</li>'; }
        h += '</ul>';
      } else {
        h += '<p class="pf-empty">The ' + esc(s.label) + ' page publishes no further requirement for this ' +
          'combination. The steps above still apply.</p>';
      }

      h += '<p class="pf-sub">Who you would be dealing with</p>';
      h += '<div class="pf-ag">';
      for (var k = 0; k < s.agencies.length; k++) {
        var a = s.agencies[k];
        h += /^https?:/.test(a.href)
          ? '<a href="' + esc(a.href) + '" target="_blank" rel="noopener"><span class="n">' +
            esc(a.name) + '</span><span class="r">' + esc(a.role) + '</span></a>'
          : '<a aria-disabled="true"><span class="n">' + esc(a.name) + '</span><span class="r">' +
            esc(a.role) + '</span></a>';
      }
      h += '</div>';

      h += '<div class="pf-note">';
      h += '<p><strong>This is an information aid, not a determination.</strong> Every line above is ' +
        'repeated from the ' + esc(s.label) + ' sector page. What a specific project actually requires ' +
        'depends on its size, siting and design, and only the responsible agency can confirm it. ' +
        'Treat each item as something that may apply, and check it with the agency before you commit.</p>';
      if (juris.state) {
        h += '<p>State requirements vary between the 36 states and the FCT and are not yet published ' +
          'here. Confirm land, planning and environmental steps with the relevant state authority.</p>';
      }
      h += '<p>Source: <a href="' + esc(s.page) + '#regulations">' + esc(s.label) +
        ' regulations</a>, <a href="' + esc(s.page) + '#technical">technical and safety</a>. ' +
        'General requirements that apply whatever the sector are on this page under ' +
        '<a href="#registration">Business registration</a> and <a href="#tax">Tax and fiscal policy</a>.</p>';
      if (DATA.reviewed) {
        h += '<p>Last reviewed: ' + esc(DATA.reviewed) + '</p>';
      }
      h += '</div></div>';
      return h;
    }

    document.getElementById('pf-reset').addEventListener('click', function () {
      for (var i = 0; i < order.length; i++) { fields[order[i]].set(''); }
      fields.model.setItems([]);
      fields.model.placeholder = 'Select a sector first';
      fields.model.set('');
      gate();
      update();
      fields.sector.button.focus();
    });

    gate();
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
