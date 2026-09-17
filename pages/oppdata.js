/* =============================================================================
   oppdata.js - the listed investment opportunities, one record per project

   Read by oppdetail.js to fill detailedOppNew.html for the project named in the
   address (detailedOppNew.html?id=2025-HYD-01). The IDs, titles, amounts, states,
   published dates and readiness labels match the cards on Opportunities.html,
   homepage.html and the OPPORTUNITIES list in InvestorMatch.html - change a
   project in all of them together.

   Prototype content: figures, dates, contacts and documents below are
   illustrative placeholders until each project's approved data is supplied.

   Fields
     id, title          as on the card
     file               prefix for document download names
     stage              where the project itself has got to: 1 Under
                        Conceptualisation, 2 Under Development, 3 Under
                        Implementation, 4 Completed. Prototype lifecycle.
     track              which of the two axes this project's detail page and card
                        show. 'readiness' draws the client's six readiness tags;
                        anything else, or the field left out, draws the four
                        stages above. Both are on show while the design is being
                        reviewed - see the note at the top of oppdetail.js.
     updated            "Last Updated on" date
     sector, state, start, end, promoter, status, ministry
                        the Project Details grid, in its order
     cost               "Total Project Cost"
     overview           Project Overview paragraphs (HTML); the first opens
                        with the project title automatically (lead: false to skip)
     highlights         four tiles: [icon, value, label]
     gated              members-only figures: [target IRR, payback, min. ticket, lock-up]
     brief              Extended Project Brief (HTML)
     images             four gallery images: [caption, picsum seed]
     video              walkthrough: [caption, thumbnail seed]
     docs               four documents: [title, size in MB, pages]
     contact            [name, designation, phone, email]
   ============================================================================= */
window.OSIP_OPPORTUNITY_DEFAULT = '2025-WND-02';

window.OSIP_OPPORTUNITIES = [
    {
        id: '2024-SOL-11',
        title: 'Solar Power Naija - Phase II',
        file: 'Solar-Power-Naija',
        stage: 2,
        updated: '18-Feb-2026',
        sector: 'Solar', state: 'Multi-State', start: '01-Jul-2026', end: '31-Dec-2029',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 420 m',
        overview: [
            'is the second tranche of a national programme to deploy solar hybrid mini-grids and stand-alone systems for unserved and underserved communities. Phase II extends the model proven in Phase I to new clusters across several states, pairing solar generation with battery storage and metered distribution.',
            'The programme is being prepared under the Federal Ministry of Power, with site selection, demand surveys and standardised procurement packages under way. It opens positions for developers, equipment suppliers, operators and long-term capital, with each site licensed or registered with NERC according to its size.'
        ],
        highlights: [['solar_power', '100 MW', 'Planned capacity'], ['cottage', '350 sites', 'Mini-grid sites'], ['map', '12 States', 'Programme footprint'], ['payments', '$420 m', 'Total investment']],
        gated: ['15.8%', '7.0 yrs', 'USD 2M', '7 yrs'],
        brief: 'Solar Power Naija Phase II packages mini-grid and stand-alone sites into standardised clusters, so developers can bid for portfolios rather than single sites. Indicative capital outlay is USD&nbsp;420&nbsp;m across the programme. Cluster boundaries, subsidy terms and offtake arrangements are being finalised, and will be published here once the responsible agency confirms them.',
        images: [['Mini-grid solar array', 'osip-sol-array'], ['Battery storage container', 'osip-sol-battery'], ['Community connection', 'osip-sol-community'], ['Site survey team', 'osip-sol-survey']],
        video: ['Solar Power Naija: Programme Overview', 'osip-sol-walkthrough'],
        docs: [['Investment Memorandum', '3.1', 56], ['Programme Design Report', '4.6', 94], ['Environmental and Social Framework', '1.9', 40], ['Indicative Term Sheet', '0.7', 9]],
        contact: ['Ngozi Eze', 'Programme Manager', '+234 802 345 6789', 'promoter@solarpowernaija.ng']
    },
    {
        id: '2025-WND-02',
        title: 'Katsina Wind Farm Phase I',
        file: 'Katsina-Wind',
        stage: 3,
        updated: '05-May-2026',
        sector: 'Wind', state: 'Katsina', start: '01-Sep-2026', end: '30-Jun-2029',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 210 m',
        overview: [
            'is a planned 60&nbsp;MW onshore wind project in Nigeria\'s northern wind corridor, where measured wind speeds are among the highest recorded in the country. Phase I covers the first turbine array and its connection into the regional distribution network, with land, resource assessment and grid studies completed ahead of procurement.',
            'Structured as a public-private partnership under the Federal Ministry of Power, the project opens positions across turbine supply, balance-of-plant construction, operations and maintenance, and long-term equity. It falls in the above-1&nbsp;MW grid-connected tier, so it requires a full NERC Generation Licence, compliance with the NERC Grid Code, and a TCN Grid Connection Agreement.'
        ],
        highlights: [['wind_power', '60 MW', 'Installed capacity'], ['air', '7.6 m/s', 'Mean wind speed'], ['map', '1 State', 'Katsina'], ['payments', '$210 m', 'Total investment']],
        gated: ['17.4%', '6.2 yrs', 'USD 5M', '5 yrs'],
        brief: 'Katsina Wind Farm Phase I is a 60&nbsp;MW onshore array in the northern wind corridor, sited on land already secured by the state and supported by a completed twelve-month wind resource campaign. Indicative capital outlay is USD&nbsp;210&nbsp;m under a public-private structure. Commercial terms, offtake and return profile are being finalised through the procurement now in preparation, and will be published here once the responsible agency confirms them.',
        images: [['Turbine array site', 'osip-ktw-array'], ['Wind measurement mast', 'osip-ktw-mast'], ['Grid substation', 'osip-ktw-substation'], ['Site access road', 'osip-ktw-road']],
        video: ['Katsina Wind Farm: Site Walkthrough', 'akk-walkthrough'],
        docs: [['Investment Memorandum', '2.4', 48], ['Technical Feasibility Report', '5.8', 112], ['Environmental Impact Summary', '1.7', 32], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Adebayo Okonkwo', 'Director of Operations', '+234 801 234 5678', 'promoter@katsinawindfarm.ng']
    },
    {
        id: '2024-STG-07',
        track: 'readiness',   // shown on the readiness axis; Seeking investor interest
        title: 'Nasarawa Lithium Processing Hub',
        file: 'Nasarawa-Lithium-Hub',
        stage: 2,
        updated: '14-Jan-2026',
        sector: 'Storage', state: 'Nasarawa', start: '01-Mar-2027', end: '30-Jun-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Solid Minerals Development',
        cost: 'USD 350 m',
        overview: [
            'is a proposed facility to process lithium-bearing ore from Nasarawa\'s mining belt into battery-grade intermediate products, sited close to the deposits and served by existing road links to Abuja.',
            'The state is seeking investor interest ahead of detailed feasibility, with offtake linked to battery storage manufacturing and export. The hub opens positions for process technology partners, EPC contractors and equity investors, and would operate under the mining and environmental permits that apply to mineral processing.'
        ],
        highlights: [['precision_manufacturing', '50,000 t', 'Annual ore throughput'], ['science', '99.5%', 'Target product purity'], ['map', '1 State', 'Nasarawa'], ['payments', '$350 m', 'Total investment']],
        gated: ['19.2%', '6.8 yrs', 'USD 10M', '6 yrs'],
        brief: 'The Nasarawa hub is sized to process ore from licensed operators within the state\'s lithium belt, in a phased build that starts with concentrate and moves on to battery-grade products. Indicative capital outlay is USD&nbsp;350&nbsp;m. Feasibility, process route and offtake terms will be confirmed with the investors who come forward, and published here once the responsible agency confirms them.',
        images: [['Ore stockpile', 'osip-nsl-ore'], ['Processing plant concept', 'osip-nsl-plant'], ['Laboratory testing', 'osip-nsl-lab'], ['Haul road', 'osip-nsl-road']],
        video: ['Nasarawa Lithium Hub: Site Overview', 'osip-nsl-walkthrough'],
        docs: [['Investment Memorandum', '2.8', 52], ['Pre-Feasibility Study', '6.2', 128], ['Environmental Screening Report', '2.1', 36], ['Expression of Interest Brief', '0.5', 6]],
        contact: ['Musa Abdullahi', 'Head of Investment Promotion', '+234 803 456 7890', 'invest@nasarawalithiumhub.ng']
    },
    {
        id: '2025-HYD-01',
        title: 'Cross River Small Hydro Cluster',
        file: 'Cross-River-Small-Hydro',
        stage: 1,
        updated: '22-Jun-2026',
        sector: 'Small Hydro', state: 'Cross River', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 140 m',
        overview: [
            'is a group of run-of-river small hydropower sites in the Cross River highlands, brought together so the sites can be studied, procured and financed as one programme rather than one at a time.',
            'The cluster is at concept stage: hydrological records and preliminary site visits point to workable heads and year-round flows, and detailed studies are the next step. It opens positions for developers, hydro engineering firms and patient capital, with each site licensed with NERC according to its capacity.'
        ],
        highlights: [['water', '30 MW', 'Combined capacity'], ['location_on', '6 sites', 'Run-of-river sites'], ['map', '1 State', 'Cross River'], ['payments', '$140 m', 'Total investment']],
        gated: ['14.6%', '8.5 yrs', 'USD 3M', '8 yrs'],
        brief: 'The Cross River cluster brings six candidate sites under one development framework, so studies, land and grid connection are handled once for the whole group. Indicative capital outlay is USD&nbsp;140&nbsp;m. Site capacities, tariffs and return profile depend on the feasibility work still to come, and will be published here once the responsible agency confirms them.',
        images: [['River intake site', 'osip-crh-intake'], ['Highland catchment', 'osip-crh-catchment'], ['Flow gauging station', 'osip-crh-gauge'], ['Village distribution line', 'osip-crh-line']],
        video: ['Cross River Hydro: Catchment Survey', 'osip-crh-walkthrough'],
        docs: [['Concept Note', '1.4', 22], ['Hydrological Assessment', '4.9', 86], ['Environmental Screening Report', '1.6', 30], ['Site Shortlist', '0.8', 12]],
        contact: ['Ekaette Bassey', 'Project Coordinator', '+234 805 678 9012', 'promoter@crossriverhydro.ng']
    },
    {
        id: '2025-MOB-04',
        title: 'Lagos EV Charging Network',
        file: 'Lagos-EV-Charging',
        stage: 2,
        updated: '09-Apr-2026',
        sector: 'Green Mobility', state: 'Lagos', start: '01-Oct-2026', end: '30-Sep-2028',
        promoter: 'Concession', status: 'Seeking investor interest', ministry: 'Federal Ministry of Transportation',
        cost: 'USD 90 m',
        overview: [
            'is a planned public charging network for electric cars, buses and two- and three-wheelers across Lagos, placing fast and standard chargers at transport hubs, fuel stations, shopping centres and fleet depots.',
            'The state is seeking investor interest in a concession model in which private operators build, run and earn from the network. It opens positions for charge-point operators, equipment suppliers, fleet partners and infrastructure investors, with grid supply arranged with the local distribution company.'
        ],
        highlights: [['ev_station', '500', 'Charging points'], ['bolt', '40 MW', 'Connected load'], ['map', '1 State', 'Lagos'], ['payments', '$90 m', 'Total investment']],
        gated: ['16.1%', '6.5 yrs', 'USD 1M', '5 yrs'],
        brief: 'The Lagos network is planned in phases, starting where fleets already gather, such as bus depots and ride-hailing staging areas, and extending to public sites as demand grows. Indicative capital outlay is USD&nbsp;90&nbsp;m. Concession length, revenue sharing and grid arrangements are being worked out with the state, and will be published here once the responsible agency confirms them.',
        images: [['Fast charging hub', 'osip-lev-hub'], ['Electric bus depot', 'osip-lev-depot'], ['Two-wheeler charging bay', 'osip-lev-bay'], ['Grid connection cabinet', 'osip-lev-cabinet']],
        video: ['Lagos EV Network: Pilot Hub Tour', 'osip-lev-walkthrough'],
        docs: [['Investment Memorandum', '2.2', 40], ['Demand and Siting Study', '3.7', 74], ['Grid Impact Summary', '1.2', 24], ['Concession Outline', '0.6', 10]],
        contact: ['Tunde Bakare', 'Head of Mobility Projects', '+234 806 789 0123', 'promoter@lagosevnetwork.ng']
    },
    {
        id: '2025-EEF-03',
        track: 'readiness',   // shown on the readiness axis; Financing sought
        title: 'Ogun Industrial Efficiency Programme',
        file: 'Ogun-Industrial-Efficiency',
        stage: 3,
        updated: '30-Jul-2026',
        sector: 'Energy Efficiency', state: 'Ogun', start: '01-Feb-2026', end: '31-Dec-2028',
        promoter: 'Private Sector Led', status: 'Financing sought', ministry: 'Federal Ministry of Industry, Trade and Investment',
        cost: 'USD 60 m',
        overview: [
            'is a programme to cut energy use across factories in Ogun\'s industrial corridors through audits, efficient motors and compressed-air systems, waste-heat recovery and on-site solar, repaid from the savings they produce.',
            'The first sites have been audited and retrofitted, and financing is now sought to take the programme to the wider group of manufacturers. It opens positions for energy service companies, equipment suppliers and lenders, using performance contracts that tie repayments to measured savings.'
        ],
        highlights: [['factory', '40 sites', 'Industrial facilities'], ['energy_savings_leaf', '25%', 'Target energy saving'], ['map', '1 State', 'Ogun'], ['payments', '$60 m', 'Total investment']],
        gated: ['18.0%', '4.5 yrs', 'USD 1M', '4 yrs'],
        brief: 'The Ogun programme groups retrofits into portfolios of factories with similar equipment, so audits, procurement and measurement follow one method. Indicative capital outlay is USD&nbsp;60&nbsp;m. Savings verified at the first sites set the basis for the financing now sought, and terms will be published here once the responsible agency confirms them.',
        images: [['Factory energy audit', 'osip-oge-audit'], ['Efficient motor retrofit', 'osip-oge-motor'], ['Rooftop solar', 'osip-oge-solar'], ['Metering and verification', 'osip-oge-meter']],
        video: ['Ogun Efficiency Programme: Retrofit Tour', 'osip-oge-walkthrough'],
        docs: [['Investment Memorandum', '1.9', 36], ['Energy Audit Summary', '3.3', 64], ['Measurement and Verification Plan', '1.1', 20], ['Indicative Term Sheet', '0.5', 7]],
        contact: ['Folake Adeyemi', 'Programme Director', '+234 807 890 1234', 'promoter@ogunefficiency.ng']
    },
    {
        id: '2025-CLC-02',
        track: 'readiness',   // shown on the readiness axis; Requires validation
        title: 'Kano Clean Cooking Rollout',
        file: 'Kano-Clean-Cooking',
        stage: 1,
        updated: '11-Mar-2026',
        sector: 'Clean Cooking', state: 'Kano', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Requires validation', ministry: 'Federal Ministry of Environment',
        cost: 'USD 120 m',
        overview: [
            'is a proposed rollout of LPG, improved biomass and electric cooking solutions to households and institutions in Kano, replacing firewood and charcoal with cleaner, safer fuels and stoves.',
            'The proposal needs validation before it moves forward: demand, distribution routes and affordability models are being checked against field data. It opens positions for stove and cylinder suppliers, distributors, carbon finance partners and impact investors.'
        ],
        highlights: [['cottage', '500,000', 'Households reached'], ['local_fire_department', '3 fuels', 'LPG, biomass, electric'], ['map', '1 State', 'Kano'], ['payments', '$120 m', 'Total investment']],
        gated: ['13.5%', '7.5 yrs', 'USD 500K', '6 yrs'],
        brief: 'The Kano rollout combines household sales on flexible payment plans with supply to schools and other institutions that cook at scale. Indicative capital outlay is USD&nbsp;120&nbsp;m, with carbon revenue expected to support affordability. The validation now under way will confirm the model, and terms will be published here once the responsible agency confirms them.',
        images: [['LPG distribution point', 'osip-knc-lpg'], ['Improved cookstove', 'osip-knc-stove'], ['School kitchen', 'osip-knc-school'], ['Cylinder refill station', 'osip-knc-refill']],
        video: ['Kano Clean Cooking: Field Visit', 'osip-knc-walkthrough'],
        docs: [['Concept Note', '1.3', 20], ['Market Assessment', '3.9', 70], ['Carbon Finance Summary', '1.0', 18], ['Validation Plan', '0.6', 9]],
        contact: ['Aisha Bello', 'Programme Lead', '+234 808 901 2345', 'promoter@kanocleancooking.ng']
    },
    {
        id: '2025-BIO-05',
        track: 'readiness',   // shown on the readiness axis; Under preparation
        title: 'Benue Biomass-to-Power Plant',
        file: 'Benue-Biomass-Power',
        stage: 2,
        updated: '26-Aug-2026',
        sector: 'Bioenergy', state: 'Benue', start: '01-Apr-2027', end: '30-Jun-2029',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 80 m',
        overview: [
            'is a planned power plant that turns agricultural residues from Benue\'s farms, such as rice husks, maize cobs and cassava peels, into electricity for nearby agro-processing clusters and the grid.',
            'The project is under preparation, with feedstock surveys and site selection progressing alongside grid studies. It opens positions for technology providers, feedstock aggregators, EPC contractors and equity investors, and requires NERC licensing appropriate to its capacity.'
        ],
        highlights: [['compost', '15 MW', 'Installed capacity'], ['agriculture', '120,000 t', 'Residues per year'], ['map', '1 State', 'Benue'], ['payments', '$80 m', 'Total investment']],
        gated: ['15.2%', '7.2 yrs', 'USD 2M', '6 yrs'],
        brief: 'The Benue plant is sited to keep feedstock haulage short, drawing residues from farms and mills within a set radius under supply contracts with cooperatives. Indicative capital outlay is USD&nbsp;80&nbsp;m. Feedstock pricing, offtake and grid terms are being finalised, and will be published here once the responsible agency confirms them.',
        images: [['Rice husk stockpile', 'osip-bnb-husk'], ['Plant site', 'osip-bnb-site'], ['Farmers\' cooperative', 'osip-bnb-coop'], ['Grid tie-in point', 'osip-bnb-grid']],
        video: ['Benue Biomass Plant: Feedstock Tour', 'osip-bnb-walkthrough'],
        docs: [['Investment Memorandum', '2.5', 44], ['Feedstock Assessment', '4.1', 78], ['Environmental Impact Summary', '1.8', 34], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Terver Akaa', 'Project Manager', '+234 809 012 3456', 'promoter@benuebiopower.ng']
    },
    {
        id: '2025-HYG-01',
        title: 'Green Hydrogen Niger Delta Pilot',
        file: 'Niger-Delta-Green-Hydrogen',
        stage: 1,
        updated: '07-Jul-2026',
        sector: 'Green Hydrogen', state: 'Rivers', start: '01-Nov-2026', end: '31-Dec-2029',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 260 m',
        overview: [
            'is a pilot facility producing green hydrogen by electrolysis, powered by renewable electricity, to test supply to ammonia, refining and other industrial users around Port Harcourt.',
            'The pilot is in tender and procurement, with the electrolyser package, renewable supply and water treatment being procured. It opens positions for electrolyser suppliers, renewable developers, industrial offtakers and investors, and will set the reference for larger green hydrogen projects in the Niger Delta.'
        ],
        highlights: [['science', '20 MW', 'Electrolyser capacity'], ['water_drop', '3,000 t', 'Hydrogen per year'], ['map', '1 State', 'Rivers'], ['payments', '$260 m', 'Total investment']],
        gated: ['12.8%', '9.0 yrs', 'USD 10M', '8 yrs'],
        brief: 'The Niger Delta pilot pairs an electrolyser plant with dedicated renewable supply and storage, sited near industrial users so hydrogen is used close to where it is made. Indicative capital outlay is USD&nbsp;260&nbsp;m. Offtake, pricing and return profile are being finalised through the procurement now under way, and will be published here once the responsible agency confirms them.',
        images: [['Electrolyser hall concept', 'osip-ghn-hall'], ['Solar supply field', 'osip-ghn-solar'], ['Water treatment unit', 'osip-ghn-water'], ['Industrial offtake area', 'osip-ghn-industry']],
        video: ['Niger Delta Hydrogen: Pilot Site', 'osip-ghn-walkthrough'],
        docs: [['Investment Memorandum', '3.4', 60], ['Technical Feasibility Report', '6.8', 140], ['Environmental Impact Summary', '2.2', 42], ['Indicative Term Sheet', '0.7', 9]],
        contact: ['Chinedu Okafor', 'Head of Project Development', '+234 810 123 4567', 'promoter@nigerdeltahydrogen.ng']
    },
    /* ---- Solar: Featured Investment Areas (15 Sep 2026) -------------------------------
       The four areas of DetailedSector.html#opportunities, as full project records so their
       pages match every other listing. The overview keeps the sector page's own words (lead:
       false - these paragraphs do not open with the title); every other figure, date, contact
       and document is an illustrative placeholder, like the records above. */
    {
        id: '2026-SOL-21',
        title: 'Mini-Grid Development',
        file: 'DARES-Mini-Grids',
        stage: 3,
        updated: '12-Jan-2026',
        sector: 'Solar', state: 'Multi-State', start: '01-Jan-2024', end: '31-Dec-2028',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 750 m',
        lead: false,
        overview: [
            'One of the largest immediate opportunities is the Distributed Access through Renewable Energy Scale-up (DARES) programme, supported by a US$750 million World Bank facility and implemented by the Rural Electrification Agency (REA). The programme targets the deployment of approximately 1,225 mini-grids, 465 MW of new generation capacity, and electricity access for 17.5 million beneficiaries.',
            'Private developers can participate through multiple windows, including isolated mini-grids, interconnected mini-grids, minimum subsidy tenders, and Solar for Business programmes. Performance-based subsidies are available upon successful project delivery and verified customer connections.'
        ],
        highlights: [['hub', '1,225', 'Mini-grids targeted'], ['bolt', '465 MW', 'New generation capacity'], ['groups', '17.5M', 'Beneficiaries'], ['payments', '$750 m', 'World Bank facility']],
        gated: ['16.5%', '6.0 yrs', 'USD 1M', '5 yrs'],
        brief: 'The DARES programme channels a US$750&nbsp;million World Bank facility through the Rural Electrification Agency to private developers building isolated and interconnected mini-grids. Minimum subsidy tenders are run in regional lots, and performance-based grants are released against verified customer connections. Lot sizes, tariff guidance and grant rates for the current tender round will be published here once the responsible agency confirms them.',
        images: [['Solar mini-grid array', 'osip-dares-array'], ['Battery storage container', 'osip-dares-battery'], ['Community distribution line', 'osip-dares-line'], ['Customer metering', 'osip-dares-meter']],
        video: ['DARES Mini-Grids: Site Walkthrough', 'osip-dares-walkthrough'],
        docs: [['DARES Programme Brief', '2.6', 44], ['Minimum Subsidy Tender Guidelines', '3.4', 68], ['Environmental and Social Framework', '1.8', 36], ['Performance-Based Grant Term Sheet', '0.6', 9]],
        contact: ['Amina Yusuf', 'DARES Investor Desk Lead', '+234 809 555 0142', 'investors@dares-minigrids.ng']
    },
    {
        id: '2026-SOL-22',
        title: 'Commercial & Industrial Solar',
        file: 'CI-Solar',
        stage: 2,
        updated: '03-Mar-2026',
        sector: 'Solar', state: 'Lagos', start: '01-Jul-2026', end: '30-Jun-2028',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 180 m',
        lead: false,
        overview: [
            'Commercial and industrial (C&amp;I) solar remains one of the fastest-growing segments of the market. Rising diesel costs, energy-security concerns, and sustainability commitments are driving demand for solar and solar-plus-storage solutions across manufacturing, agriculture, telecommunications, healthcare, education, and commercial real estate sectors.',
            'The opportunity packages rooftop, ground-mount and solar-plus-storage systems for commercial and industrial users under lease, power purchase and energy-as-a-service agreements. It opens positions for developers, EPC contractors, equipment suppliers and investors, with captive and embedded systems permitted or licensed with NERC according to their size.'
        ],
        highlights: [['factory', '6 sectors', 'Demand segments'], ['solar_power', '120 MW', 'Pipeline capacity'], ['local_gas_station', '40%', 'Diesel cost savings'], ['payments', '$180 m', 'Total investment']],
        gated: ['18.2%', '5.5 yrs', 'USD 500K', '5 yrs'],
        brief: 'Commercial and industrial solar demand is concentrated in manufacturing clusters, agro-processing, telecommunications towers, hospitals, universities and commercial estates, where diesel self-generation sets the cost to beat. Indicative capital outlay is USD&nbsp;180&nbsp;m across the pipeline. Offtaker credit profiles, contract terms and site lists will be published here once the responsible agency confirms them.',
        images: [['Factory rooftop array', 'osip-ci-rooftop'], ['Solar carport', 'osip-ci-carport'], ['Battery storage room', 'osip-ci-battery'], ['Inverter bay', 'osip-ci-inverter']],
        video: ['C&I Solar: Rooftop Installation Tour', 'osip-ci-walkthrough'],
        docs: [['Investment Memorandum', '2.2', 40], ['C&I Demand Assessment', '3.1', 58], ['Model PPA and Lease Terms', '0.9', 16], ['Indicative Term Sheet', '0.5', 8]],
        contact: ['Chukwuemeka Obi', 'Head of C&I Partnerships', '+234 803 555 0187', 'partnerships@cisolar-nigeria.ng']
    },
    {
        id: '2026-SOL-23',
        title: 'Manufacturing & Local Assembly',
        file: 'Solar-Assembly-Hub',
        stage: 1,
        updated: '20-Apr-2026',
        sector: 'Solar', state: 'Ogun', start: '01-Jan-2027', end: '31-Dec-2029',
        promoter: 'Private Sector Led', status: 'Concept', ministry: 'Federal Ministry of Industry, Trade and Investment',
        cost: 'USD 95 m',
        lead: false,
        overview: [
            'Solar manufacturing, component assembly, and clean energy supply chains are emerging as strategic growth areas. Ongoing policy discussions around domestic industrialisation, regional value chains, and local content development are creating opportunities for investors interested in module assembly, battery systems, mounting structures, inverters, and related clean-energy technologies.',
            'The concept is an assembly hub for solar modules, battery packs, mounting structures and inverters, sited in an industrial park with port and road access to serve domestic demand and regional markets. It opens positions for technology partners, equipment manufacturers and industrial investors, subject to the product standards and certification that apply to electrical equipment.'
        ],
        highlights: [['precision_manufacturing', '500 MW', 'Annual module assembly'], ['battery_charging_full', '200 MWh', 'Battery pack output'], ['engineering', '1,200', 'Direct jobs'], ['payments', '$95 m', 'Total investment']],
        gated: ['17.0%', '6.5 yrs', 'USD 2M', '6 yrs'],
        brief: 'The hub is planned in phases, starting with module and mounting-structure assembly and adding battery packs and inverters as volumes grow. Indicative capital outlay is USD&nbsp;95&nbsp;m. Site, incentives and offtake arrangements depend on the policy discussions now under way, and will be published here once the responsible agency confirms them.',
        images: [['Module assembly line', 'osip-mfg-line'], ['Battery pack workshop', 'osip-mfg-battery'], ['Mounting structure fabrication', 'osip-mfg-mounting'], ['Quality testing lab', 'osip-mfg-lab']],
        video: ['Solar Assembly Hub: Concept Tour', 'osip-mfg-walkthrough'],
        docs: [['Concept Note', '1.5', 24], ['Market and Value Chain Study', '4.2', 82], ['Local Content Framework Summary', '1.0', 18], ['Site Options Brief', '0.7', 11]],
        contact: ['Funmilayo Adebayo', 'Industrial Investment Lead', '+234 806 555 0123', 'invest@solar-assembly-hub.ng']
    },
    {
        id: '2026-SOL-24',
        title: 'Geographic Hotspots',
        file: 'Solar-Hotspots',
        stage: 2,
        updated: '28-May-2026',
        sector: 'Solar', state: 'Multi-State', start: '01-Oct-2026', end: '30-Sep-2029',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 320 m',
        lead: false,
        overview: [
            'High-opportunity markets continue to emerge across Lagos, Abuja, Kano, Kaduna, and key agricultural corridors in North-Central Nigeria, where strong electricity demand, productive-use activities, and electrification need support project viability.',
            'The programme groups distributed solar sites in these markets into regional portfolios, anchored by productive-use customers such as agro-processors, cold storage and irrigation, so that developers can finance several sites at once. It opens positions for developers, distributed energy companies and investors, with each site licensed or registered with NERC according to its size.'
        ],
        highlights: [['location_on', '5 markets', 'Priority locations'], ['solar_power', '250 MW', 'Distributed solar pipeline'], ['agriculture', '3 corridors', 'North-Central agriculture'], ['payments', '$320 m', 'Total investment']],
        gated: ['15.9%', '6.8 yrs', 'USD 1M', '6 yrs'],
        brief: 'The portfolios cover Lagos, Abuja, Kano, Kaduna and the North-Central agricultural corridors, where demand, productive use and electrification need already support project viability. Indicative capital outlay is USD&nbsp;320&nbsp;m. Site lists, demand data and portfolio terms are being prepared with the states, and will be published here once the responsible agency confirms them.',
        images: [['Lagos commercial rooftops', 'osip-hot-lagos'], ['Abuja business district', 'osip-hot-abuja'], ['Kano agro-processing cluster', 'osip-hot-kano'], ['North-Central irrigation farm', 'osip-hot-farm']],
        video: ['Solar Hotspots: Market Overview', 'osip-hot-walkthrough'],
        docs: [['Investment Memorandum', '2.9', 50], ['Market Demand Atlas', '5.6', 104], ['Productive-Use Anchor Study', '1.9', 34], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ibrahim Musa', 'Portfolio Development Manager', '+234 807 555 0165', 'portfolios@solar-hotspots.ng']
    },
    /* ---- Featured Investment Areas on the other nine sector pages (15 Sep 2026) ------------
       As for Solar above: titles are the sector pages' own sub-area headings and the overview
       their own paragraphs; every figure, date, contact and document is an illustrative placeholder. */
    {
        id: '2026-WND-21',
        title: 'Mini-Grid Development',
        file: 'Wind-Mini-Grid-Development',
        stage: 3,
        updated: '14-Jan-2026',
        sector: 'Wind', state: 'Plateau', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 140 m',
        lead: false,
        overview: [
            'One of the largest immediate opportunities for wind is through the Distributed Access through Renewable Energy Scale-up (DARES) programme, supported by a US$750 million World Bank facility and implemented by the Rural Electrification Agency (REA). The programme targets approximately 1,225 mini-grids, where wind-hybrid configurations are eligible alongside solar for rural, agricultural, telecom, and community loads in the northern states.',
            'Private developers can participate through isolated mini-grid, interconnected mini-grid, and minimum subsidy tender windows. Performance-based subsidies are available upon successful project delivery and verified customer connections.'
        ],
        highlights: [['hub', 'Wind', 'Sector'], ['map', 'Plateau', 'Location'], ['flag', 'Tender / procurement', 'Readiness'], ['payments', '$140 m', 'Total investment']],
        gated: ['13.0%', '6.0 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;140&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Mini-Grid Development site', 'osip-wnd-mini-grid-development-1'], ['Project area', 'osip-wnd-mini-grid-development-2'], ['Equipment', 'osip-wnd-mini-grid-development-3'], ['Community and customers', 'osip-wnd-mini-grid-development-4']],
        video: ['Mini-Grid Development: Overview', 'osip-wnd-mini-grid-development-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Adaeze Okonkwo', 'Investor Relations Lead', '+234 800 555 0100', 'invest@wind-1.ng']
    },
    {
        id: '2026-WND-22',
        title: 'Hybrid Wind-Solar Systems',
        file: 'Wind-Hybrid-Wind-Solar-Systems',
        stage: 2,
        updated: '10-Mar-2026',
        sector: 'Wind', state: 'Katsina', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 85 m',
        lead: false,
        overview: [
            'The most immediate commercial opportunity for wind is in hybrid configurations combining wind and solar to serve rural agricultural, telecom, and community loads in the northern states. Wind\'s natural diurnal and seasonal complementarity with solar improves system reliability and reduces battery storage requirements, making hybrid systems easier to finance than either technology alone.'
        ],
        highlights: [['wind_power', 'Wind', 'Sector'], ['map', 'Katsina', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$85 m', 'Total investment']],
        gated: ['13.7%', '6.8 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;85&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Hybrid Wind-Solar Systems site', 'osip-wnd-hybrid-wind-solar-systems-1'], ['Project area', 'osip-wnd-hybrid-wind-solar-systems-2'], ['Equipment', 'osip-wnd-hybrid-wind-solar-systems-3'], ['Community and customers', 'osip-wnd-hybrid-wind-solar-systems-4']],
        video: ['Hybrid Wind-Solar Systems: Overview', 'osip-wnd-hybrid-wind-solar-systems-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Emeka Nwosu', 'Investor Relations Lead', '+234 801 555 0101', 'invest@wind-2.ng']
    },
    {
        id: '2026-WND-23',
        title: 'Utility-Scale Wind Development',
        file: 'Wind-Utility-Scale-Wind-Development',
        stage: 2,
        updated: '22-Apr-2026',
        sector: 'Wind', state: 'Taraba', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 420 m',
        lead: false,
        overview: [
            'Utility-scale grid-connected wind projects in the 10–50 MW range represent the longer-term prize. Existing projects such as the Katsina Wind Farm (operational) and the Gurara II Wind Farm (under development) demonstrate the viability of the sector. Investors with patient capital and the ability to structure around offtake creditworthiness — using DFI guarantees and blended finance — are best placed to develop Nigeria\'s first generation of commercial utility-scale wind farms.'
        ],
        highlights: [['bolt', 'Wind', 'Sector'], ['map', 'Taraba', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$420 m', 'Total investment']],
        gated: ['14.4%', '7.6 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;420&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Utility-Scale Wind Development site', 'osip-wnd-utility-scale-wind-development-1'], ['Project area', 'osip-wnd-utility-scale-wind-development-2'], ['Equipment', 'osip-wnd-utility-scale-wind-development-3'], ['Community and customers', 'osip-wnd-utility-scale-wind-development-4']],
        video: ['Utility-Scale Wind Development: Overview', 'osip-wnd-utility-scale-wind-development-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Halima Bello', 'Investor Relations Lead', '+234 802 555 0102', 'invest@wind-3.ng']
    },
    {
        id: '2026-WND-24',
        title: 'Geographic Hotspots',
        file: 'Wind-Geographic-Hotspots',
        stage: 1,
        updated: '02-Jun-2026',
        sector: 'Wind', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 210 m',
        lead: false,
        overview: [
            'The confirmed high-wind corridor of Plateau, Taraba, and Katsina offers the strongest resource fundamentals for both mini-grid and utility-scale wind development, with wind speeds exceeding 7 m/s and existing feasibility data that cuts exploratory risk for investors.'
        ],
        highlights: [['location_on', 'Wind', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$210 m', 'Total investment']],
        gated: ['15.1%', '8.4 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;210&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-wnd-geographic-hotspots-1'], ['Project area', 'osip-wnd-geographic-hotspots-2'], ['Equipment', 'osip-wnd-geographic-hotspots-3'], ['Community and customers', 'osip-wnd-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-wnd-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Tunde Adeyemi', 'Investor Relations Lead', '+234 803 555 0103', 'invest@wind-4.ng']
    },
    {
        id: '2026-STG-21',
        title: 'Behind-the-Meter Storage (Residential & C&I)',
        file: 'Storage-Behind-the-Meter-Storage-Residen',
        stage: 2,
        updated: '20-Jan-2026',
        sector: 'Storage', state: 'Lagos', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 160 m',
        lead: false,
        overview: [
            'Nigeria\'s commercial and industrial sector presents one of the largest opportunities for battery storage deployment in Africa. Businesses are increasingly adopting solar-plus-storage systems to reduce diesel consumption, improve power reliability, and lower operating costs.',
            'Key target markets include manufacturing facilities, hospitals, universities, cold-chain operators, telecom infrastructure, estates, hotels, shopping centres, and data centres.'
        ],
        highlights: [['battery_charging_full', 'Storage', 'Sector'], ['map', 'Lagos', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$160 m', 'Total investment']],
        gated: ['15.8%', '6.0 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;160&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Behind-the-Meter Storage (Residential &amp; C&amp;I) site', 'osip-stg-behind-the-meter-storage-residential-1'], ['Project area', 'osip-stg-behind-the-meter-storage-residential-2'], ['Equipment', 'osip-stg-behind-the-meter-storage-residential-3'], ['Community and customers', 'osip-stg-behind-the-meter-storage-residential-4']],
        video: ['Behind-the-Meter Storage (Residential & C&I) : Overview', 'osip-stg-behind-the-meter-storage-residential-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ngozi Eze', 'Investor Relations Lead', '+234 804 555 0104', 'invest@storage-1.ng']
    },
    {
        id: '2026-STG-22',
        title: 'Mini-Grid Storage Integration',
        file: 'Storage-Mini-Grid-Storage-Integration',
        stage: 3,
        updated: '18-Feb-2026',
        sector: 'Storage', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 230 m',
        lead: false,
        overview: [
            'Battery storage is becoming a standard component of modern mini-grid systems, helping improve reliability, increase renewable energy utilisation, and reduce fuel costs.',
            'The DARES programme targets approximately 1,225 mini-grids, creating a significant pipeline for battery suppliers, storage integrators, EPC contractors, and project developers.'
        ],
        highlights: [['hub', 'Storage', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Tender / procurement', 'Readiness'], ['payments', '$230 m', 'Total investment']],
        gated: ['13.0%', '6.8 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;230&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Mini-Grid Storage Integration site', 'osip-stg-mini-grid-storage-integration-1'], ['Project area', 'osip-stg-mini-grid-storage-integration-2'], ['Equipment', 'osip-stg-mini-grid-storage-integration-3'], ['Community and customers', 'osip-stg-mini-grid-storage-integration-4']],
        video: ['Mini-Grid Storage Integration: Overview', 'osip-stg-mini-grid-storage-integration-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Sani Abdullahi', 'Investor Relations Lead', '+234 805 555 0105', 'invest@storage-2.ng']
    },
    {
        id: '2026-STG-23',
        title: 'Battery Assembly & Manufacturing',
        file: 'Storage-Battery-Assembly-Manufacturing',
        stage: 1,
        updated: '07-Apr-2026',
        sector: 'Storage', state: 'Ogun', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 110 m',
        lead: false,
        overview: [
            'Local battery assembly and manufacturing represent an emerging investment opportunity as Nigeria seeks to strengthen domestic energy and electric mobility supply chains.',
            'Government policy increasingly supports local content development, technology transfer, and industrialisation, creating opportunities for battery pack assembly, component manufacturing, and energy storage value-chain development.'
        ],
        highlights: [['precision_manufacturing', 'Storage', 'Sector'], ['map', 'Ogun', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$110 m', 'Total investment']],
        gated: ['13.7%', '7.6 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;110&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Battery Assembly &amp; Manufacturing site', 'osip-stg-battery-assembly-manufacturing-1'], ['Project area', 'osip-stg-battery-assembly-manufacturing-2'], ['Equipment', 'osip-stg-battery-assembly-manufacturing-3'], ['Community and customers', 'osip-stg-battery-assembly-manufacturing-4']],
        video: ['Battery Assembly & Manufacturing: Overview', 'osip-stg-battery-assembly-manufacturing-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Folake Ogunleye', 'Investor Relations Lead', '+234 806 555 0106', 'invest@storage-3.ng']
    },
    {
        id: '2026-STG-24',
        title: 'Strongest Entry Points',
        file: 'Storage-Strongest-Entry-Points',
        stage: 2,
        updated: '25-May-2026',
        sector: 'Storage', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 300 m',
        lead: false,
        overview: [
            'The strongest near-term opportunities include:',
            'For investors, the most attractive projects are those with predictable electricity demand, measurable diesel displacement, and long-term customer contracts, as these typically provide the clearest path to financing and scalable growth.'
        ],
        highlights: [['flag', 'Storage', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$300 m', 'Total investment']],
        gated: ['14.4%', '8.4 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;300&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Strongest Entry Points site', 'osip-stg-strongest-entry-points-1'], ['Project area', 'osip-stg-strongest-entry-points-2'], ['Equipment', 'osip-stg-strongest-entry-points-3'], ['Community and customers', 'osip-stg-strongest-entry-points-4']],
        video: ['Strongest Entry Points: Overview', 'osip-stg-strongest-entry-points-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Yakubu Danjuma', 'Investor Relations Lead', '+234 807 555 0107', 'invest@storage-4.ng']
    },
    {
        id: '2026-HYD-21',
        title: 'Rural Mini-Grids and Agro-Processing',
        file: 'Small-Hydro-Rural-Mini-Grids-and-Agro-Pr',
        stage: 2,
        updated: '28-Jan-2026',
        sector: 'Small Hydro', state: 'Niger', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 95 m',
        lead: false,
        overview: [
            'North-Central Nigeria, Middle Belt, and Southern riverine regions offer some of the strongest long-term small hydro opportunities due to water resource availability and underserved electricity demand. Small hydro plants can anchor mini-grid systems that power agricultural processing clusters, rural communities, and productive-use facilities.',
            'REA\'s rural electrification programmes and donor-backed rural electrification initiatives are increasing interest in small-scale hydro deployment, particularly in areas with reliable year-round water flow where mini-grids, agro-processing clusters, and community electrification demand exist.'
        ],
        highlights: [['water', 'Small Hydro', 'Sector'], ['map', 'Niger', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$95 m', 'Total investment']],
        gated: ['15.1%', '6.0 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;95&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Rural Mini-Grids and Agro-Processing site', 'osip-hyd-rural-mini-grids-and-agro-processing-1'], ['Project area', 'osip-hyd-rural-mini-grids-and-agro-processing-2'], ['Equipment', 'osip-hyd-rural-mini-grids-and-agro-processing-3'], ['Community and customers', 'osip-hyd-rural-mini-grids-and-agro-processing-4']],
        video: ['Rural Mini-Grids and Agro-Processing: Overview', 'osip-hyd-rural-mini-grids-and-agro-processing-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Chioma Obi', 'Investor Relations Lead', '+234 808 555 0108', 'invest@small-hydro-1.ng']
    },
    {
        id: '2026-HYD-22',
        title: 'Embedded Generation and Hybrid Systems',
        file: 'Small-Hydro-Embedded-Generation-and-Hybr',
        stage: 2,
        updated: '16-Mar-2026',
        sector: 'Small Hydro', state: 'Kaduna', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 130 m',
        lead: false,
        overview: [
            'Small hydro projects can supply electricity directly to industrial, commercial, institutional, or distribution network customers. Hybrid hydro-solar systems with battery storage improve reliability and energy availability across on-grid and off-grid applications, enabling investors to serve both market segments while addressing productive-use energy needs.'
        ],
        highlights: [['bolt', 'Small Hydro', 'Sector'], ['map', 'Kaduna', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$130 m', 'Total investment']],
        gated: ['15.8%', '6.8 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;130&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Embedded Generation and Hybrid Systems site', 'osip-hyd-embedded-generation-and-hybrid-syste-1'], ['Project area', 'osip-hyd-embedded-generation-and-hybrid-syste-2'], ['Equipment', 'osip-hyd-embedded-generation-and-hybrid-syste-3'], ['Community and customers', 'osip-hyd-embedded-generation-and-hybrid-syste-4']],
        video: ['Embedded Generation and Hybrid Systems: Overview', 'osip-hyd-embedded-generation-and-hybrid-syste-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Musa Garba', 'Investor Relations Lead', '+234 809 555 0109', 'invest@small-hydro-2.ng']
    },
    {
        id: '2026-HYD-23',
        title: 'Geographic Hotspots',
        file: 'Small-Hydro-Geographic-Hotspots',
        stage: 1,
        updated: '11-May-2026',
        sector: 'Small Hydro', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 180 m',
        lead: false,
        overview: [
            'High-opportunity markets exist in North-Central Nigeria, Middle Belt, and Southern riverine regions, where reliable water resources, underserved electricity demand, and rural electrification needs support strong project viability.'
        ],
        highlights: [['location_on', 'Small Hydro', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$180 m', 'Total investment']],
        gated: ['13.0%', '7.6 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;180&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-hyd-geographic-hotspots-1'], ['Project area', 'osip-hyd-geographic-hotspots-2'], ['Equipment', 'osip-hyd-geographic-hotspots-3'], ['Community and customers', 'osip-hyd-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-hyd-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Bisi Afolabi', 'Investor Relations Lead', '+234 800 555 0110', 'invest@small-hydro-3.ng']
    },
    {
        id: '2026-MOB-21',
        title: 'EV Charging Infrastructure',
        file: 'Green-Mobility-EV-Charging-Infrastructur',
        stage: 2,
        updated: '05-Feb-2026',
        sector: 'Green Mobility', state: 'Lagos', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 75 m',
        lead: false,
        overview: [
            'The charging infrastructure segment is in early-stage development, with global energy management companies active in the broader space. Solar-powered and off-grid charging stations may be eligible for net billing under Section 80 of the Electricity Act 2023 and for REA and REF support. Co-location with existing mini-grid infrastructure is explicitly recognised as a viable, investable model.',
            'Investors who establish positions now — across charging infrastructure, fleet financing, or local assembly — will be best placed to scale as the enabling environment catches up with demand.'
        ],
        highlights: [['ev_station', 'Green Mobility', 'Sector'], ['map', 'Lagos', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$75 m', 'Total investment']],
        gated: ['13.7%', '8.4 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;75&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['EV Charging Infrastructure site', 'osip-mob-ev-charging-infrastructure-1'], ['Project area', 'osip-mob-ev-charging-infrastructure-2'], ['Equipment', 'osip-mob-ev-charging-infrastructure-3'], ['Community and customers', 'osip-mob-ev-charging-infrastructure-4']],
        video: ['EV Charging Infrastructure: Overview', 'osip-mob-ev-charging-infrastructure-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ifeanyi Okeke', 'Investor Relations Lead', '+234 801 555 0111', 'invest@green-mobility-1.ng']
    },
    {
        id: '2026-MOB-22',
        title: 'Local Assembly & Manufacturing',
        file: 'Green-Mobility-Local-Assembly-Manufactur',
        stage: 2,
        updated: '30-Mar-2026',
        sector: 'Green Mobility', state: 'Ogun', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 120 m',
        lead: false,
        overview: [
            'Nigeria is now home to a 100,000-unit capacity electric two-wheeler assembly plant in Ogun State. The EV Transition and Green Mobility Bill 2025 mandates 30% local content by 2030, which gives local assembly and partnership models a structural advantage in procurement and incentive access. Foreign OEM partnership models mirror the CKD assembly playbook used successfully in the conventional vehicle market.'
        ],
        highlights: [['precision_manufacturing', 'Green Mobility', 'Sector'], ['map', 'Ogun', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$120 m', 'Total investment']],
        gated: ['14.4%', '6.0 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;120&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Local Assembly &amp; Manufacturing site', 'osip-mob-local-assembly-manufacturing-1'], ['Project area', 'osip-mob-local-assembly-manufacturing-2'], ['Equipment', 'osip-mob-local-assembly-manufacturing-3'], ['Community and customers', 'osip-mob-local-assembly-manufacturing-4']],
        video: ['Local Assembly & Manufacturing: Overview', 'osip-mob-local-assembly-manufacturing-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Adaeze Okonkwo', 'Investor Relations Lead', '+234 802 555 0112', 'invest@green-mobility-2.ng']
    },
    {
        id: '2026-MOB-23',
        title: 'Geographic Hotspots',
        file: 'Green-Mobility-Geographic-Hotspots',
        stage: 1,
        updated: '19-May-2026',
        sector: 'Green Mobility', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 160 m',
        lead: false,
        overview: [
            'High-opportunity markets are concentrated in Nigeria\'s major cities where EV bus deployments are already operating and commercial transport demand is strongest. Urban, highway, and transport hub locations receive priority for charging infrastructure land access approvals under current regulatory guidance.'
        ],
        highlights: [['location_on', 'Green Mobility', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$160 m', 'Total investment']],
        gated: ['15.1%', '6.8 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;160&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-mob-geographic-hotspots-1'], ['Project area', 'osip-mob-geographic-hotspots-2'], ['Equipment', 'osip-mob-geographic-hotspots-3'], ['Community and customers', 'osip-mob-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-mob-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Emeka Nwosu', 'Investor Relations Lead', '+234 803 555 0113', 'invest@green-mobility-3.ng']
    },
    {
        id: '2026-EEF-21',
        title: 'Commercial & Industrial Energy Efficiency',
        file: 'Energy-Efficiency-Commercial-Industrial-',
        stage: 2,
        updated: '09-Feb-2026',
        sector: 'Energy Efficiency', state: 'Lagos', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 60 m',
        lead: false,
        overview: [
            'Commercial and industrial users represent the strongest immediate market for energy efficiency investments. Rising diesel costs, energy-security concerns, and sustainability commitments are driving demand for HVAC upgrades, LED lighting retrofits, efficient motors, energy management systems, and ESCO-led solutions across manufacturing, healthcare, education, telecommunications, and commercial real estate sectors.'
        ],
        highlights: [['factory', 'Energy Efficiency', 'Sector'], ['map', 'Lagos', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$60 m', 'Total investment']],
        gated: ['15.8%', '7.6 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;60&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Commercial &amp; Industrial Energy Efficiency site', 'osip-eef-commercial-industrial-energy-efficie-1'], ['Project area', 'osip-eef-commercial-industrial-energy-efficie-2'], ['Equipment', 'osip-eef-commercial-industrial-energy-efficie-3'], ['Community and customers', 'osip-eef-commercial-industrial-energy-efficie-4']],
        video: ['Commercial & Industrial Energy Efficiency: Overview', 'osip-eef-commercial-industrial-energy-efficie-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Halima Bello', 'Investor Relations Lead', '+234 804 555 0114', 'invest@energy-efficiency-1.ng']
    },
    {
        id: '2026-EEF-22',
        title: 'Public Sector & Building Retrofits',
        file: 'Energy-Efficiency-Public-Sector-Building',
        stage: 3,
        updated: '27-Mar-2026',
        sector: 'Energy Efficiency', state: 'FCT Abuja', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 45 m',
        lead: false,
        overview: [
            'Public-sector energy retrofits represent a significant and growing opportunity, including street lighting upgrades, government-building retrofits, and energy management programme implementation. Building efficiency investments across offices, hospitals, and educational institutions offer measurable savings and serve as anchor projects for the broader market.'
        ],
        highlights: [['apartment', 'Energy Efficiency', 'Sector'], ['map', 'FCT Abuja', 'Location'], ['flag', 'Tender / procurement', 'Readiness'], ['payments', '$45 m', 'Total investment']],
        gated: ['13.0%', '8.4 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;45&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Public Sector &amp; Building Retrofits site', 'osip-eef-public-sector-building-retrofits-1'], ['Project area', 'osip-eef-public-sector-building-retrofits-2'], ['Equipment', 'osip-eef-public-sector-building-retrofits-3'], ['Community and customers', 'osip-eef-public-sector-building-retrofits-4']],
        video: ['Public Sector & Building Retrofits: Overview', 'osip-eef-public-sector-building-retrofits-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Tunde Adeyemi', 'Investor Relations Lead', '+234 805 555 0115', 'invest@energy-efficiency-2.ng']
    },
    {
        id: '2026-EEF-23',
        title: 'Geographic Hotspots',
        file: 'Energy-Efficiency-Geographic-Hotspots',
        stage: 1,
        updated: '14-May-2026',
        sector: 'Energy Efficiency', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 90 m',
        lead: false,
        overview: [
            'High-opportunity markets for energy efficiency investment are concentrated in major commercial and industrial centres, where energy costs are highest and demand for solutions is most immediate.'
        ],
        highlights: [['location_on', 'Energy Efficiency', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$90 m', 'Total investment']],
        gated: ['13.7%', '6.0 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;90&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-eef-geographic-hotspots-1'], ['Project area', 'osip-eef-geographic-hotspots-2'], ['Equipment', 'osip-eef-geographic-hotspots-3'], ['Community and customers', 'osip-eef-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-eef-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ngozi Eze', 'Investor Relations Lead', '+234 806 555 0116', 'invest@energy-efficiency-3.ng']
    },
    {
        id: '2026-CLC-21',
        title: 'LPG Production & Distribution Infrastructure',
        file: 'Clean-Cooking-LPG-Production-Distributio',
        stage: 2,
        updated: '12-Feb-2026',
        sector: 'Clean Cooking', state: 'Kano', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 110 m',
        lead: false,
        overview: [
            'LPG is the fastest-growing clean cooking fuel in Nigeria, with consumption reaching 1.3 million tonnes in 2023 from just 50,000 tonnes in 2007. Investment opportunities span domestic LPG production and refining, cylinder manufacturing and distribution, last-mile retail networks, and storage infrastructure. The OEM landscape is dominated by a few organised players — Techno Oil on cylinders and infrastructure, and Greenville LNG on gas-based cooking — with significant scope for new entrants to build distribution depth.'
        ],
        highlights: [['local_fire_department', 'Clean Cooking', 'Sector'], ['map', 'Kano', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$110 m', 'Total investment']],
        gated: ['14.4%', '6.8 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;110&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['LPG Production &amp; Distribution Infrastructure site', 'osip-clc-lpg-production-distribution-infrastr-1'], ['Project area', 'osip-clc-lpg-production-distribution-infrastr-2'], ['Equipment', 'osip-clc-lpg-production-distribution-infrastr-3'], ['Community and customers', 'osip-clc-lpg-production-distribution-infrastr-4']],
        video: ['LPG Production & Distribution Infrastructure: Overview', 'osip-clc-lpg-production-distribution-infrastr-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Sani Abdullahi', 'Investor Relations Lead', '+234 807 555 0117', 'invest@clean-cooking-1.ng']
    },
    {
        id: '2026-CLC-22',
        title: 'Clean Cooking Manufacturing & Supply Chain',
        file: 'Clean-Cooking-Clean-Cooking-Manufacturin',
        stage: 1,
        updated: '02-Apr-2026',
        sector: 'Clean Cooking', state: 'Kaduna', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 40 m',
        lead: false,
        overview: [
            'The manufacturing of clean cooking assets — improved cookstoves, eCooking appliances, biogas digesters, and LPG cylinders — represents the strongest long-term investment opportunity in the sector. The market is currently thin and fragmented: Burn Manufacturing leads on improved cookstoves regionally, local Nigerian manufacturers vary widely in quality, and the absence of standardisation limits bankability of results-based finance schemes. Investors who build reliable supply and certification infrastructure early will be well-positioned as the National Clean Cooking Policy\'s 2030 targets drive procurement decisions.'
        ],
        highlights: [['precision_manufacturing', 'Clean Cooking', 'Sector'], ['map', 'Kaduna', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$40 m', 'Total investment']],
        gated: ['15.1%', '7.6 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;40&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Clean Cooking Manufacturing &amp; Supply Chain site', 'osip-clc-clean-cooking-manufacturing-supply-c-1'], ['Project area', 'osip-clc-clean-cooking-manufacturing-supply-c-2'], ['Equipment', 'osip-clc-clean-cooking-manufacturing-supply-c-3'], ['Community and customers', 'osip-clc-clean-cooking-manufacturing-supply-c-4']],
        video: ['Clean Cooking Manufacturing & Supply Chain: Overview', 'osip-clc-clean-cooking-manufacturing-supply-c-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Folake Ogunleye', 'Investor Relations Lead', '+234 808 555 0118', 'invest@clean-cooking-2.ng']
    },
    {
        id: '2026-CLC-23',
        title: 'Geographic Hotspots',
        file: 'Clean-Cooking-Geographic-Hotspots',
        stage: 2,
        updated: '21-May-2026',
        sector: 'Clean Cooking', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 70 m',
        lead: false,
        overview: [
            'The greatest access deficit is concentrated in the North-West and North-East, which carry the largest unmet demand for clean cooking solutions. These regions represent the primary opportunity for cookstove distribution, LPG roll-out, and carbon finance-backed programmes targeting fuel-switching at household scale.'
        ],
        highlights: [['location_on', 'Clean Cooking', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$70 m', 'Total investment']],
        gated: ['15.8%', '8.4 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;70&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-clc-geographic-hotspots-1'], ['Project area', 'osip-clc-geographic-hotspots-2'], ['Equipment', 'osip-clc-geographic-hotspots-3'], ['Community and customers', 'osip-clc-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-clc-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Yakubu Danjuma', 'Investor Relations Lead', '+234 809 555 0119', 'invest@clean-cooking-3.ng']
    },
    {
        id: '2026-BIO-21',
        title: 'Key Prospects',
        file: 'Bioenergy-Key-Prospects',
        stage: 2,
        updated: '17-Feb-2026',
        sector: 'Bioenergy', state: 'Benue', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 150 m',
        lead: false,
        overview: [
            'Key prospects include cassava-to-bioethanol production in Kogi, Benue, Ogun, Ondo, and Cross River; rice husk biomass power in Kebbi, Niger, Ebonyi, Kano, and Taraba; and sugarcane bagasse energy in Niger, Adamawa, Kwara, and Taraba.',
            'Additional potential lies in palm oil biomass and biogas in Akwa Ibom, Cross River, Edo, Delta, and Rivers; municipal solid waste-to-energy in Lagos, FCT, Kano, Rivers, and Oyo; livestock waste-to-biogas in Ogun, Oyo, Kaduna, Plateau, and Kano; corn residue and biomass pellets; wood waste utilisation; food and agro-processing waste-to-biogas; integrated waste-to-energy with organic fertilizer; and methane capture from landfills.'
        ],
        highlights: [['eco', 'Bioenergy', 'Sector'], ['map', 'Benue', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$150 m', 'Total investment']],
        gated: ['13.0%', '6.0 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;150&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Key Prospects site', 'osip-bio-key-prospects-1'], ['Project area', 'osip-bio-key-prospects-2'], ['Equipment', 'osip-bio-key-prospects-3'], ['Community and customers', 'osip-bio-key-prospects-4']],
        video: ['Key Prospects: Overview', 'osip-bio-key-prospects-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Chioma Obi', 'Investor Relations Lead', '+234 800 555 0120', 'invest@bioenergy-1.ng']
    },
    {
        id: '2026-BIO-22',
        title: 'Institutional & Industrial Biogas',
        file: 'Bioenergy-Institutional-Industrial-Bioga',
        stage: 2,
        updated: '06-Apr-2026',
        sector: 'Bioenergy', state: 'Oyo', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 55 m',
        lead: false,
        overview: [
            'Institutional and industrial demand from hospitals, hotels, universities, and food processors is driving early adoption of biogas systems. These near-term opportunities offer predictable offtake from creditworthy counterparties and relatively modest capital requirements.'
        ],
        highlights: [['science', 'Bioenergy', 'Sector'], ['map', 'Oyo', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$55 m', 'Total investment']],
        gated: ['13.7%', '6.8 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;55&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Institutional &amp; Industrial Biogas site', 'osip-bio-institutional-industrial-biogas-1'], ['Project area', 'osip-bio-institutional-industrial-biogas-2'], ['Equipment', 'osip-bio-institutional-industrial-biogas-3'], ['Community and customers', 'osip-bio-institutional-industrial-biogas-4']],
        video: ['Institutional & Industrial Biogas: Overview', 'osip-bio-institutional-industrial-biogas-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Musa Garba', 'Investor Relations Lead', '+234 801 555 0121', 'invest@bioenergy-2.ng']
    },
    {
        id: '2026-BIO-23',
        title: 'Geographic Hotspots',
        file: 'Bioenergy-Geographic-Hotspots',
        stage: 1,
        updated: '26-May-2026',
        sector: 'Bioenergy', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 120 m',
        lead: false,
        overview: [
            'High-opportunity bioenergy markets span Nigeria\'s major agricultural zones and urban centres, from cassava belts in the southwest to rice husk corridors in the northwest and palm oil states in the south.'
        ],
        highlights: [['location_on', 'Bioenergy', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$120 m', 'Total investment']],
        gated: ['14.4%', '7.6 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;120&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-bio-geographic-hotspots-1'], ['Project area', 'osip-bio-geographic-hotspots-2'], ['Equipment', 'osip-bio-geographic-hotspots-3'], ['Community and customers', 'osip-bio-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-bio-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Bisi Afolabi', 'Investor Relations Lead', '+234 802 555 0122', 'invest@bioenergy-3.ng']
    },
    {
        id: '2026-AGR-21',
        title: 'Solar Irrigation & Agriculture Mini-Grids',
        file: 'Agriculture-PUE-Solar-Irrigation-Agricul',
        stage: 3,
        updated: '23-Jan-2026',
        sector: 'Agriculture PUE', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Tender / procurement', ministry: 'Federal Ministry of Power',
        cost: 'USD 85 m',
        lead: false,
        overview: [
            'One of the most immediate deployment opportunities is agriculture-anchored solar mini-grids under the DARES programme, supported by a US$750 million World Bank facility. In November 2025, REA commissioned a 50kWp solar mini-grid in Namu, Plateau State, under the Africa Mini Grids Programme, designed to power rice milling, cassava grating, and other agricultural value chains for over 1,555 beneficiaries. REA has confirmed plans to scale this model to 23 solar mini-grids nationally.'
        ],
        highlights: [['water_drop', 'Agriculture PUE', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Tender / procurement', 'Readiness'], ['payments', '$85 m', 'Total investment']],
        gated: ['15.1%', '8.4 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;85&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Solar Irrigation &amp; Agriculture Mini-Grids site', 'osip-agr-solar-irrigation-agriculture-mini-gr-1'], ['Project area', 'osip-agr-solar-irrigation-agriculture-mini-gr-2'], ['Equipment', 'osip-agr-solar-irrigation-agriculture-mini-gr-3'], ['Community and customers', 'osip-agr-solar-irrigation-agriculture-mini-gr-4']],
        video: ['Solar Irrigation & Agriculture Mini-Grids: Overview', 'osip-agr-solar-irrigation-agriculture-mini-gr-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ifeanyi Okeke', 'Investor Relations Lead', '+234 803 555 0123', 'invest@agriculture-pue-1.ng']
    },
    {
        id: '2026-AGR-22',
        title: 'Cold Storage, Agro-Processing & Crop Drying',
        file: 'Agriculture-PUE-Cold-Storage-Agro-Proces',
        stage: 2,
        updated: '11-Mar-2026',
        sector: 'Agriculture PUE', state: 'Kano', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Federal Ministry of Power',
        cost: 'USD 60 m',
        lead: false,
        overview: [
            'Cold storage and refrigeration infrastructure, agro-processing and milling equipment, and crop-drying assets represent proven investment opportunities. Energy costs for these applications can be reduced by up to 82% through productive use equipment in Nigerian mini-grids. These assets may be eligible for REF subsidies and are explicitly listed as eligible productive loads under the DARES programme.'
        ],
        highlights: [['ac_unit', 'Agriculture PUE', 'Sector'], ['map', 'Kano', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$60 m', 'Total investment']],
        gated: ['15.8%', '6.0 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;60&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Cold Storage, Agro-Processing &amp; Crop Drying site', 'osip-agr-cold-storage-agro-processing-crop-dr-1'], ['Project area', 'osip-agr-cold-storage-agro-processing-crop-dr-2'], ['Equipment', 'osip-agr-cold-storage-agro-processing-crop-dr-3'], ['Community and customers', 'osip-agr-cold-storage-agro-processing-crop-dr-4']],
        video: ['Cold Storage, Agro-Processing & Crop Drying: Overview', 'osip-agr-cold-storage-agro-processing-crop-dr-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Adaeze Okonkwo', 'Investor Relations Lead', '+234 804 555 0124', 'invest@agriculture-pue-2.ng']
    },
    {
        id: '2026-AGR-23',
        title: 'Asset Financing & Operating Models',
        file: 'Agriculture-PUE-Asset-Financing-Operatin',
        stage: 2,
        updated: '29-Apr-2026',
        sector: 'Agriculture PUE', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Private Sector Led', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 40 m',
        lead: false,
        overview: [
            'The strongest plays in Nigeria\'s agriculture PUE market are not in power supply alone, but in financing and operating the assets themselves. Results-based financing tied to energy savings, standalone PUE asset financing, and operating models that bundle asset deployment with mini-grid infrastructure are the deal formats currently attracting the most financing interest.'
        ],
        highlights: [['payments', 'Agriculture PUE', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$40 m', 'Total investment']],
        gated: ['13.0%', '6.8 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;40&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Asset Financing &amp; Operating Models site', 'osip-agr-asset-financing-operating-models-1'], ['Project area', 'osip-agr-asset-financing-operating-models-2'], ['Equipment', 'osip-agr-asset-financing-operating-models-3'], ['Community and customers', 'osip-agr-asset-financing-operating-models-4']],
        video: ['Asset Financing & Operating Models: Overview', 'osip-agr-asset-financing-operating-models-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Emeka Nwosu', 'Investor Relations Lead', '+234 805 555 0125', 'invest@agriculture-pue-3.ng']
    },
    {
        id: '2026-AGR-24',
        title: 'Geographic Hotspots',
        file: 'Agriculture-PUE-Geographic-Hotspots',
        stage: 1,
        updated: '04-Jun-2026',
        sector: 'Agriculture PUE', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 110 m',
        lead: false,
        overview: [
            'The highest concentration of opportunity sits in the North-Central crop belt, North-West and North-East high off-grid agricultural zones, South-West agribusiness markets, and South-East and South-South processing corridors.'
        ],
        highlights: [['location_on', 'Agriculture PUE', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$110 m', 'Total investment']],
        gated: ['13.7%', '7.6 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;110&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-agr-geographic-hotspots-1'], ['Project area', 'osip-agr-geographic-hotspots-2'], ['Equipment', 'osip-agr-geographic-hotspots-3'], ['Community and customers', 'osip-agr-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-agr-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Halima Bello', 'Investor Relations Lead', '+234 806 555 0126', 'invest@agriculture-pue-4.ng']
    },
    {
        id: '2026-HYG-21',
        title: 'Green Ammonia & Industrial Decarbonisation',
        file: 'Green-Hydrogen-Green-Ammonia-Industrial-',
        stage: 1,
        updated: '26-Feb-2026',
        sector: 'Green Hydrogen', state: 'Rivers', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 480 m',
        lead: false,
        overview: [
            'The strongest near-term opportunities exist in green ammonia production, fertiliser sector decarbonisation, industrial fuel switching, renewable-powered industrial parks, hydrogen export infrastructure, and strategic partnerships for electrolyser deployment. Northern Nigeria offers strong production potential due to high solar irradiation and land availability, while coastal regions provide advantages for export-oriented projects through existing port and industrial infrastructure.',
            'For early investors, the greatest opportunity lies in securing strategic positions ahead of future industrial demand, export market growth, and increasing international climate-finance and green industrial investment flows.'
        ],
        highlights: [['science', 'Green Hydrogen', 'Sector'], ['map', 'Rivers', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$480 m', 'Total investment']],
        gated: ['14.4%', '8.4 yrs', 'USD 1M', '5 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;480&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Green Ammonia &amp; Industrial Decarbonisation site', 'osip-hyg-green-ammonia-industrial-decarbonisa-1'], ['Project area', 'osip-hyg-green-ammonia-industrial-decarbonisa-2'], ['Equipment', 'osip-hyg-green-ammonia-industrial-decarbonisa-3'], ['Community and customers', 'osip-hyg-green-ammonia-industrial-decarbonisa-4']],
        video: ['Green Ammonia & Industrial Decarbonisation: Overview', 'osip-hyg-green-ammonia-industrial-decarbonisa-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Tunde Adeyemi', 'Investor Relations Lead', '+234 807 555 0127', 'invest@green-hydrogen-1.ng']
    },
    {
        id: '2026-HYG-22',
        title: 'Export-Oriented & Value Chain Opportunities',
        file: 'Green-Hydrogen-Export-Oriented-Value-Cha',
        stage: 2,
        updated: '15-Apr-2026',
        sector: 'Green Hydrogen', state: 'Lagos', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Under preparation', ministry: 'Federal Ministry of Power',
        cost: 'USD 650 m',
        lead: false,
        overview: [
            'The sector supports multiple investment pathways across the value chain, including project development, technology supply, engineering services, infrastructure development, manufacturing partnerships, and export-oriented production facilities. Investors can participate through green methanol production, hydrogen-powered transport solutions, off-grid energy systems, hydrogen storage, and export infrastructure.'
        ],
        highlights: [['directions_boat', 'Green Hydrogen', 'Sector'], ['map', 'Lagos', 'Location'], ['flag', 'Under preparation', 'Readiness'], ['payments', '$650 m', 'Total investment']],
        gated: ['15.1%', '6.0 yrs', 'USD 2M', '6 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;650&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Export-Oriented &amp; Value Chain Opportunities site', 'osip-hyg-export-oriented-value-chain-opportun-1'], ['Project area', 'osip-hyg-export-oriented-value-chain-opportun-2'], ['Equipment', 'osip-hyg-export-oriented-value-chain-opportun-3'], ['Community and customers', 'osip-hyg-export-oriented-value-chain-opportun-4']],
        video: ['Export-Oriented & Value Chain Opportunities: Overview', 'osip-hyg-export-oriented-value-chain-opportun-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Ngozi Eze', 'Investor Relations Lead', '+234 808 555 0128', 'invest@green-hydrogen-2.ng']
    },
    {
        id: '2026-HYG-23',
        title: 'Geographic Hotspots',
        file: 'Green-Hydrogen-Geographic-Hotspots',
        stage: 1,
        updated: '08-Jun-2026',
        sector: 'Green Hydrogen', state: 'Multi-State', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Concept', ministry: 'Federal Ministry of Power',
        cost: 'USD 350 m',
        lead: false,
        overview: [
            'Northern Nigeria offers strong long-term production potential due to high solar irradiation, land availability, and renewable energy resources. Coastal regions provide strategic advantages for export-oriented projects through existing industrial zones, ports, and Free Trade Zones.'
        ],
        highlights: [['location_on', 'Green Hydrogen', 'Sector'], ['map', 'Multi-State', 'Location'], ['flag', 'Concept', 'Readiness'], ['payments', '$350 m', 'Total investment']],
        gated: ['15.8%', '6.8 yrs', 'USD 3M', '7 yrs'],
        brief: 'Indicative capital outlay is USD&nbsp;350&nbsp;m. Site details, commercial terms and the return profile will be published here once the responsible agency confirms them.',
        images: [['Geographic Hotspots site', 'osip-hyg-geographic-hotspots-1'], ['Project area', 'osip-hyg-geographic-hotspots-2'], ['Equipment', 'osip-hyg-geographic-hotspots-3'], ['Community and customers', 'osip-hyg-geographic-hotspots-4']],
        video: ['Geographic Hotspots: Overview', 'osip-hyg-geographic-hotspots-video'],
        docs: [['Investment Memorandum', '2.4', 40], ['Market Assessment', '3.8', 72], ['Environmental and Social Summary', '1.6', 30], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Sani Abdullahi', 'Investor Relations Lead', '+234 809 555 0129', 'invest@green-hydrogen-3.ng']
    },
    /* ---- Enugu: the state profile's three projects (17 Sep 2026) ----------------------
       UX-LNK-11. The three cards on pages/Enugu.html carried IDs but no records, so
       "View in Detail" opened detailedOppNew.html with no id and every one of them
       landed on Katsina Wind Farm. They are records now, so each card opens its own
       page.

       These are the STATE's projects, listed on the state profile, not part of the
       clean energy pipeline on Opportunities.html: their sectors are Enugu's own
       (agriculture, energy and mining, tourism) rather than the ten OSIP publishes,
       so nothing here is filtered into that list. Figures, dates, documents and
       contacts are illustrative placeholders, as everywhere else in this file, until
       ESIDA supplies the approved data. */
    {
        id: '2026-ENU-01',
        track: 'readiness',   // shown on the readiness axis; Seeking investor interest
        title: 'Enugu Agro-Industrial Cluster',
        file: 'Enugu-Agro-Industrial-Cluster',
        stage: 1,
        updated: '08-Jul-2026',
        sector: 'Agriculture', state: 'Enugu', start: '01-Jan-2027', end: '31-Dec-2030',
        promoter: 'Public-Private Partnership', status: 'Seeking investor interest', ministry: 'Enugu State Investment Development Authority',
        cost: 'USD 450 m',
        overview: [
            'is a planned cluster in the Nsukka zone, where Enugu\'s farmland is to be paired with processing, cold storage and power on one serviced site rather than scattered across the value chain.',
            'Enugu State is seeking investor interest ahead of detailed design, with positions open to processors, equipment suppliers, logistics operators and equity. Site boundaries, serviced infrastructure and the incentive package are matters for ESIDA, and are published here once the state confirms them.'
        ],
        highlights: [['agriculture', 'Agriculture', 'Sector'], ['map', 'Nsukka zone', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$450 m', 'Total investment']],
        gated: ['16.0%', '7.0 yrs', 'USD 2M', '7 yrs'],
        brief: 'The cluster packages farmland, processing and on-site power into one serviced location in the Nsukka zone, so an investor takes a plot inside working infrastructure rather than building it. Indicative capital outlay is USD&nbsp;450&nbsp;m across the programme. Tenancy terms, the incentive package and the return profile will be published here once Enugu State confirms them.',
        images: [['Cluster site', 'osip-enu-agro-site'], ['Processing hall', 'osip-enu-agro-plant'], ['Cold storage', 'osip-enu-agro-store'], ['Access road', 'osip-enu-agro-road']],
        video: ['Enugu Agro-Industrial Cluster: Overview', 'osip-enu-agro-video'],
        docs: [['Investment Memorandum', '2.2', 38], ['Cluster Master Plan', '3.6', 64], ['Environmental and Social Summary', '1.5', 28], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Chika Eze', 'Investor Desk Lead', '+234 803 555 0161', 'invest@esida-enugu.ng']
    },
    {
        id: '2026-ENU-02',
        track: 'readiness',   // shown on the readiness axis; Seeking investor interest
        title: 'Enugu Coal-to-Power Programme',
        file: 'Enugu-Coal-to-Power',
        stage: 1,
        updated: '08-Jul-2026',
        sector: 'Energy & Mining', state: 'Enugu', start: '01-Jul-2027', end: '30-Jun-2032',
        promoter: 'Public-Private Partnership', status: 'Seeking investor interest', ministry: 'Enugu State Investment Development Authority',
        cost: 'USD 1.2 bn',
        overview: [
            'is the state\'s programme to generate power from the coal reserves around the Coal City, the deposits Enugu has been known for since the field opened in 1909 and which have carried no generation since.',
            'Enugu State is seeking investor interest ahead of feasibility. A plant of this kind is licensed by NERC, connected under a TCN agreement, and carries a full environmental impact assessment with FMEnv and NESREA - the emissions case, the mine plan and the offtake are the three things an investor will be asked to close, and none of them is settled yet.'
        ],
        highlights: [['bolt', 'Energy & Mining', 'Sector'], ['map', 'Coal City', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$1.2 bn', 'Total investment']],
        gated: ['17.5%', '8.5 yrs', 'USD 25M', '10 yrs'],
        brief: 'The programme pairs the Enugu coalfield with generation on or near the reserve. Indicative capital outlay is USD&nbsp;1.2&nbsp;bn. Capacity, the mine plan, the emissions case and the offtake structure are subjects of the feasibility work now being scoped, and will be published here once the responsible agency confirms them.',
        images: [['Coalfield', 'osip-enu-coal-field'], ['Generation site', 'osip-enu-coal-plant'], ['Grid substation', 'osip-enu-coal-grid'], ['Haul route', 'osip-enu-coal-road']],
        video: ['Enugu Coal-to-Power: Overview', 'osip-enu-coal-video'],
        docs: [['Investment Memorandum', '2.8', 46], ['Resource Statement', '4.2', 88], ['Environmental and Social Framework', '2.1', 44], ['Indicative Term Sheet', '0.7', 9]],
        contact: ['Emeka Nwosu', 'Programme Lead', '+234 803 555 0162', 'invest@esida-enugu.ng']
    },
    {
        id: '2026-ENU-03',
        track: 'readiness',   // shown on the readiness axis; Seeking investor interest
        title: 'Awhum Waterfall Eco-Resort',
        file: 'Awhum-Waterfall-Eco-Resort',
        stage: 1,
        updated: '08-Jul-2026',
        sector: 'Tourism & Hospitality', state: 'Enugu', start: '01-Apr-2027', end: '30-Sep-2029',
        promoter: 'Private Sector Led', status: 'Seeking investor interest', ministry: 'Enugu State Investment Development Authority',
        cost: 'USD 85 m',
        overview: [
            'is a resort proposed at the Awhum waterfall and cave in Udi, one of the sites Enugu already draws visitors to, with accommodation, access works and an off-grid supply on a site that has none.',
            'Enugu State is seeking investor interest ahead of detailed design. Land access at the site runs through the state, and the scale of building a protected landscape will carry is the first question the feasibility work has to answer.'
        ],
        highlights: [['forest', 'Tourism', 'Sector'], ['map', 'Udi', 'Location'], ['flag', 'Seeking investor interest', 'Readiness'], ['payments', '$85 m', 'Total investment']],
        gated: ['14.5%', '8.0 yrs', 'USD 1M', '8 yrs'],
        brief: 'The resort is proposed at the Awhum waterfall in Udi, with rooms, access works and its own power on a site that is off the grid. Indicative capital outlay is USD&nbsp;85&nbsp;m. Room count, land terms and the return profile will be published here once Enugu State confirms them.',
        images: [['Awhum waterfall', 'osip-enu-awhum-falls'], ['Resort concept', 'osip-enu-awhum-resort'], ['Access path', 'osip-enu-awhum-path'], ['Off-grid supply', 'osip-enu-awhum-power']],
        video: ['Awhum Waterfall Eco-Resort: Overview', 'osip-enu-awhum-video'],
        docs: [['Investment Memorandum', '1.9', 32], ['Site and Feasibility Note', '2.7', 48], ['Environmental and Social Summary', '1.4', 26], ['Indicative Term Sheet', '0.5', 7]],
        contact: ['Adaeze Ugwu', 'Investor Desk', '+234 803 555 0163', 'invest@esida-enugu.ng']
    }
];

