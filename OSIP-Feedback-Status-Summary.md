# OSIP — Feedback Changes: Status Summary (all 109 tasks)

**Source:** *OSIP Feedback Changes v0.1* (4 Sep 2026) — the full 109-item log.
**Verified against:** the OSIP HTML codebase (`ui-enhancement` branch).
**As of:** 21 September 2026.

This is the clean, one-line-per-task summary of **all 109 items** with their current status.
For the full evidence, per-item notes, deploy-time/decision flags and the change log, see the companion document **`OSIP-Feedback-Implementation-Status.md`**.

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Implemented in the code. |
| ⚠️ Partial | Partly implemented — a specific gap remains. |
| 🛠 Dev phase | Deferred by the client to the development/build phase (not prototype scope). |
| ❌ Not done | Not implemented. |

## At a glance

| Status | Count |
|--------|------:|
| ✅ Done | 94 |
| ⚠️ Partial | 5 |
| 🛠 Dev phase | 6 |
| ❌ Not done | 1 |
| **Total** | **109** |

> Several "Done" items still carry a **deploy-time** tail (real contacts, real figures/sourcing, live documents, legal sign-off, backends) or depend on a **client decision (D1–D29)** — those are noted per item in the companion document.

## Index by status

**⚠️ Partial (5):** 27, 56, 58, 66, 104
**🛠 Dev phase (6):** 16, 53, 94, 95, 96, 102
**❌ Not done (1):** 74
**✅ Done (94):** everything else (see the table below).

---

## Full task list (all 109, by area)

## A. Homepage & Hero
| No. | Change | Status |
|----:|--------|--------|
| 1 | Reduce hero to ONE primary call-to-action; drop guide download **[D16]** | ✅ Done |
| 2 | Working carousel, or remove the broken slider | ✅ Done |
| 3 | Rewrite the run-on hero paragraph **[D17]** | ✅ Done |
| 4 | Move "How Can We Help You" block above the fold, one row | ✅ Done |
| 5 | Shorten/reorder homepage; live project cards near top + "see all" **[D18]** | ✅ Done |
| 6 | Fewer, better-sourced stats in hero on mobile | ✅ Done |
| 7 | Fix homepage Sectors preview (all 10 or label 3 highlights) | ✅ Done |
| 8 | Merge two data sections; remove MAP/CHART placeholders **[D2]** | ✅ Done |
| 9 | Standardise the Partner logos row | ✅ Done |
| 10 | States tab + real States overview page **[D1]** | ✅ Done |
| 11 | Decide how "About OSIP" is surfaced from homepage **[D5]** | ✅ Done |

## B. Navigation, Menu & Search
| No. | Change | Status |
|----:|--------|--------|
| 12 | Expand the main menu **[D3]** | ✅ Done |
| 13 | Every dropdown/menu entry has its own destination | ✅ Done |
| 14 | One consistent sector list everywhere | ✅ Done |
| 15 | ONE working site-wide search | ✅ Done |
| 16 | Breadcrumbs on every page | 🛠 Dev phase |
| 17 | Keyboard-operable dropdowns | ✅ Done |

## C. Sector Pages
| No. | Change | Status |
|----:|--------|--------|
| 18 | Standardise sector page order (all 10) **[D19]** | ✅ Done |
| 19 | Rename/restructure business-models section **[D20]** | ✅ Done |
| 20 | Separate "Technical & Safety Standards" section **[D21]** | ✅ Done |
| 21 | "Useful Resources" — named MDAs **+ role note** | ✅ Done |
| 22 | Surface sector geographic hotspots on the Data platform **[D2]** | ✅ Done |
| 23 | Shorten/simplify sector copy to investor-facing **[D22]** | ✅ Done (Solar first) |

## D. Regulations
| No. | Change | Status |
|----:|--------|--------|
| 24 | Working Regulations page; 6 doc links + 3 regulator links real | ✅ Done + 🚀 |
| 25 | Merge Technical Legislation with Ease of Doing Business, or keep separate **[D6]** | ✅ Done |
| 26 | Group general national laws into a "Technical Legislation" block **[D23]** | ✅ Done |
| 27 | Tag every regulation to sector + responsible MDA (structured/filterable) | ⚠️ Partial |
| 28 | Ease of Doing Business — short summaries + outbound links **[D24]** | ✅ Done |
| 29 | Sector-specific EoDB stays per-sector or centralised **[D6]** | ✅ Done |
| 30 | Regulatory pathway finder + safeguards | ✅ Done |

## E. Opportunities & Investment
| No. | Change | Status |
|----:|--------|--------|
| 31 | Make filters/search/pagination/cards actually work | ✅ Done |
| 32 | Lead with business models, named projects only if verified **[D25]** | ✅ Done |
| 33 | Standard investment-details block on cards + detail | ✅ Done |
| 34 | Result counts, default sorting, working sort controls | ✅ Done |
| 35 | Rename "State" → "Location"; real filterable State field | ✅ Done |
| 36 | Lock promoter contact details server-side | 🚀 Deploy-time |
| 37 | Save, compare, alerts, related-project features | ✅ Done |
| 38 | Use the freed screen width on detail pages | ✅ Done |
| 39 | Readiness tags on every opportunity | ✅ Done |
| 40 | "Featured investment areas" fallback name **[D26]** | ✅ Done |
| 41 | Limit detail to verified projects; "Invest Now" → agency/contact **[D11]** | ✅ Done |
| 42 | Route Opportunities content from sector Finance/Incentive sections **[D27]** | ✅ Done |
| 43 | Keep Sector/State filters; flag "project stage" as hard to maintain | ✅ Done |
| 44 | Rename "Invest Now" → "Register your interest" site-wide **[D8]** | ✅ Done |
| 45 | Fix/relabel the 4 dead project-document links | ✅ Done |

## F. Data & Insights
| No. | Change | Status |
|----:|--------|--------|
| 46 | Data & Insights page; working NigeriaSE4ALL link; hotspots **[D2]** | ✅ Done |
| 47 | Source/year/method/last-updated on every headline figure | ✅ Done + 🚀 |
| 48 | Align conflicting headline figures across pages **[D2]** | ✅ Done |
| 49 | Stop describing 2024 data as "real-time"/"live" | ✅ Done |
| 50 | Fix Data filters and downloads **[D2]** | ✅ Done |

## G. Login, Membership & Investor Dashboard
| No. | Change | Status |
|----:|--------|--------|
| 51 | Log in / Register in header **and** footer, every page | ✅ Done |
| 52 | Login page: standard header, footer, logo | ✅ Done |
| 53 | Replace picture CAPTCHA with accessible alternative | 🛠 Dev phase |
| 54 | Email as login identifier + fix password recovery | ✅ Done |
| 55 | MVP investor dashboard (saved projects + alerts) | ✅ Done |
| 56 | Guided investor flow: 4-step Investor type→Sector→Business model→Result | ⚠️ Partial |
| 57 | Registration adapts to entity type; browse before registering | ✅ Done |
| 58 | Actionable post-registration results; remove hardcoded greeting | ⚠️ Partial |
| 59 | State the value of a member account on the login page | ✅ Done |

## H. Forms & Contact
| No. | Change | Status |
|----:|--------|--------|
| 60 | Enquiry categories on Contact form + platform email | ✅ Done |
| 61 | Connect contact form to a real destination + confirmation | 🚀 Deploy-time |
| 62 | Required-field markers actually required | ✅ Done |
| 63 | Connect visible labels to form fields | ✅ Done |
| 64 | Remove/de-emphasise "Clear Form" next to Submit | ✅ Done |
| 65 | Accept more file formats + raise upload limit | ✅ Done |
| 66 | Loading/empty/error/success states for every data page | ⚠️ Partial |

## I. Trust, Data Accuracy & Naming
| No. | Change | Status |
|----:|--------|--------|
| 67 | Replace invented "OSIP Data Privacy Act" with the real law | ✅ Done |
| 68 | NIPC "Council" → "Commission" (About Us) | ✅ Done |
| 69 | Single product name; remove NEIP/Portal/etc. **[D9-adjacent]** | ✅ Done |
| 70 | Standardise names for each content type | ✅ Done |
| 71 | Rewrite mechanism labels as outcomes | ✅ Done |
| 72 | Fix grammar/spelling/number-format | ✅ Done (number-format) |
| 73 | Fix sector titles + meta descriptions; correct title pattern | ✅ Done |
| 74 | Dated, specific "Coming Soon" placeholders + notify option | ❌ Not done |
| 75 | Attribute quotes (name/title/date); fix dead source links | ✅ Done |
| 76 | Align featured content with clean-energy scope **[D9]** | ✅ Done |
| 77 | Host images on own domain with documented licences | ✅ Done + 🚀 |
| 78 | Replace placeholder contact details with monitored ones **[D10/D15]** | ✅ Done |
| 79 | Reduce duplicate footer Quick Links + fix merge artifact | ✅ Done |
| 80 | General-information disclaimer + "may be eligible" wording **[D11]** | ✅ Done |
| 81 | Remove/qualify unverified claim words ("bankable", "sovereign-backed") | ✅ Done |

## J. Accessibility
| No. | Change | Status |
|----:|--------|--------|
| 82 | Visible keyboard focus outline site-wide | ✅ Done |
| 83 | Meaningful alt text; mark decorative images | ✅ Done |
| 84 | Fix heading structure on every page | ✅ Done |
| 85 | Fix text-contrast failures site-wide | ✅ Done |
| 86 | Skip-to-content link site-wide | ✅ Done |
| 87 | Make repeated link text unique for screen readers | ✅ Done |
| 88 | Manage keyboard focus inside modals | ✅ Done |
| 89 | Add the missing HTML5 doctype on the homepage | ✅ Done |

## K. Mobile
| No. | Change | Status |
|----:|--------|--------|
| 90 | Keep the main action visible in the mobile header **[D15]** | ✅ Done |
| 91 | Full expandable mobile menu mirroring desktop, with search **[D15]** | ✅ Done |
| 92 | Logo + home link on the mobile login page | ✅ Done |

## L. Technical, Performance & Privacy
| No. | Change | Status |
|----:|--------|--------|
| 93 | Consent banner + real legal pages **[D12]** | ✅ Done (build) + 🚀 |
| 94 | Move to a proper front-end build process | 🛠 Dev phase |
| 95 | Compress/size images; responsive + lazy loading | 🛠 Dev phase |
| 96 | Move inline styling to a shared file; strip dev leftovers | 🛠 Dev phase |
| 97 | Remove development leftovers from the published site | ✅ Done |

## M. Support, News & Events
| No. | Change | Status |
|----:|--------|--------|
| 98 | Build a real Support section **[D13]** | ✅ Done |
| 99 | Real News & Events destination ("View All Events" fixed) | ✅ Done |
| 100 | Per-article news pages + working category filters | ✅ Done |
| 101 | Replace News categories with investor-relevant ones | ✅ Done |
| 102 | Email subscription + RSS feed + saved-search alerts | 🛠 Dev phase |
| 103 | One news source, sorted by date; last-reviewed dates | ✅ Done |
| 104 | Interactive, investor-focused Investment Journey **[D28]** | ⚠️ Partial |

## N. Climate Finance & Partnerships
| No. | Change | Status |
|----:|--------|--------|
| 105 | Add a Climate Finance tab linking to the NCCC website **[D14]** | ✅ Done |
| 106 | Define how Climate Finance is presented **[D14]** | ✅ Done (decision settled) |
| 107 | Show commercial/financial institutions as short linked summaries | ✅ Done |
| 108 | Visible scroll/slide affordance on the Invest Now page | ✅ Done |
| 109 | Confirm the portal/domain ownership model **[D1/D29]** | 🕓 Decision pending / 🚀 |

---

*Companion detail doc: `OSIP-Feedback-Implementation-Status.md` (per-item evidence, deploy-time/decision flags, and the full update log).*
