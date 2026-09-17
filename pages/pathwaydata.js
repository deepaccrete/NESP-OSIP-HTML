// Data for the regulatory pathway finder (REG-03). GENERATED, do not hand-edit.
//
// Every string below is lifted from the sector pages themselves:
//   models[].steps  <- that page's Workflow Process diagram
//   requirements[]  <- that page's Regulatory Requirements cards
//   agencies[]      <- that page's Key Regulatory Agencies cards
//
// So the finder can never tell an investor something the sector page does not
// already say. Regenerate with scratchpad/gen_pathway_data.py + emit_pathwaydata.js
// after editing a sector page, or the two will drift apart.
//
// A requirement's connection/size arrays list the values it applies to. An empty
// array means the page states it unconditionally, so it applies to every answer.
// The tags are derived from keywords in the card's own text and lean towards
// showing a requirement rather than hiding it: this is a "may apply" aid, and a
// false omission is worse than a false inclusion.
//
// reviewed: set this to a date string to show a "Last reviewed" stamp under the
// result. Left empty deliberately: an invented review date on a government
// platform is exactly the kind of unsourced claim the UX audit flags.

window.OSIP_PATHWAYS = 
{
  "reviewed": "",
  "sectors": [
    {
      "id": "solar",
      "label": "Solar",
      "page": "DetailedSector.html",
      "models": [
        {
          "id": "utility-scale-solar",
          "label": "Utility-Scale Solar",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition / Site Access",
              "labelMobile": "Land Acquisition / Site Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Environmental Screening & EIA (where applicable)",
              "labelMobile": "Environmental Screening and EIA (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NERC Licensing (where applicable)",
              "labelMobile": "NERC Licensing (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Grid Connection Studies & Approvals",
              "labelMobile": "Grid Connection Studies and Approvals",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Technical Compliance Certification",
              "labelMobile": "Technical Compliance Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Construction & Commissioning",
              "labelMobile": "Construction and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "solar-home-systems",
          "label": "Solar Home Systems",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation",
              "labelMobile": "Company Incorporation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Product Certification & Standards Compliance",
              "labelMobile": "Product Certification and Standards Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Importation / Distribution Approval Requirements",
              "labelMobile": "Importation / Distribution Approval Requirements",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 7h11v9H3z\" /> <path d=\"M14 10h4l3 3v3h-7z\" /> <circle cx=\"7\" cy=\"19\" r=\"1.6\" /> <circle cx=\"17.5\" cy=\"19\" r=\"1.6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Market Deployment",
              "labelMobile": "Market Deployment",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Grid-connected projects above 1 MW generally require a NERC Generation Licence and must comply with applicable grid connection requirements.",
          "connection": [
            "grid"
          ],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Mini-grid projects are regulated under the NERC Mini-Grid Regulations 2023 and applicable provisions of the Electricity Act 2023.",
          "connection": [
            "mini"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Large-scale projects may require Environmental Impact Assessment (EIA) approval from the Federal Ministry of Environment, depending on project size, location, and environmental sensitivity.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Land acquisition and site development are governed by the Land Use Act 1978 and applicable state-level land administration procedures.",
          "connection": [],
          "size": [],
          "state": true
        }
      ],
      "agencies": [
        {
          "href": "https://www.power.gov.ng",
          "name": "Federal Ministry of Power",
          "role": "Sets electricity sector policy, including the National Integrated Electricity Policy."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://www.tcn.org.ng",
          "name": "Transmission Company of Nigeria (TCN)",
          "role": "Operates the transmission grid and handles interconnection and grid-impact studies."
        }
      ]
    },
    {
      "id": "wind",
      "label": "Wind",
      "page": "Wind.html",
      "models": [
        {
          "id": "mini-grid-permit-pathway-100-kw-1-mw",
          "label": "Mini-Grid Permit Pathway (100 kW – 1 MW)",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "NIPC / OSIC Registration",
              "labelMobile": "NIPC / OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Site Identification & Land Access",
              "labelMobile": "Site Identification and Land Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NERC Mini-Grid Permit (~30 days)",
              "labelMobile": "NERC Mini-Grid Permit (~30 days)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "NEMSA Electrical Safety Certification",
              "labelMobile": "NEMSA Electrical Safety Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Connection & Commercial Operation",
              "labelMobile": "Connection and Commercial Operation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "grid-connected-generation-pathway-above-1-mw",
          "label": "Grid-Connected Generation Pathway (Above 1 MW)",
          "steps": [
            {
              "n": "01",
              "label": "CAC Incorporation & NIPC/OSIC Registration",
              "labelMobile": "CAC Incorporation & NIPC/OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "State Governor's Consent (Land Use Act)",
              "labelMobile": "State Governor's Consent (Land Use Act)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "EIA Process (6–18 months, above 10 MW)",
              "labelMobile": "EIA Process (6–18 months, above 10 MW)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NERC Generation Licence",
              "labelMobile": "NERC Generation Licence",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "TCN Grid Connection Agreement",
              "labelMobile": "TCN Grid Connection Agreement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "NEMSA Certification & SON/SONCAP Compliance",
              "labelMobile": "NEMSA Certification and SON/SONCAP Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Commercial Operation & Net Billing Registration",
              "labelMobile": "Commercial Operation and Net Billing Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Licensing under the Electricity Act 2023, as amended — regulated by NERC.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Off-grid and mini-grid projects governed by Mini-Grid Regulations 2023 and Eligible Customer Regulations 2024 — regulated by NERC.",
          "connection": [
            "grid",
            "mini",
            "offgrid"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Environmental compliance under the EIA Act and NESREA establishing Act — regulated by NESREA and Federal Ministry of Environment. EIA required above 10 MW or for significant environmental impact.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Grid interconnection governed by the NERC Grid Code and TCN Connection Agreement — regulated by TCN.",
          "connection": [
            "grid"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Investment incentives including Pioneer Status and OSIC registration — administered by NIPC.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Technical and safety standards (NIS/IEC standards, SONCAP, MANCAP) and electrical safety certification (ITISEMS) — administered by SON and NEMSA.",
          "connection": [],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://www.tcn.org.ng",
          "name": "Transmission Company of Nigeria (TCN)",
          "role": "Operates the transmission grid and handles interconnection and grid-impact studies."
        },
        {
          "href": "https://www.energy.gov.ng",
          "name": "Energy Commission of Nigeria",
          "role": "Coordinates national energy policy, planning and research."
        }
      ]
    },
    {
      "id": "storage",
      "label": "Storage",
      "page": "Storage.html",
      "models": [
        {
          "id": "utility-scale-battery-storage",
          "label": "Utility-Scale Battery Storage",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition / Site Access",
              "labelMobile": "Land Acquisition / Site Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Environmental Screening & EIA (where applicable)",
              "labelMobile": "Environmental Screening and EIA (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Grid Connection Assessment",
              "labelMobile": "Grid Connection Assessment",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Regulatory Approvals (where applicable)",
              "labelMobile": "Regulatory Approvals (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Technical Compliance Certification",
              "labelMobile": "Technical Compliance Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Construction & Installation",
              "labelMobile": "Construction and Installation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Testing & Commissioning",
              "labelMobile": "Testing and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"12\" r=\"9\" /> <path d=\"M8.5 12.5l2.5 2.5 4.5-5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "09",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            }
          ]
        },
        {
          "id": "commercial-industrial-storage",
          "label": "Commercial & Industrial Storage",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation",
              "labelMobile": "Company Incorporation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Project Design & System Sizing",
              "labelMobile": "Project Design and System Sizing",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21l3-1L17 9l-2-2L4 18l-1 3z\" /> <path d=\"M14 6l4 4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Equipment Procurement",
              "labelMobile": "Equipment Procurement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 7h11v9H3z\" /> <path d=\"M14 10h4l3 3v3h-7z\" /> <circle cx=\"7\" cy=\"19\" r=\"1.6\" /> <circle cx=\"17.5\" cy=\"19\" r=\"1.6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "SON Compliance Requirements",
              "labelMobile": "SON Compliance Requirements",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Installation",
              "labelMobile": "Installation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"12\" r=\"3\" /> <path d=\"M12 2v3M12 19v3M2 12h3M19 12h3\" /> <path d=\"M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "NEMSA Inspection & Certification (where applicable)",
              "labelMobile": "NEMSA Inspection and Certification (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "System Testing",
              "labelMobile": "System Testing",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"12\" r=\"9\" /> <path d=\"M8.5 12.5l2.5 2.5 4.5-5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Standalone battery storage projects currently operate primarily under existing electricity, renewable energy, environmental, and technical regulatory frameworks.",
          "connection": [
            "offgrid"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Grid-connected storage projects may require compliance with applicable NERC regulatory requirements, grid connection procedures, and technical standards depending on project configuration.",
          "connection": [
            "grid"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Mini-grid storage deployments are governed by the NERC Mini-Grid Regulations 2023 and relevant provisions of the Electricity Act 2023.",
          "connection": [
            "mini"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Large-scale storage projects may require Environmental Impact Assessment (EIA) approval from the Federal Ministry of Environment, depending on project size, location, and environmental sensitivity.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Land acquisition and site development are governed by the Land Use Act 1978 and applicable state-level land administration procedures.",
          "connection": [],
          "size": [],
          "state": true
        }
      ],
      "agencies": [
        {
          "href": "https://www.power.gov.ng",
          "name": "Federal Ministry of Power",
          "role": "Sets electricity sector policy, including the National Integrated Electricity Policy."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://www.tcn.org.ng",
          "name": "Transmission Company of Nigeria (TCN)",
          "role": "Operates the transmission grid and handles interconnection and grid-impact studies."
        }
      ]
    },
    {
      "id": "small-hydro",
      "label": "Small Hydro",
      "page": "SmallHydro.html",
      "models": [
        {
          "id": "grid-connected-small-hydro",
          "label": "Grid-Connected Small Hydro",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition & Site Access",
              "labelMobile": "Land Acquisition and Site Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Water-Use & Water-Abstraction Approvals (where applicable)",
              "labelMobile": "Water-Use and Water-Abstraction Approvals (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Environmental Screening & EIA Approval (where applicable)",
              "labelMobile": "Environmental Screening and EIA Approval (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "NERC Generation Licence Application",
              "labelMobile": "NERC Generation Licence Application",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Grid Impact Studies & TCN Interconnection Approval",
              "labelMobile": "Grid Impact Studies and TCN Interconnection Approval",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Technical Compliance & NEMSA Certification",
              "labelMobile": "Technical Compliance and NEMSA Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Power Purchase Agreement (PPA) or Offtake Arrangement",
              "labelMobile": "Power Purchase Agreement (PPA) or Offtake Arrangement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M8 10h8M8 14h4M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "09",
              "label": "Construction & Commissioning",
              "labelMobile": "Construction and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "10",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "off-grid-mini-grid-small-hydro",
          "label": "Off-Grid / Mini-Grid Small Hydro",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition & Site Access",
              "labelMobile": "Land Acquisition and Site Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Water-Use Approvals (where applicable)",
              "labelMobile": "Water-Use Approvals (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Environmental Screening or EIA (where applicable)",
              "labelMobile": "Environmental Screening or EIA (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Compliance with NERC Mini-Grid Regulations",
              "labelMobile": "Compliance with NERC Mini-Grid Regulations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "REA Engagement for Rural Electrification Support (where applicable)",
              "labelMobile": "REA Engagement for Rural Electrification Support (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"12\" r=\"3\" /> <path d=\"M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Technical Compliance & NEMSA Certification",
              "labelMobile": "Technical Compliance and NEMSA Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Construction & Commissioning",
              "labelMobile": "Construction and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "09",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Grid-connected projects above 1 MW generally require a NERC Generation Licence and must comply with applicable grid connection and interconnection requirements.",
          "connection": [
            "grid"
          ],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Mini-grid and isolated hydro projects are regulated under the NERC Mini-Grid Regulations and applicable provisions of the Electricity Act 2023.",
          "connection": [
            "mini"
          ],
          "size": [],
          "state": false
        },
        {
          "text": "Water abstraction and water-use permits or other approvals may be required depending on project size, location, and river-basin characteristics.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Environmental Impact Assessment (EIA) approval may be required for qualifying projects in accordance with Federal Ministry of Environment requirements.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Land acquisition, site access, and community engagement are governed by the Land Use Act 1978 and applicable state-level land administration procedures. Eligible projects may benefit from Pioneer Status Incentive (PSI), import-duty and VAT concessions on renewable energy equipment, accelerated capital allowances, Rural Investment Allowance, Investment Tax Credits, and the Economic Development Tax Incentive (EDTI).",
          "connection": [],
          "size": [],
          "state": true
        }
      ],
      "agencies": [
        {
          "href": "https://www.power.gov.ng",
          "name": "Federal Ministry of Power",
          "role": "Sets electricity sector policy, including the National Integrated Electricity Policy."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://www.waterresources.gov.ng",
          "name": "Federal Ministry of Water Resources",
          "role": "Oversees water resources and permits for river-based projects."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://www.tcn.org.ng",
          "name": "Transmission Company of Nigeria (TCN)",
          "role": "Operates the transmission grid and handles interconnection and grid-impact studies."
        }
      ]
    },
    {
      "id": "green-mobility",
      "label": "Green Mobility",
      "page": "GreenMobility.html",
      "models": [
        {
          "id": "green-mobility-project-development",
          "label": "Green Mobility Project Development",
          "steps": [
            {
              "n": "01",
              "label": "CAC Incorporation & NIPC/OSIC Registration",
              "labelMobile": "CAC Incorporation & NIPC/OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Consent / Certificate of Occupancy & Planning Approval",
              "labelMobile": "Land Consent / Certificate of Occupancy and Planning Approval",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "NERC Registration or Permit",
              "labelMobile": "NERC Registration or Permit",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NEMSA Electrical Safety Certification",
              "labelMobile": "NEMSA Electrical Safety Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "SONCAP (Imports) or MANCAP (Local Equipment)",
              "labelMobile": "SONCAP (Imports) or MANCAP (Local Equipment)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Environmental Screening or Full FMEnv EIA",
              "labelMobile": "Environmental Screening or Full FMEnv EIA",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Net Billing Registration (Solar / Hybrid Systems)",
              "labelMobile": "Net Billing Registration (Solar / Hybrid Systems)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Ongoing Monitoring: EV Bill Passage & SON Standards Gazettement",
              "labelMobile": "Ongoing Monitoring: EV Bill Passage and SON Standards Gazettement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "CAC incorporation typically completes within 1–7 days; foreign investors may retain 100% ownership.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "NIPC registration via the One-Stop Investment Centre (OSIC) is recommended for fiscal incentive access, including a 3–5-year Pioneer Status tax holiday.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "NESREA governs battery waste, e-waste, and emissions compliance for EV battery imports and end-of-life management.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "FMEnv EIA is mandatory for large-scale charging infrastructure with significant environmental impact; smaller installations are subject to lighter environmental screening.",
          "connection": [],
          "size": [
            "large",
            "small"
          ],
          "state": false
        },
        {
          "text": "Land access requires consents or certificates of occupancy from state governors, plus local government planning approval, with preference given to urban, highway, and transport hub locations.",
          "connection": [],
          "size": [],
          "state": true
        },
        {
          "text": "Solar-powered & off-grid charging stations are eligible for net billing under Section 80 of the Electricity Act 2023 and can access REA and REF support; co-location with existing mini-grid infrastructure is explicitly recognised as a viable, investable model.",
          "connection": [
            "grid",
            "mini",
            "offgrid"
          ],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://www.naddc.gov.ng",
          "name": "National Automotive Design & Development Council (NADDC)",
          "role": "Sets automotive standards and administers vehicle industry development policy."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://customs.gov.ng",
          "name": "Nigeria Customs Service",
          "role": "Clears imported goods and applies duty and tariff treatment."
        },
        {
          "href": "https://www.nesrea.gov.ng",
          "name": "National Environmental Standards & Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://frsc.gov.ng",
          "name": "Federal Road Safety Corps (FRSC) & Vehicle Inspection Officers (VIO)",
          "role": "Set and enforce road-vehicle safety and roadworthiness requirements."
        }
      ]
    },
    {
      "id": "energy-efficiency",
      "label": "Energy Efficiency",
      "page": "EnergyEfficiency.html",
      "models": [
        {
          "id": "industrial-energy-efficiency-project",
          "label": "Industrial Energy Efficiency Project",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Energy Audit & Opportunity Assessment",
              "labelMobile": "Energy Audit and Opportunity Assessment",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M9 11l3 3L22 4\" /> <path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Project Design & Technology Selection",
              "labelMobile": "Project Design and Technology Selection",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 20h9\" /> <path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Equipment Certification & Procurement",
              "labelMobile": "Equipment Certification and Procurement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Installation & Implementation",
              "labelMobile": "Installation and Implementation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Inspection & Compliance Verification",
              "labelMobile": "Inspection and Compliance Verification (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Monitoring & Performance Verification",
              "labelMobile": "Monitoring and Performance Verification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Commercial Operation",
              "labelMobile": "Commercial Operation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4\" /> <circle cx=\"12\" cy=\"12\" r=\"4\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "energy-efficient-appliance-market-entry",
          "label": "Energy-Efficient Appliance Market Entry",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation",
              "labelMobile": "Company Incorporation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Product Testing & Certification",
              "labelMobile": "Product Testing and Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "SON Compliance Requirements",
              "labelMobile": "SON Compliance Requirements",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Importation / Manufacturing Approval Requirements",
              "labelMobile": "Importation / Manufacturing Approval Requirements",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 7h11v9H3z\" /> <path d=\"M14 10h4l3 3v3h-7z\" /> <circle cx=\"7\" cy=\"19\" r=\"1.6\" /> <circle cx=\"17.5\" cy=\"19\" r=\"1.6\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Market Distribution",
              "labelMobile": "Market Distribution",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Ongoing Compliance Monitoring",
              "labelMobile": "Ongoing Compliance Monitoring",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Dedicated generation licences are generally not required for energy efficiency projects unless integrated with electricity generation or distribution infrastructure regulated by NERC.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Company incorporation through the Corporate Affairs Commission (CAC), with NIPC registration recommended for access to applicable investment incentives.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Large industrial and commercial projects may be subject to environmental compliance requirements administered by NESREA and the Federal Ministry of Environment, depending on project scope and environmental impact.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Imported appliances, equipment, and electrical systems must comply with applicable Standards Organisation of Nigeria (SON) requirements and certification procedures.",
          "connection": [],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://www.power.gov.ng",
          "name": "Federal Ministry of Power",
          "role": "Sets electricity sector policy, including the National Integrated Electricity Policy."
        },
        {
          "href": "https://www.energy.gov.ng",
          "name": "Energy Commission of Nigeria (ECN)",
          "role": "Coordinates national energy policy, planning and research."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        }
      ]
    },
    {
      "id": "clean-cooking",
      "label": "Clean Cooking",
      "page": "CleanCooking.html",
      "models": [
        {
          "id": "small-scale-non-electric-pathway",
          "label": "Small-Scale Non-Electric Pathway",
          "steps": [
            {
              "n": "01",
              "label": "CAC Incorporation & NIPC/OSIC Registration",
              "labelMobile": "CAC Incorporation & NIPC/OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Local Government Approval",
              "labelMobile": "Local Government Approval",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Environmental Screening",
              "labelMobile": "Environmental Screening",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "SON Standards Compliance",
              "labelMobile": "SON Standards Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "larger-scale-or-electric-integrated-pathway",
          "label": "Larger-Scale or Electric-Integrated Pathway",
          "steps": [
            {
              "n": "01",
              "label": "CAC Incorporation & NIPC/OSIC Registration",
              "labelMobile": "CAC Incorporation & NIPC/OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition (Governor's Consent / Certificate of Occupancy)",
              "labelMobile": "Land Acquisition (Governor's Consent / Certificate of Occupancy)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Full EIA via Federal Ministry of Environment",
              "labelMobile": "Full EIA via Federal Ministry of Environment",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NERC Licence Application",
              "labelMobile": "NERC Licence Application",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "NEMSA Electrical Safety Certification",
              "labelMobile": "NEMSA Electrical Safety Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "SONCAP / MANCAP Equipment Compliance",
              "labelMobile": "SONCAP / MANCAP Equipment Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "REA / REF Engagement",
              "labelMobile": "REA / REF Engagement",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 12h3m12 0h3M12 3v3m0 12v3\" /> <circle cx=\"12\" cy=\"12\" r=\"4\" /> <path d=\"M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1\" /> </svg>",
              "dir": "up"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "CAC incorporation typically completes within 1–7 days; foreign investors may retain 100% ownership.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "NIPC registration via the One-Stop Investment Centre (OSIC) recommended for fiscal incentive access, including a 3–5-year Pioneer Status tax holiday for qualifying RE-linked operations.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Standard CIT of 30% applies; VAT and import duty exemptions possible for eCooking appliances with RE integration. Standard duties apply to non-electric equipment. Payments via Remita/TSA.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "NESREA governs pollution, emissions, and e-waste compliance for LPG and eCooking operations, including import clearance (NEIMS/NICS). Full EIA mandatory only for large-scale projects.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://www.nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://www.nrs.gov.ng",
          "name": "Nigeria Revenue Service (NRS)",
          "role": "Administers federal tax assessment and collection."
        }
      ]
    },
    {
      "id": "bioenergy",
      "label": "Bioenergy",
      "page": "Bioenergy.html",
      "models": [
        {
          "id": "electricity-generation-pathway",
          "label": "Electricity Generation Pathway",
          "steps": [
            {
              "n": "01",
              "label": "CAC Incorporation & NIPC/OSIC Registration",
              "labelMobile": "CAC Incorporation and NIPC/OSIC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land & Governor's Consent (Land Use Act 1978)",
              "labelMobile": "Land and Governor's Consent (Land Use Act 1978)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "FMEnv EIA Process (where mandatory)",
              "labelMobile": "FMEnv EIA Process (where mandatory)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "NERC Licensing (Generation / Captive / Mini-Grid)",
              "labelMobile": "NERC Licensing (Generation / Captive / Mini-Grid)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "TCN Grid Connection Agreement (grid-connected projects)",
              "labelMobile": "TCN Grid Connection Agreement (grid-connected projects)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "NEMSA Certification & SON/SONCAP Compliance",
              "labelMobile": "NEMSA Certification and SON/SONCAP Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Construction & Commissioning",
              "labelMobile": "Construction and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Commercial Operations & Net Billing (Section 80)",
              "labelMobile": "Commercial Operations and Net Billing (Section 80)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "CAC incorporation typically completes within 1–7 days; foreign investors may retain 100% ownership. NIPC registration via OSIC is recommended for fiscal incentive access, including a 3–5-year Pioneer Status tax holiday.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "FMEnv EIA is mandatory for all bioenergy projects with environmental impact above 10 MW. The 2026 process follows eight steps: registration; Terms of Reference; site verification; laboratory analysis; draft submission; 21-working-day public display; technical review; and certification.",
          "connection": [],
          "size": [
            "large"
          ],
          "state": false
        },
        {
          "text": "Land acquisition for large-scale projects requires the state Governor's Consent under the Land Use Act 1978. Net billing for excess generation is available under Section 80 of the Electricity Act 2023.",
          "connection": [
            "grid"
          ],
          "size": [
            "large"
          ],
          "state": true
        },
        {
          "text": "Fiscal incentives include 0% import duty on biomass harvesting and bioenergy conversion equipment via Nigeria Customs Service; IDEC Scheme via Federal Ministry of Finance; VAT exemptions via NRS; EDTI via NIPC (5% annual tax credit on qualifying capex for 5 years); and full exemptions for NEPZA or OGFZA Free Trade Zone projects.",
          "connection": [],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://www.nuprc.gov.ng",
          "name": "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)",
          "role": "Regulates upstream petroleum operations and licensing."
        },
        {
          "href": "#",
          "name": "Bio-Fuels Energy Commission (BFEC)",
          "role": "Coordinates national biofuels policy and development."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards & Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment (FMEnv)",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "#",
          "name": "Raw Materials Research & Development Council (RMRDC)",
          "role": "Supports raw-materials research, sourcing and local content development."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://www.nepza.gov.ng",
          "name": "Nigeria Export Processing Zones Authority (NEPZA)",
          "role": "Licenses and administers free zones."
        },
        {
          "href": "#",
          "name": "Oil & Gas Free Zones Authority",
          "role": "Licenses and administers oil and gas free zones."
        },
        {
          "href": "#",
          "name": "Federal Ministry of Industry, Trade & Investment",
          "role": "Oversees industrial, trade and investment policy."
        }
      ]
    },
    {
      "id": "agriculture-pue",
      "label": "Agriculture PUE",
      "page": "AgriculturePUE.html",
      "models": [
        {
          "id": "non-electric-pathway",
          "label": "Non-Electric Pathway",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation & NIPC Registration",
              "labelMobile": "Company Incorporation & NIPC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Consent / Certificate of Occupancy",
              "labelMobile": "Land Consent / Certificate of Occupancy",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "SONCAP / MANCAP Equipment Compliance",
              "labelMobile": "SONCAP / MANCAP Equipment Compliance",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Environmental Screening (where relevant)",
              "labelMobile": "Environmental Screening (where relevant)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "down"
            }
          ]
        },
        {
          "id": "mini-grid-off-grid-electricity-pathway",
          "label": "Mini-Grid / Off-Grid Electricity Pathway",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation & NIPC Registration",
              "labelMobile": "Company Incorporation & NIPC Registration",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Consent under Land Use Act",
              "labelMobile": "Land Consent under Land Use Act",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "NERC Mini-Grid Licensing (simplified <100 kW; or single licence up to 5 MW; ~1–2 months)",
              "labelMobile": "NERC Mini-Grid Licensing (simplified <100 kW; or single licence up to 5 MW; ~1–2 months)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "FMEnv EIA (where mandatory)",
              "labelMobile": "FMEnv EIA (where mandatory)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "NEMSA Electrical Safety Certification",
              "labelMobile": "NEMSA Electrical Safety Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M13 2 4 14h6l-1 8 9-12h-6l1-8z\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "REA/REF Subsidy Application",
              "labelMobile": "REA/REF Subsidy Application",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Public Programme Engagement (NEP/DARES/Solar Naija)",
              "labelMobile": "Public Programme Engagement (NEP/DARES/Solar Naija)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "CAC incorporation 1–7 days; 100% foreign ownership.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "NIPC registration via OSIC for Pioneer Status (3–5 year CIT holiday).",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "FMEnv EIA mandatory only for large-scale projects; smaller PUE deployments carry minimal compliance footprint.",
          "connection": [],
          "size": [
            "large",
            "small"
          ],
          "state": false
        },
        {
          "text": "NESREA governs pollution, waste control, and import clearance.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Land acquisition under Land Use Act; state governors grant certificates of occupancy; growing encouragement to co-locate renewables on agricultural or degraded lands.",
          "connection": [],
          "size": [],
          "state": true
        },
        {
          "text": "Environmental safeguards jointly administered through REA and state environmental bodies.",
          "connection": [],
          "size": [],
          "state": true
        },
        {
          "text": "30% CIT; solar irrigation and agro-processing equipment benefit from 0% import duty & VAT zero-rating under ECOWAS CET and 2026 NTA.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Agriculture PUE assets (irrigation, cold storage, agro-processing) qualify for REF subsidies under REA.",
          "connection": [],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://www.rea.gov.ng",
          "name": "Rural Electrification Agency (REA)",
          "role": "Runs off-grid, mini-grid and rural electrification programmes."
        },
        {
          "href": "https://www.nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://www.nemsa.gov.ng",
          "name": "Nigerian Electricity Management Services Agency (NEMSA)",
          "role": "Inspects and certifies electrical installations and equipment for safety."
        },
        {
          "href": "https://www.son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        },
        {
          "href": "https://www.nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://www.environment.gov.ng",
          "name": "Federal Ministry of Environment (FMEnv)",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "#",
          "name": "State Ministries of Environment",
          "role": "Handle state-level environmental approvals and monitoring."
        }
      ]
    },
    {
      "id": "green-hydrogen",
      "label": "Green Hydrogen",
      "page": "GreenHydrogen.html",
      "models": [
        {
          "id": "green-hydrogen-production-facility",
          "label": "Green Hydrogen Production Facility",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation (CAC)",
              "labelMobile": "Company Incorporation (CAC)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> <path d=\"M9 9h.01M13 9h.01M9 13h.01M13 13h.01\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition / Site Access",
              "labelMobile": "Land Acquisition / Site Access",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Environmental Screening & EIA Approval",
              "labelMobile": "Environmental Screening and EIA Approval",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Water Abstraction Permit",
              "labelMobile": "Water Abstraction Permit",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 2C6 10 4 14 4 17a8 8 0 0 0 16 0c0-3-2-7-8-15z\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "Technical Alignment with National Hydrogen Framework",
              "labelMobile": "Technical Alignment with National Hydrogen Framework",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Investment Incentive Applications (where applicable)",
              "labelMobile": "Investment Incentive Applications (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4\" /> <circle cx=\"12\" cy=\"12\" r=\"4\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Construction & Infrastructure Development",
              "labelMobile": "Construction and Infrastructure Development",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Testing & Commissioning",
              "labelMobile": "Testing and Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "09",
              "label": "Commercial Operations",
              "labelMobile": "Commercial Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "up"
            }
          ]
        },
        {
          "id": "export-oriented-green-hydrogen-project",
          "label": "Export-Oriented Green Hydrogen Project",
          "steps": [
            {
              "n": "01",
              "label": "Company Incorporation",
              "labelMobile": "Company Incorporation",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 21V6l7-3 7 3v15\" /> <path d=\"M9 21v-6h4v6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "02",
              "label": "Land Acquisition / Free Trade Zone Approval (where applicable)",
              "labelMobile": "Land Acquisition / Free Trade Zone Approval (where applicable)",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 21s7-6.2 7-11.3A7 7 0 0 0 5 9.7C5 14.8 12 21 12 21z\" /> <circle cx=\"12\" cy=\"9.5\" r=\"2.3\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "03",
              "label": "Environmental & Water Approvals",
              "labelMobile": "Environmental and Water Approvals",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M11 20A7 7 0 0 1 4 13c0-4 3-9 8-11 1 5 5 6 5 11a7 7 0 0 1-6 7z\" /> <path d=\"M11 20v-6\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "04",
              "label": "Hydrogen Production Facility Development",
              "labelMobile": "Hydrogen Production Facility Development",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "05",
              "label": "NEPC Export Licence or NEPZA Approval",
              "labelMobile": "NEPC Export Licence or NEPZA Approval",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z\" /> <path d=\"M9 12l2 2 4-4\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "06",
              "label": "Technical Compliance Certification",
              "labelMobile": "Technical Compliance Certification",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <circle cx=\"12\" cy=\"9\" r=\"5\" /> <path d=\"M9 13.5 7 22l5-3 5 3-2-8.5\" /> </svg>",
              "dir": "down"
            },
            {
              "n": "07",
              "label": "Commissioning",
              "labelMobile": "Commissioning",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M3 21h18\" /> <path d=\"M5 21V9l7-5 7 5v12\" /> <path d=\"M9 21v-5h6v5\" /> </svg>",
              "dir": "up"
            },
            {
              "n": "08",
              "label": "Export Operations",
              "labelMobile": "Export Operations",
              "svg": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M4 20V10M11 20V4M18 20v-7\" /> </svg>",
              "dir": "down"
            }
          ]
        }
      ],
      "requirements": [
        {
          "text": "Environmental Impact Assessment (EIA) approval is required through the Federal Ministry of Environment and applicable environmental compliance processes administered by NESREA.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Electrolysis-based projects require water abstraction permits from relevant federal or state water authorities.",
          "connection": [],
          "size": [],
          "state": true
        },
        {
          "text": "Export-oriented projects may require export licences through NEPC, or Free Trade Zone approvals through NEPZA where projects are located within designated zones.",
          "connection": [],
          "size": [],
          "state": false
        },
        {
          "text": "Eligible investors may apply for investment incentives and tax relief through the Nigerian Investment Promotion Commission (NIPC), including the Economic Development Tax Incentive (EDTI).",
          "connection": [],
          "size": [],
          "state": false
        }
      ],
      "agencies": [
        {
          "href": "https://www.power.gov.ng",
          "name": "Federal Ministry of Power",
          "role": "Sets electricity sector policy, including the National Integrated Electricity Policy."
        },
        {
          "href": "https://www.energy.gov.ng",
          "name": "Energy Commission of Nigeria (ECN)",
          "role": "Coordinates national energy policy, planning and research."
        },
        {
          "href": "https://environment.gov.ng",
          "name": "Federal Ministry of Environment",
          "role": "Sets environmental policy and approves Environmental Impact Assessments."
        },
        {
          "href": "https://nerc.gov.ng",
          "name": "Nigerian Electricity Regulatory Commission (NERC)",
          "role": "Licenses generation, distribution, embedded generation and mini-grids, and sets tariffs."
        },
        {
          "href": "https://nmdpra.gov.ng",
          "name": "Nigerian Midstream & Downstream Petroleum Regulatory Authority (NMDPRA)",
          "role": "Regulates midstream and downstream petroleum operations."
        },
        {
          "href": "https://nipc.gov.ng",
          "name": "Nigerian Investment Promotion Commission (NIPC)",
          "role": "Registers investors and administers incentives such as Pioneer Status."
        },
        {
          "href": "https://www.nepc.gov.ng",
          "name": "Nigeria Export Promotion Council (NEPC)",
          "role": "Supports exporters and administers export promotion schemes."
        },
        {
          "href": "https://www.nepza.gov.ng",
          "name": "Nigeria Export Processing Zones Authority (NEPZA)",
          "role": "Licenses and administers free zones."
        },
        {
          "href": "https://nesrea.gov.ng",
          "name": "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
          "role": "Enforces environmental standards and monitors compliance."
        },
        {
          "href": "https://son.gov.ng",
          "name": "Standards Organisation of Nigeria (SON)",
          "role": "Sets product standards, with SONCAP for imports and MANCAP for local manufacture."
        }
      ]
    }
  ]
}
;
