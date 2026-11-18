// ─────────────────────────────────────────────────────────────
// All site copy lives here. Every number comes from Yonghui's resume.
// To add a GitHub / slides / Tableau link, fill in the `links` field.
// Empty links are hidden automatically.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Yonghui Kim",
  role: "Digital Analyst", // used in the browser tab title
  headline: "I look for the why behind the numbers.", // *word* = italic
  intro:
    "I'm a digital analyst with 3.5 years on the agency side, helping shape digital strategy for LG Electronics and LG Display and measuring what worked through campaign tracking, A/B tests, and budget analysis. In the University of Minnesota MSBA program, I added causal inference, machine learning, and forecasting, applied to real client problems through the Carlson Analytics Lab.",
  email: "yhkimwk@gmail.com",
  linkedin: "https://www.linkedin.com/in/yonghuikim",
  github: "", // e.g. "https://github.com/yourname" (hidden while empty)
  location: "Minneapolis, MN",
};

// Headline numbers shown at the top of Experience.
// (`text` is not displayed right now; kept in case an About section returns.)
export const about = {
  text:
    "At Burson, I spent 3.5 years helping LG Electronics and LG Display shape their digital strategy through campaign tracking, A/B tests, and budget analysis. The results were real, but I kept wanting to prove why they happened. That question brought me to the University of Minnesota's MSBA program, where I learned to answer it with causal inference, forecasting, and machine learning.",
  stats: [
    { value: "0 → 10K", label: "LinkedIn followers for an LG Electronics CEO in 2 months" },
    { value: "598K", label: "page views in 6 months from LG Display's Chinese newsroom launch" },
    { value: "+28%", label: "YoY page views after GA4-based budget reallocation" },
  ],
};

export type ProjectLinks = {
  github?: string;
  slides?: string;
  tableau?: string;
};

export type Project = {
  slug: string;
  title: string; // full title (detail page)
  cardTitle?: string; // short title shown on the card
  group: "consulting" | "data-science";
  category: string;
  award?: string;
  role?: string;
  metric: { value: string; label: string }; // shown on the card
  metrics?: { value: string; label: string }[]; // optional: several numbers on the detail page
  summary: string;
  tags: string[];
  context: string;
  approach: string[];
  steps?: { title: string; text: string }[]; // shown as boxes instead of approach bullets
  images?: { src: string; caption: string }[]; // screenshots shown under Results (files in /public)
  results: string[];
  links: ProjectLinks;
  confidential?: boolean;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  // ── Client consulting (Carlson Analytics Lab) ─────────────────
  {
    slug: "subscription-program-impact",
    title: "Subscription Program Impact & Growth",
    group: "consulting",
    category: "Causal Inference · Segmentation",
    role: "Project Lead · Client: A higher education institution",
    metric: { value: "$7.9M", label: "expansion opportunity identified" },
    metrics: [
      { value: "6", label: "segments with significant GPA gains" },
      { value: "$7.9M", label: "expansion opportunity identified" },
    ],
    summary:
      "Measured whether a course-materials subscription program improves student outcomes, and where it should grow next.",
    tags: ["Python", "Tableau", "Causal Inference", "Segmentation"],
    context:
      "A higher education institution runs a course-materials subscription program for its students. After two years, the team needed independent evidence of the program's academic impact to build trust with campus leaders, plus a clear view of where to expand.",
    approach: [],
    steps: [
      { title: "Build the data", text: "Joined course-material transactions with academic records, flagging material use with two independent rules" },
      { title: "Remove selection bias", text: "Self-selection skewed raw comparisons, so participants were matched to look-alike non-participants (CEM)" },
      { title: "Measure impact", text: "Estimated GPA and completion effects with difference-in-differences, then tested where effects concentrate" },
      { title: "Find growth", text: "Mapped 186 course subjects in Tableau on a coverage-vs.-adoption matrix" },
    ],
    results: [
      "Confirmed significant GPA gains in 6 segments, giving senior stakeholders evidence to support continued investment",
      "Flagged high-adoption, low-coverage subjects as expansion priorities worth up to $7.9M in incremental revenue",
      "Delivered interactive Tableau dashboards for the client team's ongoing monitoring",
    ],
    links: {},
    confidential: true,
  },
  {
    slug: "exam-success-drivers",
    title: "Exam Success Drivers & Regional Targeting",
    group: "consulting",
    category: "Predictive Modeling · Clustering",
    award: "Top-Scoring Team of 12",
    role: "Client: A national adult education testing organization",
    metric: { value: "34%", label: "higher odds of passing with official practice tests" },
    metrics: [
      { value: "34%", label: "higher odds of passing with official practice tests" },
      { value: "5", label: "priority states ranked into 3 intervention tiers" },
    ],
    summary:
      "Modeled what drives high school equivalency exam completion across 304K+ candidates and mapped candidate segments by county to target high-need regions.",
    tags: ["Python", "Logistic Regression", "Clustering", "KPI Design"],
    context:
      "Many high school equivalency candidates never finish the credential, and study resources vary widely by region. The client wanted to know which preparation behaviors drive success and where regional support would matter most.",
    approach: [],
    steps: [
      { title: "Find what drives passing", text: "Screened prep methods by correlation, then modeled them together with logistic regression across 304K+ candidates" },
      { title: "Build a prep score KPI", text: "Turned 10 prep-method coefficients into one weighted score that predicts a candidate's likelihood of success" },
      { title: "Segment candidates", text: "Clustered candidates by prep behavior and demographics into 4 behavioral archetypes (K-Means)" },
      { title: "Map regional gaps", text: "Mapped segments by county and paired the results with state policy research to diagnose root causes" },
    ],
    results: [
      "Identified official practice testing as the strongest predictor of passing, with 34% higher odds",
      "Uncovered a 19-point credential-rate gap across segments, explained by prep behavior rather than demographics",
      "Diagnosed distinct regional root causes (scheduling constraints, access barriers) and ranked 5 priority states into 3 tiers for region-specific interventions",
    ],
    links: {},
    confidential: true,
  },
  {
    slug: "competitive-bid-pricing",
    title: "Bid Pricing Intelligence & Strategy",
    group: "consulting",
    category: "Pricing · Business Intelligence",
    award: "Finalist, Top 6 Teams",
    role: "Client: A regional road construction contractor",
    metric: { value: "$63M", label: "revenue opportunity sized" },
    metrics: [
      { value: "11% → 4.5%", label: "winner–runner-up bid gap as rivals rise from 2 to 6+" },
      { value: "$63M", label: "revenue opportunity sized" },
    ],
    summary:
      "Found where a regional road construction contractor leaves money on the table in competitive bids, and which rivals to watch.",
    tags: ["SQL", "Tableau", "Pricing Analytics", "Competitive Intelligence"],
    context:
      "The client bids on public road construction projects against a handful of regional rivals. The goal was to win more contracts at a reasonable price, without bidding aggressively low, using two years of historical bid records.",
    approach: [],
    steps: [
      { title: "Clean the bid data", text: "Merged duplicate competitor names and re-sorted bids to build a reliable record of 1.6K regional auctions" },
      { title: "Measure the price gaps", text: "Compared winning and runner-up bids on every project, split by season and number of bidders" },
      { title: "Score competitor threats", text: "Built a threat score from how often each rival bids on the same projects and how often it underbids" },
      { title: "Build the dashboard", text: "Shipped a 5-panel interactive Tableau dashboard to benchmark against rivals by region and season" },
    ],
    results: [
      "Found 13 peak-season losses within 2.5% of the winning price, sizing a $63M opportunity from a targeted price adjustment",
      "Quantified $30M left on the table across 98 wins, with gaps narrowing from 11% to 4.5% as bidders rise from 2 to 6+, supporting competition-based markups",
      "Gave the client an ongoing view of its biggest competitive threats through the dashboard",
    ],
    links: {},
    confidential: true,
  },
  {
    slug: "gps-vendor-accountability",
    title: "GPS Data Trust & Vendor Accountability",
    group: "consulting",
    category: "Anomaly Detection · Operations",
    role: "Client: A K-12 student transportation management firm",
    metric: { value: "3 of 16", label: "vendors drove 50%+ of route anomalies" },
    metrics: [
      { value: "7.1 pts", label: "of inflated stop completion removed from raw GPS data" },
      { value: "3 of 16", label: "vendors drove 50%+ of route anomalies" },
    ],
    summary:
      "Separated GPS hardware failures from driver behavior so a school transportation provider can hold its bus vendors accountable.",
    tags: ["Python", "Anomaly Detection", "Operations Analytics"],
    context:
      "The client manages student transportation on behalf of schools, relying on GPS data from 16 bus vendors, each with its own hardware and polling standards. Raw GPS feeds blend device failures with driver behavior, so when a route underperforms, it is unclear whether to fix the device or the driver.",
    approach: [],
    steps: [
      { title: "Score GPS health", text: "Scored device health with Isolation Forest on 4 engineered signal features, normalized within each GPS provider" },
      { title: "Isolate real service time", text: "Limited analysis to an active window from the first to the last planned stop, stripping depot pings" },
      { title: "Detect route anomalies", text: "Learned each route's corridor with DBSCAN and classified anomalies into 6 types with rule-based thresholds" },
      { title: "Segment vendors", text: "Mapped 16 vendors on a GPS health × route execution matrix into 4 risk segments" },
    ],
    results: [
      "Showed raw GPS data overstated stop completion by 7.1 points, resetting the client's performance baseline",
      "Found 3 of 16 vendors generated over 50% of anomalies, mostly behavioral detours rather than hardware faults",
      "Assigned tiered corrective actions and a contract rule requiring remediation plans from vendors breaching a signal-loss threshold",
    ],
    links: {},
    confidential: true,
  },

  // ── Data science & AI ────────────────────────────────────────
  {
    slug: "ga4-bigquery-ecommerce",
    title: "E-commerce Funnel & Retention",
    group: "data-science",
    category: "Marketing Analytics",
    metric: { value: "Coming soon", label: "" },
    summary:
      "Funnel drop-off, channel conversion, cohort retention, and segments from Google Merchandise Store GA4 data in BigQuery, plus GTM tracking on this site",
    tags: ["GA4", "GTM", "BigQuery", "SQL", "Tableau"],
    context: "In progress.",
    approach: [],
    results: [],
    links: {},
    comingSoon: true,
  },
  {
    slug: "churn-risk-prioritization",
    title: "Churn Risk Targeting",
    group: "data-science",
    category: "Predictive Modeling",
    role: "Public data: Santander Customer Satisfaction (Kaggle)",
    metric: { value: "3.7x", label: "lift in the top-risk 20%" },
    metrics: [
      { value: "0.84", label: "ROC-AUC, stable across 5-fold cross-validation" },
      { value: "3.7x", label: "lift in the top-risk 20% of customers" },
    ],
    summary:
      "Built a model that flags at-risk bank customers early, so retention teams can focus on the few who matter most.",
    tags: ["Python", "XGBoost", "Churn Modeling"],
    context:
      "Only about 4% of a global bank's customers are dissatisfied at any given time, and by the time they complain or leave, it is too late to save the relationship. The goal was to spot at-risk customers early using 76K anonymized customer records.",
    approach: [],
    steps: [
      { title: "Clean the features", text: "Dropped constant and duplicate columns (369 to 306) and tested row-level engineered features" },
      { title: "Compare model families", text: "Benchmarked logistic regression, random forest, XGBoost, and a neural network on ROC-AUC for the 96/4 class imbalance" },
      { title: "Tune and validate", text: "Tuned XGBoost with randomized search and confirmed stability with a 5-fold cross-validation ensemble" },
      { title: "Turn scores into action", text: "Set a risk threshold for the top 20% of customers and designed a 3-tier intervention plan" },
    ],
    results: [
      "Reached 0.84 ROC-AUC, outperforming logistic regression (0.79) and random forest (0.74)",
      "Captured 74% of churners in the top-risk 20% of customers (3.7x lift), focusing retention outreach on the highest-risk accounts",
      "Identified balance drops, age, and inactive products as the strongest risk signals, and proposed tiered outreach from personal calls to automated offers",
    ],
    links: {},
  },
  {
    slug: "content-fatigue-llm",
    title: "Content Fatigue & Churn Diagnosis",
    group: "data-science",
    category: "Generative AI · Causal Inference",
    role: "Synthetic data (2,500 simulated users)",
    metric: { value: "#2", label: "churn driver traced to a policy change" },
    metrics: [
      { value: "+0.33", label: "rise in fatigue score caused by a policy change (DiD)" },
      { value: "#2", label: "of 10 churn predictors: content fatigue" },
    ],
    summary:
      "Turned raw content descriptions and user reviews into a measurable fatigue metric with an LLM pipeline, then traced what caused it and how it drives churn.",
    tags: ["Python", "Claude API", "NLP", "Causal Inference"],
    context:
      "Feed-based apps often keep showing users content and ads they have already swiped past. Fixing that in real time is a ranking problem, so this project takes the product analyst's job instead: detect, measure, and explain fatigue. It runs on a simulated dataset of 2,500 users over 16 weeks, with a policy change at week 8.",
    approach: [],
    steps: [
      { title: "Score semantic repetition", text: "Embedded content descriptions and scored how repetitive each user's weekly feed was versus prior weeks" },
      { title: "Classify reviews with Claude", text: "Turned free-text reviews into complaint categories, benchmarked against a keyword baseline" },
      { title: "Test causality twice", text: "Ran two independent difference-in-differences tests, one on behavior logs and one on reviews" },
      { title: "Build a chat copilot", text: "Wrapped the pipeline in a Streamlit chat app where Claude picks the analysis and explains results" },
    ],
    results: [
      "Tied the policy change to a +0.33 rise in fatigue (p < 0.001), independently confirmed by a +31.7 pp jump in LLM-classified complaints",
      "Claude caught the repetition complaints a keyword baseline missed (100% vs. 76% recall on template-based synthetic reviews)",
      "Found content fatigue was the #2 of 10 churn predictors, after catching a survivorship-bias trap that had made fatigue look protective",
    ],
    links: {},
  },
  {
    slug: "recommender-cold-start",
    title: "Recommender Cold-Start Diagnosis",
    group: "data-science",
    category: "Recommender Systems",
    role: "Public data: Last.fm 360K",
    metric: { value: "73%", label: "higher error for new users" },
    metrics: [
      { value: "24%", label: "lower prediction error with neural CF vs. matrix factorization" },
      { value: "73%", label: "higher error for new users than power users" },
    ],
    summary:
      "Built and compared two recommendation models on music listening data, then found where they fail: users with no history.",
    tags: ["Python", "Recommender Systems", "Segmentation"],
    context:
      "A music streaming service wants to recommend artists users will love, but it has no ratings, only play counts. The goal was to choose the right model and show where it falls short, using 500K listening records sampled from the public Last.fm dataset.",
    approach: [],
    steps: [
      { title: "Prepare implicit feedback", text: "Log-transformed and scaled play counts, and encoded 269K users and 50K artists for embedding models" },
      { title: "Benchmark two models", text: "Built matrix factorization and neural collaborative filtering in TensorFlow and compared RMSE and MAE" },
      { title: "Segment by activity", text: "Split test users into 4 tiers (new, light, average, power) by their listening history" },
      { title: "Translate to product", text: "Turned the error gap between tiers into an onboarding recommendation for new users" },
    ],
    results: [
      "Neural CF cut prediction error 24% vs. matrix factorization (RMSE 0.106 vs. 0.138) by capturing non-linear user–artist patterns",
      "Found new users saw 73% higher error than power users (RMSE 0.136 vs. 0.079), and they made up a third of test interactions",
      "Proposed a guided onboarding flow (pick a few favorite artists or genres) with a content-based fallback until users build enough history",
    ],
    links: {},
  },
  {
    slug: "demand-forecasting",
    title: "Sales Forecasting & Promotion Baseline",
    group: "data-science",
    category: "Time-Series Forecasting",
    role: "Public data: Corporación Favorita store sales (Kaggle)",
    metric: { value: "28%", label: "lower RMSE vs. XGBoost" },
    metrics: [
      { value: "28%", label: "lower holdout RMSE than an XGBoost benchmark" },
      { value: "95%", label: "prediction interval set as the baseline to flag true promotional lift" },
    ],
    summary:
      "Forecast a national grocer's daily sales to give marketers a baseline for telling when promotions truly lift sales.",
    tags: ["R", "Time Series", "ARIMA"],
    context:
      "Marketers need to know whether a promotion actually lifted sales or just rode the normal weekly rhythm. Using public daily sales data from a large Ecuadorian grocery chain, the goal was to build a reliable, explainable sales baseline.",
    approach: [],
    steps: [
      { title: "Aggregate and transform", text: "Aggregated 3M store-product records into 1.7K days of total sales and log-transformed the series" },
      { title: "Diagnose the series", text: "Confirmed stationarity with an ADF test and read the weekly cycle from ACF, PACF, and EACF" },
      { title: "Select the model", text: "Compared seasonal ARIMA candidates by AIC and chose ARIMA(1,0,1)(0,1,1) with a 7-day season" },
      { title: "Benchmark against ML", text: "Built a lag-feature XGBoost model and compared both on a 10-day holdout" },
    ],
    results: [
      "Cut holdout RMSE 28% vs. XGBoost (0.137 vs. 0.190 on the log scale), with every model coefficient significant",
      "Actual test sales stayed within the 80% and 95% prediction intervals, so sales breaking above the 95% band can signal true promotional lift",
      "Recommended ARIMA over XGBoost for marketing ROI work: more accurate here, interpretable, and able to quantify uncertainty",
    ],
    links: {},
  },
  {
    slug: "green-travel-roi",
    title: "Corporate Travel Green ROI Optimization",
    group: "data-science",
    category: "Sustainability Analytics",
    award: "1st Place, Analytics for Good Hackathon 2026",
    role: "Hackathon dataset",
    metric: { value: "$1.3M", label: "projected savings" },
    metrics: [
      { value: "$1.3M", label: "projected savings from coordinated ground travel" },
      { value: "552K kg", label: "of CO₂ emissions reduced" },
    ],
    summary:
      "Found that employees heading to the same conference travel separately, and redesigned the booking process to save money and CO₂.",
    tags: ["Celonis", "Process Mining", "ROI Analysis"],
    context:
      "A company's business travel carried a large cost and carbon footprint, much of it in the last mile between offices, airports, and hotels. The challenge was to find where coordination could cut both, using the company's travel records in Celonis.",
    approach: [],
    steps: [
      { title: "Explore the travel data", text: "Sliced travel spend and CO₂ by trip purpose, route, and business unit in a Celonis dashboard" },
      { title: "Find a predictable segment", text: "Focused on conferences, announced months ahead, and treated same-destination, same-date trips as one event" },
      { title: "Quantify fragmentation", text: "Showed groups arriving at the same conference booked ground transport separately, up to 40+ vehicles per group" },
      { title: "Redesign the process", text: "Proposed approval-first booking, manager-led bulk bookings, and automated co-traveler alerts" },
    ],
    results: [
      "Identified 27,303 conference trips with overlapping travel plans, ready for coordination",
      "Projected about $1.3M in savings (over $48 per trip) and about 552K kg of CO₂ reduced",
      "Delivered a Green ROI of $2.35 saved per kg of CO₂ reduced, winning 1st place at the hackathon",
    ],
    links: {},
  },
];

export const experience = {
  company: "Burson",
  companyNote: "Global Communications Agency",
  location: "Seoul, South Korea",
  period: "Sep 2021 – Mar 2025",
  clients: "LG Electronics · LG Display",
  roles: [
    {
      title: "Senior Manager, Digital Communications & Analytics",
      period: "Jan 2025 – Mar 2025",
      highlights: [
        "Reallocated $25K in LinkedIn spend using regional cost-per-follower analysis, growing an LG Electronics CEO's new profile from 0 to 10K followers in 2 months",
        "Automated daily ad grading across 4 markets with a 3-tier cost benchmark, keeping spend-weighted CPC 83% below baseline",
      ],
    },
    {
      title: "Manager, Digital Communications & Analytics",
      period: "Jan 2023 – Dec 2024",
      highlights: [
        "Ran GIF vs. static creative A/B tests (GIFs drove ~2x CTR) and scaled the winner to 255K website visits",
        "Attributed traffic to top campaigns with GA4 and shifted spend to winners, growing page views 28% YoY",
        "Launched LG Display's Chinese-language newsroom, driving 598K page views in its first 6 months",
        "Ensured campaign data accuracy with UTM and GTM tracking, reconciling GA4 sessions with Meta Ads clicks",
      ],
    },
    {
      title: "Consultant, Digital Communications & Analytics",
      period: "Sep 2021 – Dec 2022",
      highlights: [
        "Mined 10+ years of Google Analytics data to revive a dormant content series that sustained 10% of monthly page views at zero ad spend",
        "Standardized engagement KPIs across 3 channels into one executive report that helped double the client's budget",
      ],
    },
  ],
};

// Not displayed on the site right now (kept for reference)
export const skills = {
  Techniques: [
    "A/B Testing",
    "Causal Inference",
    "Customer Segmentation",
    "Marketing Attribution",
    "Funnel & Retention Analysis",
    "Predictive Modeling",
    "Forecasting",
  ],
  Tools: [
    "SQL",
    "Python",
    "R",
    "Tableau",
    "Databricks",
    "Google Analytics (GA4)",
    "Google Tag Manager",
    "Excel",
    "PowerPoint",
    "Generative AI",
  ],
};

export const education = [
  {
    degree: "M.S. in Business Analytics",
    school: "University of Minnesota, Carlson School of Management",
    location: "Minneapolis, MN",
    date: "Aug 2026",
  },
  {
    degree: "B.B.A. & B.A. in French Language and Literature (Dual Degree)",
    school: "Pusan National University",
    location: "Busan, South Korea",
    date: "Feb 2022",
  },
];
