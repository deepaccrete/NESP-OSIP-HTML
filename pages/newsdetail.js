/* =============================================================================
   newsdetail.js - one article page for every published story

   NewsInDetail.html is written with one story as its content. This script reads
   ?id= from the address (NewsInDetail.html?id=akk-gas-pipeline), finds that
   story in newsdata.js and puts its content into the page: breadcrumb, kicker,
   date, headline, category, location, source, photograph and caption, the
   article text, and the Most Read list. The cards on News.html link here with
   their own id.

   With no id, or one that is not listed, the page shows the default story
   (OSIP_NEWS_DEFAULT), so a bare link still lands on a complete page.

   Loaded straight after the page content and before the page's own scripts
   (share, sign-in, motion layer), so those see the filled-in article exactly as
   if it had been written into the HTML.
   ============================================================================= */
(function () {
    'use strict';

    var list = window.OSIP_NEWS;
    if (!list || !list.length) return;

    var wanted = '';
    try { wanted = (new URLSearchParams(location.search).get('id') || '').trim().toLowerCase(); } catch (e) { }
    var story = null, fallback = null;
    list.forEach(function (n) {
        if (n.id === wanted) story = n;
        if (n.id === window.OSIP_NEWS_DEFAULT) fallback = n;
    });

    /* UX-FRM-07: an address that names a story we do not publish is an error, not a
       reason to show a different story as though it were the one asked for. A link
       with no id at all still lands on the default story. */
    if (wanted && !story) {
        document.addEventListener('DOMContentLoaded', function () {
            var main = document.querySelector('main');
            var column = main && main.querySelector('div.flex-grow');
            if (!column) return;
            column.textContent = '';
            if (window.OSIPState && window.OSIPState.error) {
                window.OSIPState.error(column, {
                    title: 'That story is not published',
                    note: 'The address asked for a news story that is not on the platform. It may have been removed, or the link may be mistyped.',
                    retry: false
                });
                var back = document.createElement('p');
                back.className = 'osip-state';
                back.innerHTML = '<a class="osip-state-btn" href="News.html">All news</a>';
                column.appendChild(back);
            } else {
                column.innerHTML = '<h1>That story is not published</h1>' +
                    '<p><a href="News.html">Back to all news</a></p>';
            }
            document.title = 'Story not found | OSIP, One-Stop Investment Platform';
            mostRead(null);
        });
        return;
    }

    story = story || fallback || list[0];

    var main = document.querySelector('main');
    var article = main ? main.querySelector('article') : null;
    if (!main || !article) return;


    /* UX-COP-07: the page's description follows its title, so a link shared from a
       story or an opportunity previews that story, not the page it was built from. */
    function setMetaDescription(text) {
        if (!text) return;
        var tag = document.querySelector('meta[name="description"]');
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', 'description');
            (document.head || document.documentElement).appendChild(tag);
        }
        // through the DOM, so &nbsp; and friends arrive as the characters they are
        var holder = document.createElement('div');
        holder.innerHTML = String(text).replace(/<[^>]+>/g, ' ');
        var clean = (holder.textContent || '').replace(/\s+/g, ' ').trim();
        if (clean.length > 155) {
            clean = clean.slice(0, 155);
            clean = clean.slice(0, Math.max(clean.lastIndexOf(' '), 0)).replace(/[,;:]$/, '') + '…';
        }
        tag.setAttribute('content', clean);
    }

    function one(root, sel) { return root ? root.querySelector(sel) : null; }
    function setText(el, value) { if (el && value != null) el.textContent = value; }

    /* ---- Title and breadcrumb --------------------------------------------------- */
    document.title = story.title + ' | OSIP, One-Stop Investment Platform';
    setMetaDescription(story.caption || (story.body && story.body[0]));
    setText(document.querySelector('nav a[href="News.html"] ~ span.text-primary'), story.title);

    /* ---- Header: kicker, date, headline, category, place, source ---------------- */
    var header = main.querySelector('header');
    setText(one(header, 'span.text-secondary'), story.kicker);

    /* the date chip keeps its calendar icon, so only its own words are replaced */
    var dateChip = one(header, 'span.rounded-pill');
    if (dateChip) {
        Array.prototype.slice.call(dateChip.childNodes).forEach(function (n) {
            if (n.nodeType === 3) dateChip.removeChild(n);
        });
        dateChip.appendChild(document.createTextNode(story.display));
    }

    setText(one(header, 'h1'), story.title);

    var catChip = one(header, 'span.rounded-full');
    if (catChip) {
        Array.prototype.slice.call(catChip.childNodes).forEach(function (n) {
            if (n.nodeType === 3) catChip.removeChild(n);
        });
        catChip.appendChild(document.createTextNode('Category: ' + story.categories.join(', ')));
    }

    var place = one(header, 'div.border-y div:nth-of-type(2) span:last-child');
    setText(place, story.location);

    var sourceLink = one(header, 'a[href]');
    if (sourceLink && story.source) {
        sourceLink.textContent = 'Source: ' + story.source[0];
        sourceLink.setAttribute('href', story.source[1] || '#');
    }

    /* ---- Photograph and caption ------------------------------------------------- */
    var figure = main.querySelector('figure');
    var img = one(figure, 'img');
    if (img) {
        img.setAttribute('src', story.image);
        img.setAttribute('alt', story.alt || '');           /* UX-A11-04 */
    }
    setText(one(figure, 'figcaption'), story.caption);

    /* ---- The article itself ----------------------------------------------------- */
    var quoteClass = (one(article, 'blockquote') || {}).className ||
        'pl-6 border-l-4 border-tertiary-fixed-dim italic text-h4 font-h4 text-primary-container my-10 rd-rule';
    article.textContent = '';
    (story.body || []).forEach(function (text, i) {
        var p = document.createElement('p');
        if (i === 0) p.className = 'rd-read';               /* the opening paragraph is set larger */
        p.textContent = text;
        article.appendChild(p);
        /* the pulled-out quote sits after the third paragraph, as in the written page */
        if (story.quote && i === 2) {
            var q = document.createElement('blockquote');
            q.className = quoteClass;
            q.textContent = '"' + story.quote[0] + '"' + (story.quote[1] ? ' - ' + story.quote[1] : '');
            article.appendChild(q);
        }
    });

    /* ---- Most Read: the other stories, newest first, each linking to its own page - */
    mostRead(story);

    /* Most Read: every story but the one on screen, newest first. Used by the article
       itself and by the "not published" page, so that list is never stale. */
    function mostRead(current) {
        var main = document.querySelector('main');
        var sidebar = main && main.querySelector('aside');
        var readBox = sidebar ? sidebar.querySelector('section div.p-6.space-y-8') : null;
        if (!readBox) return;
        var others = list.filter(function (n) { return !current || n.id !== current.id; })
            .sort(function (a, b) { return a.date < b.date ? 1 : -1; })
            .slice(0, 4);
        readBox.textContent = '';
        others.forEach(function (n) {
            /* the date stays a direct child of the article and the link sits inside the
               heading, so the page's own styles for this card still apply; the link is
               stretched over the whole card so it stays clickable as before */
            var item = document.createElement('article');
            item.className = 'group relative';
            var when = document.createElement('span');
            when.className = 'text-label-md text-on-surface-variant';
            when.textContent = n.display.toUpperCase();
            var head = document.createElement('h4');
            head.className = 'mt-1 font-body-md text-body-md font-bold group-hover:text-secondary transition-colors line-clamp-2';
            var link = document.createElement('a');
            link.className = 'after:absolute after:inset-0';
            link.href = 'NewsInDetail.html?id=' + encodeURIComponent(n.id);
            link.textContent = n.title;
            head.appendChild(link);
            item.appendChild(when);
            item.appendChild(head);
            readBox.appendChild(item);
        });
    }

})();
