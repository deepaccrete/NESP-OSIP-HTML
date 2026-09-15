# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static multi-page HTML prototype for the **One-Stop Investment Platform (OSIP)**, built under NESP for Nigeria's clean energy sector. No build system, no package manager, no server — every page is a self-contained `.html` file linked by plain `href`s.

There is **no test suite, no linter, no build step**. "Running" the project means loading the HTML in a browser:

```bash
python3 -m http.server 8000    # then open http://localhost:8000/homepage.html
```

Serve rather than opening `file://` when touching anything script-driven — `nav.js`/`footer.js` resolve their own paths from `document.currentScript.src`, and iframe/`postMessage` behaviour is more faithful over HTTP.

## Settled decisions — do not drift

**Name.** The product is the **One-Stop Investment Platform (OSIP)**: hyphenated, "Platform" never "Portal", no "NEIP" or "Nigeria Energy Portal" (confirmed against the UX audit header; audit §8.1 / UX-COP-01). Page titles use one pattern, `[Page] | One-Stop Investment Platform (OSIP)`; `homepage.html` is the brand alone. The programme is the **Nigerian Energy Support Programme (NESP)**, and BMZ is the **German Federal Ministry for Economic Cooperation and Development**. "Portal" is still right for *other* organisations' sites, such as a state's investment portal.

**Portal model (PORT-01).** Option 1: one central OSIP platform that links out to each state's own investment portal. OSIP hosts summary profiles (`States.html`, `Enugu.html`) and routes investors on; it does **not** host state logins or state-managed content, so don't build either. Links to a state's own site are marked external and say the state operates them (see `Enugu.html`'s agency section and the "How state information works" strip on `States.html`).

## Repo layout

```
/
├── homepage.html        # landing page — the ONLY HTML at the root
└── pages/               # every other page, plus all shared assets and scripts
    ├── nav.js           # shared header (injected)
    ├── footer.js        # shared footer (injected)
    ├── investflow.js    # legacy InvestNow popup, now opt-in only
    └── *.html, *.png, *.jpg
```

Path rules that fall out of the root/`pages` split:

- `homepage.html` → anything else: prefix `pages/` (`href="pages/Sector.html"`, `<script src="pages/nav.js">`).
- Between two files inside `pages/`: bare sibling (`href="Sector.html"`, `src="Text.png"`).
- From `pages/*` back to the landing page: `href="../homepage.html"`.
- Relative paths only — absolute paths break when served from a subpath.
- Filenames are case-sensitive on most servers; match them exactly (`OpportunitiesNew.html`, `detailedOppNew.html`, `DetailedSector.html`, `NewsInDetail.html`).

## Shared header and footer (the important part)

`pages/nav.js` and `pages/footer.js` are the **single source of truth** for the site chrome. A page opts in with a mount point plus a script tag:

```html
<div id="site-nav"></div>      <!-- replaced by nav.js via outerHTML -->
<div id="site-footer"></div>   <!-- replaced by footer.js via outerHTML -->
...
<script src="nav.js"></script>       <!-- from root: pages/nav.js -->
<script src="footer.js"></script>    <!-- from root: pages/footer.js -->
```

Both scripts derive a `base` from their own `document.currentScript.src`, so **every internal link they emit resolves correctly from either location with no per-page editing**. Consequences:

- Keep them as separate `<script src=...>` loads. If inlined, `currentScript` is `null` and both silently fall back to a hard-coded `'pages/'` base, which breaks every nav/footer link on pages already inside `pages/`.
- Nav content — top-level tabs, the hover-dropdown `MENU` data, and the `PAGE_ACTIVE` basename→tab map that draws the `#FFB955` underline — lives **only** in `nav.js`. Adding a page to a dropdown or giving it an active tab means editing `nav.js`, not the page.
- Footer markup lives only in `footer.js`, using a `{{base}}` token substituted at load time.

There is no static `<nav>` markup in any page's source; the header exists only after `nav.js` runs.

### Dead code you will encounter — do not revive it

Roughly twenty pages still contain an inline IIFE defining `NAV_HREF` / `PAGE_ACTIVE` that rewrites `nav.bg-white a` hrefs (an older, copy-pasted nav rewriter). **These are no-ops.** They sit mid-document while `nav.js` is loaded at the end of `<body>`, so they run before the nav exists and match zero elements. Their stale data — notably `'INVEST NOW': 'Opportunities.html'` — is never applied.

Treat them as leftovers. Don't edit them expecting an effect, and don't copy them into a new page. Deleting them is safe cleanup, but verify script order first if a page looks unusual.

`pages/footer.html` is likewise a standalone dev/reference file, not included by anything.

## Other injected components (same pattern as nav/footer)

Five more scripts follow the nav.js/footer.js playbook: a mount point plus a `<script src=...>`, a `window.__osip*` guard so a double-load is a no-op, and — because the pages here are **not all built the same way** — each **injects its own CSS** instead of trusting the host page's Tailwind. When extending them, keep styling self-contained; don't reach for host classes.

- `glossary.js` — loaded on the 10 sector detail pages. Wraps the *first* mention of each known acronym (NERC, REA, REF, …) in an `<abbr class="osip-term">` with a hover/focus/tap definition; the term dictionary lives in the file. It only wraps — text is never replaced, reordered, or removed.
- `videofacade.js` — same 10 sector pages. A lazy YouTube facade: renders a poster `<button>` and requests nothing from youtube.com until clicked. Mark up as `<div class="video-facade" data-video-id="…" data-video-title="…">` with a `.facade-cover` button inside.
- `incentivenote.js` — the contextual half of CON-03, on the 10 sector pages and `Regulation.html`. Replaces each `<div class="osip-incentive-note">` mount with a short "incentives are not automatic" aside; `data-variant="finance"` swaps in the financing wording instead. Sector pages carry two: one before the *Key Message* card in Ease of Doing Business, one before *Investor Outlook* in Finance. The general information disclaimer is the other half and lives in `footer.js`, so it is on every page — keep the two saying different things rather than duplicating one. `Data.html` carries a static copy of the same `.osip-note` rules for its source register — the gold-on-cream note is the house style for anything that qualifies content rather than being content, so keep the two in step.
- `pathwayfinder.js` + `pathwaydata.js` — the regulatory pathway finder (REG-03), mounted at `<div id="osip-pathway">` on **`Regulation.html` only**. Load `pathwaydata.js` first (it sets `window.OSIP_PATHWAYS`), then `pathwayfinder.js`. Flow: sector → business model → project size → connection type → jurisdiction → result. `pathwaydata.js` is **generated** from the sector pages' own Workflow / Regulatory Requirements / Key Agencies cards (regen with `scratchpad/gen_pathway_data.py` + `emit_pathwaydata.js`), so the finder can only ever surface what a sector page already states. Edit the sector page and regenerate — never hand-edit `pathwaydata.js`, or the two drift apart.

## The Invest Now paths (read before touching anything so labelled)

There are two, and the nav no longer uses the popup:

**1. Nav "Invest Now" → `InvestorMatch.html`** (current). A plain link, set in `nav.js`. `InvestorMatch.html` is a self-contained 10-question matching quiz — all in-page JS, no page-to-page navigation, persisting only an `osip_sectors` key in `localStorage`. Its result screen offers "Create an account" (→ `Login.html`) or restart. It must be allowed to navigate normally; `investflow.js` deliberately does **not** intercept it.

**2. The `investflow.js` popup** (legacy, opt-in only). It injects a fixed modal with a blurred backdrop and an iframe, and wires **only** elements carrying the `data-investflow` attribute. Repo-wide that is exactly one element: the homepage hero CTA at `homepage.html:3644`, whose `href` stays as a no-JS fallback. Inside the modal: `InvestNow1.html` → `InvestNow2.html` navigate within the iframe; `InvestNow2`'s Continue uses `target="_top"` to break out to **`Opportunities.html`**.

Notes on this flow:

- `InvestNow3.html` is **orphaned** — nothing links to it. The header comment in `investflow.js` still claims `InvestNow2` breaks out to `InvestNow3`; that comment is stale (it goes to `Opportunities.html`). Trust the markup.
- Embedded pages dismiss the modal with `window.parent.postMessage('investflow-close', '*')`; the host listens for that exact string.
- The iframe `src` resets to `about:blank` on close so the next open restarts at step 1 — don't "optimize" that away.
- `investflow.js`'s `wire()` contains the same `querySelectorAll('[data-investflow]')` block three times. It is harmless (identical listener reference, so the browser dedupes) but is redundant, not a pattern to imitate.

`Login.html` is used two ways: as a standalone page (`location.href = 'Login.html'` from the sector detail pages and the quiz result) and as an iframe modal in `detailedOppNew.html` / `OpportunitiesNew.html`, addressed with a `#register` hash for signup and posting back via `postMessage` to close.

## Page map

- `Sector.html` — listing hub for the 10 strategic sectors.
- Sector detail pages are a **near-identical template family** differing only in copy, imagery and key-facts: `DetailedSector.html` (the canonical one; carries the Solar content — there is no `Solar.html`), `Wind`, `Storage`, `SmallHydro`, `Bioenergy`, `CleanCooking`, `GreenMobility`, `GreenHydrogen`, `EnergyEfficiency`, `AgriculturePUE`. When changing sector-page structure, the change usually has to be repeated across all of them. `NewDetailedSectorTesting.html` is a scratch variant of `DetailedSector.html`.
- `Opportunities.html` (the list/grid page the nav and CTAs point at) → `OpportunitiesNew.html` and `detailedOppNew.html` (both the AKK Gas Pipeline detail page; the list's "View in detail" goes to `detailedOppNew.html`).
- `News.html` → `NewsInDetail.html`; `Announcements.html` → `IndividualAnnouncement.html`; `Event.html` → `IndividualEvent.html`.
- `States.html` — the "Invest by State" hub. The nav's States mega-dropdown (defined in `nav.js` via `STATE_GROUPS` / `LIVE_STATES`) deep-links here at `#<zone-or-state>` anchors. `Enugu.html` is the only published individual state profile; every other state routes to `States.html#…`.
- `Regulation.html` (hosts the pathway finder and links the sample PDFs in `pages/docs/`), `Data.html`, `Contact.html`, `FAQs.html`, `AboutOSIP.html`, `AboutMe.html` (profile).
- `notDecided.html` — placeholder destination for links without a real target.
- `pages/docs/*.pdf` are sample/placeholder regulatory documents linked from `Regulation.html`. `pages/FME.htm` is a saved copy of an external government site (Federal Ministry of Environment) — orphaned reference material, nothing links to it.

Sector imagery follows `sector-{Name}.jpg`, `sector-{Name}-2.jpg`, `sector-{Name}-hero.jpg`; page-level heroes are `hero-{context}.jpg`; state art is `state-{name}.png|jpg`.

## Styling

- Most pages load the **Tailwind CDN runtime** (`https://cdn.tailwindcss.com?plugins=forms,container-queries`) with an inline `tailwind.config = { ... }` block. That config is currently identical across pages — when adding a token, keep it in sync rather than letting a page drift.
- `homepage.html` is the exception: it ships a **frozen, compiled Tailwind v4.3.0 build as inline CSS** and does **not** load the CDN (`data-vite-dev-id` is a leftover marker from the Vite project that generated it). New Tailwind utility classes added to `homepage.html` will **not** work — either extend its inline `<style>` block or migrate the page to the CDN runtime like the rest of the site.
- Two greens are both live and not interchangeable: `#1b6d24` is the brand green in the Tailwind `secondary` token used by page content, while `#047857` is the header/CTA green hard-coded in `nav.js`. Gold accent `#f7be26`, with `#FFB955` for the active-tab underline; deep teal `#001d17` and footer `#022c22`.
- Fonts: Manrope + Inter (Google Fonts). Icons: Material Symbols Outlined (`<span class="material-symbols-outlined">name</span>`) — required by `nav.js` and `footer.js` output, so keep the font link on any new page.
- `Data.html` is the only page with a third-party lib beyond Tailwind: Leaflet 1.9.4 from unpkg, plus charts.

## Adding a new page

Put it in `pages/`, then:

1. Add `<div id="site-nav"></div>` and `<div id="site-footer"></div>` mount points.
2. Load Tailwind from the CDN and copy the inline `tailwind.config` block from an existing page (e.g. `Sector.html`), plus the Google Fonts and Material Symbols links.
3. At the end of `<body>`: `<script src="nav.js"></script>` and `<script src="footer.js"></script>` (prefix `pages/` if the page is at the root). Add `investflow.js` only if something on the page uses `data-investflow`.
4. If the page should light up a top-level tab or appear in a dropdown, add it to `PAGE_ACTIVE` / `MENU` in `nav.js`.

Do not copy the legacy inline nav IIFE from an older page — it does nothing.
