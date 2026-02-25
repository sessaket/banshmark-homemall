$features = @(
    [ordered]@{ id = 'listings'; label = 'Listings' },
    [ordered]@{ id = 'map'; label = 'Map' },
    [ordered]@{ id = 'advancedFilters'; label = 'Advanced Filters' },
    [ordered]@{ id = 'favorites'; label = 'Favorites / Saved' },
    [ordered]@{ id = 'priceEstimates'; label = 'Price Estimates' },
    [ordered]@{ id = 'areaGuides'; label = 'Area Guides / Neighborhood Data' },
    [ordered]@{ id = 'mortgageTools'; label = 'Mortgage / Rent Tools' },
    [ordered]@{ id = 'investmentTools'; label = 'Investment / ROI Tools' },
    [ordered]@{ id = 'newProjects'; label = 'New Projects / Developers' },
    [ordered]@{ id = 'govServices'; label = 'Gov Housing Services' },
    [ordered]@{ id = 'aiAssistant'; label = 'AI Assistant / Chat' }
)

$coverageTemplates = @{
    classifieds = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true }
    portal = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; areaGuides = $true; mortgageTools = $true; newProjects = $true }
    analytics_portal = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; priceEstimates = $true; areaGuides = $true; mortgageTools = $true; investmentTools = $true; newProjects = $true; aiAssistant = $false }
    government = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; govServices = $true }
    rentals = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; areaGuides = $true; mortgageTools = $true; priceEstimates = $true }
    commercial = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; areaGuides = $true; investmentTools = $true }
    investment = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true; priceEstimates = $true; areaGuides = $true; mortgageTools = $true; investmentTools = $true; aiAssistant = $false }
    legacy = @{ listings = $true; map = $true; advancedFilters = $true; favorites = $true }
}

$profiles = @{
    classifieds = @{
        businessModel = @(
            'Paid listing boosts and visibility packages',
            'Display advertising and partner campaigns',
            'Lead monetization for brokers and developers'
        )
        coreFeatures = @(
            'Large sale/rent listing inventory',
            'Map-based browsing experience',
            'Filter by budget, area, and property type',
            'Saved listings and search alerts',
            'In-app chat/call lead handoff',
            'Agency and owner profile pages'
        )
        strengths = @(
            'Very high traffic and listing velocity',
            'Fast posting workflow for supply side',
            'Strong mobile engagement in target market'
        )
        weaknesses = @(
            'Listing quality can vary by city',
            'Lower depth of valuation analytics',
            'Verification standards vary by seller'
        )
        differentiators = @(
            'Horizontal marketplace scale often outpaces niche portals'
        )
    }
    portal = @{
        businessModel = @(
            'Subscription packages for agencies/developers',
            'Premium placement and lead products',
            'Advertising and partner monetization'
        )
        coreFeatures = @(
            'Residential sale and rental listings',
            'Interactive map and neighborhood browse',
            'Advanced filters and sort controls',
            'Saved searches and listing alerts',
            'Developer and new-project pages',
            'Mortgage or affordability tools (market dependent)'
        )
        strengths = @(
            'High-intent category-specific audience',
            'Cleaner UX than generic classifieds',
            'Strong lead conversion for professional agents'
        )
        weaknesses = @(
            'Lead quality can fluctuate by city',
            'Heavy dependence on agency inventory',
            'Feature depth varies by market rollout'
        )
        differentiators = @(
            'Brand trust in focused real-estate search journeys'
        )
    }
    analytics_portal = @{
        businessModel = @(
            'Lead products for broker and developer clients',
            'Premium analytics subscriptions (Likely)',
            'Advertising and data-partner integrations'
        )
        coreFeatures = @(
            'Listings marketplace and map search',
            'Price estimate or value insight module',
            'Neighborhood trend indicators',
            'Advanced filters and saved alerts',
            'Affordability or financing calculators',
            'Investment-oriented metrics (Likely)'
        )
        strengths = @(
            'Data-led positioning beyond raw inventory',
            'Supports pricing and negotiation decisions',
            'Differentiated from pure lead directories'
        )
        weaknesses = @(
            'Coverage can be uneven outside core cities',
            'Methodology transparency may be limited',
            'Some analytics are Likely/experimental'
        )
        differentiators = @(
            'Decision-intelligence messaging paired with marketplace scale'
        )
    }
    government = @{
        businessModel = @(
            'Government-funded public digital service',
            'Integrated eligibility and subsidy workflows',
            'No direct listing-ad dependency'
        )
        coreFeatures = @(
            'Program eligibility and application steps',
            'Subsidy and financing support flows',
            'Project catalogs and delivery status tracking',
            'Identity-linked beneficiary accounts',
            'Partner bank/developer integration points',
            'Citizen support channels and updates'
        )
        strengths = @(
            'High policy relevance and trust',
            'Can reduce friction in entitlement process',
            'Strong integration with public stakeholders'
        )
        weaknesses = @(
            'UX polish can lag private products',
            'Feature velocity depends on regulation',
            'Data synchronization across systems is hard'
        )
        differentiators = @(
            'Official service authority and direct policy linkage'
        )
    }
    rentals = @{
        businessModel = @(
            'Property-manager subscriptions and SaaS upsells',
            'Premium leads for landlords and PMs',
            'Advertising and tenant-screening add-ons'
        )
        coreFeatures = @(
            'Rental-first listing discovery',
            'Map and commute-aware exploration',
            'Advanced filters for rent-focused search',
            'Saved homes and alerts',
            'Application/contact lead flows',
            'Rent estimate or affordability aids (Likely)'
        )
        strengths = @(
            'Strong renter intent and repeat usage',
            'Operational tooling for landlords',
            'Good fit for fast-moving urban markets'
        )
        weaknesses = @(
            'For-sale inventory is often limited',
            'Lead quality varies by location',
            'Dependence on PM integrations for freshness'
        )
        differentiators = @(
            'Rental lifecycle focus versus broad listing breadth'
        )
    }
    commercial = @{
        businessModel = @(
            'Subscription products for brokers and CRE firms',
            'Premium exposure for high-value assets',
            'Advertising and data products for professionals'
        )
        coreFeatures = @(
            'Commercial listing inventory',
            'Map layers and geospatial search',
            'Advanced filters by asset class',
            'Saved searches and portfolio watchlists',
            'Broker and firm directories',
            'Investment indicators (Likely)'
        )
        strengths = @(
            'Targets high-value B2B use cases',
            'Useful for professional investors',
            'Strong channel for specialized leads'
        )
        weaknesses = @(
            'Steeper learning curve for consumers',
            'Lower relevance for residential users',
            'Advanced data often sits in paid tiers'
        )
        differentiators = @(
            'Commercial-first focus with investor-oriented workflows'
        )
    }
    investment = @{
        businessModel = @(
            'Referral fees and financing partnerships',
            'Premium analytics and advisory products',
            'Lead generation for developers/investors'
        )
        coreFeatures = @(
            'ROI and yield-oriented property exploration',
            'Scenario comparison workflows (Likely)',
            'Market trend dashboards and pricing context',
            'Affordability and financing calculators',
            'Saved watchlists and project tracking',
            'Guided recommendations or assistant flows (Likely)'
        )
        strengths = @(
            'Decision support beyond raw listing search',
            'Appeals to investor and serious buyer segments',
            'Supports scenario planning and benchmarking'
        )
        weaknesses = @(
            'Coverage may be narrower than major portals',
            'Metrics may require interpretation expertise',
            'Some insights are Likely estimates'
        )
        differentiators = @(
            'Investment lens and scenario-oriented product framing'
        )
    }
    legacy = @{
        businessModel = @(
            'Legacy listing monetization model (Likely)',
            'Advertising and broker leads (Likely)',
            'Current operating model Unknown'
        )
        coreFeatures = @(
            'Property listing catalog (Likely)',
            'Basic search and filtering (Likely)',
            'Saved or contact flows (Likely)',
            'Coverage footprint Unknown',
            'Current product depth Unknown',
            'Legacy brand references in market'
        )
        strengths = @(
            'Residual brand recognition in some markets',
            'Historic listing footprint',
            'Can still appear in user search journeys'
        )
        weaknesses = @(
            'Current activity level is Unknown',
            'Feature roadmap visibility is limited',
            'Potential migration to successor brands'
        )
        differentiators = @(
            'Legacy positioning with uncertain current execution'
        )
    }
}

$nonWebsiteDomains = @(
    'apps.apple.com',
    'play.google.com',
    'itunes.apple.com',
    'appgallery.huawei.com'
)

function Get-PrimaryDomain {
    param(
        [string[]]$Sources
    )

    foreach ($source in $Sources) {
        if (-not $source) { continue }
        $domain = $source.Trim().ToLower()
        if (-not $domain) { continue }
        if ($nonWebsiteDomains -contains $domain) { continue }
        return $domain
    }

    return $null
}

function New-App {
    param(
        [Parameter(Mandatory = $true)][string]$Id,
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$Region,
        [Parameter(Mandatory = $true)][string[]]$Countries,
        [Parameter(Mandatory = $true)][string]$Type,
        [Parameter(Mandatory = $true)][string]$Profile,
        [Parameter(Mandatory = $true)][string[]]$Sources,
        [string[]]$Tags = @(),
        [string]$Notes = '',
        [hashtable]$CoverageOverride = $null,
        [hashtable]$TextOverride = $null,
        [string]$LogoPath = $null
    )

    $template = $profiles[$Profile]
    if (-not $template) {
        throw "Unknown profile: $Profile"
    }

    $baseCoverage = $coverageTemplates[$Profile]
    $coverage = [ordered]@{}
    foreach ($feature in $features) {
        $fid = $feature.id
        $val = $false
        if ($baseCoverage -and $baseCoverage.ContainsKey($fid)) {
            $val = [bool]$baseCoverage[$fid]
        }
        $coverage[$fid] = $val
    }

    if ($CoverageOverride) {
        foreach ($key in $CoverageOverride.Keys) {
            $coverage[$key] = [bool]$CoverageOverride[$key]
        }
    }

    $primaryDomain = Get-PrimaryDomain -Sources $Sources
    $website = if ($primaryDomain) { "https://$primaryDomain" } else { $null }
    $resolvedLogoPath = if ($LogoPath) {
        $LogoPath
    } elseif ($primaryDomain) {
        "https://www.google.com/s2/favicons?domain=$primaryDomain&sz=256"
    } else {
        $null
    }
    $logoNote = if ($LogoPath) {
        'Official/press logo stored locally'
    } elseif ($primaryDomain) {
        'Remote logo/fav icon from primary source domain (internet required)'
    } else {
        'No logo source domain available; fallback badge in deck'
    }

    $app = [ordered]@{
        id = $Id
        name = $Name
        region = $Region
        countries = $Countries
        type = $Type
        businessModel = @($template.businessModel)
        coreFeatures = @($template.coreFeatures)
        strengths = @($template.strengths)
        weaknesses = @($template.weaknesses)
        differentiators = @($template.differentiators)
        primaryDomain = $primaryDomain
        website = $website
        sources = $Sources
        featureCoverage = $coverage
        tags = $Tags
        notes = $Notes
        logo = [ordered]@{
            path = $resolvedLogoPath
            note = $logoNote
        }
    }

    if ($TextOverride) {
        foreach ($k in $TextOverride.Keys) {
            $app[$k] = $TextOverride[$k]
        }
    }

    return $app
}

$appDefs = @(
    @{ id = 'avito-ma'; name = 'Avito.ma'; region = 'Morocco'; countries = @('MA'); type = 'Classifieds'; profile = 'classifieds'; sources = @('avito.ma', 'apps.apple.com', 'play.google.com') },
    @{ id = 'mubawab-ma'; name = 'Mubawab.ma'; region = 'Morocco'; countries = @('MA'); type = 'Portal'; profile = 'portal'; sources = @('mubawab.ma', 'apps.apple.com', 'play.google.com') },
    @{ id = 'sarouty-ma'; name = 'Sarouty.ma'; region = 'Morocco'; countries = @('MA'); type = 'Portal'; profile = 'portal'; sources = @('sarouty.ma', 'apps.apple.com', 'play.google.com') },
    @{
        id = 'agenz-ma'
        name = 'Agenz.ma'
        region = 'Morocco'
        countries = @('MA')
        type = 'Analytics Marketplace'
        profile = 'analytics_portal'
        sources = @('agenz.ma', 'apps.apple.com', 'play.google.com')
        coverage = @{ aiAssistant = $false }
        notes = 'Verified from agenz.ma + App Store listing on 2026-02-25.'
        text = @{
            businessModel = @(
                'Lead generation for buyers, sellers, and agencies',
                'Data-driven property valuation and market insight products',
                'Transaction support and advisory flows'
            )
            coreFeatures = @(
                'Property search with map and advanced filters',
                'Price estimate tool and valuation indicators',
                'Neighborhood and city-level market insights',
                'Alerts and saved listings',
                'New project discovery',
                'Seller-focused tools and listing workflows'
            )
            strengths = @(
                'Strong valuation and pricing-intelligence positioning in Morocco',
                'Clear data-centric product narrative',
                'Combines discovery with decision-support modules'
            )
            weaknesses = @(
                'Depth can vary outside main cities',
                'Methodology transparency details are limited in-app',
                'High-trust valuation use cases require continual data updates'
            )
        }
    },
    @{ id = 'marocannonces'; name = 'MarocAnnonces'; region = 'Morocco'; countries = @('MA'); type = 'Classifieds'; profile = 'classifieds'; sources = @('marocannonces.com', 'apps.apple.com') },
    @{ id = 'logicimmo-maroc'; name = 'Logic-Immo Maroc'; region = 'Morocco'; countries = @('MA'); type = 'Portal'; profile = 'legacy'; sources = @('logic-immo.ma', 'logicimmo.com'); notes = 'Current Morocco footprint is Likely smaller than peak years.' },
    @{ id = 'immoweb-ma'; name = 'Immoweb.ma'; region = 'Morocco'; countries = @('MA'); type = 'Portal'; profile = 'portal'; sources = @('immoweb.ma', 'apps.apple.com'); notes = 'Public feature set appears basic; some capabilities are Unknown.' },

    @{ id = 'bayut-uae'; name = 'Bayut (UAE)'; region = 'Arab World / MENA'; countries = @('AE'); type = 'Portal'; profile = 'portal'; sources = @('bayut.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true; aiAssistant = $true } },
    @{ id = 'bayut-sa'; name = 'Bayut Saudi'; region = 'Arab World / MENA'; countries = @('SA'); type = 'Portal'; profile = 'portal'; sources = @('bayut.sa', 'apps.apple.com', 'play.google.com'); coverage = @{ aiAssistant = $true } },
    @{ id = 'propertyfinder-mena'; name = 'Property Finder'; region = 'Arab World / MENA'; countries = @('AE', 'SA', 'QA', 'BH', 'EG'); type = 'Portal'; profile = 'portal'; sources = @('propertyfinder.ae', 'propertyfinder.sa', 'apps.apple.com'); coverage = @{ aiAssistant = $true } },
    @{ id = 'dubizzle-uae'; name = 'Dubizzle (Property)'; region = 'Arab World / MENA'; countries = @('AE'); type = 'Classifieds'; profile = 'classifieds'; sources = @('dubizzle.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'opensooq'; name = 'OpenSooq (Property)'; region = 'Arab World / MENA'; countries = @('JO', 'SA', 'KW', 'OM', 'IQ'); type = 'Classifieds'; profile = 'classifieds'; sources = @('opensooq.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'haraj-property'; name = 'Haraj (Property Section)'; region = 'Arab World / MENA'; countries = @('SA'); type = 'Classifieds'; profile = 'classifieds'; sources = @('haraj.com.sa', 'apps.apple.com', 'play.google.com') },
    @{ id = 'wasalt-sa'; name = 'Wasalt'; region = 'Arab World / MENA'; countries = @('SA'); type = 'Analytics Marketplace'; profile = 'analytics_portal'; sources = @('wasalt.sa', 'apps.apple.com', 'play.google.com') },
    @{ id = 'sakani-sa'; name = 'Sakani'; region = 'Arab World / MENA'; countries = @('SA'); type = 'Government Housing Platform'; profile = 'government'; sources = @('sakani.sa', 'my.gov.sa', 'apps.apple.com') },
    @{ id = 'aqarmap-eg'; name = 'Aqarmap'; region = 'Arab World / MENA'; countries = @('EG'); type = 'Portal'; profile = 'analytics_portal'; sources = @('aqarmap.com', 'apps.apple.com', 'play.google.com'); coverage = @{ aiAssistant = $false } },
    @{ id = 'nawy-eg'; name = 'Nawy'; region = 'Arab World / MENA'; countries = @('EG'); type = 'Investment-Focused Marketplace'; profile = 'investment'; sources = @('nawy.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'aqar-fm'; name = 'Aqar.fm'; region = 'Arab World / MENA'; countries = @('SA'); type = 'Classifieds'; profile = 'classifieds'; sources = @('aqar.fm', 'apps.apple.com', 'play.google.com'); coverage = @{ newProjects = $true } },
    @{ id = 'qatar-living-property'; name = 'Qatar Living Property'; region = 'Arab World / MENA'; countries = @('QA'); type = 'Classifieds'; profile = 'classifieds'; sources = @('qatarliving.com', 'apps.apple.com') },
    @{ id = 'sakan-jo'; name = 'Sakan'; region = 'Arab World / MENA'; countries = @('JO'); type = 'Portal'; profile = 'portal'; sources = @('sakan.co', 'apps.apple.com', 'play.google.com') },
    @{ id = 'justproperty-ae'; name = 'JustProperty'; region = 'Arab World / MENA'; countries = @('AE'); type = 'Portal'; profile = 'legacy'; sources = @('justproperty.com', 'propertyfinder.group'); notes = 'Likely absorbed into broader PF group assets; standalone roadmap Unknown.' },
    @{ id = 'olx-eg-property'; name = 'OLX Egypt Property'; region = 'Arab World / MENA'; countries = @('EG'); type = 'Classifieds'; profile = 'classifieds'; sources = @('olx.com.eg', 'apps.apple.com', 'play.google.com') },

    @{ id = 'zillow'; name = 'Zillow'; region = 'USA'; countries = @('US'); type = 'Portal + Estimates'; profile = 'analytics_portal'; sources = @('zillow.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'redfin'; name = 'Redfin'; region = 'USA'; countries = @('US'); type = 'Brokerage Portal'; profile = 'analytics_portal'; sources = @('redfin.com', 'apps.apple.com', 'play.google.com'); coverage = @{ investmentTools = $false } },
    @{ id = 'realtor-com'; name = 'Realtor.com'; region = 'USA'; countries = @('US'); type = 'Portal'; profile = 'portal'; sources = @('realtor.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true } },
    @{ id = 'trulia'; name = 'Trulia'; region = 'USA'; countries = @('US'); type = 'Portal'; profile = 'portal'; sources = @('trulia.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true } },
    @{ id = 'apartments-com'; name = 'Apartments.com'; region = 'USA'; countries = @('US'); type = 'Rentals'; profile = 'rentals'; sources = @('apartments.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'loopnet'; name = 'LoopNet'; region = 'USA'; countries = @('US'); type = 'Commercial'; profile = 'commercial'; sources = @('loopnet.com', 'apps.apple.com', 'play.google.com'); coverage = @{ mortgageTools = $false; newProjects = $false } },
    @{ id = 'hotpads'; name = 'HotPads'; region = 'USA'; countries = @('US'); type = 'Rentals'; profile = 'rentals'; sources = @('hotpads.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'zumper'; name = 'Zumper'; region = 'USA'; countries = @('US', 'CA'); type = 'Rentals'; profile = 'rentals'; sources = @('zumper.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'rent-com'; name = 'Rent.com'; region = 'USA'; countries = @('US'); type = 'Rentals'; profile = 'rentals'; sources = @('rent.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'homes-com'; name = 'Homes.com'; region = 'USA'; countries = @('US'); type = 'Portal'; profile = 'portal'; sources = @('homes.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true } },
    @{ id = 'zillow-rentals'; name = 'Zillow Rentals'; region = 'USA'; countries = @('US'); type = 'Rentals'; profile = 'rentals'; sources = @('zillow.com', 'apps.apple.com', 'play.google.com'); notes = 'Positioned as a Zillow sub-brand rather than a fully separate company.' },

    @{ id = 'rightmove'; name = 'Rightmove'; region = 'UK'; countries = @('GB'); type = 'Portal'; profile = 'portal'; sources = @('rightmove.co.uk', 'apps.apple.com', 'play.google.com') },
    @{ id = 'zoopla'; name = 'Zoopla'; region = 'UK'; countries = @('GB'); type = 'Portal + Estimates'; profile = 'analytics_portal'; sources = @('zoopla.co.uk', 'apps.apple.com', 'play.google.com'); coverage = @{ investmentTools = $false } },
    @{ id = 'onthemarket'; name = 'OnTheMarket'; region = 'UK'; countries = @('GB'); type = 'Portal'; profile = 'portal'; sources = @('onthemarket.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'primelocation'; name = 'PrimeLocation'; region = 'UK'; countries = @('GB'); type = 'Portal'; profile = 'portal'; sources = @('primelocation.com', 'apps.apple.com'); notes = 'Part of Zoopla network; standalone differentiation is Likely limited.' },

    @{ id = 'seloger'; name = 'SeLoger'; region = 'France'; countries = @('FR'); type = 'Portal'; profile = 'portal'; sources = @('seloger.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'pap-fr'; name = 'PAP.fr'; region = 'France'; countries = @('FR'); type = 'Owner-to-Owner Portal'; profile = 'classifieds'; sources = @('pap.fr', 'apps.apple.com', 'play.google.com'); coverage = @{ areaGuides = $false; mortgageTools = $false; newProjects = $false } },
    @{ id = 'leboncoin-immo'; name = 'Leboncoin Immobilier'; region = 'France'; countries = @('FR'); type = 'Classifieds'; profile = 'classifieds'; sources = @('leboncoin.fr', 'apps.apple.com', 'play.google.com') },
    @{ id = 'bienici'; name = 'Bien''ici'; region = 'France'; countries = @('FR'); type = 'Portal'; profile = 'portal'; sources = @('bienici.com', 'apps.apple.com', 'play.google.com') },

    @{ id = 'immobilienscout24'; name = 'ImmobilienScout24'; region = 'Germany'; countries = @('DE'); type = 'Portal + Estimates'; profile = 'analytics_portal'; sources = @('immobilienscout24.de', 'apps.apple.com', 'play.google.com'); coverage = @{ investmentTools = $false } },
    @{ id = 'immowelt'; name = 'Immowelt'; region = 'Germany'; countries = @('DE'); type = 'Portal'; profile = 'portal'; sources = @('immowelt.de', 'apps.apple.com', 'play.google.com') },
    @{ id = 'immonet'; name = 'Immonet'; region = 'Germany'; countries = @('DE'); type = 'Portal'; profile = 'legacy'; sources = @('immonet.de', 'immowelt.de'); notes = 'Likely converged with Immowelt stack; independent feature roadmap Unknown.' },

    @{ id = 'idealista'; name = 'Idealista'; region = 'Spain / Italy / EU'; countries = @('ES', 'IT', 'PT'); type = 'Portal'; profile = 'analytics_portal'; sources = @('idealista.com', 'apps.apple.com', 'play.google.com'); coverage = @{ aiAssistant = $false; investmentTools = $false } },
    @{ id = 'immobiliare-it'; name = 'Immobiliare.it'; region = 'Spain / Italy / EU'; countries = @('IT'); type = 'Portal'; profile = 'portal'; sources = @('immobiliare.it', 'apps.apple.com', 'play.google.com') },
    @{ id = 'kyero'; name = 'Kyero'; region = 'Spain / Italy / EU'; countries = @('ES', 'PT', 'FR'); type = 'Cross-Border Portal'; profile = 'portal'; sources = @('kyero.com', 'apps.apple.com'); notes = 'Focus on international buyers; some local-depth metrics are Unknown.' },
    @{ id = 'green-acres'; name = 'Green-Acres'; region = 'Spain / Italy / EU'; countries = @('FR', 'ES', 'IT', 'PT'); type = 'Cross-Border Portal'; profile = 'portal'; sources = @('green-acres.com', 'apps.apple.com') },

    @{ id = '99acres'; name = '99acres'; region = 'India'; countries = @('IN'); type = 'Portal'; profile = 'portal'; sources = @('99acres.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'magicbricks'; name = 'MagicBricks'; region = 'India'; countries = @('IN'); type = 'Portal'; profile = 'portal'; sources = @('magicbricks.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true } },
    @{ id = 'housing-com'; name = 'Housing.com'; region = 'India'; countries = @('IN'); type = 'Portal'; profile = 'portal'; sources = @('housing.com', 'apps.apple.com', 'play.google.com'); coverage = @{ priceEstimates = $true } },
    @{ id = 'nobroker'; name = 'NoBroker'; region = 'India'; countries = @('IN'); type = 'Owner-Led Marketplace'; profile = 'classifieds'; sources = @('nobroker.in', 'apps.apple.com', 'play.google.com'); coverage = @{ mortgageTools = $true; areaGuides = $true } },

    @{ id = 'beike'; name = 'Beike / Lianjia'; region = 'China'; countries = @('CN'); type = 'Portal + Transactions'; profile = 'analytics_portal'; sources = @('ke.com', 'lianjia.com', 'apps.apple.com') },
    @{ id = 'fang'; name = 'Fang.com'; region = 'China'; countries = @('CN'); type = 'Portal'; profile = 'portal'; sources = @('fang.com', 'apps.apple.com') },
    @{ id = 'anjuke'; name = 'Anjuke'; region = 'China'; countries = @('CN'); type = 'Portal'; profile = 'portal'; sources = @('anjuke.com', 'apps.apple.com') },

    @{ id = 'vivareal'; name = 'VivaReal'; region = 'LatAm / Canada / Australia / Africa'; countries = @('BR'); type = 'Portal'; profile = 'portal'; sources = @('vivareal.com.br', 'apps.apple.com', 'play.google.com') },
    @{ id = 'zap-imoveis'; name = 'ZAP Imóveis'; region = 'LatAm / Canada / Australia / Africa'; countries = @('BR'); type = 'Portal'; profile = 'portal'; sources = @('zapimoveis.com.br', 'apps.apple.com', 'play.google.com') },
    @{ id = 'properati'; name = 'Properati'; region = 'LatAm / Canada / Australia / Africa'; countries = @('AR', 'CO', 'UY', 'EC'); type = 'Portal'; profile = 'legacy'; sources = @('properati.com', 'encuentra24.com'); notes = 'Historical LatAm brand; current activity is Likely reduced and partly migrated.' },
    @{ id = 'inmuebles24'; name = 'Inmuebles24'; region = 'LatAm / Canada / Australia / Africa'; countries = @('MX'); type = 'Portal'; profile = 'portal'; sources = @('inmuebles24.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'lamudi'; name = 'Lamudi'; region = 'LatAm / Canada / Australia / Africa'; countries = @('MX', 'PH', 'ID'); type = 'Portal'; profile = 'portal'; sources = @('lamudi.com', 'apps.apple.com', 'play.google.com'); notes = 'Country coverage has changed over time; scope by market is Unknown.' },
    @{ id = 'realestate-au'; name = 'realestate.com.au'; region = 'LatAm / Canada / Australia / Africa'; countries = @('AU'); type = 'Portal'; profile = 'portal'; sources = @('realestate.com.au', 'apps.apple.com', 'play.google.com') },
    @{ id = 'domain-au'; name = 'Domain (AU)'; region = 'LatAm / Canada / Australia / Africa'; countries = @('AU'); type = 'Portal'; profile = 'portal'; sources = @('domain.com.au', 'apps.apple.com', 'play.google.com') },
    @{ id = 'realtor-ca'; name = 'Realtor.ca'; region = 'LatAm / Canada / Australia / Africa'; countries = @('CA'); type = 'Portal'; profile = 'portal'; sources = @('realtor.ca', 'apps.apple.com', 'play.google.com'); coverage = @{ govServices = $false; priceEstimates = $true } },
    @{ id = 'centris-ca'; name = 'Centris (Quebec)'; region = 'LatAm / Canada / Australia / Africa'; countries = @('CA'); type = 'Portal'; profile = 'portal'; sources = @('centris.ca', 'apps.apple.com', 'play.google.com') },
    @{ id = 'property24-za'; name = 'Property24'; region = 'LatAm / Canada / Australia / Africa'; countries = @('ZA'); type = 'Portal'; profile = 'portal'; sources = @('property24.com', 'apps.apple.com', 'play.google.com') },
    @{ id = 'privateproperty-za'; name = 'Private Property'; region = 'LatAm / Canada / Australia / Africa'; countries = @('ZA'); type = 'Portal'; profile = 'portal'; sources = @('privateproperty.co.za', 'apps.apple.com', 'play.google.com') },
    @{ id = 'jumia-house'; name = 'Jumia House (Legacy)'; region = 'LatAm / Canada / Australia / Africa'; countries = @('NG', 'KE', 'GH'); type = 'Legacy Portal'; profile = 'legacy'; sources = @('jumiahouse.com', 'jiji.africa'); notes = 'Legacy brand in several African markets; current product status Likely merged/inactive.' }
)

$apps = New-Object System.Collections.Generic.List[object]
foreach ($def in $appDefs) {
    $params = @{
        Id = $def.id
        Name = $def.name
        Region = $def.region
        Countries = $def.countries
        Type = $def.type
        Profile = $def.profile
        Sources = $def.sources
    }

    if ($def.ContainsKey('tags')) { $params['Tags'] = $def.tags }
    if ($def.ContainsKey('notes')) { $params['Notes'] = $def.notes }
    if ($def.ContainsKey('coverage')) { $params['CoverageOverride'] = $def.coverage }
    if ($def.ContainsKey('text')) { $params['TextOverride'] = $def.text }

    $apps.Add((New-App @params))
}

$data = [ordered]@{
    meta = [ordered]@{
        title = 'Real Estate Platforms Benchmark (Morocco + World)'
        subtitle = 'Competitive Benchmark deck generated from benchmark.apps.json'
        generatedOn = (Get-Date).ToString('yyyy-MM-dd')
        methodology = @(
            'Compared business model, core UX, and feature depth from official websites and app-store listings.',
            'Used domain-level source logging per app; uncertain items are explicitly marked Unknown or Likely.',
            'Matrix scoring is binary per feature (present = 1, absent/unknown = 0) to keep cross-market comparison consistent.'
        )
        scoring = [ordered]@{
            maxPerFeature = 1
            unknownHandling = 'Unknown/Likely treated as not confirmed (0) in matrix scores.'
            caveat = 'Scores are directional and should be validated with fresh product walkthroughs before investment decisions.'
        }
    }
    matrixFeatures = $features
    apps = $apps
}

$json = $data | ConvertTo-Json -Depth 12
Set-Content -Path 'benchmark-deck/data/benchmark.apps.json' -Value $json -Encoding utf8
