import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'chakravat-manthan',
    number: '01',
    title: 'Chakravat Manthan (चक्रवात मंथन)',
    category: 'Deep Learning / Meteorological Intelligence / Satellite Telemetry',
    description:
      'Chakravat Manthan (चक्रवात मंथन) by Cybernetic Crusaders is a mission-critical meteorological intelligence engine engineered for the North Indian Ocean and Pan-Asian oceanic basins. Fusing direct geostationary satellite telemetry from ISRO\'s INSAT-3DR (trained on 40+ GB of real multi-spectral satellite imagery) with a custom 4-Stage CNN + 2-Layer Temporal GRU Deep Learning Architecture, it autonomously predicts cyclone intensity, continuous sustained wind speeds, central barometric pressure, and landfall trajectories with zero manual human bias.',
    image: '/assets/projects/chakravat-manthan.svg',
    technologies: [
      'Python',
      '4-Stage CNN',
      '2-Layer Temporal GRU',
      'ISRO INSAT-3DR Telemetry',
      'PyTorch',
      'Atmospheric Deep Learning',
      'Streamlit',
      'Satellite Remote Sensing',
    ],
    status: 'Mission-Critical Intelligence Engine',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: 'https://chakravatmanthan.adeebrazi.online',
    overview:
      'Engineered by Cybernetic Crusaders for mission-critical meteorological monitoring and disaster-response decision support. Ingests raw geostationary multi-spectral imagery directly from ISRO\'s INSAT-3DR, trained on 40+ GB of real atmospheric data to autonomously predict cyclone development, pressure differentials, and landfall trajectories with zero manual human bias.',
    problemStatement:
      'Tropical cyclone analysis across oceanic basins has historically relied on subjective manual Dvorak satellite pattern estimates, introducing critical observational lag and human cognitive bias during high-stakes disaster preparation.',
    approach:
      'Developed a hybrid 4-Stage Convolutional Neural Network (CNN) for spatial multi-scale cloud convective pattern extraction paired with a 2-Layer Temporal Gated Recurrent Unit (GRU) to model sequential cyclone barometric dynamics, continuous sustained wind speeds, and landfall vectors.',
    technicalWorkflow: [
      'Telemetry ingestion of 40+ GB multi-spectral satellite imagery from ISRO INSAT-3DR',
      'Atmospheric cloud pattern normalization, calibration, and radiometric alignment',
      'Spatial hierarchy extraction via custom 4-Stage Convolutional Neural Network (CNN)',
      'Time-series pressure dynamics and cyclone motion tracking via 2-Layer Temporal GRU',
      'Autonomous prediction of central barometric pressure (hPa), sustained wind speed (knots), and intensity scale',
      'Real-time geospatial landfall trajectory simulation rendered on an interactive monitoring dashboard',
    ],
    implementedCapabilities: [
      'Direct geostationary satellite telemetry ingestion from ISRO INSAT-3DR',
      'Hybrid 4-Stage CNN + 2-Layer Temporal GRU deep learning model',
      'Autonomous cyclone intensity classification and wind speed regression',
      'Central barometric pressure estimation with zero human bias',
      'Geospatial landfall trajectory mapping and visual tracking',
      'Interactive operational dashboard with live multi-spectral overlays',
    ],
    limitations: [
      'Requires active INSAT-3DR geostationary data feeds; cloud-cover occlusions are addressed via multi-spectral band synthesis.',
      'Designed for oceanic and coastal meteorological basins across North Indian Ocean and Pan-Asia.',
    ],
    accentColor: '#1A334B',
  },
  {
    id: 'used-car-price-prediction',
    number: '02',
    title: 'Used Car Price Prediction — ML Web Application',
    category: 'Internship ML Project (2026) / Regression / Full-Stack Flask Web App',
    description:
      'Built and deployed as an internship project during the AstraTech AI Data Analytics & Data Science internship (2026): an end-to-end machine learning web application in Flask that predicts used-car market value from real listing data, exposed through a REST API (/predict, /options, /feature-importance). Trained and benchmarked two regression models — a Random Forest baseline (R² 0.59) and an improved XGBoost model (R² 0.85, MAE ≈ ₹2.6L) — utilizing log-transformed pricing, grouped rare categories, and engineered Car Age features.',
    image: '/assets/projects/car-price-prediction.svg',
    technologies: [
      'Python',
      'Flask',
      'XGBoost',
      'Random Forest',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Chart.js',
      'REST APIs',
    ],
    status: 'Internship ML Project (AstraTech AI, 2026)',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: '',
    overview:
      'Developed as an internship project during the AstraTech AI Data Analytics & Data Science internship (2026). A production-grade machine learning valuation platform that benchmarks regression algorithms against real secondary automotive market data, diagnosing reliability gaps and serving real-time inferences through Flask REST endpoints.',
    problemStatement:
      'Automotive pricing exhibits extreme non-linear depreciation and high variance across rare brands and vehicle ages, causing traditional linear pricing tools to fail on real market transactions.',
    approach:
      'Systematic feature engineering (car age derivation, depreciation decay, log pricing transformations, rare category grouping) combined with comparative cross-validation of Random Forest and XGBoost regression architectures.',
    technicalWorkflow: [
      'Ingestion and cleaning of raw historical used-car automotive transaction datasets',
      'Feature engineering: vehicle age, rare category aggregation, and log-transformed target pricing',
      'Model benchmarking: Random Forest baseline (R² 0.59) vs. optimized XGBoost model (R² 0.85, MAE ≈ ₹2.6L)',
      'Development of Flask REST API endpoints (/predict, /options, /feature-importance)',
      'Dynamic cascading Brand-to-Model dropdown interface sourced directly from live training data',
      'Interactive market-insights dashboard built with Chart.js surfacing comparable vehicle pricing',
    ],
    implementedCapabilities: [
      'End-to-end deployed Flask web service with modular REST API endpoints',
      'Optimized XGBoost regression engine achieving R² 0.85 accuracy',
      'Cascading Brand-to-Model dynamic input validation sourced from training sets',
      'Interactive Chart.js data visualization dashboard for price positioning',
      'Comprehensive feature-importance diagnostics and error-residual analysis',
    ],
    limitations: [
      'Evaluated on Indian automotive transaction datasets; regional variations outside the dataset scope apply.',
    ],
    accentColor: '#8C462C',
  },
  {
    id: 'samaj-health-suraksha',
    number: '03',
    title: 'Samaj Health Suraksha — Smart India Hackathon',
    category: 'SIH Internal Hackathon / AI Health Monitoring Platform',
    description:
      'Built a multi-user web platform for the Internal Hackathon of Smart India Hackathon (SIH). Empowers ASHA workers and public health administrators to monitor rural drinking water quality and predict infectious disease outbreak risks using geolocation tracking and automated early-warning alerts.',
    image: '/assets/projects/ai-assistant.svg',
    technologies: [
      'Python',
      'Flask',
      'Machine Learning',
      'GIS / Geolocation',
      'IBM Cloudant',
      'Data Analytics',
      'REST APIs',
    ],
    status: 'SIH Internal Hackathon Selection Prototype',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: 'https://samiasayeed305.github.io/waterbornedisease/',
    overview:
      'Developed during the Internal Hackathon selection round of Smart India Hackathon (SIH), Samaj Health Suraksha bridges grassroots healthcare monitoring and administrative disease containment by connecting ASHA worker fieldwork with predictive risk algorithms.',
    problemStatement:
      'Rural healthcare workers face delays in detecting waterborne contamination and reporting localized health outbreaks, hindering timely administrative intervention.',
    approach:
      'Engineered a lightweight, multi-role web portal enabling field workers to log water quality telemetry and patient symptoms, coupled with predictive classification models that flag disease outbreak hotspots.',
    technicalWorkflow: [
      'Field data collection interface tailored for ASHA workers with low-bandwidth optimization',
      'Database integration with IBM Cloudant for real-time document storage and regional reporting',
      'Predictive analytics logic classifying geographical clusters as safe or high-risk',
      'Early-warning notification triggers for district health administrative officers',
      'Interactive GIS mapping dashboard visualizing water test results and outbreak clusters',
    ],
    implementedCapabilities: [
      'Multi-user role authentication (ASHA Workers vs. Health Administrators)',
      'Geolocation-tagged reporting and drinking water contamination tracking',
      'Predictive classification logic for localized disease risk assessment',
      'Automated early-warning alerts for imminent outbreak thresholds',
      'Administrative GIS dashboard for regional health resource allocation',
    ],
    limitations: [
      'Tested against regional test datasets; production deployment requires integration with state health servers.',
    ],
    accentColor: '#10B981',
  },
  {
    id: 'student-performance-dashboard',
    number: '04',
    title: 'Student Performance Prediction Dashboard',
    category: 'Machine Learning / Educational Analytics / Streamlit Web App',
    description:
      'Developed an end-to-end machine learning application predicting student performance across 7 academic subjects from behavioral and study-habit inputs. Implemented multi-output regression using Random Forest in scikit-learn with rigorous Pandas feature engineering, deployed via an interactive Streamlit dashboard featuring Plotly visual insights and downloadable ReportLab PDF diagnostics.',
    image: '/assets/projects/car-price-prediction.svg',
    technologies: [
      'Python',
      'Scikit-Learn',
      'Random Forest Multi-Output',
      'Streamlit',
      'Plotly',
      'Pandas',
      'ReportLab',
    ],
    status: 'Live Streamlit Application',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: 'https://awesh-student-score-predictor.streamlit.app/',
    overview:
      'A multi-output regression analytics engine designed to help educators identify at-risk students and provide actionable academic interventions through automated PDF diagnostic reports.',
    problemStatement:
      'Early academic intervention is often hindered by retrospective grading; predictive models can identify learning gaps across multiple subjects simultaneously from behavioral inputs.',
    approach:
      'Trained multi-output Random Forest regression models to predict performance across 7 distinct subjects simultaneously, coupled with a reactive Streamlit web interface and automated ReportLab PDF generation.',
    technicalWorkflow: [
      'Data preprocessing, missing value imputation, and feature engineering with Pandas and NumPy',
      'Multi-output regression model training using scikit-learn Random Forest regressor',
      'Real-time reactive dashboard creation using Streamlit and dynamic Plotly visualizations',
      'Automated diagnostic PDF report generation using ReportLab for teachers and students',
      'Data logging pipeline to capture ongoing inputs for continuous model recalibration',
    ],
    implementedCapabilities: [
      'Simultaneous multi-output performance prediction across 7 academic subjects',
      'Interactive Streamlit web dashboard with real-time slider parameter tuning',
      'Dynamic Plotly radar and bar charts comparing predicted vs. target benchmarks',
      'One-click downloadable personalized PDF performance evaluation reports',
      'Continuous input data logging to support iterative model re-training',
    ],
    limitations: [
      'Conditioned on behavioral and attendance parameters specific to secondary and collegiate curricula.',
    ],
    accentColor: '#8B5CF6',
  },
  {
    id: 'adivasi-market',
    number: '05',
    title: 'Adivasi Market — Cultural E-Commerce Platform',
    category: 'Full-Stack Web / IBM Cloudant / Cultural Preservation',
    description:
      'Developed a full-stack marketplace platform supporting tribal artisans, with a Flask backend integrated to an IBM Cloudant database. Implemented multilingual support, artisan profiles, and product-listing management designed for accessibility, cultural preservation, and inclusive digital participation.',
    image: '/assets/projects/car-price-prediction.svg',
    technologies: [
      'Python',
      'Flask',
      'IBM Cloudant',
      'NoSQL',
      'HTML5/CSS3',
      'JavaScript',
      'Cloud Integration',
    ],
    status: 'Live Web Deployment',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: 'https://aweshhussain-adivasi-ecommerce-plat.vercel.app/',
    overview:
      'A digital marketplace bridging traditional artisan craftspeople with modern e-commerce opportunities, leveraging IBM Cloudant NoSQL data structures for flexible schema storage and multi-lingual access.',
    problemStatement:
      'Indigenous artisans often face steep technical and language barriers when attempting to commercialize handicraft products on mainstream commercial platforms.',
    approach:
      'Constructed an accessible, lightweight web platform in Flask backed by IBM Cloudant, featuring localized language toggling and simplified product listing flows.',
    technicalWorkflow: [
      'Database architecture setup on IBM Cloudant for unstructured artisan catalogs',
      'Flask server route handling for authentication, product creation, and inventory sync',
      'Multilingual UI localization support to facilitate ease of use for diverse artisan communities',
      'Mobile-responsive catalog layout optimized for low-bandwidth cellular devices',
    ],
    implementedCapabilities: [
      'Full artisan profile management and handicraft portfolio showcase',
      'IBM Cloudant NoSQL database persistence for media links and product specifications',
      'Multilingual language toggle ensuring inclusive usability',
      'Accessible e-commerce interface with cultural heritage preservation focus',
    ],
    limitations: [
      'Designed as a community prototype; production rollout requires payment gateway verification.',
    ],
    accentColor: '#D97706',
  },
  {
    id: 'info-bot-studio',
    number: '06',
    title: 'Info-Bot Studio — AI Chatbot for College',
    category: 'Conversational AI / IBM Watson / Flask Web Service',
    description:
      'Built a Flask-based backend integrating IBM Watson Assistant to handle academic and campus-related student queries. Designed the conversational flow and user-interaction interface, and resolved platform limitations to improve scalability.',
    image: '/assets/projects/ai-assistant.svg',
    technologies: [
      'Python',
      'Flask',
      'IBM Watson Assistant',
      'NLP',
      'REST APIs',
      'JavaScript',
    ],
    status: 'Completed AI Assistant',
    githubUrl: 'https://github.com/Aweshhussain',
    liveDemoUrl: '',
    overview:
      'An automated natural language conversational agent deployed to streamline student inquiry response times across university admissions, curriculum guidelines, and administrative procedures.',
    problemStatement:
      'Repetitive campus administrative inquiries overwhelm college support staff while leaving prospective and enrolled students waiting for basic information.',
    approach:
      'Trained and structured intent recognition in IBM Watson Assistant connected through a Flask proxy backend to handle student queries with low latency.',
    technicalWorkflow: [
      'Intent classification, dialogue flow authoring, and entity extraction in IBM Watson Assistant',
      'Development of Flask middleware to manage session contexts and sanitize input payloads',
      'Dynamic web client interface with responsive query bubbles and quick-reply chips',
      'Testing and optimization of intent triggers to reduce fallbacks and improve response relevancy',
    ],
    implementedCapabilities: [
      'Conversational dialogue flows for admissions, fee structures, and campus services',
      'IBM Watson Assistant NLP intent matching and context management',
      'Flask REST backend handling session tokens and query validation',
      'Clean interactive front-end chat widget with responsive styling',
    ],
    limitations: [
      'Focused on college-specific domain schemas; extensible to wider university administrative modules.',
    ],
    accentColor: '#3B82F6',
  },
];
