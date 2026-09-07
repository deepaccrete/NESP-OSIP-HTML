// Lazy YouTube facade for the sector pages.
//
// Usage: <script src="videofacade.js"></script> just before </body>, and mark up
// the player as
//
//   <div class="video-facade ..." data-video-id="XXXX" data-video-title="...">
//     <button class="facade-cover" ...> poster image + play button </button>
//   </div>
//
// Nothing is requested from youtube.com until someone clicks. The poster stays a
// plain <img>, so the section still reads correctly with the script blocked, and
// the cover is a real <button>, so it is reachable by keyboard.
//
// Ported from the Mini-Grid Development block in NewDetailedSectorTesting.html.
// Like nav.js, footer.js and glossary.js it states its own CSS, because these
// pages are not all built the same way and a shared component that leans on the
// host page's build renders differently on every one of them.
(function () {
  if (window.__osipVideoFacade) return;   // a page that loads this twice gets it once
  window.__osipVideoFacade = true;

  var CSS = [
    '.video-facade{position:relative;overflow:hidden}',
    '.video-facade>.facade-cover{display:block;padding:0;border:0;background:none}',
    '.video-facade.is-playing>.facade-cover{display:none}',
    '.video-facade iframe{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '.video-facade>.facade-cover:focus-visible{outline:3px solid #f7be26;outline-offset:-3px}'
  ].join('');

  function addStyle() {
    if (document.getElementById('osip-videofacade-style')) return;
    var st = document.createElement('style');
    st.id = 'osip-videofacade-style';
    st.appendChild(document.createTextNode(CSS));
    (document.head || document.documentElement).appendChild(st);
  }

  function run() {
    addStyle();

    Array.prototype.forEach.call(document.querySelectorAll('.video-facade'), function (holder) {
      var id = holder.getAttribute('data-video-id');
      var cover = holder.querySelector('.facade-cover');
      if (!id || !cover) return;   // no video yet: the poster is left as a still image

      cover.addEventListener('click', function () {
        if (holder.classList.contains('is-playing')) return;
        var frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
          '?autoplay=1&rel=0&modestbranding=1';
        frame.title = holder.getAttribute('data-video-title') || 'Video walkthrough';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        frame.setAttribute('allowfullscreen', '');
        holder.appendChild(frame);
        holder.classList.add('is-playing');
        frame.focus();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
