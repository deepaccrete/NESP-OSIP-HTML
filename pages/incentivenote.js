// Shared "incentives are not automatic" note — CON-03.
//
// The general information disclaimer lives in footer.js and is on every page.
// This is the contextual half: a short eligibility note placed next to the
// incentive and finance copy itself, because that is where a reader forms the
// impression that a relief is guaranteed.
//
// Usage — put one or more mount points where the note should appear:
//   <div class="osip-incentive-note"></div>
//   <div class="osip-incentive-note" data-variant="finance"></div>
// then load this script near the end of <body>:
//   <script src="incentivenote.js"></script>
//
// Like glossary.js and videofacade.js, it injects its own CSS rather than
// trusting the host page's Tailwind build — the sector pages ship different
// frozen builds and do not all carry the same utilities.
//
// The .osip-note visual (gold left rule on a cream ground) is the house style for
// "this qualifies the content, it is not part of it" — Data.html already carries a
// static copy of the same rules for its source register. Keep the two in step; no
// page loads both, so the duplicate declaration is not a live conflict.
(function () {
  if (window.__osipIncentiveNote) return; // double-load is a no-op
  window.__osipIncentiveNote = true;

  var NOTES = {
    incentives: {
      title: 'Incentives are not automatic',
      body: 'The reliefs, exemptions and support measures described above are administered by the agencies named ' +
        'alongside them. A project <strong>may be eligible</strong> where it meets that agency\u2019s published ' +
        'criteria \u2014 eligibility, the applicable rate and the duration are determined by the administering ' +
        'agency, not by OSIP. Confirm the current terms with that agency before relying on them.'
    },
    finance: {
      title: 'Financing terms are set by the provider',
      body: 'The facilities, funds and programmes listed here are operated by the institutions named alongside them. ' +
        'A project <strong>may be eligible</strong> where it meets the provider\u2019s own criteria; whether a ' +
        'facility is open, on what terms, and to whom, is decided by that provider, not by OSIP. Amounts and ' +
        'timelines are indicative. Confirm the current position directly with the provider.'
    }
  };

  function render() {
    var mounts = document.querySelectorAll('.osip-incentive-note');
    if (!mounts.length) return;

    if (!document.getElementById('osip-incentive-note-style')) {
      var st = document.createElement('style');
      st.id = 'osip-incentive-note-style';
      st.textContent =
        '.osip-note{display:flex;gap:.875rem;align-items:flex-start;margin:1.75rem 0 0;padding:1rem 1.25rem;' +
        'background:#fdf8e9;border:1px solid #efdca4;border-left:3px solid #f7be26;border-radius:.75rem;' +
        'font-family:Inter,system-ui,sans-serif;box-sizing:border-box}' +
        '.osip-note *{box-sizing:border-box}' +
        '.osip-note .osip-note-icon{font-family:"Material Symbols Outlined";font-size:20px;line-height:1.4;' +
        'color:#8a6d15;flex:0 0 auto;font-variation-settings:"FILL" 1;-webkit-font-feature-settings:"liga";' +
        'font-feature-settings:"liga"}' +
        '.osip-note .osip-note-body{min-width:0}' +
        '.osip-note b{display:block;color:#5c4a0f;font-size:.75rem;font-weight:700;text-transform:uppercase;' +
        'letter-spacing:.07em;margin:0 0 .25rem}' +
        '.osip-note p{margin:0;color:#4a4636;font-size:.875rem;line-height:1.65}' +
        '.osip-note p strong{color:#3a3626;font-weight:600}' +
        '.osip-note a{color:#6b5310;font-weight:600;text-decoration:underline;text-underline-offset:2px}' +
        '.osip-note a:hover{text-decoration:none}' +
        '@media (min-width:640px){.osip-note{margin-top:2rem}.osip-note p{font-size:.9375rem}}';
      document.head.appendChild(st);
    }

    Array.prototype.forEach.call(mounts, function (m) {
      var note = NOTES[m.getAttribute('data-variant')] || NOTES.incentives;
      var el = document.createElement('aside');
      el.className = 'osip-note';
      el.setAttribute('role', 'note');
      el.innerHTML =
        '<span class="osip-note-icon" aria-hidden="true">info</span>' +
        '<span class="osip-note-body"><b>' + note.title + '</b><p>' + note.body + '</p></span>';
      m.parentNode.replaceChild(el, m);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
