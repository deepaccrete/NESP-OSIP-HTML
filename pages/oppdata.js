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
     stage              1 Under Conceptualization, 2 Under Development,
                        3 Under Implementation, 4 Completed
     updated            "Last Updated on" date
     sector, state, start, end, promoter, status, ministry
                        the Project Details grid, in its order
     cost               "Total Project Cost"
     overview           Project Overview paragraphs (HTML); the first opens
                        with the project title automatically
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
        video: ['Solar Power Naija : Programme Overview', 'osip-sol-walkthrough'],
        docs: [['Investment Memorandum', '3.1', 56], ['Programme Design Report', '4.6', 94], ['Environmental and Social Framework', '1.9', 40], ['Indicative Term Sheet', '0.7', 9]],
        contact: ['Ngozi Eze', 'Programme Manager', '+234 802 345 6789', 'promoter@solarpowernaija.ng']
    },
    {
        id: '2025-WND-02',
        title: 'Katsina Wind Farm Phase I',
        file: 'Katsina-Wind',
        stage: 2,
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
        video: ['Katsina Wind Farm : Site Walkthrough', 'akk-walkthrough'],
        docs: [['Investment Memorandum', '2.4', 48], ['Technical Feasibility Report', '5.8', 112], ['Environmental Impact Summary', '1.7', 32], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Adebayo Okonkwo', 'Director of Operations', '+234 801 234 5678', 'promoter@katsinawindfarm.ng']
    },
    {
        id: '2024-STG-07',
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
        video: ['Nasarawa Lithium Hub : Site Overview', 'osip-nsl-walkthrough'],
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
        video: ['Cross River Hydro : Catchment Survey', 'osip-crh-walkthrough'],
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
        video: ['Lagos EV Network : Pilot Hub Tour', 'osip-lev-walkthrough'],
        docs: [['Investment Memorandum', '2.2', 40], ['Demand and Siting Study', '3.7', 74], ['Grid Impact Summary', '1.2', 24], ['Concession Outline', '0.6', 10]],
        contact: ['Tunde Bakare', 'Head of Mobility Projects', '+234 806 789 0123', 'promoter@lagosevnetwork.ng']
    },
    {
        id: '2025-EEF-03',
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
        video: ['Ogun Efficiency Programme : Retrofit Tour', 'osip-oge-walkthrough'],
        docs: [['Investment Memorandum', '1.9', 36], ['Energy Audit Summary', '3.3', 64], ['Measurement and Verification Plan', '1.1', 20], ['Indicative Term Sheet', '0.5', 7]],
        contact: ['Folake Adeyemi', 'Programme Director', '+234 807 890 1234', 'promoter@ogunefficiency.ng']
    },
    {
        id: '2025-CLC-02',
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
        video: ['Kano Clean Cooking : Field Visit', 'osip-knc-walkthrough'],
        docs: [['Concept Note', '1.3', 20], ['Market Assessment', '3.9', 70], ['Carbon Finance Summary', '1.0', 18], ['Validation Plan', '0.6', 9]],
        contact: ['Aisha Bello', 'Programme Lead', '+234 808 901 2345', 'promoter@kanocleancooking.ng']
    },
    {
        id: '2025-BIO-05',
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
        video: ['Benue Biomass Plant : Feedstock Tour', 'osip-bnb-walkthrough'],
        docs: [['Investment Memorandum', '2.5', 44], ['Feedstock Assessment', '4.1', 78], ['Environmental Impact Summary', '1.8', 34], ['Indicative Term Sheet', '0.6', 8]],
        contact: ['Terver Akaa', 'Project Manager', '+234 809 012 3456', 'promoter@benuebiopower.ng']
    },
    {
        id: '2025-HYG-01',
        title: 'Green Hydrogen Niger Delta Pilot',
        file: 'Niger-Delta-Green-Hydrogen',
        stage: 2,
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
        video: ['Niger Delta Hydrogen : Pilot Site', 'osip-ghn-walkthrough'],
        docs: [['Investment Memorandum', '3.4', 60], ['Technical Feasibility Report', '6.8', 140], ['Environmental Impact Summary', '2.2', 42], ['Indicative Term Sheet', '0.7', 9]],
        contact: ['Chinedu Okafor', 'Head of Project Development', '+234 810 123 4567', 'promoter@nigerdeltahydrogen.ng']
    }
];
