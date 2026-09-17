/* =============================================================================
   newsdata.js - the published news items, one record per story

   Read by newsdetail.js to fill NewsInDetail.html for the story named in the
   address (NewsInDetail.html?id=nyerere-hydropower). The ids, headlines, dates,
   categories and states match the cards on News.html - change a story in both
   together.

   The category list is the investor-relevant taxonomy asked for in UX-SUP-03
   (Tenders & bids, Investment opportunities, Regulatory updates, Policy &
   reform, Projects & infrastructure, Events). The filter panel on News.html
   lists exactly these, and the filters read the values below.

   Prototype content: the article text, sources and figures below are
   illustrative placeholders until each story's approved copy is supplied.
   Dates are set against 16 Sep 2026, the prototype's "today".

   Fields
     id            the ?id= value and the card link
     title         the headline, as on the card
     date          machine date for <time datetime>
     display       the date as written on the page
     kicker        the label above the headline on the article page
     categories    one or more values from the taxonomy above (the card filter)
     state         the state tag on the card (the States filter)
     timeline      Last 30 Days | Past Quarter | This Year | Archived
     image, alt    the card and article photograph, and its alt text
     caption       the line printed under the article photograph
     location      the place line in the article byline
     source        [label, url] for the "Source:" link
     body          article paragraphs (plain text)
     quote         optional [text, attribution] pulled out mid-article
   ============================================================================= */
window.OSIP_NEWS_DEFAULT = 'nyerere-hydropower';

window.OSIP_NEWS = [
    {
        id: 'nyerere-hydropower',
        title: 'Govt upbeat on Nyerere Hydropower Project completion',
        date: '2026-09-08', display: '08 Sep 2026',
        kicker: 'Project Update',
        categories: ['Projects & infrastructure'],
        state: 'Niger', timeline: 'Last 30 Days',
        image: 'news-hydro.jpg',
        alt: 'Aerial view of a hydropower dam and its reservoir, with the spillway and powerhouse in the foreground',
        caption: 'Large hydropower remains the biggest single block of firm capacity in the national generation mix.',
        location: 'Niger State',
        source: ['power.gov.ng', '#'],
        body: [
            'Officials have given a positive account of progress on the Nyerere Hydropower Project, telling contractors and lenders that the remaining civil works are on course and that commissioning preparations have started.',
            'The project is tracked by the Federal Ministry of Power as part of the firm-capacity programme that sits alongside the solar, wind and mini-grid pipeline published on the One-Stop Investment Platform (OSIP). Officials say the schedule now turns on grid connection works and the testing programme rather than on construction.',
            'For investors the significance is less the dam itself than what it says about delivery: a project that reaches the testing stage gives lenders a reference point for construction risk on the rest of the hydro pipeline.',
            'Further updates, including the commissioning date and the final capacity figure, will be published here and on the project record in the opportunities list as they are confirmed.'
        ],
        quote: ['Reaching the testing stage on a project of this size changes the conversation with lenders on every other hydro scheme in the pipeline.', 'a Federal Ministry of Power official']
    },
    {
        id: 'lagos-offshore-wind',
        title: 'Offshore Wind Potential in Lagos Coastline Explored by Global Investors',
        date: '2026-09-01', display: '01 Sep 2026',
        kicker: 'Investment Opportunity',
        categories: ['Investment opportunities'],
        state: 'Lagos', timeline: 'Last 30 Days',
        image: 'news-wind.jpg',
        alt: 'Offshore wind turbines standing in open water at sunset, seen from the coast',
        caption: 'Early wind measurement along the Lagos coastline is being used to size a first offshore study area.',
        location: 'Lagos State',
        source: ['power.gov.ng', '#'],
        body: [
            'International developers have begun early studies of the wind resource along the Lagos coastline, the first structured look at offshore generation for the Nigerian market.',
            'The work at this stage is measurement and screening: wind speeds, water depths, seabed conditions and the distance to a connection point that can take the output. None of it commits the country to a project, and no acreage has been offered.',
            'State and federal agencies are being consulted on how an offshore regime would work in practice, including who awards seabed rights, how a grid connection would be secured, and how an offshore project would be licensed by the Nigerian Electricity Regulatory Commission.',
            'Investors following this area should read it as a pipeline signal rather than an open opportunity. Any study area, tender or licensing round that follows will be published on OSIP with its own project record.'
        ]
    },
    {
        id: 'akk-gas-pipeline',
        title: 'Major Update on AKK Gas Pipeline: Project Reaches 85% Completion Milestone',
        date: '2026-08-12', display: '12 Aug 2026',
        kicker: 'Project Update',
        categories: ['Projects & infrastructure'],
        state: 'Kaduna', timeline: 'Past Quarter',
        image: 'news-pipeline.jpg',
        alt: 'Large-diameter gas pipeline sections being laid in a prepared trench across open ground',
        caption: 'The Ajaokuta-Kaduna-Kano line is intended to carry gas to power and industrial users in the north.',
        location: 'Kaduna State',
        source: ['power.gov.ng', '#'],
        body: [
            'The Ajaokuta-Kaduna-Kano (AKK) gas pipeline has passed the 85% completion mark, with the remaining work concentrated on river crossings, station construction and the tie-ins that bring the line into service.',
            'The pipeline is designed to move gas north to power plants and industrial users, and its completion date matters to several generation projects whose fuel supply depends on it.',
            'Developers with gas-fired projects in the northern corridor have been asked to align their own connection and commissioning plans with the pipeline programme, so that plant readiness and fuel availability arrive together.',
            'The remaining schedule, and the list of offtake points, will be reflected in the affected project records on OSIP as they are confirmed.'
        ]
    },
    {
        id: 'electricity-act-investors',
        title: 'New Electricity Act Signed into Law: What it Means for Private Investors',
        date: '2026-07-23', display: '23 Jul 2026',
        kicker: 'Regulatory Update',
        categories: ['Regulatory updates', 'Policy & reform'],
        state: 'Abuja (FCT)', timeline: 'Past Quarter',
        image: 'news-act.jpg',
        alt: 'Government officials and business representatives seated around a conference table at a signing ceremony',
        caption: 'The Act sets out how the federal and state electricity markets sit alongside each other.',
        location: 'Abuja (FCT)',
        source: ['power.gov.ng', '#'],
        body: [
            'The Electricity Act has been signed into law, setting out how the federal electricity market and state electricity markets operate alongside each other, and what each tier of government is responsible for.',
            'For private investors the practical questions are licensing and jurisdiction: which regulator licenses a project, what happens to an existing federal licence when a state establishes its own market, and how transition arrangements apply to projects already under development.',
            'The Act also confirms that generation, distribution and supply within a single state can be regulated by that state once its own framework is in place, which changes who a developer deals with depending on where the project sits.',
            'The regulatory pathways affected by the Act are set out on the Regulations pages, and the licensing route for each listed project is stated on its own project record.'
        ],
        quote: ['The Act does not remove a step for investors so much as make it clear which door to knock on, and when.', 'a regulatory adviser working on the transition']
    },
    {
        id: 'renewable-investment-pipeline',
        title: 'Nigeria Expands Renewable Energy Investment Pipeline',
        date: '2026-07-14', display: '14 Jul 2026',
        kicker: 'Policy Update',
        categories: ['Policy & reform', 'Investment opportunities'],
        state: 'Abuja (FCT)', timeline: 'Past Quarter',
        image: 'news-renewable-pipeline.jpg',
        alt: 'A wind turbine at dusk on the coast, one of the technologies in the renewable generation pipeline',
        caption: "Wind sits in the same pipeline as solar, storage, small hydro and green hydrogen.",
        location: 'Federal Republic of Nigeria',
        source: ['power.gov.ng', '#'],
        body: [
            'The Federal Government has announced new initiatives aimed at accelerating private-sector investment across renewable energy technologies, including solar, storage, small hydro, and green hydrogen.',
            "The measures, coordinated through the Federal Ministry of Power and the Rural Electrification Agency (REA), are designed to broaden the pipeline of projects available to local and international investors. They align with Nigeria's Energy Transition Plan (ETP) 2022 and the country's target of 30 GW of installed capacity by 2030, with renewables accounting for a growing share of the mix.",
            'Under the framework, developers will be able to participate across utility-scale generation, interconnected and isolated mini-grids, commercial and industrial solar, and emerging green hydrogen ventures. Incentives such as Pioneer Status tax holidays, 100% foreign ownership under the NIPC Act, and streamlined NERC licensing are being highlighted to de-risk early-stage capital.',
            'A major anchor for the pipeline is the Distributed Access through Renewable Energy Scale-up (DARES) programme, backed by a US$750 million World Bank facility and implemented by the REA. The programme targets roughly 1,225 mini-grids, 465 MW of new generation capacity, and electricity access for 17.5 million beneficiaries across underserved communities.',
            'Officials say the initiatives will be supported by transparent, sector-specific data published through the One-Stop Investment Platform (OSIP), giving investors a clearer view of electrification gaps, demand centres, and priority locations as Nigeria scales up its renewable energy ambitions.'
        ],
        quote: ["These reforms are designed to give both local and international financiers the confidence to commit long-term capital to Nigeria's clean energy transition.", 'the Minister of Power']
    },
    {
        id: 'niger-delta-green-hydrogen',
        title: 'Niger Delta Pilot: Green Hydrogen Production Site Groundbreaking Ceremony',
        date: '2026-06-18', display: '18 Jun 2026',
        kicker: 'Project Update',
        categories: ['Projects & infrastructure', 'Investment opportunities'],
        state: 'Rivers', timeline: 'This Year',
        image: 'news-hydrogen.jpg',
        alt: 'Industrial hydrogen plant with storage spheres and process pipework',
        caption: 'The pilot is small by design: it is meant to prove the process, the offtake and the permitting route.',
        location: 'Rivers State',
        source: ['power.gov.ng', '#'],
        body: [
            'Work has begun on a pilot green hydrogen production site in the Niger Delta, the first of its kind to reach construction in the country.',
            'The pilot pairs renewable generation with electrolysis at a deliberately small scale. Its purpose is to settle the practical questions a larger scheme would face: water treatment, power quality, storage, handling, and the permits each of those requires.',
            'Industrial offtake is the open question. The site is close to existing industry, and discussions are under way on whether early volumes are taken by a single industrial user or shared across several.',
            'Results from the pilot are expected to inform the sector guidance published on OSIP, and any follow-on project will be listed with its own record.'
        ]
    },
    {
        id: 'fdi-energy-increase',
        title: 'Nigeria Energy Sector Reports 15% Increase in Foreign Direct Investment',
        date: '2026-05-14', display: '14 May 2026',
        kicker: 'Policy Update',
        categories: ['Policy & reform'],
        state: 'Lagos', timeline: 'This Year',
        image: 'news-fdi.jpg',
        alt: 'Analyst reviewing an energy investment chart on a tablet in an office',
        caption: 'Reported inflows are one indicator among several; the figure below is a prototype placeholder.',
        location: 'Lagos State',
        source: ['power.gov.ng', '#'],
        body: [
            'Foreign direct investment into the Nigerian energy sector is reported to have risen by 15% over the period, with the increase concentrated in generation and distributed energy rather than in networks.',
            'Officials attribute part of the movement to clearer licensing routes and to the publication of project-level information, which shortens the time an investor spends working out what a project actually is before deciding whether to look at it.',
            'The figure should be read with care. It covers committed capital rather than disbursed capital, and a small number of large transactions can move it either way from one period to the next.',
            'The underlying series, its source and its "as at" date are published on the Data & Insights pages, so the number can be checked rather than taken on trust.'
        ]
    }
];
