/*
 * ─────────────────────────────────────────────
 *  chatbotLogic.js — Resume Q&A Engine v2
 *  src/utils/chatbotLogic.js
 * ─────────────────────────────────────────────
 */

// ── Stop words to ignore during matching ────
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "out", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "each",
  "every", "both", "few", "more", "most", "other", "some", "such", "no",
  "nor", "not", "only", "own", "same", "so", "than", "too", "very",
  "just", "because", "but", "and", "or", "if", "while", "about",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "it", "its", "he", "him", "his", "she", "her", "hers", "they",
  "them", "their", "we", "us", "our", "you", "your", "me", "my", "i",
  "tell", "show", "give", "know", "got", "get", "please", "also",
  "like", "want", "see", "let", "make", "any", "much", "many", "does",
]);

// ── Q&A Knowledge Base ──────────────────────
const QA_DATA = [

  // ═══════════════════════════════════════════
  // GREETINGS
  // ═══════════════════════════════════════════
  {
    keywords: ["hi", "hello", "hey", "sup", "yo", "greetings", "howdy", "hola", "whats up", "good morning", "good afternoon", "good evening", "morning", "evening", "wassup"],
    answer: "Hey there! 👋 I'm Chetanya's digital twin — think of me as his interactive resume. You can ask me about his work experience, projects, skills, education, or really anything. What's on your mind?",
  },

  // ═══════════════════════════════════════════
  // IDENTITY & INTRO
  // ═══════════════════════════════════════════
  {
    keywords: ["who are you", "what are you", "what is this", "what do you do", "what can you do", "how does this work", "are you ai", "are you bot", "are you real"],
    answer: "I'm a chatbot that knows everything about Chetanya Rathi — his resume, projects, skills, the works. I'm not a generic AI — I'm specifically built around his background. Go ahead, test me!",
  },
  {
    keywords: ["who is chetanya", "about chetanya", "introduce yourself", "about yourself", "introduction", "who is he", "about him", "describe yourself", "describe chetanya", "who chetanya", "chetanya rathi", "tell about chetanya"],
    answer: "Chetanya Rathi is a Software Engineer who lives and breathes AI. He's currently finishing his Master's in Computer Science at Syracuse University, and he's spent the last couple of years building production-grade AI systems — RAG pipelines that handle thousands of queries, LLM-powered apps, full-stack platforms. Before Syracuse, he got his B.Tech in AI & Data Science from Pune University. He's published research in IEEE, built everything from trading bots to voice forgery detectors, and he's actively looking for his next full-time role in software or AI engineering.",
  },
  {
    keywords: ["summary", "overview", "brief", "tldr", "quick summary", "elevator pitch", "in short", "nutshell", "short version", "sum up", "summarize"],
    answer: "Quick version — Chetanya is an MS CS student at Syracuse with ~2 years of real industry experience. He's built RAG systems handling 15k+ queries/month in production, cut API response times by 85% using AWS, published IEEE research, and works across the full stack from React to FastAPI to cloud infrastructure. He specializes in LangChain, LangGraph, Gemini, and building AI that actually ships.",
  },

  // ═══════════════════════════════════════════
  // EDUCATION
  // ═══════════════════════════════════════════
  {
    keywords: ["education", "degree", "degrees", "qualification", "qualifications", "academic", "academics", "educational background", "studied", "where study", "educational"],
    answer: "Chetanya has two degrees:\n\nHe's currently doing his MS in Computer Science at Syracuse University in New York — GPA 3.55, graduating May 2026. Before that, he completed his B.Tech in AI & Data Science from Savitribai Phule Pune University in India with a 3.7 GPA, graduating May 2024.",
  },
  {
    keywords: ["university", "college", "school", "institute", "campus", "which university", "where college", "which college", "where university"],
    answer: "Syracuse University for his Master's (Computer Science), and Savitribai Phule Pune University for his Bachelor's (AI & Data Science). He's currently at Syracuse, NY.",
  },
  {
    keywords: ["masters", "ms", "graduate", "grad school", "syracuse", "master degree", "postgrad", "post grad", "ms cs", "master program"],
    answer: "He's pursuing his MS in Computer Science at Syracuse University with a 3.55 GPA — expected to graduate in May 2026. His coursework covers Machine Learning, Algorithms, NLP, Operating Systems, Databases, IoT, Computer Architecture, and Applied Agentic AI Systems. The Agentic AI course (CIS 600) is where he's done some of his most interesting work — building MCP agents, working with RL alignment, and researching LLM fine-tuning for IoT security.",
  },
  {
    keywords: ["bachelors", "undergrad", "btech", "b.tech", "pune", "savitribai", "bachelor", "undergraduate", "ug", "bachelor degree"],
    answer: "He did his B.Tech in Artificial Intelligence and Data Science from Savitribai Phule Pune University — graduated May 2024 with a 3.7 GPA. Coursework included Cloud Computing, Web Technology, Computer Networks, and Deep Learning. This is also where he published his IEEE paper on voice forgery detection.",
  },
  {
    keywords: ["gpa", "grades", "cgpa", "score", "marks", "result", "academic performance"],
    answer: "3.55/4.0 at Syracuse (MS) and 3.7/4.0 at Pune University (B.Tech). Solid across both.",
  },
  {
    keywords: ["coursework", "courses", "subjects", "classes", "what courses", "what subjects", "curriculum"],
    answer: "His coursework spans Machine Learning, Operating Systems, Algorithms, Natural Language Processing, Database Management, IoT, Computer Architecture, Applied Agentic AI Systems, Cloud Computing, Web Technology, Computer Networks, and Deep Learning. The Agentic AI course at Syracuse has been particularly hands-on.",
  },
  {
    keywords: ["graduation", "graduating", "when graduate", "when finish", "completion", "when done", "convocation", "pass out", "graduate when", "finish when"],
    answer: "He's graduating from Syracuse University in May 2026 with his MS in Computer Science. He already completed his B.Tech from Pune University in May 2024.",
  },
  {
    keywords: ["agentic ai", "cis 600", "agentic course", "agentic class"],
    answer: "CIS 600 — Applied Agentic AI Systems at Syracuse. This is where Chetanya built an MCP-based research assistant agent, worked on RL alignment techniques (SFT, PPO, DPO, GRPO) on SmolLM2-135M, and wrote a research paper on fine-tuning tiny LLMs for IoT threat detection. One of his most impactful courses.",
  },

  // ═══════════════════════════════════════════
  // SKILLS — GENERAL
  // ═══════════════════════════════════════════
  {
    keywords: ["skills", "technologies", "tech stack", "tools", "proficient", "expertise", "technical skills", "what technologies", "good at", "capable", "competencies", "stack", "skillset", "skill set"],
    answer: "Here's the full picture:\n\nLanguages — Python, JavaScript/TypeScript, C++, Java, HTML/CSS, PHP, Bash\n\nAI/ML — LangChain, LangGraph, RAG pipelines, Gemini, Vertex AI, BERT, embedding models, LLM fine-tuning, vector search, ChromaDB\n\nBackend — FastAPI, Flask, Node.js, REST APIs, microservices, JWT auth\n\nDatabases — MongoDB, PostgreSQL, SQL, ChromaDB\n\nCloud & DevOps — AWS (Lambda, S3, EC2, SQS, RDS), GCP (GKE, BigQuery, Cloud Run, Pub/Sub), Docker, CI/CD\n\nSoftware Engineering — system design, API design, scalability, performance optimization\n\nHe's strongest in Python + AI/ML + backend, but genuinely full-stack.",
  },
  {
    keywords: ["top skills", "best skills", "strongest", "main skills", "primary skills", "core skills", "key skills"],
    answer: "His strongest areas are Python, AI/ML engineering (especially RAG + LangChain + LLMs), and backend development with FastAPI. He's also very capable on the frontend with React, and has solid cloud skills with both AWS and GCP. If you need someone who can build an entire AI-powered product end to end — that's his sweet spot.",
  },
  {
    keywords: ["soft skills", "communication", "interpersonal", "non technical", "people skills"],
    answer: "Strong communicator and collaborator. He works well in cross-functional teams (demonstrated at Main 10 where he standardized workflows across teams), handles pressure well (EECS Hackathon delivery), and has a builder mindset — he ships real products, not just assignments.",
  },

  // ═══════════════════════════════════════════
  // SKILLS — SPECIFIC
  // ═══════════════════════════════════════════
  {
    keywords: ["programming language", "languages", "coding language", "what languages", "which languages", "code in", "programming"],
    answer: "JavaScript (ES6+), TypeScript, Python, C++, Java, HTML5, CSS3, PHP, and Bash. Python and JavaScript are his daily drivers — Python for all the AI/backend work, JavaScript/React for frontend.",
  },
  {
    keywords: ["python"],
    answer: "Python is his bread and butter. He uses it for pretty much everything — FastAPI backends, AI/ML pipelines, LangChain agents, data processing, automation scripts, the trading bot, PromptLab. If it involves AI or backend logic, he's writing it in Python.",
  },
  {
    keywords: ["javascript", "typescript", "js", "ts"],
    answer: "He works with JavaScript (ES6+) and TypeScript mainly for frontend development with React. His portfolio, Zomato chatbot frontend, PromptLab's web UI, and the IoT monitoring dashboard are all React-based. Comfortable with modern patterns — hooks, context, component architecture.",
  },
  {
    keywords: ["react", "frontend", "front end", "front-end", "ui", "user interface", "web development"],
    answer: "React is his go-to for frontend. He's built several production-quality interfaces — this portfolio, the IoT monitoring dashboard with Chart.js, the Zomato chatbot UI, and PromptLab's web interface (React + Vite). Modern React with hooks and functional components.",
  },
  {
    keywords: ["ai", "ml", "machine learning", "artificial intelligence", "genai", "generative ai", "gen ai", "deep learning"],
    answer: "This is his specialty. LangChain, LangGraph, Gemini API, Vertex AI, BERT, embedding models, vector search (ChromaDB), LLM fine-tuning (SFT, PPO, DPO, GRPO), and RAG pipeline design. He's built production RAG systems, multi-agent architectures, and voice forgery detection using GANs. The combination of research depth and production experience is what makes him stand out.",
  },
  {
    keywords: ["langchain", "langgraph", "rag", "retrieval", "vector", "embedding", "retrieval augmented", "vector search", "vector database", "semantic search"],
    answer: "Deep hands-on experience. He built a Multi-Agentic RAG system with Pre-Act and Corrective agents using LangGraph. At Main 10, he designed production RAG pipelines handling 15k+ queries/month with semantic search and hybrid reranking. At Hum Aspen, he built RAG-based personalization improving accuracy by 50%. ChromaDB for vector storage, various embedding models for search.",
  },
  {
    keywords: ["aws", "amazon", "lambda", "s3", "ec2", "sqs", "rds"],
    answer: "Extensive AWS at Main 10 — Lambda, S3, and SQS for async processing. API response times dropped from 12s to 1.8s, system handled 600+ peak operations. Also worked with EC2 and RDS for deployment and databases.",
  },
  {
    keywords: ["cloud", "devops", "deployment", "docker", "ci cd", "cicd", "containerization"],
    answer: "Worked across both AWS and GCP in production. At Main 10, async architectures with Lambda/S3/SQS. At Hum Aspen, containerized everything with Docker (350+ test cases). GCP: hands-on with GKE, BigQuery, Cloud Run, Pub/Sub, Kubernetes. CI/CD pipelines for production deployments.",
  },
  {
    keywords: ["gcp", "google cloud", "gke", "bigquery", "kubernetes", "k8s", "google cloud platform"],
    answer: "Extensive hands-on through Google Cloud Arcade — GKE monitoring, Cloud Storage, Pub/Sub, Cloud Run Functions, BigQuery, Dataproc, Dataplex, Looker LookML, HA-VPN, Cloud KMS, Cloud Monitoring, and Kubernetes deployments. CLI-first person — prefers gcloud and kubectl over the web console.",
  },
  {
    keywords: ["backend", "api", "fastapi", "flask", "node", "server", "rest", "api design", "apis", "server side", "backend development", "express"],
    answer: "FastAPI is his primary framework — used for the Zomato chatbot, IoT dashboard, PromptLab, and trading bot. Also works with Flask (hackathon grading system) and Node.js (MERN stack at Main 10). Designs RESTful APIs, JWT auth, microservices. Built a centralized FastAPI backend at Main 10 that replaced manual coordination across teams.",
  },
  {
    keywords: ["database", "db", "sql", "mongodb", "postgres", "chromadb", "data storage", "databases", "mongo"],
    answer: "MongoDB, PostgreSQL, SQL, and ChromaDB. Strong MongoDB experience — at Hum Aspen, he optimized pipelines with compound indexing and aggregation for 30% faster processing. ChromaDB for vector storage in RAG systems. Database coursework (CSE 581) with SQL Server stored procedures and schema design.",
  },
  {
    keywords: ["system design", "scalability", "architecture", "design patterns", "distributed", "microservice", "microservices"],
    answer: "Real production experience — not just whiteboard exercises. Redesigned async architecture with AWS Lambda/SQS (85% faster). Built microservice architectures, queue-based orchestration handling 500+ concurrent submissions, scalable IoT data pipelines. Understands API patterns, caching, and performance optimization from actual implementations.",
  },
  {
    keywords: ["llm", "fine tuning", "fine-tuning", "model training", "sft", "ppo", "dpo", "grpo", "finetuning", "train model"],
    answer: "Hands-on LLM fine-tuning with SFT, PPO, DPO, and GRPO on SmolLM2-135M for his Agentic AI course. Researching fine-tuning tiny LLMs for IoT threat detection. Experimented with local inference using Unsloth Studio and quantized Gemma models. Not just using APIs — he understands what's happening under the hood.",
  },
  {
    keywords: ["java", "c++", "cpp"],
    answer: "Proficient in both C++ and Java — they complement his Python/JS stack and give him strong fundamentals in DSA, OOP, and system-level thinking.",
  },
  {
    keywords: ["dsa", "data structures", "algorithms", "competitive", "leetcode", "problem solving"],
    answer: "Strong DSA fundamentals — Algorithms coursework at Syracuse, comfortable with standard data structures, graph algorithms, dynamic programming, complexity analysis. C++ and Java background reinforces this.",
  },
  {
    keywords: ["git", "version control", "bash", "linux", "terminal", "shell", "command line"],
    answer: "Very comfortable with Git, Bash scripting, and Linux. Prefers the terminal over GUIs — especially in GCP work where he uses gcloud CLI, kubectl, and shell scripts.",
  },
  {
    keywords: ["gemini", "vertex", "google ai"],
    answer: "Uses Gemini extensively — Gemini 2.5 Flash at Main 10 for RAG, Gemini API for Zomato chatbot and Hum Aspen wellness app, gemini-embedding-001 for embeddings. Also works with Vertex AI for model deployment.",
  },
  {
    keywords: ["bert", "nlp", "natural language", "text processing"],
    answer: "NLP coursework and practical experience — BERT for text understanding, NLP in the AI grading system (semantic similarity, context understanding, rubric scoring), and NLP techniques across all his LLM-based projects.",
  },
  {
    keywords: ["n8n", "automation", "workflow", "orchestration"],
    answer: "Uses n8n for workflow automation — notably in the Multi-Agentic RAG system where n8n orchestrates the flow between different agents and tools.",
  },
  {
    keywords: ["jwt", "auth", "authentication", "security", "authorization"],
    answer: "Implements JWT-based auth and role-based access control in the IoT dashboard and backend services. At Main 10, he handled API validation and error handling for secure data flow.",
  },
  {
    keywords: ["mern", "full stack", "fullstack"],
    answer: "He's built full-stack apps with the MERN stack (at Main 10) and also with React + FastAPI (his preferred modern stack). The Zomato chatbot, IoT dashboard, PromptLab, and portfolio are all full-stack projects he owns end to end.",
  },

  // ═══════════════════════════════════════════
  // EXPERIENCE — GENERAL
  // ═══════════════════════════════════════════
  {
    keywords: ["experience", "work experience", "professional experience", "work history", "career", "employment"],
    answer: "Two solid internships:\n\nAt Main 10 in Pune (Jan–Aug 2024), he was a Software Engineering Intern focused on AI and Automation. Built a production RAG system handling 15k+ queries/month, designed AWS async architectures cutting response times by 85%, and engineered pipelines with Gemini 2.5 Flash.\n\nAt Hum Aspen Wellness in Pune (Jan–Dec 2023), he was a Full Stack GenAI Engineer. Embedded LLM-driven insights into a wellness app, built RAG pipelines improving personalization by 50%, optimized MongoDB for AI workloads, created 350+ test cases in Docker.\n\nThat's about 2 years of real engineering — not just coursework.",
  },
  {
    keywords: ["internship", "internships", "intern", "interns", "where intern", "past internships"],
    answer: "Two internships, both in Pune:\n\n1. Main 10 (Jan–Aug 2024) — Software Engineering Intern, AI & Automation. Production RAG systems, AWS async architectures, FastAPI backends.\n\n2. Hum Aspen Wellness (Jan–Dec 2023) — Full Stack GenAI Engineer. LLM-powered wellness app, RAG pipelines, MongoDB optimization, Docker testing.\n\nBoth were serious engineering roles where he shipped real code to production.",
  },
  {
    keywords: ["job", "jobs", "worked", "where work", "companies", "company", "employer", "employers"],
    answer: "He's worked at Main 10 (a maintenance management tool company) and Hum Aspen Wellness (a health/wellness startup). Both in Pune, India, both involved building AI systems from scratch. Now looking for his next full-time role in the US after graduating from Syracuse in May 2026.",
  },

  // ═══════════════════════════════════════════
  // EXPERIENCE — MAIN 10
  // ═══════════════════════════════════════════
  {
    keywords: ["main 10", "maintenance", "main10", "latest internship", "recent internship", "last job", "recent job", "latest job", "most recent"],
    answer: "At Main 10 (Jan–Aug 2024), he was a Software Engineering Intern on the AI & Automation team:\n\nBuilt a production-ready maintenance knowledge retrieval system using MERN + LangChain — 15k+ queries/month, 55% better search relevance through semantic search and hybrid reranking.\n\nRedesigned the architecture using AWS Lambda, S3, SQS for async processing — response times went from 12 seconds to 1.8 seconds. The system handled 600+ operations during peak hours.\n\nDeveloped a centralized FastAPI backend replacing manual task coordination between teams.\n\nEngineered a RAG pipeline using Gemini 2.5 Flash and gemini-embedding-001 to enrich automated alerts with historical context, speeding up incident diagnosis significantly.",
  },

  // ═══════════════════════════════════════════
  // EXPERIENCE — HUM ASPEN
  // ═══════════════════════════════════════════
  {
    keywords: ["hum aspen", "wellness", "now zone", "health app", "first internship", "hum", "aspen"],
    answer: "At Hum Aspen Wellness (Jan–Dec 2023) — Full Stack GenAI Engineer, working on the Now Zone Life wellness app:\n\nIntegrated LLM-driven personalized insights using LangChain + Gemini API. The app went from generic to genuinely tailored health recommendations.\n\nBuilt RAG pipelines with vector embeddings in a FastAPI microservice architecture — 50% better personalization by grounding responses in user-specific data.\n\nDeployed AI modules for health trend summarization — heart rate variability, sleep patterns — with actionable suggestions.\n\nOptimized MongoDB with compound indexing — 30% faster data processing.\n\nCreated 350+ test cases in Docker, caught 30+ critical bugs, improved reliability by 30%.",
  },

  // ═══════════════════════════════════════════
  // EXPERIENCE — META
  // ═══════════════════════════════════════════
  {
    keywords: ["years of experience", "how long", "how many years", "total experience", "experience duration"],
    answer: "About 2 years — a full year at Hum Aspen (2023) and 8 months at Main 10 (2024). Both were hands-on engineering roles where he wrote production code. Combined with all his independent projects, there's a lot of real-world mileage there.",
  },
  {
    keywords: ["current", "currently", "right now", "presently", "doing now", "nowadays", "these days", "what doing"],
    answer: "Right now he's finishing his MS at Syracuse (graduating May 2026), working on Agentic AI coursework, building portfolio projects, researching LLM fine-tuning for IoT security, and actively interviewing for full-time SWE and AI roles.",
  },

  // ═══════════════════════════════════════════
  // PROJECTS — GENERAL
  // ═══════════════════════════════════════════
  {
    keywords: ["projects", "project", "portfolio projects", "built", "build", "made", "created", "developed", "project list", "all projects", "show projects", "list projects", "what built"],
    answer: "He's built a ton of stuff — here are the highlights:\n\n🔸 Multi-Agentic RAG System — LangGraph + Gemini, Pre-Act & Corrective agents\n🔸 Real-Time IoT Dashboard — React + FastAPI + AWS + Chart.js\n🔸 AI Grading System — EECS Hackathon, 60% less grading time\n🔸 Voice Forgery Detection — WaveGAN + SpecGAN, IEEE published\n🔸 PromptLab — open-source CLI for comparing LLMs side by side\n🔸 Zomato AI Chatbot — restaurant recommendations with two-LLM pipeline\n🔸 NSE Options Trading Bot — intraday scalping with conviction scoring\n🔸 IoT Threat Detection — research on fine-tuning tiny LLMs\n🔸 MCP Research Agent — agentic workflows with Model Context Protocol\n\nAsk about any specific one for details!",
  },
  {
    keywords: ["best project", "favorite project", "favourite project", "most impressive", "coolest project", "proudest project", "top project"],
    answer: "The Multi-Agentic RAG System and the Main 10 production work are probably the most impressive. The RAG system uses Pre-Act agents for multi-step reasoning and Corrective agents to reduce hallucinations — genuinely sophisticated architecture. And the Main 10 work shows he can build production systems handling real traffic (15k+ queries/month) with measurable impact.",
  },
  {
    keywords: ["recent project", "latest project", "new project", "newest project"],
    answer: "Most recent: Real-Time IoT Monitoring Dashboard (Nov 2025) and Multi-Agentic RAG System (Sep 2025). He's also been working on IoT threat detection research and RL alignment assignments.",
  },
  {
    keywords: ["how many projects", "number of projects", "project count"],
    answer: "He has 9+ significant projects in his portfolio, ranging from production systems to research to open-source tools. And that's not counting the coursework assignments and smaller builds. The guy is constantly shipping.",
  },

  // ═══════════════════════════════════════════
  // PROJECTS — INDIVIDUAL
  // ═══════════════════════════════════════════
  {
    keywords: ["rag system", "multi agent", "multi-agent", "agentic rag", "pre-act", "corrective rag", "preact", "multi rag", "agentic system", "agent system", "agent project"],
    answer: "The Multi-Agentic RAG System (Sep 2025) is one of his most technically ambitious projects. Built with LangGraph and LangChain with Gemini handling intelligent task routing across specialized agents.\n\nThe dual RAG approach is the interesting part — Pre-Act RAG handles dynamic multi-step reasoning (the agent plans before acting), while Corrective RAG evaluates documents, checks grounding, and falls back to real-time retrieval if needed. ChromaDB for vector storage.\n\n30% better reasoning accuracy, 25% fewer hallucinations, with n8n for workflow automation.",
  },
  {
    keywords: ["iot dashboard", "monitoring dashboard", "real-time dashboard", "realtime dashboard", "iot monitoring", "device monitoring", "monitoring system"],
    answer: "Real-Time IoT Monitoring Dashboard (Nov 2025) — React, FastAPI, AWS, Chart.js. Visualizes live device metrics, alerts, and system health through an interactive web interface. JWT auth with role-based access control. AWS infrastructure for scalable data pipelines with low-latency streaming IoT data and fault tolerance across distributed environments.",
  },
  {
    keywords: ["hackathon", "grading", "grading system", "eecs", "ai grading", "auto grading", "automated grading"],
    answer: "EECS Hackathon at Syracuse (March 2025) — built an AI-powered grading system that cut manual grading time by 60%. Uses NLP for context understanding, intelligent rubric scoring, semantic similarity analysis, and structured feedback.\n\nFlask backend handling 500+ submissions with microservice APIs, queue-based task orchestration, real-time feedback, and fault tolerance. Pretty impressive for a hackathon build.",
  },
  {
    keywords: ["voice", "cloning", "forgery", "wavegan", "specgan", "deepfake", "ieee", "published", "publication", "research paper", "paper"],
    answer: "Published in IEEE — Voice Cloning and Forgery Detection using WaveGAN and SpecGAN (Sep 2023). A GenAI-driven system that models speech distributions to identify synthetic audio and distinguish cloned voices from real ones. 22% improvement in deepfake detection accuracy.\n\nUseful for secure authentication, media forensics, and voice integrity analysis.\n\n📄 https://ieeexplore.ieee.org/document/10392082",
  },
  {
    keywords: ["promptlab", "postman for llm", "llm comparison", "cli tool", "prompt lab", "compare llm", "compare models"],
    answer: "PromptLab — an open-source CLI tool, 'Postman for LLMs'. Compare ~30 free models side by side.\n\nPython + Typer CLI with Rich terminal output. FastAPI + WebSocket backend and React + Vite frontend. Supports Gemini, Groq, and OpenRouter free tiers. Fire the same prompt at multiple models, compare quality, latency, and style instantly.",
  },
  {
    keywords: ["zomato", "chatbot", "restaurant", "food", "food recommendation", "food bot", "restaurant recommendation"],
    answer: "Zomato AI Chatbot — full-stack restaurant recommendation system. FastAPI + React + Gemini API over a large Indian restaurant dataset.\n\nThe clever bit is the two-LLM-call pipeline — first call extracts intent (dish, area, cuisine), second generates the response. Has area alias resolution for Indian localities ('KP' → 'Koregaon Park'), defaults to Pune, and strict dish filtering for accurate results.",
  },
  {
    keywords: ["trading", "bot", "nse", "nifty", "banknifty", "options", "scalping", "trading bot", "stock", "stock market", "algo trading", "algorithmic trading"],
    answer: "NSE Options Trading Bot — Python/FastAPI intraday scalping for NIFTY and BANKNIFTY. A long-running passion project.\n\nTwo strategies: EMA_TREND and SEMA_SCALP with multi-layer conviction scoring. Risk management with damage control, day bias detection, theta decay timer. Simplified from 23 filters to 6 core gates with pullback-based entries. Extensively backtested and paper traded across dozens of sessions.",
  },
  {
    keywords: ["iot threat", "tiny llm", "threat detection", "iot security", "iot research"],
    answer: "Ongoing CIS 600 research — how small, fine-tuned LLMs can detect IoT security threats. The idea is you don't need massive models for edge security classification — a tiny, specialized one can do it efficiently. Experiments with Unsloth Studio and quantized Gemma models.",
  },
  {
    keywords: ["mcp", "research assistant", "mcp agent", "model context protocol", "mcp project"],
    answer: "MCP-based Research Assistant Agent for CIS 600. Uses the Model Context Protocol for multi-step research workflows — context management, tool selection, task orchestration. Shows how agents can plan, use tools, and chain reasoning together.",
  },
  {
    keywords: ["tally", "erp", "tally prime", "tdl", "inventory", "stock alert"],
    answer: "Tally Prime ERP automation using TDL scripting — monitors stock levels against MOQ thresholds and sends automated daily email alerts via SMTP. Practical business automation.",
  },

  // ═══════════════════════════════════════════
  // CONTACT
  // ═══════════════════════════════════════════
  {
    keywords: ["contact", "email", "phone", "reach", "get in touch", "connect", "contact info", "contact details", "reach out", "talk to him", "how contact"],
    answer: "Here's how to reach Chetanya:\n\n📧 crathi@syr.edu\n🔗 linkedin.com/in/chetanya-rathi1711\n💻 github.com/ChetanyaRathi\n🌐 chetanyarathi-portfolio.netlify.app\n\nEmail or LinkedIn are the fastest ways to get a response.",
  },
  {
    keywords: ["linkedin", "linked in"],
    answer: "LinkedIn: https://www.linkedin.com/in/chetanya-rathi1711/ — feel free to connect!",
  },
  {
    keywords: ["github", "repos", "open source", "code", "repositories", "git repo"],
    answer: "GitHub: https://github.com/ChetanyaRathi — repos for PromptLab, Zomato chatbot, IoT dashboard, and more.",
  },
  {
    keywords: ["portfolio", "website", "site", "personal site", "personal website"],
    answer: "You're looking at it! Direct link: https://chetanyarathi-portfolio.netlify.app",
  },
  {
    keywords: ["email address", "email id", "mail id", "mail address"],
    answer: "crathi@syr.edu — best email to reach him.",
  },
  {
    keywords: ["phone number", "call number", "mobile", "cell"],
    answer: "+1 (315) 278-3090",
  },

  // ═══════════════════════════════════════════
  // LOCATION & AVAILABILITY
  // ═══════════════════════════════════════════
  {
    keywords: ["location", "where", "based", "city", "relocate", "relocation", "where live", "where stay", "located", "where from"],
    answer: "Currently in Syracuse, NY for his Master's. Originally from Pune, India. Fully open to relocating anywhere in the US for the right opportunity.",
  },
  {
    keywords: ["available", "availability", "when start", "start date", "when join", "notice period", "immediate", "join when"],
    answer: "Graduates May 2026, available for full-time starting Summer 2026. Also open to internships before graduation.",
  },
  {
    keywords: ["visa", "h1b", "sponsorship", "work authorization", "h1-b", "opt", "f1", "f-1", "work permit", "authorized", "immigration"],
    answer: "Currently on F-1 student visa, eligible for OPT after graduating May 2026. For long-term employment, he'll need H1B sponsorship.",
  },
  {
    keywords: ["remote", "onsite", "hybrid", "work from home", "wfh", "office", "in person"],
    answer: "Open to all formats — remote, hybrid, or onsite. Willing to relocate for the right role.",
  },
  {
    keywords: ["resume", "cv", "download resume", "pdf", "download cv"],
    answer: "Grab his resume using the 'Download Resume' button on the portfolio homepage. Or keep chatting with me — I know everything on it!",
  },

  // ═══════════════════════════════════════════
  // ROLE & JOB SEARCH
  // ═══════════════════════════════════════════
  {
    keywords: ["looking for", "what role", "position", "opportunity", "seeking", "open to", "target role", "dream job", "ideal role", "type of role", "kind of role", "job search", "applying"],
    answer: "He's targeting full-time / new-grad roles in:\n\n• Software Engineering\n• AI/ML Engineering\n• Backend Engineering\n• Full-Stack Development\n• GenAI / LLM Applications\n\nThe sweet spot is building AI-powered products end to end. Companies with H1B sponsorship are required.",
  },
  {
    keywords: ["fit", "right fit", "good fit", "suitable", "match", "right candidate"],
    answer: "Great fit for teams building AI-powered products who need someone across the full stack. If you need a developer who gets both the ML side (RAG, LLMs, fine-tuning) and the engineering side (APIs, databases, cloud), that's exactly him. Especially strong for LangChain, GenAI, or production ML roles.",
  },

  // ═══════════════════════════════════════════
  // RECRUITER / BEHAVIORAL
  // ═══════════════════════════════════════════
  {
    keywords: ["why hire", "why should we hire", "what makes different", "stand out", "unique", "why chetanya", "differentiator", "competitive advantage", "value add", "what special"],
    answer: "What genuinely sets him apart:\n\nProduction experience — built RAG systems handling 15k+ queries/month. Most new grads can't say that.\n\nFull-stack ownership — React to FastAPI to AWS, no handoff needed.\n\nResearch depth — IEEE published, hands-on LLM fine-tuning, real understanding of what's under the hood.\n\nNumbers-driven impact — 85% faster APIs, 55% better relevance, 50% improved personalization.\n\nBuilder mindset — constantly shipping side projects because he genuinely enjoys it.",
  },
  {
    keywords: ["strength", "strengths", "strong point", "strong points", "best at", "strongest skill"],
    answer: "Biggest strengths: building AI systems that work in production (not demos), full-stack ownership, strong research foundation combined with practical engineering, and a relentless builder mentality. The depth in AI/ML combined with breadth across the stack is rare in new grads.",
  },
  {
    keywords: ["weakness", "weaknesses", "improve", "improvement", "area of growth", "where improve", "shortcoming", "limitation"],
    answer: "Distributed systems at massive scale is an area he's growing in. His AI/ML and backend skills are strong, but designing for millions of concurrent users is something he's actively learning through coursework and GCP labs. He identifies gaps and fills them proactively.",
  },
  {
    keywords: ["team", "teamwork", "collaboration", "leadership", "lead", "work with others", "team player", "cross functional"],
    answer: "At Main 10, he built a centralized backend that standardized execution across teams — requires real collaboration. At the EECS Hackathon, delivered a full system under time pressure. His projects span frontend, backend, and ML, meaning constant cross-functional coordination. Collaborative but self-driven enough to own things independently.",
  },
  {
    keywords: ["achievement", "accomplishment", "proud", "best work", "highlight", "biggest achievement", "accomplishments", "achievements", "notable"],
    answer: "Top achievements:\n\n🏆 IEEE publication on voice forgery detection — while still in undergrad\n🏆 Production RAG system handling 15k+ queries/month at Main 10\n🏆 Cut API response times from 12s to 1.8s with AWS async architecture\n🏆 AI grading system at EECS Hackathon — 60% less grading time\n🏆 PromptLab — an open-source tool people actually use\n🏆 50% better personalization at Hum Aspen through RAG pipelines",
  },
  {
    keywords: ["challenge", "difficult", "hardest", "tough", "obstacle", "problem solved", "biggest challenge", "overcome", "challenging"],
    answer: "At Main 10, the system had 12-second API response times creating real bottlenecks during peak usage. Chetanya redesigned the entire architecture using AWS Lambda, S3, and SQS for async processing — brought it down to 1.8s and enabled 600+ concurrent operations. Not a quick fix — he had to rethink the data flow from scratch.",
  },
  {
    keywords: ["failure", "mistake", "failed", "learned", "lesson", "learning"],
    answer: "The trading bot taught him a lot about humility. First version had 23 filters and looked great in theory, but kept losing money. Instead of giving up, he systematically simplified to 6 core gates, rebuilt conviction scoring from scratch. Taught him that complexity isn't intelligence — sometimes the best engineering is knowing what to remove.",
  },
  {
    keywords: ["salary", "compensation", "pay", "ctc", "expected salary", "how much", "money", "package"],
    answer: "Open to discussing compensation based on role, location, and company. Finding the right opportunity is the priority. Reach out at crathi@syr.edu to discuss specifics.",
  },
  {
    keywords: ["culture", "work culture", "environment", "ideal company", "kind of company", "type of company", "dream company"],
    answer: "Thrives in fast-paced, engineering-driven environments where shipping matters. Values ownership, technical depth, and interesting AI work. Not looking to be a cog — wants to build things that matter. Startup to mid-size with strong technical culture fits best.",
  },
  {
    keywords: ["motivation", "drives", "why engineering", "why ai", "passion", "why software", "inspired", "what drives"],
    answer: "Driven by building things that work in the real world — not proofs of concept. The intersection of AI and practical software engineering is where he's most excited. Every project comes from genuine curiosity and the urge to turn ideas into something tangible.",
  },
  {
    keywords: ["goal", "goals", "ambition", "future", "plan", "plans", "where see yourself", "five years", "long term", "career goal"],
    answer: "Short term: land a strong SWE or AI engineering role building production AI systems. Long term: become the kind of engineer who bridges cutting-edge AI research and real-world product engineering. He's drawn to building AI tools and infrastructure that make other developers more productive.",
  },
  {
    keywords: ["manage", "management", "manager", "manage people", "lead team"],
    answer: "Not targeting management right now — wants to go deep as an IC first. But he naturally takes initiative and has led project components at both internships. The centralized backend at Main 10 was his initiative that ended up standardizing work across teams.",
  },
  {
    keywords: ["reference", "references", "recommend", "recommendation"],
    answer: "References available on request — reach out to Chetanya at crathi@syr.edu to discuss.",
  },

  // ═══════════════════════════════════════════
  // RESEARCH & PUBLICATIONS
  // ═══════════════════════════════════════════
  {
    keywords: ["research", "publications", "academic research", "papers", "scholarly", "academic paper", "published paper"],
    answer: "Published: 'Voice Cloning and Forgery Detection using WaveGAN and SpecGAN' — IEEE, 2023.\n📄 https://ieeexplore.ieee.org/document/10392082\n\nOngoing: Fine-tuning tiny LLMs for IoT threat detection — CIS 600 at Syracuse.\n\nAlso completed RL alignment work (SFT/PPO/DPO/GRPO on SmolLM2-135M) for his Agentic AI course.",
  },
  {
    keywords: ["certifications", "certification", "certificate", "certificates", "badges", "google cloud badges", "arcade"],
    answer: "Completed extensive Google Cloud Arcade / Skills Boost labs — GKE, BigQuery, Cloud Run, Pub/Sub, Dataproc, Cloud KMS, Kubernetes, Dataplex, Looker, and more. Tracked progress toward prize tiers across categories.",
  },

  // ═══════════════════════════════════════════
  // PERSONALITY & MISC
  // ═══════════════════════════════════════════
  {
    keywords: ["hobby", "hobbies", "interest", "interests", "fun", "free time", "outside work", "besides coding", "personal interests", "extracurricular"],
    answer: "When he's not coding (which is rare), he's into algorithmic trading — built his own NSE options bot. Also explores open-source tools, local LLM inference, and India-specific app ideas. Builder at heart — even his hobbies involve making things.",
  },
  {
    keywords: ["favorite", "favourite", "prefer", "preference", "best language", "preferred", "favorite tech"],
    answer: "Python for AI/ML and backend. React + JavaScript for frontend. FastAPI as backend framework. GCP with CLI-first workflows for cloud, though strong AWS experience too.",
  },
  {
    keywords: ["age", "how old", "born", "birthday"],
    answer: "Early-to-mid twenties — graduated B.Tech in 2024, currently in grad school. His experience speaks louder than his age — 2 years of production AI work and an IEEE publication is solid.",
  },
  {
    keywords: ["indian", "india", "from india", "nationality", "country", "where from originally"],
    answer: "From Pune, India originally. Moved to the US for his Master's at Syracuse University. Currently in Syracuse, NY.",
  },

  // ═══════════════════════════════════════════
  // CONVERSATIONAL
  // ═══════════════════════════════════════════
  {
    keywords: ["thank", "thanks", "thank you", "bye", "goodbye", "see you", "nice talking", "good talk"],
    answer: "Thanks for chatting! 🚀 If you'd like to connect with Chetanya directly — crathi@syr.edu or LinkedIn (linkedin.com/in/chetanya-rathi1711). Have a great day!",
  },
  {
    keywords: ["cool", "awesome", "great", "amazing", "impressive", "good job", "well done", "sweet", "nice", "wow", "love it", "like it"],
    answer: "Glad you think so! There's plenty more to explore — ask about any specific project, skill, or experience. Or if you're convinced, reach out at crathi@syr.edu! 😄",
  },
  {
    keywords: ["help", "what can i ask", "commands", "options", "menu", "how to use", "guide"],
    answer: "You can ask me pretty much anything about Chetanya:\n\n💼 'Tell me about his work experience'\n🎓 'Where did he study?'\n🛠️ 'What are his skills?'\n🚀 'What projects has he built?'\n📄 'Does he have any publications?'\n📬 'How can I contact him?'\n🎯 'What kind of role is he looking for?'\n💪 'Why should we hire him?'\n🧠 'What's his biggest achievement?'\n\nOr just ask naturally — I'll figure it out!",
  },
  {
    keywords: ["joke", "funny", "humor", "make me laugh"],
    answer: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 But seriously, ask me about Chetanya's background — I promise those answers are way more interesting than my jokes.",
  },
  {
    keywords: ["hire", "hiring", "offer", "recruit", "interested"],
    answer: "Great to hear! Best way to move forward:\n\n📧 crathi@syr.edu\n🔗 linkedin.com/in/chetanya-rathi1711\n📱 +1 (315) 278-3090\n\nHe's actively looking and would love to chat!",
  },
  {
    keywords: ["compare", "comparison", "vs", "versus", "better than"],
    answer: "Can't compare to other candidates since I only know Chetanya! But here's what makes his profile strong: production AI experience, full-stack capability, IEEE research, and measurable impact. Ask me specifics and judge for yourself!",
  },
  {
    keywords: ["can he", "does he know", "is he able", "capable of", "familiar with", "experienced in", "worked with"],
    answer: "Ask me something specific! Whether it's a technology, project type, or skill — if Chetanya has experience with it, I'll give you the details with context.",
  },
  {
    keywords: ["ok", "okay", "k", "alright", "sure", "got it", "i see", "understood"],
    answer: "Anything else you'd like to know about Chetanya? I'm here to help — ask about skills, projects, experience, or anything else!",
  },
];

// ── Matching Engine ─────────────────────────
function cleanInput(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getContentWords(text) {
  return cleanInput(text)
    .split(" ")
    .filter((w) => w.length > 0 && !STOP_WORDS.has(w));
}

// Stem-like comparison: checks if two words share a root
function stemMatch(a, b) {
  if (a.length < 4 || b.length < 4) return false;
  const shorter = a.length <= b.length ? a : b;
  const longer = a.length <= b.length ? b : a;
  // Check if the longer word starts with all-but-last-2 chars of shorter
  const root = shorter.slice(0, Math.max(4, shorter.length - 2));
  return longer.startsWith(root);
}

export function getAIResponse(input) {
  const cleaned = cleanInput(input);
  const contentWords = getContentWords(input);
  const allWords = cleaned.split(" ").filter((w) => w.length > 0);

  let bestMatch = null;
  let bestScore = 0;

  for (const qa of QA_DATA) {
    let score = 0;

    for (const keyword of qa.keywords) {
      const kw = keyword.toLowerCase();

      // 1. Exact full phrase in input (highest)
      if (cleaned.includes(kw)) {
        const wordCount = kw.split(/\s+/).length;
        score += 15 + wordCount * 5;
        continue; // already matched fully, skip finer checks for this kw
      }

      // 2. Phrase match after stripping stop words from both
      const kwContentWords = kw.split(/\s+/).filter((w) => !STOP_WORDS.has(w));
      const kwContentPhrase = kwContentWords.join(" ");
      if (kwContentPhrase.length > 0) {
        const inputContentPhrase = contentWords.join(" ");
        if (inputContentPhrase.includes(kwContentPhrase)) {
          score += 12 + kwContentWords.length * 3;
          continue;
        }
      }

      // 3. Word-level matching
      let wordHits = 0;
      for (const kwWord of kwContentWords) {
        // Direct match in all input words
        if (allWords.includes(kwWord)) {
          score += 4;
          wordHits++;
          continue;
        }

        // Stem/partial matching
        for (const w of allWords) {
          if (stemMatch(w, kwWord)) {
            score += 3;
            wordHits++;
            break;
          }
          // Substring matching
          if (w.length >= 4 && kwWord.length >= 4) {
            if (kwWord.includes(w) || w.includes(kwWord)) {
              score += 2;
              wordHits++;
              break;
            }
          }
        }
      }

      // Bonus if most keyword content words matched
      if (kwContentWords.length > 0 && wordHits >= kwContentWords.length * 0.8) {
        score += 5;
      }
    }

    // Also check content words against keywords directly
    for (const cw of contentWords) {
      for (const keyword of qa.keywords) {
        // Single-word keyword exact match
        if (keyword === cw && !STOP_WORDS.has(keyword)) {
          score += 6;
        }
        // Content word stem-matches a single-word keyword
        if (!keyword.includes(" ") && stemMatch(cw, keyword)) {
          score += 4;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }

  if (bestScore >= 4) return bestMatch.answer;

  // Fallback: check if any content word is a substring of any keyword
  if (contentWords.length > 0) {
    let fallbackMatch = null;
    let fallbackScore = 0;

    for (const qa of QA_DATA) {
      let fScore = 0;
      for (const kw of qa.keywords) {
        for (const cw of contentWords) {
          if (cw.length >= 4 && kw.includes(cw)) fScore += 3;
          if (kw.length >= 4 && cw.includes(kw)) fScore += 3;
          if (stemMatch(cw, kw)) fScore += 2;
        }
      }
      if (fScore > fallbackScore) {
        fallbackScore = fScore;
        fallbackMatch = qa;
      }
    }

    if (fallbackScore >= 3 && fallbackMatch) return fallbackMatch.answer;
  }

  return "Hmm, I don't have a specific answer for that one. But I know a lot! Try asking about Chetanya's work experience, skills, projects, education, or how to contact him. You can also type 'help' to see all topics I cover.";
}
