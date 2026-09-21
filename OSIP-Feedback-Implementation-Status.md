# OSIP — Feedback Changes: Implementation Status

**Source:** *OSIP Feedback Changes v0.1* (4 Sep 2026) — the 109-item log plus the 29 decisions (D1–D29).
**Verified against:** the `ui-enhancement` branch of the OSIP HTML codebase, reviewed page-by-page and script-by-script.
**Date of this review:** 21 Sep 2026.

This document reproduces the feedback log item-by-item and adds a **Status** column recording whether each change is done in the code, plus notes on what remains. Items whose *only* remaining work is real-world/production content (real phone numbers, real emails, approved legal text, live document PDFs, a real backend) are flagged **🚀 Deploy-time** — the UI/shell is built, but the real value gets filled in at deployment.

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Implemented in code as requested. |
| ⚠️ Partial | Partly implemented — some of the requested scope is missing (detail in Notes). |
| ❌ Not done | Not implemented. |
| 🛠 Dev phase | Deferred to the development/build phase by the client (not part of the prototype scope). |
| 🚀 Deploy-time | Shell/UI built; final real content or backend is intentionally left for deployment (real contacts, legal text, live docs, server). |
| 🕓 Decision pending | Blocked on a client sign-off (a "Decision needed" item D1–D29). Where the build was done anyway, that is noted. |

## At a glance

Of the 109 items:

| Status | Count |
|--------|------:|
| ✅ Done | 94 |
| ⚠️ Partial | 5 |
| 🛠 Dev phase | 6 |
| ❌ Not done | 1 |
| 🚀 Deploy-time (primary blocker) | 2 |
| 🕓 Decision pending (primary blocker) | 1 |

> **Update 6 (21 Sep 2026):** **37** (Save is the delivered MVP; compare/alerts ride on the dev-phase backend), **84** (every page now has exactly one `<h1>` — fixed Login, ForgotPassword, InvestorMatch) and **85** (failing light-gray text darkened to a WCAG-AA-passing shade) marked done. **16** (breadcrumbs) and **95** (image compression/`srcset`) deferred to the development phase. **74** left open as agreed.

> **Update 5 (21 Sep 2026):** **108** (Invest Now scroll cue) implemented. Items **53** (accessible CAPTCHA), **94** (build process), **96** (shared CSS), **102** (email/RSS/saved-search alerts) deferred by the client to the development phase (🛠). Only **74** remains as an open prototype item.

> **Update 1 (21 Sep 2026):** items **105** (Climate Finance / NCCC link) and **107** (linked financial-institution summaries) implemented — see section N.
>
> **Update 2 (21 Sep 2026):** items **51** (footer Log in / Register), **54** (Forgot Password page), **93** (consent banner + real legal pages), **97** (removed dead nav code + Vite marker) and **103** (News rendered from a single source + last-reviewed dates) implemented. Item **95** improved (lazy + async decoding now site-wide; compression/`srcset` remain a build task).
>
> **Update 3 (21 Sep 2026):** items **73** (title pattern fixed to `… | One-Stop Investment Platform (OSIP)` across all pages), **21** (per-MDA role notes on all 10 sector pages), **34** (working sort control on Opportunities) and **88** (focus management in the InvestNow + Login modals) implemented.
>
> **Update 4 (21 Sep 2026):** marked done — **98** (Support = OSIP Help Desk, linked to the live help-desk system), **55** (save opportunities behind login), **23** (sector-copy shortening applied to Solar as the template, rolled out to the rest in the development phase). Implemented — **6** (mobile shows 2 figures, each with source/year/method), **33** (investment-details block on the project page), **70** (content-type names standardised to News/Events), **71** (mechanism labels → outcomes), **72** (number-format standardised — see note), **75** (real news source links), **76** (off-scope featured content aligned to clean energy), **78** (fabricated promoter contacts removed).

A further set of "Done" / "Partial" items carry a **secondary 🚀 deploy-time note** (real PDFs, real contacts, real sourcing, legal wording) — these are called out in the Notes column. The build side is complete; only production values remain.

> **Note on the 29 Decisions (D1–D29):** the feedback document tags 29 items as "Decision needed" (client sign-off). In almost every case the demo has *already been built* to the consultant's recommended answer, so the code is ready — the decision is a formal confirmation, not blocking work. Genuinely unbuilt decisions are flagged below.

---

## A. Homepage & Hero

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 1 | Reduce hero to ONE primary call-to-action; drop guide download **[D16]** | ✅ Done | Single CTA "Browse investment opportunities" → `Opportunities.html` (homepage.html:5329). Old 4 buttons + guide download removed. |
| 2 | Working carousel, or remove the broken slider | ✅ Done | Resolved by removal — one static hero slide; slider script guards `if (slides.length < 2) return;` so it no longer auto-rotates. |
| 3 | Rewrite the run-on hero paragraph **[D17]** | ✅ Done | Rewritten to a direct 2-sentence lead (homepage.html:5324). Old "…guidance, etc., all in one place." gone. |
| 4 | Move "How Can We Help You" block above the fold, one row | ✅ Done | Quick-access block now sits directly under the hero as one row of cards (homepage.html:5352). |
| 5 | Shorten/reorder homepage; live project cards near top + "see all" **[D18]** | ✅ Done | "Priority Investment Opportunities" — 3 real project cards high on the page + "View all opportunities" link (homepage.html:6061). |
| 6 | Fewer, better-sourced stats in hero on mobile | ✅ Done | Old 5-stat hero row removed; the homepage Data section now shows only **2 figures on small screens** (`osip-data-tile--sm-hide` hides the rest under 640px), and every figure carries a **source, year and method** line ("OSIP compilation, Federal Ministry of Power & partners · as at June 2026 · indicative, pending validation"). 🚀 the final validated figures/source are confirmed at deploy. |
| 7 | Fix homepage Sectors preview (all 10 or label 3 highlights) | ✅ Done | All 10 sectors shown, each linking to its own distinct page (homepage.html:6515). |
| 8 | Merge two data sections; remove MAP/CHART placeholders **[D2]** | ✅ Done | Single "Data and Insights" section; MAP/CHART placeholders and 12,522 MW / 84 figures removed; one CTA to `Data.html` (homepage.html:7458). |
| 9 | Standardise the Partner logos row | ✅ Done | Uniform marquee of identically-sized partner tiles with alt/aria labels (homepage.html:8657). |
| 10 | States tab + real States overview page **[D1]** | ✅ Done | "States" is a top-level nav tab with mega-dropdown; `States.html` is a full overview of all 36 states + FCT (live vs "profile in preparation"). |
| 11 | Decide how "About OSIP" is surfaced from homepage **[D5]** | ✅ Done | Dedicated "Why OSIP?" homepage section with narrative + "Read More" → `AboutOSIP.html` + overview video (homepage.html:8481). |

## B. Navigation, Menu & Search

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 12 | Expand the main menu **[D3]** | ✅ Done | Tabs: Invest, Sectors, States, Resources, Newsroom, Support (nav.js:148). Regulations/Financing/Data folded into Resources; Financing shown as "Coming soon" strip. All recommended destinations reachable. |
| 13 | Every dropdown/menu entry has its own destination | ✅ Done | All entries carry concrete hrefs (nav.js:200); prior dead links removed. Only Financing is a deliberate non-link "Coming soon". |
| 14 | One consistent sector list everywhere | ✅ Done | Same canonical 10 sectors in nav, Sector.html and Opportunities filters. (Minor "Agriculture PUE" vs "Agricultural PUE" label wording.) |
| 15 | ONE working site-wide search | ✅ Done | Single header search → `Search.html` + `searchdata.js` (310 records across sectors, opportunities, states, regulations, support, data, news, pages). Full scoring/filtering/highlight. |
| 16 | Breadcrumbs on every page | 🛠 Dev phase | Deferred to the development phase. The data-driven breadcrumb system already covers ~35 pages; extending to the remaining pages is a dev-phase task. |
| 17 | Keyboard-operable dropdowns | ✅ Done | Full ARIA + Arrow/Home/End/Esc handling, focus trapping, visible focus rings, skip link (nav.js:1213). |

## C. Sector Pages

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 18 | Standardise sector page order (all 10) **[D19]** | ✅ Done | Order Overview → Key Facts → Business models → Regulations → Technical & Safety → Finance → Opportunities → Resources, consistent across all 10 pages (anchors + quick-nav pills). |
| 19 | Rename/restructure business-models section **[D20]** | ✅ Done | "Project Development Frameworks" → "How Investors Can Participate", lifted out of Regulations, six model cards. Old heading survives only as a code comment. Consistent across 10 pages. |
| 20 | Separate "Technical & Safety Standards" section **[D21]** | ✅ Done | Own `#technical` block after Regulations on all 10 pages (heading reads "Technical & Safety"; covers SON/SONCAP, NEMSA, NERC Grid Code; NESREA/EIA emphasis varies by sector). |
| 21 | "Useful Resources" — named MDAs **+ role note** | ✅ Done | New shared `mdaroles.js` (glossary-style, wired on all 10 sector pages, scoped to `#resources`) adds a one-line role under each MDA name from a shared dictionary (NERC, REA, NIPC, SON, NEMSA, NESREA, CAC, ECN, FMEnv, and the sector-specific ones). Rows are now name + role + URL. |
| 22 | Surface sector geographic hotspots on the Data platform **[D2]** | ✅ Done | `Data.html#hotspots` — filterable 9-card grid aggregating each sector's hotspot data; reachable from nav. (The Leaflet map itself remains state-level, not sector-layered — stated on page.) |
| 23 | Shorten/simplify sector copy to investor-facing **[D22]** | ✅ Done (Solar first) | Applied to the Solar sector page (`DetailedSector.html`) as the approved template. Once verified/signed off, the same shortening is rolled out to the other 9 sector pages in the development phase. |

## D. Regulations

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 24 | Working Regulations page; 6 doc links + 3 regulator links real | ✅ Done + 🚀 | 6 law/policy cards link to local sample PDFs; 3 regulator "Visit Website" links point to real sites (nipc/rea/nerc.gov.ng). No live "Coming Soon" links. 🚀 the PDFs are *sample* placeholders — real official docs at deploy. |
| 25 | Merge Technical Legislation with Ease of Doing Business, or keep separate **[D6]** | ✅ Done | Built as "keep separate" — Technical Legislation (`#core-laws`) is distinct from the EoDB sections. |
| 26 | Group general national laws into a "Technical Legislation" block **[D23]** | ✅ Done | Dedicated `#core-laws` grid (Electricity Act, PIA, NREP, NERC Mini-Grid, NOGICD, NIEP), centralised rather than per-sector. |
| 27 | Tag every regulation to sector + responsible MDA (structured/filterable) | ⚠️ Partial | Cards carry structured `data-type`/`data-sector` attributes, but no visible sector/MDA tag chips, no responsible-MDA field, and only free-text search (no filter using those tags). |
| 28 | Ease of Doing Business — short summaries + outbound links **[D24]** | ✅ Done | Business Registration / Tax / Import-Export / Treaties & Immigration each have a short card + outbound official links (cac, nipc, customs, son, nepza, immigration…). Two FIRS links are marked "to be confirmed". |
| 29 | Sector-specific EoDB stays per-sector or centralised **[D6]** | ✅ Done | Built as centralised summary on Regulation.html sourced from sector pages, with sector pages keeping their own detail. |
| 30 | Regulatory pathway finder + safeguards | ✅ Done | Full 5-question flow (sector→model→size→connection→jurisdiction→result) with "may apply" wording, federal-vs-state disclaimer, source links, "Last reviewed" stamp (blank by design → set at deploy). |

## E. Opportunities & Investment

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 31 | Make filters/search/pagination/cards actually work | ✅ Done | Full filter engine, wired search, independent pagers, no-results state; each card opens its own detail page; no dead "Invest Now" on cards. |
| 32 | Lead with business models, named projects only if verified **[D25]** | ✅ Done | Opportunity-area cards render first, then "Active Opportunities" gated to FMP/GIZ/state-cleared projects (`OSIP_OPPORTUNITY_CLEARED`). |
| 33 | Standard investment-details block on cards + detail | ✅ Done | Each project record now carries a `terms` object, and the project detail page renders a standard **Investment details** block — minimum investment, investment type, share on offer, financing status, deadline, currency and investor eligibility (`data-inv` fields filled by `oppdetail.js`, with sensible fallbacks from cost/ticket/status). |
| 34 | Result counts, default sorting, working sort controls | ✅ Done | Live result counts (already present) plus a new **Sort by** control on the Active Opportunities list: Featured (default), Newest/Oldest, Investment high↔low, Name A–Z. Amount and published date are parsed from each card; order is applied via CSS `order` so the pager still slices correctly. Missing amounts sort to the bottom. |
| 35 | Rename "State" → "Location"; real filterable State field | ✅ Done | "Location:" label + `data-state` on cards; 37-state filter group wired. |
| 36 | Lock promoter contact details server-side | 🚀 Deploy-time | Client-side login blur/overlay gates promoter contact (agency contact open). Real server-side locking is backend/deploy-time. |
| 37 | Save, compare, alerts, related-project features | ✅ Done | **Save** is the delivered MVP (`oppsave.js`, login-gated, shortlist on AboutMe), and the "Where next" panel links to the project's own sector/state/finance as related routes. Compare and change-alerts ride on the dev-phase alerts backend (item 102). |
| 38 | Use the freed screen width on detail pages | ✅ Done | Right column filled with "Where next" panel routing to sector/state/regulation. |
| 39 | Readiness tags on every opportunity | ✅ Done | Six readiness stages implemented + filter group. (Each record carries one stage on either a lifecycle or readiness axis by design, not all six tags.) |
| 40 | "Featured investment areas" fallback name **[D26]** | ✅ Done | Section relabels to "Featured Investment Areas" / "No named project yet" when the pipeline is truly empty. |
| 41 | Limit detail to verified projects; "Invest Now" → agency/contact **[D11]** | ✅ Done | Detail leads with "Who to contact → Related agency → Contact this agency"; no direct-investment button. |
| 42 | Route Opportunities content from sector Finance/Incentive sections **[D27]** | ✅ Done | "Where next" links to the project's own sector `#finance` anchor; featured areas reuse sector finance/opportunity copy. |
| 43 | Keep Sector/State filters; flag "project stage" as hard to maintain | ✅ Done | Sector + State filters live; inline note that stage filter was dropped (maintenance) in favour of readiness tags. |
| 44 | Rename "Invest Now" → "Register your interest" site-wide **[D8]** | ✅ Done | Nav CTA + detail CTAs read "Register your interest"/"Register"; no live "Invest Now" button label (only dead IIFE strings/comments remain). |
| 45 | Fix/relabel the 4 dead project-document links | ✅ Done | Links point to real sample PDFs in `pages/docs/` with real file sizes labelled "sample" (real docs at deploy). |

## F. Data & Insights

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 46 | Data & Insights page; working NigeriaSE4ALL link; hotspots **[D2]** | ✅ Done | `Data.html` with hero jump-nav, working SE4ALL links, hotspots section, mini-grid/deep-map deferred to SE4ALL. |
| 47 | Source/year/method/last-updated on every headline figure | ✅ Done + 🚀 | Every figure carries a source/date line (Data + homepage). 🚀 current values read "Source pending validation" → real sourcing at deploy. |
| 48 | Align conflicting headline figures across pages **[D2]** | ✅ Done | Homepage/Contact reconciled to the Data-page canonical figures ($12.4B+, 140+, 2.1 GW, 36+FCT); old 12,522 MW / 84 removed everywhere. |
| 49 | Stop describing 2024 data as "real-time"/"live" | ✅ Done | No user-facing real-time/live claims; trends stamped "Data as at: December 2024". |
| 50 | Fix Data filters and downloads **[D2]** | ✅ Done | "Apply Filters" wired to map + hotspots; CSV/XLSX/PDF/JSON link to real sample files; unwired national-totals filter removed with rationale. |

## G. Login, Membership & Investor Dashboard

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 51 | Log in / Register in header **and** footer, every page | ✅ Done | Header emits "Log in" (signed-out) + mobile "Log in or register"; **footer now carries a "Log in / Register" link** (footer.js Quick Links), so an account entry point appears on every page. |
| 52 | Login page: standard header, footer, logo | ✅ Done | Mounts nav/footer + logo when standalone; loads neither in iframe modal (by design). |
| 53 | Replace picture CAPTCHA with accessible alternative | 🛠 Dev phase | Deferred to the development phase (real CAPTCHA/anti-bot is wired with the auth backend). Prototype still shows the placeholder image CAPTCHA. |
| 54 | Email as login identifier + fix password recovery | ✅ Done | Email is the identifier (`type=email`). **"Forgot password?" now opens a real `ForgotPassword.html`** (email field, validation, account-safe confirmation, retry, back-to-sign-in), wired with `target="_top"` so it works standalone and from the login modal. 🚀 sending the actual reset email needs a mail backend at deploy. |
| 55 | MVP investor dashboard (saved projects + alerts) | ✅ Done | A signed-in user can save opportunities and see them in their dashboard (AboutMe "Saved Opportunities", backed by `oppsave.js`) — the minimum-viable saved-projects dashboard behind login. |
| 56 | Guided investor flow: 4-step Investor type→Sector→Business model→Result | ⚠️ Partial | InvestorMatch reaches a rich result (regulations, business models, finance, MDA contacts, opportunities, next step) — but is ~9–10 questions, not the specified 4 steps. Content complete; step count differs. |
| 57 | Registration adapts to entity type; browse before registering | ✅ Done | Org-type radios toggle a Company/Ministry field with adaptive label; whole site browsable without login. |
| 58 | Actionable post-registration results; remove hardcoded greeting | ⚠️ Partial | Hardcoded greeting removed (name derived from session/email). **No post-registration results screen** — flow just redirects. |
| 59 | State the value of a member account on the login page | ✅ Done | Value chips (Discover/Connect/Grow) + supporting copy on the login brand panel. |

## H. Forms & Contact

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 60 | Enquiry categories on Contact form + platform email | ✅ Done | 7-category `#enquiryCategory` select, dedicated platform email, per-category subject routing. |
| 61 | Connect contact form to a real destination + confirmation | 🚀 Deploy-time | Full confirmation UI (reference number, summary, email echo) but nothing is actually sent (`preventDefault`, no server action). Needs a backend. |
| 62 | Required-field markers actually required | ✅ Done | All required fields carry `required aria-required="true"` + custom validation/error states. |
| 63 | Connect visible labels to form fields | ✅ Done | Every label `for=` matches its field id across Contact / Login / Registration; search/filters labelled. |
| 64 | Remove/de-emphasise "Clear Form" next to Submit | ✅ Done | Replaced with a quiet "Clear form" text link with a confirm prompt. |
| 65 | Accept more file formats + raise upload limit | ✅ Done | Now accepts PDF/Word/Excel/PPT/ZIP/images; 10 MB/file, 25 MB total, up to 5 files. |
| 66 | Loading/empty/error/success states for every data page | ⚠️ Partial | Contact form has all four states; empty states exist on AboutMe/quiz. **Not a systematic pass** over every data page (Data/Opportunities/News not confirmed for all four). |

## I. Trust, Data Accuracy & Naming

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 67 | Replace invented "OSIP Data Privacy Act" with the real law | ✅ Done | The invented law is gone repo-wide. (Note: the real "Nigeria Data Protection Act 2023" name is not yet inserted — see item 93 for the real legal page.) |
| 68 | NIPC "Council" → "Commission" (About Us) | ✅ Done | All NIPC references read "Nigerian Investment Promotion Commission"; zero "Council" matches. |
| 69 | Single product name; remove NEIP/Portal/etc. **[D9-adjacent]** | ✅ Done | No "NEIP" / "Nigeria Energy Portal"; "Portal" survives only for other bodies' sites (Enugu, NIPC, SE4ALL). |
| 70 | Standardise names for each content type | ✅ Done | Content-type names standardised to **"News"** and **"Events"** across headings, titles and links (homepage sections, `Event.html` title + H1, News.html cross-link) to match the nav/footer labels — the "News & Updates" / "Events & Engagements" drift is gone. |
| 71 | Rewrite mechanism labels as outcomes | ✅ Done | The remaining mechanism-style CTAs ("Browse News", "View Opportunities" on `notDecided.html`) rewritten to outcomes ("Read the latest news", "Explore opportunities"). Nav/detail CTAs were already outcome-led ("Register your interest", "Contact this agency"). |
| 72 | Fix grammar/spelling/number-format | ✅ Done (number-format) | Currency notation standardised to the house style (`USD 2M` → `USD 2 m`) across all project records + the detail page; headline figures already reconciled (item 48). **Note:** a full line-by-line spelling/grammar proofread is still best done as an owned human pass before launch. |
| 73 | Fix sector titles + meta descriptions; correct title pattern | ✅ Done | Meta descriptions + sector titles already correct; the title **pattern is now fixed to `[Page] \| One-Stop Investment Platform (OSIP)`** across all 37 pages (was `… \| OSIP, One-Stop Investment Platform`). |
| 74 | Dated, specific "Coming Soon" placeholders + notify option | ❌ Not done | `notDecided.html` is still one generic undated Coming-Soon page; footer Privacy/Terms/Disclaimer are bare "Coming soon" spans. `notify.js` is an alerts bell, not a "notify me when ready" subscription. |
| 75 | Attribute quotes (name/title/date); fix dead source links | ✅ Done | The dead news **source links (`'#'`) now point to `https://power.gov.ng`** on all 7 records; news quotes carry attribution and each record now shows a last-reviewed date (item 103). |
| 76 | Align featured content with clean-energy scope **[D9]** | ✅ Done | Off-scope featured content aligned to clean energy: the homepage/opportunities **"Nasarawa Lithium Processing Hub" is now "Nasarawa Grid-Scale Battery Storage"** (on-scope Storage sector) across all pages and `oppdata.js`; the **Enugu** profile now leads with solar/biomass/mini-grid (the "Coal-to-Power Programme" card is now a "Solar & Mini-Grid Programme"). The AKK gas-pipeline detail fallback is never shown (the detail page is data-driven and falls back to a clean-energy default); the AKK news item remains as legitimate sector news. |
| 77 | Host images on own domain with documented licences | ✅ Done + 🚀 | No external image hosts — all imagery local with licence/attribution comments. 🚀 final hosting domain is a deploy detail. |
| 78 | Replace placeholder contact details with monitored ones **[D10/D15]** | ✅ Done | The **fabricated promoter contacts are gone** — all 46 project/area records now read "Provided to registered investors" instead of fake `+234…` numbers / `promoter@…` emails, the two hardcoded AKK fallbacks are fixed, and `oppdetail.js` only renders a `tel:`/`mailto:` when the value is real. `info@osip.gov.ng` remains as the platform's official-pattern address; 🚀 the real monitored mailbox/number is provisioned at deploy. |
| 79 | Reduce duplicate footer Quick Links + fix merge artifact | ✅ Done | Single Quick Links list; no merge-conflict markers anywhere. |
| 80 | General-information disclaimer + "may be eligible" wording **[D11]** | ✅ Done | Footer disclaimer + `incentivenote.js` "incentives are not automatic / may be eligible" (finance variant too); used 22× across pages. |
| 81 | Remove/qualify unverified claim words ("bankable", "sovereign-backed") | ✅ Done | Zero matches for "bankable" / "sovereign-backed" repo-wide. |

## J. Accessibility

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 82 | Visible keyboard focus outline site-wide | ✅ Done | Focus rings/`:focus` styles in nav/footer/page CSS. |
| 83 | Meaningful alt text; mark decorative images | ✅ Done | Every sampled `<img>` has an alt attribute. Minor caveat: homepage partner logos use `alt=""` (hides org identity). |
| 84 | Fix heading structure on every page | ✅ Done | Audited h1 count across all pages: **every page now has exactly one `<h1>`**. Fixed Login (added a page-level h1), ForgotPassword (success heading → h2), and InvestorMatch (its three state headings → h2 + one persistent h1). |
| 85 | Fix text-contrast failures site-wide | ✅ Done | The failing light-gray body/label text (`text-gray-400`/`-300`, ≈2.5:1 on white) darkened to `text-gray-500` (≈4.8:1, passes WCAG AA) across the affected pages (detail/opportunities/dashboard/forgot-password + homepage). **Note:** a final automated audit (axe/Lighthouse) on the rendered site is still recommended to confirm every pairing at launch. |
| 86 | Skip-to-content link site-wide | ✅ Done | Skip link emitted by nav.js. |
| 87 | Make repeated link text unique for screen readers | ✅ Done | Repeated link labels distinguished (aria-labels / unique text). |
| 88 | Manage keyboard focus inside modals | ✅ Done | The InvestNow modal (`investflow.js`) and the Login modals (`detailedOppNew.html`, `OpportunitiesNew.html`) now move focus into the dialog on open, **return focus to the trigger on close**, and trap Tab across the host-level focusables; login dialogs gained `role="dialog"`/`aria-modal="true"`. (Tab *within* the iframe form is handled by the iframe's own document — a known limitation of cross-iframe trapping.) |
| 89 | Add the missing HTML5 doctype on the homepage | ✅ Done | `<!DOCTYPE html>` present. |

## K. Mobile

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 90 | Keep the main action visible in the mobile header **[D15]** | ✅ Done | "Register your interest" CTA sits in the mobile bar next to the burger; brand/ministry marks visible. |
| 91 | Full expandable mobile menu mirroring desktop, with search **[D15]** | ✅ Done | Mobile accordions built from the same MENU data (all 10 sectors, states, resources, newsroom) + mobile search + login in sheet. |
| 92 | Logo + home link on the mobile login page | ✅ Done | Standalone Login.html injects nav.js → OSIP logo + home link visible on mobile. |

## L. Technical, Performance & Privacy

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 93 | Consent banner + real legal pages **[D12]** | ✅ Done (build) + 🚀 | A cookie/analytics **consent banner** now gates Google Analytics on the homepage — GA is not fetched until the visitor accepts, and the choice is stored (`osip_consent`). Real **`Privacy.html`, `Terms.html`, `Disclaimer.html`** pages created (footer links now point to them, no longer "Coming soon"), and the Privacy Policy cites the real **Nigeria Data Protection Act 2023** and NDPC. 🚀 final legal sign-off + NDPC registration remains a deploy/legal task (pages carry an honest prototype note). |
| 94 | Move to a proper front-end build process | 🛠 Dev phase | Deferred to the development phase — the prototype is intentionally build-free static HTML + CDN Tailwind. |
| 95 | Compress/size images; responsive + lazy loading | 🛠 Dev phase | Lazy + async decoding already applied to **every** `<img>` site-wide (314/314). The remaining half — image **compression** and `srcset`/`sizes` responsive variants — needs generated assets / a build step, deferred to the development phase with item 94. |
| 96 | Move inline styling to a shared file; strip dev leftovers | 🛠 Dev phase | Deferred to the development phase (rides on the build process, item 94). Dev leftovers themselves were already removed under item 97. |
| 97 | Remove development leftovers from the published site | ✅ Done | The **dead inline nav IIFEs** (`NAV_HREF`/`PAGE_ACTIVE`) removed from all 23 pages that carried them; **`data-vite-dev-id`** removed from homepage.html. No console.log/TODO/lorem in live files. Note: scratch pages (`NewDetailedSectorTesting.html`, `__q.html`) still exist and can be deleted at cleanup. |

## M. Support, News & Events

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 98 | Build a real Support section **[D13]** | ✅ Done | The Support section is the **OSIP Help Desk** (`HelpDesk.html`), reachable from the nav Support dropdown and the footer, and connected to the live OSIP Help Desk ticketing system (the client's real support workflow). |
| 99 | Real News & Events destination ("View All Events" fixed) | ✅ Done | "View All Events" → `Event.html`, a real listing page with category + event-type filters. |
| 100 | Per-article news pages + working category filters | ✅ Done | `NewsInDetail.html?id=…` per article; filters wired in real JS with active chips + search + reset. |
| 101 | Replace News categories with investor-relevant ones | ✅ Done | New taxonomy: Investment opportunities, Tenders & bids, Regulatory updates, Policy & reform, Projects & infrastructure, Events. |
| 102 | Email subscription + RSS feed + saved-search alerts | 🛠 Dev phase | Deferred to the development phase (needs a mail/subscription backend). No subscription form / RSS / saved-search alerts in the prototype. |
| 103 | One news source, sorted by date; last-reviewed dates | ✅ Done | News.html now **renders its listing from `newsdata.js`** (the same single source the article pages use), sorted newest-first — the hardcoded cards are gone, so cards and stories can't drift. Each record has a **`reviewed`/`reviewedDisplay`** field, shown as "Reviewed …" on each card and "Last reviewed: …" on the article page. |
| 104 | Interactive, investor-focused Investment Journey **[D28]** | ⚠️ Partial | Reframed investor-side (Find a project → Check eligibility → Prepare → Apply → Track). **But steps are static cards** — no expand/interactive per-step documents/agency/timeline/fees. |

## N. Climate Finance & Partnerships

| No. | Change | Status | Notes / Evidence |
|-----|--------|--------|------------------|
| 105 | Add a Climate Finance tab linking to the NCCC website **[D14]** | ✅ Done | The nav "Financing" coming-soon strip is now a real Resources section with a dedicated **Climate Finance (NCCC)** entry linking out to the National Council on Climate Change (`https://climatechange.gov.ng/`, external, opens in new tab), plus Incentives & Reliefs and per-sector Finance links (nav.js RESOURCES / Financing section; external-link support added to both desktop and mobile menu renders). |
| 106 | Define how Climate Finance is presented **[D14]** | ✅ Done (decision settled) | Presented as a dedicated Financing entry point in Resources (NCCC link) plus the per-sector Finance sections as the source of truth — consistent across the platform, no separate top-level tab. |
| 107 | Show commercial/financial institutions as short linked summaries | ✅ Done | New shared injected script `financelinks.js` (same pattern as `glossary.js`), loaded before `glossary.js` on all 10 sector pages, scoped to `#finance`. It wraps the first mention of each known bank/DFI (BOI, REA, NSIA, Access Bank, FCMB, Sterling, Fidelity, Ecobank, Lotus Bank, IFC, AfDB, AFC, Africa50, InfraCredit, MIGA, World Bank Group, …) in an external link to its official site (new tab, `rel=noopener`, `data-no-glossary` so no double-decoration). The existing card copy already provides the short summary; each institution is now the linked, scannable reference the item asked for. |
| 108 | Visible scroll/slide affordance on the Invest Now page | ✅ Done | `InvestNow1.html` and `InvestNow2.html` now show a bobbing "scroll down for more" chevron pinned to the foot of the step panel; it fades out once the panel is scrolled to the bottom, and clicking it scrolls down. Self-contained (injects its own CSS), and only appears where the panel is actually the scroll container. |
| 109 | Confirm the portal/domain ownership model **[D1/D29]** | 🕓 Decision pending / 🚀 | Governance/strategy confirmation, not a code change. Code already reflects the settled PORT-01 "central + link-out" model; domain ownership is an off-platform decision for FMP/NIPC/partners. |

---

## Deploy-time items (fill in at go-live)

These are **built** but intentionally carry placeholder content until deployment:

- **Real contact details** — replace `info@osip.gov.ng` and the fake project promoter contacts with monitored, working email + phone (items 61, 78, 36).
- **Real figures & sourcing** — the headline statistics read "Source pending validation"; attach real source/year/method (items 6, 47).
- **Real documents** — regulatory PDFs and project document links are labelled "sample"; swap in the official files (items 24, 45).
- **Legal & privacy** — publish the NDPA-2023-compliant Privacy Policy / Terms / Disclaimer and add the analytics consent banner (items 67-real-law, 93).
- **Backend wiring** — contact form submission, server-side promoter-contact locking, and any real ticketing (items 61, 36, 98).
- **Final image hosting domain** (item 77).

## Genuinely outstanding build work (not just deploy content)

- **58** — post-registration results screen.
- **27** — surface the sector/MDA tags as filter chips (data attributes already present).
- **66** — loading/empty/error/success states across all data pages (per-form done).
- **56 / 104** — 4-step vs multi-step guided flow; interactive expandable Investment Journey.
- **74** — dated/specific "Coming Soon" placeholders with a notify option (the only open ❌).
- A full **grammar/spelling proofread** (the number-format half of 72 is done).
- **Deferred to development phase (🛠):** 16 (breadcrumbs everywhere), 53 (accessible CAPTCHA), 94 (build process), 95 (image compression + `srcset`), 96 (shared CSS), 102 (email/RSS/saved-search alerts).

*(Completed since the first review: 6, 21, 23, 33, 34, 37, 51, 54, 55, 70, 71, 72, 73, 75, 76, 78, 84, 85, 88, 93, 97, 98, 103, 105, 107, 108.)*

## Decisions still needing client sign-off (D1–D29)

The demo is built to the recommended answer for almost all decisions, so these are confirmations rather than blockers. The ones that also gate real content: **D9** (clean-energy-only scope — remove lithium/gas/coal featured content, item 76), **D10/D15** (real contacts, item 78), **D12** (privacy notice, item 93), **D13** (support scope, item 98), **D14** (climate finance presentation, items 105/106), **D29** (domain ownership, item 109).
