# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static multi-page HTML prototype for **OSIP** (NESP — Nigeria's energy-sector investment portal). No build system, no package manager, no server — every page is a self-contained `.html` file linked by plain `href`s. Open `homepage.html` directly in a browser (or serve the directory with any static server like `python3 -m http.server`) to develop.

There is **no test suite, no linter, no build step**. "Running" the project means loading the HTML in a browser.

## Repo layout

```
/
├── homepage.html        # landing page — the ONLY HTML at the root
├── CLAUDE.md
└── pages/               # every other page + shared assets
    ├── Sector.html, DetailedSector.html
    ├── OpportunitiesNew.html, detailedOppNew.html
    ├── Regulation.html, Data.html, News.html, NewsInDetail.html
    ├── Contact.html, Login.html, notDecided.html
    ├── InvestNow1.html, InvestNow2.html, InvestNow3.html
    ├── investflow.js
    ├── Text.png, logoNESP.png
```

Linking conventions that fall out of this split:

- `homepage.html` references everything in `pages/` with a `pages/` prefix (`href="pages/Sector.html"`, `src="pages/Text.png"`, `<script src="pages/investflow.js">`).
- Files inside `pages/` link to each other as siblings (`href="OpportunitiesNew.html"`), and link **back to the homepage** with `href="../homepage.html"` (the nav-logo `<a>` on every page).

## Page map and entry point

`homepage.html` is the landing page. The site graph between `pages/`:

- `Sector.html` → `DetailedSector.html` (Sectors)
- `OpportunitiesNew.html` → `detailedOppNew.html` (Investment opportunities; "Browse all" target)
- `Regulation.html` (Regulations & compliance)
- `Data.html` (Charts + Leaflet map; pulls `leaflet@1.9.4` from unpkg)
- `News.html` → `NewsInDetail.html`
- `Contact.html`
- `Login.html` (auth modal mock; opened as an iframe from `detailedOppNew.html`, otherwise standalone)
- `notDecided.html` (placeholder destination for nav items without a real target — used as the fallback in the nav rewriter)

The three `InvestNow*.html` files are the Invest Now flow (see below) — never link to them with a normal `<a href>` from a site page; they are loaded into an iframe modal by `investflow.js`.

## The Invest Now popup flow (read this before touching anything labelled "Invest Now")

`pages/investflow.js` is included on every site page (and on the homepage as `pages/investflow.js`) and is the only piece of shared JavaScript in the repo. It:

1. Injects a fixed-position modal with an iframe and a blurred backdrop into every page that loads the script.
2. Wires every `nav a`/`nav button` whose visible text is `"invest now"` to open the modal, which loads `InvestNow1.html` into the iframe.
3. `InvestNow1.html` → `InvestNow2.html` navigate **inside the iframe** (stay in the popup).
4. `InvestNow2.html`'s Continue button uses `target="_top"` to break out of the iframe and load `InvestNow3.html` as a full-screen page.
5. Embedded pages can dismiss the modal from inside the iframe via `window.parent.postMessage('investflow-close', '*')`. The host listens for that exact string.

**Path resolution**: the iframe src is computed at script-load time from `document.currentScript.src`, so it always resolves to `pages/InvestNow1.html` regardless of whether the host page is at the site root (`homepage.html`) or already inside `pages/`. If you ever inline this script into a page instead of loading it as `<script src=...>`, `document.currentScript` will be `null` and the iframe src will fall back to a bare `InvestNow1.html` — keep it as a separate file load.

Consequences when editing:

- Do **not** add a normal `href` to `InvestNow1.html` on a nav "Invest Now" link — `investflow.js` intercepts the click and opens the modal instead. The site-wide nav rewriter (see next section) already maps `INVEST NOW` to `OpportunitiesNew.html` as a fallback for users without JS; that's intentional.
- Pages that contain their own nav (Contact, InvestNow3, …) include a guard like `if (label === 'INVEST NOW') return;` in their nav-wiring code so `investflow.js` can take over. Preserve that pattern.
- The iframe `src` is reset to `about:blank` on close so the next open always restarts at step 1 — don't "optimize" this away.

## Shared nav behavior (duplicated, not imported)

Every site page contains two IIFEs near the bottom that together produce the shared header behavior. They are **copy-pasted into each HTML file** rather than loaded from a shared script; changes need to be applied to all of them:

- **Nav href rewriter + active-tab underline**: maps top-level labels (`SECTORS`, `OPPORTUNITIES`, `REGULATIONS`, `DATA`, `NEWS`, `CONTACT`, `INVEST NOW`) to canonical `.html` files, replaces empty/`#`/stale hrefs with the `notDecided.html` placeholder, and adds an `#FFB955` underline `<span>` to the link matching the current page (basename-matched from `location.pathname.split('/').pop()`, so it still works across the root/`pages/` split).
- **Hover dropdown injector** (`nesp-has-menu` / `nesp-dropdown` classes): builds the multi-column hover menus under each top-level nav item from an inline `MENU` object. Only attaches to links with `px-5` in their class (desktop top-level only).

**Critical**: the `NAV_HREF` map and `MENU` items use different path prefixes in `homepage.html` vs `pages/*.html`. In `homepage.html` every value is prefixed with `pages/` (e.g. `'SECTORS': 'pages/Sector.html'`); in `pages/*.html` they are bare siblings (`'SECTORS': 'Sector.html'`). When copying these IIFEs to a new page, make sure the values match where the new page lives.

When adding a new page:
- If it lives in `pages/`, copy both IIFEs from an existing `pages/*.html` (e.g. `Sector.html`) and add `<script src="investflow.js"></script>` at the end of `<body>`.
- If it lives at the root, copy from `homepage.html` and use `<script src="pages/investflow.js"></script>`.

## Styling

- Most pages load Tailwind via the **CDN runtime** (`https://cdn.tailwindcss.com?plugins=forms,container-queries`) with an inline `tailwind.config = { ... }` script defining the OSIP color palette (greens like `#1b6d24`, surface tokens, etc.).
- `homepage.html` is different: it ships a **frozen Tailwind v4.3.0 build** as inline CSS (the `data-vite-dev-id` attribute is a leftover marker from the original Vite project that generated it). Don't try to add new Tailwind utility classes to `homepage.html` expecting the CDN to pick them up — they won't be in the compiled CSS. Either extend the inline `<style>` block or switch the page to the CDN runtime the way the rest of the site uses it.
- Fonts: Manrope + Inter from Google Fonts; icons from Material Symbols Outlined (`<span class="material-symbols-outlined">name</span>`).

## House style for edits

- Keep pages self-contained — no module bundling, no npm. The only shared runtime asset is `pages/investflow.js`.
- Relative paths only; absolute paths break when the project is served from a subpath.
- Linking rules:
  - From `homepage.html` → any other page or asset: prefix with `pages/`.
  - Between two files inside `pages/`: bare sibling name (`href="Sector.html"`, `src="Text.png"`).
  - From a page in `pages/` back to the homepage: `href="../homepage.html"` (this is what the nav logo `<a>` uses).
- Match the existing canonical filenames exactly (case-sensitive on most servers): `OpportunitiesNew.html`, `detailedOppNew.html`, `DetailedSector.html`, `NewsInDetail.html`, etc.
