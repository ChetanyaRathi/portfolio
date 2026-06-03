import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import aboutPhoto from './assets/about-photo.png';
import profilePic from './assets/profile.png';
import projAiMl from './assets/project-ai-ml.png';
import projIot from './assets/project-iot.png';
import projGrading from './assets/project-grading.png';
import projBert from './assets/project-bert.png';
import projFitness from './assets/project-fitness.png';
import projChatbot from './assets/project-chatbot.png';
import projWhatsapp from './assets/project-whatsapp.png';
import projJobhunter from './assets/project-jobhunter.png';
import projResume from './assets/project-resume.png';
import profileGrad from './assets/profile-grad.jpg';
import flairs1 from './assets/flairs-1.jpg';
import flairs2 from './assets/flairs-2.jpg';
import flairs3 from './assets/flairs-3.jpg';
import flairs4 from './assets/flairs-4.jpg';
import ResumeChatbot from './components/ResumeChatbot';
import { getAIResponse } from './utils/chatbotLogic';

// ═══════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════

const titles = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'Generative AI Specialist',
  'LLM Agent Architect',
];


const highlightKeywords = (text) => {
  if (typeof text !== 'string') return text;
  
  const keywords = [

    'React.js', 'Node.js', 'MongoDB', 'LangChain', 'production-ready', '15k+ queries/month', 
    '55%', 'semantic search', 'hybrid reranking', 'RESTful APIs', 'asynchronous processing architecture', 
    'AWS Lambda', 'S3', 'SQS', 'maintenance workflows', 'API response times', '85%', '12s → 1.8s', 
    '600+ operations', 'eliminating bottlenecks', 'FastAPI', 'standardizing execution', 'reducing handoffs', 
    'routine maintenance operations', 'improving cross-team collaboration efficiency', 'RAG', 
    'Gemini 2.5 flash', 'gemini-embedding-001', 'ChatGPT APIs', 'with retrieved historical context', 
    'accelerating incident diagnosis', 'LLM-driven', 'Gemini API', 'GCP infrastructure with Terraform (IaC)', 
    'Jenkins', 'test, build, container push, and deployment workflows', 'intelligent health copilot', 
    '30% faster data processing', '350+ test cases', 'containerized environments', '30+ critical defects', 
    '30%', 'Docker', 'DeepAnalyze-8B', 'GCP L4 GPU', 'Gemini Flash', 'Analyze-Code-Execute loop', 
    'AST validation', 'inference pipeline', 'automated HTML report generation', 'hybrid LLM routing', 
    'Pandas-based statistical analysis', 'self-correcting retry loops', 'LangGraph and LangChain', 'LangGraph', 
    'Gemini', 'reasoning accuracy by 30%', 'advanced Pre-Act RAG', 'Corrective RAG', 'ChromaDB', 
    'reducing hallucinations by 25%', 'Tiny LLMs', 'Qwen3-4B', 'Gemma-3-270M', 'Phi-3-mini', 'Edge-IIoTset', 
    'real-time IoT threat classification and mitigation', 'end-to-end fine-tuning and evaluation pipeline', 
    'FLAIRS-39', 'GenAI-driven', 'WaveGAN and SpecGAN', 'WaveGAN', 'SpecGAN', 'synthetic audio patterns', 
    'deep generative models', '22% improvement', 'automated audio deepfake detection accuracy', 
    'AI-driven voice integrity analysis', 'IEEE research paper',
    'MERN Stack', 'Serper API', 'SQLite', 'SMTP', 'Gemini 2.5 Pro', 'Puppeteer', 'Perplexity API', 'Qwen3', 
    'Phi-3', 'LoRA', 'MITRE CAPEC', 'Flask', 'NLP', 'Scikit-Learn', 'BERT', 'Transformers', 'Google Gemini', 
    'Vertex AI', 'Chart.js', 'MediaPipe', 'OpenCV', 'React', 'Tailwind CSS', 'Pinecone', 'Next.js', 'PostgreSQL', 
    '93% Faithfulness score', '100% binary classification accuracy', '60% improvement', '96.81% accuracy',

    // Playwright & AI Automation project keywords
    'Playwright MCP browser', 'Plan-Discover-Browse-Extract pipeline', 'natural-language shopping agent',
    'dynamic model routing', 'accessibility-tree extraction', 'Vision fallbacks',
    'AuraQA', 'self-healing E2E test agent', 'Playwright', 'LLM intent matching',
    'verify-before-trust loop', 'smart DOM shrinking', 'GitHub Actions CI/CD',
    'sponsorship-aware job watcher', 'ATS APIs', 'Playwright fallback', 'Gemini LLM cascade',
    'GCP Cloud Run', 'Google Sheet', 'automated outreach',
    // Other projects keywords
    'agentic data analysis system', 'WhatsApp AI agent', 'personality tuning',
    'natural typing delays', 'OTP safety guards', 'ATS keywords', 'AI resume optimizer',
    'Chrome extension', 'intelligent chatbot', 'semantic retrieval',
    // Syracuse Hackathon & new keywords
    '(NLP)', 'top award', 'university-wide'

  ];
  
  let html = text;
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  
  sortedKeywords.forEach(kw => {
    const escapedKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\W)(${escapedKw})($|\\W)(?![^<>]*>)`, 'gi');
    html = html.replace(regex, '$1<strong style="color: var(--text); font-weight: 600;">$2</strong>$3');
  });
  
  return html;
};

const heroTechs = ['Python', 'React', 'FastAPI', 'LangChain', 'LangGraph', 'AWS', 'RAG'];

const experienceData = [
  {
    role: 'Software Engineering Intern — AI and Automation',
    company: 'Main 10 – Maintenance Management Tool',
    location: 'Pune, India',
    date: 'Jan 2024 – Aug 2024',
    bullets: [
      'Built a production-ready maintenance knowledge retrieval system using MERN Stack, LangChain, handling 15k+ queries/month and improving relevance of retrieved historical data by 55% through semantic search and hybrid reranking of technical logs.',
      'Designed and maintained RESTful APIs, implemented authentication, validation, and error handling, ensured secure and reliable data flow.',
      'Implemented asynchronous processing architecture using AWS Lambda, S3, and SQS queues for maintenance workflows, improving API response times by 85% (12s → 1.8s) and enabling system to handle 600+ operations during peak usage.',
      'Developed a centralized FastAPI backend to replace manual maintenance task coordination, standardizing execution and reducing handoffs between teams during routine maintenance operations.',
      'Engineered a comprehensive RAG dev pipeline leveraging Gemini 2.5 flash, gemini-embedding-001 and ChatGPT APIs to enrich automated alerts with retrieved historical context, accelerating incident diagnosis.',
    ],
  },
  {
    role: 'Full Stack Generative AI Engineer Intern',
    company: 'Hum Aspen Wellness Private Limited',
    location: 'Pune, India',
    date: 'Jan 2023 – Dec 2023',
    bullets: [
      'Enhanced the Now Zone Life wellness mobile application by embedding LLM-driven personalized insights using LangChain and Gemini API.',
      'Integrated RAG pipelines leveraging vector embeddings within a scalable FastAPI-based microservice architecture to deliver real-time results, improving personalization accuracy by 50%.',
      'Deployed adaptive AI modules capable of summarizing user health trends and generating actionable suggestions, transforming the app into an intelligent health copilot.',
      'Optimized MongoDB data pipelines for scalable AI inference workloads by streamlining schema design, achieving 30% faster data processing and smoother app performance.',
      'Created 350+ test cases in containerized environments, identifying 30+ critical defects and improving release reliability by 30% integrating Docker.',
    ],
  },
];

const researchData = [
  {
    title: 'An Iterative Self-Correcting Agentic RAG System',
    event: 'Accepted at FLAIRS-39 (Main Track)',
    category: 'Research / AI',
    image: projAiMl,
    description: 'Developed an advanced LangGraph framework orchestrating Corrective, Pre-Act, and Workflow agents for highly accurate information retrieval. Integrated ChromaDB and Perplexity API to validate and self-correct retrieved contexts in real-time. Achieved a 93% Faithfulness score across 120 rigorous test cases, demonstrating robust reasoning capabilities.',
    techs: ['LangGraph', 'ChromaDB', 'Python', 'FastAPI', 'Gemini'],
    links: [
      { text: 'View Paper', url: 'https://journals.flvc.org/FLAIRS/article/view/141838' }
    ]
  },
  {
    title: 'Automated IoT Threat Monitoring & Mitigation using Tiny LLMs',
    event: 'Accepted at FLAIRS-39 (Poster Track)',
    category: 'Research / Security',
    image: projIot,
    description: 'Engineered a lightweight, edge-compatible security solution by fine-tuning Tiny LLMs (Qwen3 & Phi-3) using LoRA techniques on the Edge-IIoTset dataset. The model achieved 100% binary classification accuracy in identifying anomalous network traffic. Autonomously generates actionable remediation strategies mapped directly to MITRE CAPEC standards.',
    techs: ['PyTorch', 'LoRA', 'Unsloth', 'HuggingFace', 'MITRE'],
    links: [
      { text: 'View Paper', url: 'https://journals.flvc.org/FLAIRS/article/view/141840' }
    ]
  },
  {
    title: 'Voice Cloning and Forgery Detection Using WaveGAN and SpecGAN',
    event: 'IEEE Publication',
    category: 'Research / AI',
    image: projAiMl,
    description: 'This paper presents a comparative analysis of DCGAN, WaveGAN, and SpecGAN for voice cloning and forgery detection, with experimental results showing SpecGAN outperforms the others in generating high-quality synthetic voice samples. It proposes an audio forgery detection method combining copy-move forgery detection, CQSS-GA-SVM analysis, and SpecGAN-based detection, achieving 98% accuracy in identifying synthetic voices.',
    techs: ['WaveGAN', 'SpecGAN', 'DCGAN', 'SVM', 'Python'],
    links: [
      { text: 'View Paper', url: 'https://ieeexplore.ieee.org/document/10392082' }
    ]
  },
];

const projectCategories = [
  {
    title: 'Multi Agentic systems and LLM Fine Tuning',
    description: 'Projects focused on autonomous agents, RAG pipelines, and LLM optimizations.',
    projects: [
      {
        title: 'Agentic Data Analyst',
        category: 'Gen AI',
        image: projAiMl,
        description: 'Architected an agentic data analysis system using DeepAnalyze-8B on a GCP L4 GPU, with Gemini Flash supervising an Analyze-Code-Execute loop with AST validation. Containerized the inference pipeline with Docker and exposed via FastAPI, integrating automated HTML report generation with self-correcting retry loops.',
        techs: ['DeepAnalyze-8B', 'Gemini Flash', 'GCP', 'FastAPI', 'Docker'],
        github: null,
      },
      {
        title: 'WhatsApp Mimic RAG Agent',
        category: 'Gen AI',
        image: projWhatsapp,
        description: 'Autonomous WhatsApp AI agent that mimics your texting style using RAG with ChromaDB semantic search on real chat exports. Per-contact personality tuning, group chat support, and Gemini 2.5 Flash generation with natural typing delays and OTP safety guards.',
        techs: ['FastAPI', 'ChromaDB', 'Gemini', 'Node.js', 'whatsapp-web.js'],
        github: 'https://github.com/ChetanyaRathi/WhatsappMiniRAG',
      },
      {
        title: 'Resume Tailor',
        category: 'AI Tool',
        image: projResume,
        description: 'AI resume optimizer that tailors bullet points to match job descriptions using Gemini 2.5 Pro, identifying top ATS keywords and injecting them naturally. Available as CLI, web app, and Chrome extension, it securely preserves original structure, metrics, and word counts.',
        techs: ['Gemini 2.5 Pro', 'Node.js', 'Express', 'Puppeteer', 'Chrome Extension'],
        github: 'https://github.com/ChetanyaRathi/Resume_tailor',
      },
      {
        title: 'Lenox AI Chatbot',
        category: 'AI',
        image: projChatbot,
        description: 'Engineered an intelligent chatbot answering personalized questions about resume and experience. Built using LangChain, Vertex AI, and ChromaDB for efficient semantic retrieval.',
        techs: ['LangChain', 'Vertex AI', 'ChromaDB', 'Python'],
        github: 'https://github.com/ChetanyaRathi/LenoxAI-ChatBot',
      }
    ]
  },
  {
    title: 'Playwright & AI Automation',
    description: 'Advanced browser automation, self-healing E2E testing, and agentic workflows using Playwright.',
    projects: [
      {
        title: 'Agentic Shopping Agent (Browser-Use AI)',
        category: 'AI Agent',
        image: projAiMl,
        description: 'Built a natural-language shopping agent driving a Playwright MCP browser to execute a Plan-Discover-Browse-Extract pipeline, returning ranked product links from live retail sites. Engineered a cost-aware Gemini-powered backend with dynamic model routing, accessibility-tree extraction, and Vision fallbacks, served via a React frontend.',
        techs: ['Playwright MCP', 'Gemini', 'FastAPI', 'Pydantic', 'React'],
        github: 'https://github.com/ChetanyaRathi/agentic-shopping-agent',
      },
      {
        title: 'AuraQA – Self-Healing E2E Test Agent',
        category: 'AI Testing',
        image: projAiMl,
        description: 'Built AuraQA, a self-healing E2E test agent that generates realistic user flows in Playwright and automatically repairs broken CSS selectors using LLM intent matching against visible elements. Enforced a verify-before-trust loop to validate AI-suggested selectors live, supported by smart DOM shrinking, a React dashboard, and GitHub Actions CI/CD.',
        techs: ['Playwright', 'Gemini', 'Groq', 'FastAPI', 'React'],
        github: 'https://github.com/ChetanyaRathi/aura-qa',
      },
      {
        title: 'playwright-job-applier',
        category: 'Automation Pipeline',
        image: projJobhunter,
        description: 'Built a sponsorship-aware job watcher that polls ATS APIs and uses a Playwright fallback to diff postings, filtering them through a cheap-first keyword and Gemini LLM cascade. Deployed on GCP Cloud Run with a FastAPI backend and review dashboard, drafting matches into a Google Sheet for human approval before automated outreach.',
        techs: ['Playwright', 'FastAPI', 'SQLite', 'Docker', 'GCP Cloud Run'],
        github: 'https://github.com/ChetanyaRathi/playwright-job-applier',
      }
    ]
  },
  {
    title: 'Machine Learning and NLP',
    description: 'Deep learning models, natural language processing, and predictive analytics.',
    projects: [
      {
        title: 'AI Text Detection (BERT)',
        category: 'Deep Learning',
        image: projBert,
        description: 'Developed a BERT-based classifier distinguishing AI vs Human text with 96.81% accuracy. Achieved robust performance via advanced fine-tuning on multi-source datasets.',
        techs: ['BERT', 'Transformers', 'Python', 'NLP'],
        github: null,
      }
    ]
  },
  {
    title: 'Other Projects',
    description: 'Full-stack applications and diverse engineering projects.',
    projects: [
      {
        title: 'Autonomous Job Hunter',
        category: 'Full Stack',
        image: projJobhunter,
        description: 'AI-powered job search dashboard that scrapes listings via Serper API, parses descriptions with Gemini, and scores matches based on skills, experience level, and visa sponsorship. Features a Flask web UI with real-time search pipeline and automated HTML email digests.',
        techs: ['Flask', 'Gemini', 'Serper API', 'SQLite', 'SMTP'],
        github: 'https://github.com/ChetanyaRathi/Autonomous-Job-Hunter',
      },
      {
        title: 'Virtual AI Trainer',
        category: 'Full Stack',
        image: projFitness,
        description: 'Integrated Google Gemini (Vertex AI) for personalized fitness insights. Interactive dashboards with Chart.js, improving user engagement by 45%.',
        techs: ['Gemini', 'Vertex AI', 'Chart.js', 'SQLite'],
        github: 'https://github.com/ChetanyaRathi/Virtual-AI-Trainer',
      }
    ]
  }
];

const hackathonData = [
  {
    title: 'Automated Grading System',
    event: 'Won the Syracuse University EECS Hackathon in March 2025',
    description: 'Engineered an automated grading application utilizing Natural Language Processing (NLP) to intelligently evaluate and score text-based academic submissions. Developed a robust Flask backend to manage data processing pipelines, handle user submissions, and seamlessly integrate the NLP evaluation engine. Streamlined traditional manual assessment workflows, successfully driving a 60% improvement in overall grading efficiency. Secured a top award at the university-wide hackathon, recognized for technical execution, system architecture, and practical utility.',
    techs: ['Python', 'Flask', 'NLP', 'Scikit-Learn'],
    github: 'https://github.com/ChetanyaRathi/syracuse-ecs-challenege',
  }
];

const skillCategories = [
  { title: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'PHP'] },
  { title: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'Tailwind CSS', 'MERN Stack'] },
  { title: 'Backend & APIs', items: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST APIs', 'Playwright', 'Pydantic'] },
  { title: 'Databases', items: ['MongoDB', 'PostgreSQL', 'SQL', 'ChromaDB', 'Redis', 'SQLite'] },
  { title: 'Gen AI & ML', items: ['LangChain', 'LangGraph', 'RAG', 'OpenAI', 'Gemini', 'Vertex AI', 'Groq', 'BERT', 'OpenCV'] },
  { title: 'Cloud & DevOps', items: ['AWS S3', 'AWS Lambda', 'AWS RDS', 'Docker', 'GitHub Actions', 'GCP Cloud Run', 'Git', 'Linux', 'Google Cloud'] },
];

const proficiency = [
  { name: 'Python', pct: 92 },
  { name: 'React / Next.js', pct: 85 },
  { name: 'LangChain / RAG', pct: 88 },
  { name: 'FastAPI / Flask', pct: 82 },
  { name: 'AWS / GCP', pct: 75 },
  { name: 'MongoDB / SQL', pct: 80 },
];

// ═══════════════════════════════════════════════════════════════
//  ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ═══════════════════════════════════════════════════════════════
//  COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ---- Navigation ----
const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Research', href: '/#research' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

const Navigation = () => {
  const [active, setActive] = useState('#home');
  const [show, setShow] = useState(true);
  const lastY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const shouldShow = y < 100 || y < lastY.current;
      setShow(shouldShow);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Set active section strictly based on pathname for non-home routes
  useEffect(() => {
    if (location.pathname === '/chatbot') {
      setActive('/chatbot');
    } else {
      setActive('#home');
    }
  }, [location]);

  return (
    <motion.nav
      className="floating-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: show ? 0 : -80, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/" className="nav-link" style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.9rem' }}>CR</Link>
      <span className="nav-divider" />
      {navItems.map((n) => (
        n.href.startsWith('/#') ? (
          <a key={n.label} href={n.href} className={`nav-link ${active === n.href.substring(1) ? 'active' : ''}`}>{n.label}</a>
        ) : (
          <Link key={n.label} to={n.href} className={`nav-link ${active === n.href ? 'active' : ''}`}>{n.label}</Link>
        )
      ))}
    </motion.nav>
  );
};

// ---- Hero ----
const HeroSection = () => {
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((p) => (p + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', width: '100%' }}>

        {/* Hero top row: photo left, name+intro right */}
        <div className="hero-row">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0, width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(124,92,252,0.3)', boxShadow: '0 0 40px rgba(124,92,252,0.15)' }}
          >
            <img
              src={profileGrad}
              alt="Chetanya Rathi"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.45)',
                transformOrigin: 'center 25%',
              }}
            />
          </motion.div>

          {/* Name + intro */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}
            >
              Hi, I'm{' '}
              <span style={{ background: 'linear-gradient(135deg, #7c5cfc, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Chetanya Rathi
              </span>
            </motion.h1>

            {/* Rotating title */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: '32px', overflow: 'hidden', marginTop: '8px' }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ fontSize: '1.05rem', fontWeight: 600, color: '#8888a0', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {titles[titleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ color: '#8888a0', fontSize: '1rem', lineHeight: 1.75, maxWidth: '580px', marginTop: '12px' }}
            >
              Software Engineer specializing in Generative AI, LLM applications, and intelligent agent systems. 
              Building advanced RAG pipelines, LangChain architectures, and AI-integrated full-stack solutions.
            </motion.p>
          </div>
        </div>

        {/* Centered content below */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '32px' }}>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '4px' }}
        >
          {heroTechs.map((t) => <span key={t} className="pill">{t}</span>)}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '8px' }}
        >
          <a href="#projects" className="btn btn-outline">View Projects</a>
          <a href="#contact" className="btn btn-outline">Get In Touch</a>
          <a href="/Chetanya_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            Download Resume ↓
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: '10px', marginTop: '8px' }}
        >
          <a href="https://www.linkedin.com/in/chetanya-rathi-b7413b206/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="mailto:rathi.chetanya@gmail.com" className="social-btn" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ marginTop: '32px', color: '#555566', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'float-down 2.5s ease-in-out infinite' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
          scroll to explore
        </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---- About ----
const AboutSection = () => (
  <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <motion.h2 variants={fadeUp} custom={1} className="section-heading">
          Building the future with <br />intelligent systems
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          Recent CS Master's grad from Syracuse University, NY, focused on AI/ML and scalable software.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {/* Photo card */}
          <motion.div variants={scaleIn} custom={3} className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={aboutPhoto} alt="Chetanya Rathi" style={{ width: '100%', maxWidth: '340px', borderRadius: '12px', objectFit: 'cover' }} />
          </motion.div>

          {/* Story */}
          <motion.div variants={fadeUp} custom={4} className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>My Story</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <p>
                I'm Chetanya, a Computer Science graduate student at Syracuse University, New York. I did my undergrad in AI and Data Science at Vishwakarma Institute of Technology, Pune.
              </p>
              <p>
                I love building things with AI. Over nearly two years of internships at <strong style={{ color: 'var(--text)' }}>Main 10</strong> and <strong style={{ color: 'var(--text)' }}>Hum Aspen Wellness</strong>, I've worked across the full AI stack. This includes designing <strong style={{ color: 'var(--text)' }}>RAG</strong> pipelines, deploying LLM-powered features to production, and building cloud workflows on AWS and GCP. I've also presented one full paper and one poster at <strong style={{ color: 'var(--text)' }}>FLAIRS-39</strong>.
              </p>
              <p>
                Right now, I'm focused on Generative AI and agentic systems. I spend most of my time working with <strong style={{ color: 'var(--text)' }}>LangChain, LangGraph, RAG, and vector databases</strong>, basically figuring out how to make LLMs actually useful in everyday applications.
              </p>
            </div>

            {/* Education badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
              <div className="edu-badge">
                <span>🎓</span>
                <span>MS CS — Syracuse University, NY</span>
              </div>
              <div className="edu-badge">
                <span>📜</span>
                <span>B.Tech AI & DS — VIT, Pune, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ---- Experience ----
const ExperienceSection = () => (
  <section id="experience" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>        <motion.h2 variants={fadeUp} custom={1} className="section-heading">Where I've worked</motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          Building real-world AI systems at scale.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {experienceData.map((exp, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 3} style={{ display: 'flex', gap: '20px' }}>
              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="timeline-marker" style={{ marginTop: '6px' }} />
                {i < experienceData.length - 1 && <div className="timeline-rail" style={{ flex: 1, margin: '6px 0' }} />}
              </div>

              {/* Content */}
              <div className="glass" style={{ padding: '24px', marginBottom: '24px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{exp.role}</h3>
                    <p style={{ color: '#7c5cfc', fontWeight: 600, fontSize: '0.9rem' }}>{exp.company}</p>
                    {exp.location && <p style={{ color: '#8888a0', fontSize: '0.82rem' }}>{exp.location}</p>}
                  </div>
                  <span className="pill" style={{ fontSize: '0.75rem' }}>{exp.date}</span>
                </div>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ color: '#aaa', fontSize: '0.88rem', lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: highlightKeywords(b) }} />
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// ---- Skills ----
const SkillsSection = () => {
  const [inView, setInView] = useState(false);

  return (
    <section id="skills" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          onViewportEnter={() => setTimeout(() => setInView(true), 200)}
        >
          <motion.h2 variants={fadeUp} custom={1} className="section-heading">Technical Proficiency</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
            Technologies and tools I use to bring ideas to life.
          </motion.p>

          <div className="skills-grid">
            {skillCategories.map((cat, i) => (
              <motion.div key={i} variants={scaleIn} custom={i + 3} className="glass" style={{ padding: '24px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '14px', color: '#ccc' }}>{cat.title}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cat.items.map((s) => <span key={s} className="pill">{s}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ---- Projects ----
const ProjectsSection = () => (
  <section id="projects" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        
        {/* --- Research Work --- */}
        <motion.h2 id="research" variants={fadeUp} custom={1} className="section-heading" style={{ scrollMarginTop: '100px' }}>Research Work</motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          Academic and experimental research on AI agents and security.<br/>
          <span style={{ color: 'var(--accent)', fontWeight: 500, display: 'inline-block', marginTop: '8px' }}>
            Presented at the FLAIRS Conference & Published in IEEE Xplore.
          </span>
        </motion.p>

        <div className="projects-grid" style={{ marginBottom: '100px' }}>
          {researchData.map((p, i) => (
            <React.Fragment key={i}>
              <motion.div
                variants={scaleIn}
                custom={i + 3}
                className="glass"
                style={{ padding: '0', overflow: 'hidden' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>{p.title}</h3>
                  {p.event && <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>{p.event}</p>}
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {p.description.split('. ').filter(Boolean).map((sentence, idx) => {
                      const text = sentence.trim() + (sentence.trim().endsWith('.') ? '' : '.');
                      return <li key={idx} dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }} />;
                    })}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {p.techs.map((t) => <span key={t} className="pill" style={{ fontSize: '0.7rem' }}>{t}</span>)}
                  </div>
                  {p.links && (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {p.links.map((link) => (
                        link.url && (
                          <a
                            key={link.text}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: 'var(--accent)',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            {link.text} →
                          </a>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* FLAIRS Conference Glimpse */}
              {i === 1 && (
                <motion.div
                  variants={scaleIn}
                  custom={5}
                  className="glass"
                  style={{ padding: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>Glimpse of the Conference (FLAIRS)</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '24px' }}>
                    Presenting my research on AI agents and IoT security at the FLAIRS Conference. Engaging with industry experts, sharing insights on Tiny LLMs, and discussing the future of autonomous systems.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: 'auto' }}>
                    {[flairs1, flairs2, flairs3, flairs4].map((imgSrc, idx) => (
                      <img key={idx} src={imgSrc} alt={`conference-${idx}`} loading="lazy" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* --- Featured Projects --- */}
        <motion.h2 variants={fadeUp} custom={1} className="section-heading" style={{ marginBottom: '48px' }}>Featured Projects</motion.h2>

        {projectCategories.map((category, catIdx) => (
          <div key={catIdx} style={{ marginBottom: '80px' }}>
            <motion.h3 variants={fadeUp} custom={3} style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.5px', marginBottom: '24px', marginTop: catIdx > 0 ? '40px' : '0' }}>{category.title}</motion.h3>

            <div className="projects-grid">
              {category.projects.map((p, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={i + 3}
                  className="glass"
                  style={{ padding: '0', overflow: 'hidden' }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  {/* Content */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>{p.title}</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, margin: 0 }}>
                      {p.description.split('. ').filter(Boolean).map((sentence, idx) => {
                        const text = sentence.trim() + (sentence.trim().endsWith('.') ? '' : '.');
                        return <li key={idx} dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }} />;
                      })}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {p.techs.map((t) => <span key={t} className="pill" style={{ fontSize: '0.7rem' }}>{t}</span>)}
                    </div>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: 'var(--accent)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* --- Hackathons --- */}
        <motion.h2 variants={fadeUp} custom={1} className="section-heading" style={{ marginTop: '80px' }}>Hackathons</motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          Award-winning projects and competitive programming events.
        </motion.p>

        <div className="projects-grid">
          {hackathonData.map((p, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i + 3}
              className="glass"
              style={{ padding: '24px', overflow: 'hidden' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>{p.title}</h3>
              {p.event && <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>{p.event}</p>}
              <ul style={{ paddingLeft: '20px', color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                {p.description.split('. ').filter(Boolean).map((sentence, idx) => {
                  const text = sentence.trim() + (sentence.trim().endsWith('.') ? '' : '.');
                  return <li key={idx} dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }} />;
                })}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px', flexGrow: 1 }}>
                {p.techs.map((t) => <span key={t} className="pill" style={{ fontSize: '0.7rem' }}>{t}</span>)}
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', marginTop: 'auto' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub <span aria-hidden="true">→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  </section>
);

// ---- Contact ----
const ContactSection = () => (
  <section id="contact" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={fadeUp} custom={1} className="section-heading">
          Let's build something <br />amazing together
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          I'm actively seeking full-time opportunities in AI/ML and Software Engineering. Let's connect!
        </motion.p>

        <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          <a href="mailto:rathi.chetanya@gmail.com" className="btn btn-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email Me
          </a>
          <a href="https://www.linkedin.com/in/chetanya-rathi-b7413b206/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
          <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            GitHub
          </a>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} style={{ marginTop: '80px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#555566', fontSize: '0.8rem' }}>
          © 2026 Chetanya Rathi | rathi.chetanya@gmail.com
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ---- AI Assistant ----
const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Chetanya's AI assistant. Ask me about his skills, experience, or projects!", sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input;
    setMessages((m) => [...m, { text: msg, sender: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { text: getAIResponse(msg), sender: 'ai' }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ai-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>🤖</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.3rem' }}>×</button>
            </div>
            <div className="ai-panel-body">
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ${m.sender}`}>{m.text}</div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="ai-panel-footer">
              <form onSubmit={handleSend}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                />
                <button type="submit">↑</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="ai-fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="AI Assistant"
      >
        🤖
      </motion.button>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════════

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Ambient background */}
      <div className="ambient-bg">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
      <div className="grid-overlay" />
      
      <button 
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <Navigation />
        
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection />
              <AboutSection />
              <ExperienceSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </main>
          } />
          <Route path="/chatbot" element={<ResumeChatbot />} />
        </Routes>
        
      <AIAssistant />
    </div>
  );
}

export default App;