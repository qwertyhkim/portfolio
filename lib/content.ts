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
    "I'm Yonghui Kim, a digital analyst with 3.5 years on the agency side, helping shape digital strategy for LG Electronics and LG Display and measuring what worked through campaign tracking, A/B tests, and budget analysis. In the University of Minnesota MSBA program, I added causal inference, machine learning, and forecasting, applied to real client problems through the Carlson Analytics Lab.",
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

export type ChartAxis = { label: string; low: string; high: string };
export type ProjectChart =
  | {
      kind: "matrix"; // 2x2 framework, no data points
      heading: string;
      caption: string;
      x: ChartAxis;
      y: ChartAxis;
      // order: top-left, top-right, bottom-left, bottom-right
      quadrants: { title: string; text: string; highlight?: boolean }[];
    }
  | {
      kind: "bars"; // horizontal bars around a baseline (e.g. odds ratio = 1)
      heading: string;
      caption: string;
      baseline: number;
      min: number;
      max: number;
      axisLabel: string;
      step?: number; // tick spacing, default 0.2
      decimals?: number; // value labels, default 2
      rows: { label: string; value: number; highlight?: boolean }[]; // if any row is highlighted, only those are colored
    }
  | {
      kind: "slope"; // before/after for two groups (Difference-in-Differences)
      heading: string;
      caption: string;
      before: string;
      after: string;
      yLabel: string;
      groups: { label: string; before: number; after: number; highlight?: boolean }[];
      note: string;
    }
  | {
      kind: "forecast"; // history + holdout actuals vs forecast with a prediction band
      heading: string;
      caption: string;
      yLabel: string;
      scale: number; // divide values by this for axis labels
      history: { date: string; value: number }[];
      holdout: { date: string; actual: number; fc: number; lo: number; hi: number }[];
    }
  | {
      kind: "process"; // before/after process lanes
      heading: string;
      caption: string;
      lanes: { label: string; steps: string[]; highlight?: boolean }[];
    }
  | {
      kind: "corridor"; // schematic route map: learned corridor + anomaly types, no data
      heading: string;
      caption: string;
      notes: { title: string; text: string }[]; // numbered 1-3 on the map
    }
  | {
      kind: "flow"; // method pipeline with small illustrations, no data
      heading: string;
      caption: string;
      steps: { tag: string; title: string; text: string; icon: "match" | "did" | "sig" }[];
    }
  | {
      kind: "curve"; // conceptual trend, no numbers on the axes
      heading: string;
      caption: string;
      x: ChartAxis;
      y: string;
      start: { title: string; text: string };
      end: { title: string; text: string };
    };

export type Project = {
  slug: string;
  title: string; // full title (detail page)
  cardTitle?: string; // short title shown on the card
  group: "consulting" | "data-science";
  category: string;
  award?: string;
  role?: string;
  metric?: { value: string; label: string }; // shown on the card (omit to show the summary instead)
  metrics?: { value: string; label: string }[]; // optional: several numbers on the detail page
  summary: string;
  tags: string[];
  context: string;
  approach: string[];
  steps?: { title: string; text: string }[]; // shown as boxes instead of approach bullets
  images?: { src: string; caption: string }[]; // screenshots shown under Results (files in /public)
  charts?: ProjectChart[]; // visuals shown between Approach and Results
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
    summary:
      "Measured whether a course-materials subscription program improves student outcomes, and where it should grow next.",
    tags: ["Python", "Tableau", "Causal Inference", "Segmentation"],
    context:
      "A higher education institution runs a course-materials subscription program for its students. After two years, the team needed independent evidence of the program's academic impact to build trust with campus leaders, plus a clear view of where to expand.",
    approach: [],
    steps: [
      { title: "Build the data", text: "Joined course-material transactions with academic records, flagging material use with two independent rules" },
      { title: "Remove selection bias", text: "Self-selection skewed raw comparisons, so participants were matched to look-alike non-participants with Coarsened Exact Matching" },
      { title: "Measure impact", text: "Estimated GPA and completion effects with Difference-in-Differences, then tested where effects concentrate" },
      { title: "Find growth", text: "Mapped course subjects in Tableau on a coverage-vs.-adoption matrix" },
    ],
    charts: [
      {
        kind: "flow",
        heading: "Research Design",
        caption: "A quasi-experimental design, used because students chose whether to join the program. Conceptual view; client data not shown.",
        steps: [
          { tag: "01 Match", title: "Coarsened Exact Matching", text: "Pair each participant with similar non-participants so the comparison is like-for-like, controlling for self-selection bias", icon: "match" },
          { tag: "02 Compare", title: "Difference-in-Differences", text: "Compare the change in outcomes before and after joining, net of trends both groups share", icon: "did" },
          { tag: "03 Test", title: "Statistical Significance", text: "Keep only effects whose confidence interval excludes zero, then locate the segments where they concentrate", icon: "sig" },
        ],
      },
      {
        kind: "matrix",
        heading: "Growth Framework",
        caption: "Each course subject is placed by how widely the program is offered and how often students opt in. Conceptual view; client data not shown.",
        x: { label: "Program Availability", low: "Few Classes", high: "Most Classes" },
        y: { label: "Student Participation", low: "Low", high: "High" },
        quadrants: [
          { title: "Expansion Priority", text: "Students opt in when offered, but few classes offer it", highlight: true },
          { title: "Core Strength", text: "Widely offered and widely used" },
          { title: "Low Priority", text: "Limited reach and limited demand" },
          { title: "Adoption Gap", text: "Widely offered, but students rarely opt in" },
        ],
      },
    ],
    results: [
      "Found GPA gains concentrated in specific student segments, giving senior stakeholders evidence to support continued investment",
      "Flagged high-adoption, low-coverage subjects as the program's next expansion priorities",
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
      { title: "Find what drives passing", text: "Screened prep methods by correlation, then modeled them together with Logistic Regression across 304K+ candidates" },
      { title: "Build a prep score KPI", text: "Turned 10 prep-method coefficients into one weighted score that predicts a candidate's likelihood of success" },
      { title: "Segment candidates", text: "Clustered candidates by prep behavior and demographics into 4 behavioral archetypes (K-Means)" },
      { title: "Map regional gaps", text: "Mapped segments by county and paired the results with state policy research to diagnose root causes" },
    ],
    charts: [
      {
        kind: "bars",
        heading: "Exam Success Drivers",
        caption: "Odds ratios from one Logistic Regression with all prep methods modeled together. Above 1.0 means higher odds of earning the credential.",
        baseline: 1,
        min: 0.5,
        max: 1.5,
        axisLabel: "Odds Ratio",
        rows: [
          { label: "Official Practice Tests", value: 1.34 },
          { label: "Online Course / Video", value: 1.22 },
          { label: "Books / Print", value: 1.12 },
          { label: "Other", value: 1.08 },
          { label: "Social Networking", value: 0.96 },
          { label: "Audio Materials", value: 0.93 },
          { label: "Test Prep Center", value: 0.92 },
          { label: "Adult Ed Teacher", value: 0.88 },
          { label: "Adult Ed Class", value: 0.83 },
          { label: "TV Study Program", value: 0.7 },
        ],
      },
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
    summary:
      "Found where a regional road construction contractor leaves money on the table in competitive bids, and which rivals to watch.",
    tags: ["SQL", "Tableau", "Pricing Analytics", "Competitive Intelligence"],
    context:
      "The client bids on public road construction projects against a handful of regional rivals. The goal was to win more contracts at a reasonable price, without bidding aggressively low, using two years of historical bid records.",
    approach: [],
    steps: [
      { title: "Clean the bid data", text: "Merged duplicate competitor names and re-sorted bids to build a reliable record of regional auctions" },
      { title: "Measure the price gaps", text: "Compared winning and runner-up bids on every project, split by season and number of bidders" },
      { title: "Score competitor threats", text: "Built a threat score from how often each rival bids on the same projects and how often it underbids" },
      { title: "Build the dashboard", text: "Shipped a 5-panel interactive Tableau dashboard to benchmark against rivals by region and season" },
    ],
    charts: [
      {
        kind: "curve",
        heading: "Bid Pricing Pattern",
        caption: "The winning margin narrows as more contractors bid, so the markup should follow the expected competition. Conceptual illustration, not to scale; client data not shown.",
        x: { label: "Number of Bidders", low: "Few", high: "Many" },
        y: "Gap Between Winning and Runner-Up Bid",
        start: { title: "Few Rivals", text: "Wide gap: room to raise the bid" },
        end: { title: "Many Rivals", text: "Narrow gap: price precisely" },
      },
    ],
    results: [
      "Found peak-season losses decided by narrow price margins, sizing the revenue opportunity from a targeted price adjustment",
      "Quantified money left on the table in past wins and showed the winning margin narrows as more bidders compete, supporting competition-based markups",
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
    summary:
      "Separated GPS hardware failures from driver behavior so a school transportation provider can hold its bus vendors accountable.",
    tags: ["Python", "Anomaly Detection", "Operations Analytics"],
    context:
      "The client manages student transportation on behalf of schools, relying on GPS data from multiple bus vendors, each with its own hardware and polling standards. Raw GPS feeds blend device failures with driver behavior, so when a route underperforms, it is unclear whether to fix the device or the driver.",
    approach: [],
    steps: [
      { title: "Score GPS health", text: "Scored device health with Isolation Forest on 4 engineered signal features, normalized within each GPS provider" },
      { title: "Isolate real service time", text: "Limited analysis to an active window from the first to the last planned stop, stripping depot pings" },
      { title: "Detect route anomalies", text: "Learned each route's corridor with DBSCAN and classified anomalies into 6 types with rule-based thresholds" },
      { title: "Segment vendors", text: "Mapped vendors on a GPS health × route execution matrix into 4 risk segments" },
    ],
    charts: [
      {
        kind: "corridor",
        heading: "Route Anomaly Detection",
        caption: "DBSCAN learns each route's normal corridor from historical trips, run separately for morning and afternoon runs. Pings outside expected bounds are then classified by rule. Conceptual view; route data not shown.",
        notes: [
          { title: "Detour", text: "Pings drift more than 150 m from the learned corridor (driver behavior)" },
          { title: "GPS Jump", text: "A position change that would require over 80 mph (device error)" },
          { title: "Data Gap", text: "No signal for more than 5 minutes (device error)" },
        ],
      },
      {
        kind: "matrix",
        heading: "Vendor Segmentation",
        caption: "Vendors are placed by GPS connection health and route execution, and each segment gets a different corrective action. Conceptual view; vendor data not shown.",
        x: { label: "GPS Connection Health", low: "Low", high: "High" },
        y: { label: "Route Execution", low: "Low", high: "High" },
        quadrants: [
          { title: "Unconfident Success", text: "Routes get done, but the data can't prove it" },
          { title: "Operational Excellence", text: "Reliable tracking and execution: the benchmark" },
          { title: "Critical Failure", text: "Visibility gaps and underperformance" },
          { title: "Behavioral Risk", text: "Fully visible, but drivers deviate from the plan", highlight: true },
        ],
      },
    ],
    results: [
      "Showed raw GPS data overstated stop completion, resetting the client's performance baseline",
      "Found a small group of vendors generated most anomalies, mostly behavioral detours rather than hardware faults",
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
      { value: "0.84", label: "ROC-AUC, stable across 5-Fold Cross-Validation" },
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
      { title: "Compare model families", text: "Benchmarked Logistic Regression, Random Forest, XGBoost, and a Neural Network on ROC-AUC for the 96/4 class imbalance" },
      { title: "Tune and validate", text: "Tuned XGBoost with Randomized Search and confirmed stability with a 5-Fold Cross-Validation ensemble" },
      { title: "Turn scores into action", text: "Set a risk threshold for the top 20% of customers and designed a 3-tier intervention plan" },
    ],
    charts: [
      {
        kind: "bars",
        heading: "Model Comparison",
        caption: "Validation ROC-AUC by model on the cleaned feature set. 0.5 is a random guess; higher means better at ranking dissatisfied customers first.",
        baseline: 0.5,
        min: 0.5,
        max: 0.9,
        step: 0.1,
        axisLabel: "ROC-AUC",
        rows: [
          { label: "Tuned XGBoost (5-Fold)", value: 0.8407, highlight: true },
          { label: "Deep Neural Network", value: 0.8203 },
          { label: "Logistic Regression", value: 0.7885 },
          { label: "Random Forest", value: 0.7439 },
        ],
      },
    ],
    results: [
      "Reached 0.84 ROC-AUC, outperforming Logistic Regression (0.79) and Random Forest (0.74)",
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
      { title: "Test causality twice", text: "Ran two independent Difference-in-Differences tests, one on behavior logs and one on reviews" },
      { title: "Build a chat copilot", text: "Wrapped the pipeline in a Streamlit chat app where Claude picks the analysis and explains results" },
    ],
    charts: [
      {
        kind: "slope",
        heading: "Policy Impact on Fatigue",
        caption: "Average fatigue score before and after the week-8 policy change, on synthetic data. The Difference-in-Differences estimate nets out the small rise in the control group.",
        before: "Before Change",
        after: "After Change",
        yLabel: "Average Fatigue Score",
        groups: [
          { label: "Treatment", before: 0.45, after: 0.82, highlight: true },
          { label: "Control", before: 0.46, after: 0.5 },
        ],
        note: "DiD Effect: +0.33",
      },
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
      { value: "24%", label: "lower prediction error with Neural CF vs. Matrix Factorization" },
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
      { title: "Benchmark two models", text: "Built Matrix Factorization and Neural Collaborative Filtering in TensorFlow and compared RMSE and MAE" },
      { title: "Segment by activity", text: "Split test users into 4 tiers (new, light, average, power) by their listening history" },
      { title: "Translate to product", text: "Turned the error gap between tiers into an onboarding recommendation for new users" },
    ],
    charts: [
      {
        kind: "bars",
        heading: "Error by User Segment",
        caption: "Neural CF test RMSE by user segment (lower is better). New users have no listening history for the model to learn from.",
        baseline: 0,
        min: 0,
        max: 0.16,
        step: 0.04,
        decimals: 3,
        axisLabel: "RMSE",
        rows: [
          { label: "Power Users", value: 0.0786 },
          { label: "Average Users", value: 0.0826 },
          { label: "Light Users", value: 0.092 },
          { label: "New Users", value: 0.1358, highlight: true },
        ],
      },
    ],
    results: [
      "Neural CF cut prediction error 24% vs. Matrix Factorization (RMSE 0.106 vs. 0.138) by capturing non-linear user–artist patterns",
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
      { title: "Diagnose the series", text: "Confirmed stationarity with an ADF Test and read the weekly cycle from ACF, PACF, and EACF" },
      { title: "Select the model", text: "Compared Seasonal ARIMA candidates by AIC and chose ARIMA(1,0,1)(0,1,1) with a 7-day season" },
      { title: "Benchmark against ML", text: "Built a lag-feature XGBoost model and compared both on a 10-day holdout" },
    ],
    charts: [
      {
        kind: "forecast",
        heading: "Holdout Forecast",
        caption: "Total daily unit sales across all stores: the last three training weeks, then the 10-day holdout. Actual sales stayed inside the 95% band, so a promotion that pushes sales above it signals real lift.",
        yLabel: "Daily Unit Sales (M)",
        scale: 1000000,
        history: [
          { date: "07-16", value: 1100804 },
          { date: "07-17", value: 818326 },
          { date: "07-18", value: 730134 },
          { date: "07-19", value: 767979 },
          { date: "07-20", value: 688288 },
          { date: "07-21", value: 782418 },
          { date: "07-22", value: 932902 },
          { date: "07-23", value: 1024289 },
          { date: "07-24", value: 816564 },
          { date: "07-25", value: 713582 },
          { date: "07-26", value: 740653 },
          { date: "07-27", value: 659850 },
          { date: "07-28", value: 835100 },
          { date: "07-29", value: 1032311 },
          { date: "07-30", value: 1123752 },
          { date: "07-31", value: 885857 },
          { date: "08-01", value: 988528 },
          { date: "08-02", value: 964712 },
          { date: "08-03", value: 728068 },
          { date: "08-04", value: 827776 },
          { date: "08-05", value: 965694 },
        ],
        holdout: [
          { date: "08-06", actual: 1049559, fc: 1125945, lo: 649624, hi: 1951517 },
          { date: "08-07", actual: 797465, fc: 856445, lo: 492473, hi: 1489419 },
          { date: "08-08", actual: 717766, fc: 796552, lo: 456698, hi: 1389308 },
          { date: "08-09", actual: 734140, fc: 824790, lo: 471693, hi: 1442206 },
          { date: "08-10", actual: 651387, fc: 689496, lo: 393454, hi: 1208286 },
          { date: "08-11", actual: 826374, fc: 824787, lo: 469759, hi: 1448132 },
          { date: "08-12", actual: 792631, fc: 1036897, lo: 589589, hi: 1823569 },
          { date: "08-13", actual: 865640, fc: 1116793, lo: 628951, hi: 1983026 },
          { date: "08-14", actual: 760922, fc: 849944, lo: 477833, hi: 1511833 },
          { date: "08-15", actual: 762662, fc: 790905, lo: 443968, hi: 1408954 },
        ],
      },
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
    charts: [
      {
        kind: "process",
        heading: "Process Redesign",
        caption: "Moving approval before booking lets managers see who is heading to the same conference and coordinate ground travel.",
        lanes: [
          { label: "Before", steps: ["Employee books own ride", "Manager approves afterward", "Colleagues ride separately"] },
          { label: "After", steps: ["Employee requests approval", "Manager bulk-books in one hub", "Co-travelers flagged automatically", "Shared ground transport"], highlight: true },
        ],
      },
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
