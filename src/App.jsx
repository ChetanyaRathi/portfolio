import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import profilePic from './assets/profile.png';
import aboutPhoto from './assets/about-photo.png';
import projAiMl from './assets/project-ai-ml.png';
import projIot from './assets/project-iot.png';
import projGrading from './assets/project-grading.png';
import projBert from './assets/project-bert.png';
import projFitness from './assets/project-fitness.png';
import projChatbot from './assets/project-chatbot.png';
import projWhatsapp from './assets/project-whatsapp.png';
import projJobhunter from './assets/project-jobhunter.png';
import projResume from './assets/project-resume.png';

// ═══════════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════════

const titles = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'Generative AI Specialist',
  'LLM Agent Architect',
];

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

const projectsData = [
  {
    title: 'Context-Driven Agentic RAG',
    category: 'AI / ML',
    image: projAiMl,
    description: 'LangGraph framework orchestrating Corrective, Pre-Act, and Workflow agents. Integrated ChromaDB + Perplexity API with 93% Faithfulness score across 120 test cases.',
    techs: ['LangGraph', 'ChromaDB', 'Python', 'FastAPI', 'Gemini'],
    github: 'https://github.com/vinaytiparadi/CuseAgenticRag',
  },
  {
    title: 'IoT Threat Monitoring with Tiny LLMs',
    category: 'Research',
    image: projIot,
    description: 'Fine-tuned Qwen3 & Phi-3 using LoRA on Edge-IIoTset dataset. Achieved 100% binary classification accuracy and generated MITRE CAPEC remediation strategies.',
    techs: ['PyTorch', 'LoRA', 'Unsloth', 'HuggingFace', 'MITRE'],
    github: null,
  },
  {
    title: 'Automated Grading System',
    category: 'Hackathon Winner',
    image: projGrading,
    description: 'Award-winning Flask app reducing manual grading time by 60% via NLP. Processed 500+ submissions in real-time with web-scraped faculty matching.',
    techs: ['Flask', 'NLP', 'Python', 'Web Scraping'],
    github: 'https://github.com/ChetanyaRathi/syracuse-ecs-challenege',
  },
  {
    title: 'AI Text Detection (BERT)',
    category: 'Deep Learning',
    image: projBert,
    description: 'BERT-based classifier distinguishing AI vs Human text with 96.81% accuracy via advanced fine-tuning on multi-source data.',
    techs: ['BERT', 'Transformers', 'Python', 'NLP'],
    github: null,
  },
  {
    title: 'Virtual AI Trainer',
    category: 'Full Stack',
    image: projFitness,
    description: 'Integrated Google Gemini (Vertex AI) for personalized fitness insights. Interactive dashboards with Chart.js, improving user engagement by 45%.',
    techs: ['Gemini', 'Vertex AI', 'Chart.js', 'SQLite'],
    github: 'https://github.com/ChetanyaRathi/Virtual-AI-Trainer',
  },
  {
    title: 'Lenox AI Chatbot',
    category: 'AI',
    image: projChatbot,
    description: 'Intelligent chatbot answering personalized questions about resume and experience using LangChain, Vertex AI, and ChromaDB for semantic retrieval.',
    techs: ['LangChain', 'Vertex AI', 'ChromaDB', 'Python'],
    github: 'https://github.com/ChetanyaRathi/LenoxAI-ChatBot',
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
    title: 'Autonomous Job Hunter',
    category: 'Full Stack',
    image: projJobhunter,
    description: 'AI-powered job search dashboard that scrapes listings via Serper API, parses descriptions with Gemini, and scores matches based on skills, experience level, and visa sponsorship. Features a Flask web UI with real-time search pipeline and automated HTML email digests.',
    techs: ['Flask', 'Gemini', 'Serper API', 'SQLite', 'SMTP'],
    github: 'https://github.com/ChetanyaRathi/Autonomous-Job-Hunter',
  },
  {
    title: 'Resume Tailor',
    category: 'AI Tool',
    image: projResume,
    description: 'AI resume optimizer that tailors bullet points to match job descriptions using Gemini 2.5 Pro. Parses PDF/DOCX resumes, identifies top ATS keywords, and naturally injects them while preserving original structure, metrics, and word count. Available as CLI, web app, and Chrome extension.',
    techs: ['Gemini 2.5 Pro', 'Node.js', 'Express', 'Puppeteer', 'Chrome Extension'],
    github: 'https://github.com/ChetanyaRathi/Resume_tailor',
  },
];

const skillCategories = [
  { title: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'PHP'] },
  { title: 'Frontend', items: ['React.js', 'Next.js', 'HTML5', 'Tailwind CSS', 'MERN Stack'] },
  { title: 'Backend & APIs', items: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Databases', items: ['MongoDB', 'PostgreSQL', 'SQL', 'ChromaDB', 'Redis', 'SQLite'] },
  { title: 'Gen AI & ML', items: ['LangChain', 'LangGraph', 'RAG', 'OpenAI', 'Gemini', 'Vertex AI', 'BERT', 'OpenCV'] },
  { title: 'Cloud & DevOps', items: ['AWS S3', 'AWS Lambda', 'AWS RDS', 'Docker', 'Git', 'Linux', 'Google Cloud'] },
];

const proficiency = [
  { name: 'Python', pct: 92 },
  { name: 'React / Next.js', pct: 85 },
  { name: 'LangChain / RAG', pct: 88 },
  { name: 'FastAPI / Flask', pct: 82 },
  { name: 'AWS / GCP', pct: 75 },
  { name: 'MongoDB / SQL', pct: 80 },
];

// AI Assistant responses
const aiResponses = {
  greeting: "Hello! I'm Chetanya's AI assistant. Ask me about his education, skills, projects, experience, or anything else!",
  summary: "Chetanya Rathi is a results-driven Software Engineer currently pursuing his MS in Computer Science at Syracuse University, NY. He specializes in Generative AI, LLM applications, intelligent agent systems, and full-stack development. He has hands-on experience building RAG pipelines, LangChain/LangGraph architectures, and AI-integrated solutions using Python, FastAPI, and React.",
  education: "Chetanya is pursuing his MS in Computer Science at Syracuse University, New York (expected May 2026). He completed his B.Tech in AI & Data Science from Vishwakarma Institute of Technology (VIT), Pune, India.",
  main10: "At Main 10 (Jan–Aug 2024), Chetanya worked as a Software Engineering Intern in AI & Automation. He built a production-ready maintenance knowledge retrieval system using MERN Stack and LangChain handling 15k+ queries/month. He also implemented async processing with AWS Lambda/S3/SQS improving API response times by 85%, and engineered a RAG pipeline using Gemini 2.5 flash and ChatGPT APIs for automated alerts.",
  humaspen: "At Hum Aspen Wellness (Jan–Dec 2023), Chetanya worked as a Full Stack Generative AI Engineer Intern. He embedded LLM-driven insights into the Now Zone Life wellness app using LangChain and Gemini API, integrated RAG pipelines improving personalization by 50%, and deployed adaptive AI modules that transformed the app into an intelligent health copilot. He also created 350+ test cases identifying 30+ critical defects.",
  experience: "Chetanya has two internships: (1) Main 10 — Software Engineering Intern in AI & Automation (Jan–Aug 2024) where he built a maintenance knowledge retrieval system with LangChain handling 15k+ queries/month. (2) Hum Aspen Wellness — Full Stack Gen AI Engineer Intern (Jan–Dec 2023) where he integrated RAG pipelines and LLM-powered insights into a wellness app. Ask about 'Main 10' or 'Hum Aspen' for details!",
  skills: "His technical stack includes: Languages (Python, C++, JavaScript, Java), Frontend (React, Next.js, Tailwind), Backend (FastAPI, Flask, Node.js), Databases (MongoDB, PostgreSQL, ChromaDB, Redis), AI/ML (LangChain, LangGraph, RAG, OpenAI, Gemini, Vertex AI, BERT), and Cloud (AWS S3/Lambda/RDS, Docker, Google Cloud).",
  rag_project: "The Context-Driven Agentic RAG System was built at CuseHacks, Syracuse University. It uses LangGraph to orchestrate 3 agents (Corrective, Pre-Act, Workflow). Integrated ChromaDB + Perplexity API with Gemini 2.5 Flash Lite achieving 97.96% routing accuracy and 93% Faithfulness score across 120 test cases.",
  iot_project: "The IoT Threat Monitoring project fine-tuned Tiny LLMs (Qwen3-4B, Phi-3-mini) using LoRA on the Edge-IIoTset dataset for IoT security. It achieved 100% binary classification accuracy and ~77% multi-class accuracy, outperforming XGBoost (53.56%). It also generates remediation strategies mapped to MITRE CAPEC standards.",
  grading_project: "The Automated Grading System won first place at the EECS Hackathon at Syracuse University. It reduced manual grading time by 60% using NLP and constraint-based scheduling, processing 500+ submissions in real-time with web-scraped faculty matching.",
  bert_project: "The AI Text Detection project deployed a BERT-based classifier that distinguishes AI-generated text from human-written text with 96.81% accuracy using advanced preprocessing, tokenization, and fine-tuning techniques.",
  trainer_project: "The Virtual AI Trainer integrates Google Gemini (Vertex AI) for personalized fitness insights with interactive Chart.js dashboards and SQLite storage, improving user engagement by 45%.",
  chatbot_project: "Lenox AI Chatbot answers personalized questions about Chetanya's resume using LangChain, Vertex AI, and ChromaDB for semantic retrieval and accurate query matching.",
  whatsapp_project: "WhatsApp Mimic RAG Agent is an autonomous AI that replies on WhatsApp on your behalf by learning your texting style from real chat exports. Uses ChromaDB for semantic search, Gemini 2.5 Flash for generation, with per-contact personality tuning, group chat support, typing delays, and OTP safety guards.",
  jobhunter_project: "Autonomous Job Hunter is an AI-powered job search dashboard that scrapes listings via Serper API, parses descriptions with Gemini, and scores matches based on skills, experience, and visa sponsorship. Features a Flask web UI with real-time pipeline and automated HTML email digests.",
  resume_project: "Resume Tailor uses Gemini 2.5 Pro to optimize resumes for specific job descriptions. It parses PDF/DOCX, identifies top ATS keywords, and naturally injects them while preserving structure and word count. Available as CLI, web app, and Chrome extension.",
  projects: "Chetanya has 8+ projects: Agentic RAG, IoT Threat Detection, Automated Grading System, AI Text Detection, Virtual AI Trainer, Lenox AI Chatbot, WhatsApp Mimic RAG Agent, Autonomous Job Hunter, and Resume Tailor. Ask about any specific project!",
  contact: "You can reach Chetanya at rathi.chetanya@gmail.com. LinkedIn: linkedin.com/in/chetanya-rathi | GitHub: github.com/ChetanyaRathi",
  default: "I can answer questions about Chetanya's education, skills, internships (Main 10, Hum Aspen), projects (RAG, IoT, Grading System, BERT, etc.), or how to contact him. What would you like to know?",
};

const getAIResponse = (msg) => {
  const m = msg.toLowerCase();
  // Greetings
  if (['hi','hello','hey','greetings','sup','yo'].some(w => m.includes(w))) return aiResponses.greeting;
  // Specific companies
  if (['main 10','main10','maintenance'].some(w => m.includes(w))) return aiResponses.main10;
  if (['hum aspen','wellness','now zone'].some(w => m.includes(w))) return aiResponses.humaspen;
  // Specific projects
  if (['agentic','cusehacks','langgraph'].some(w => m.includes(w))) return aiResponses.rag_project;
  if (['iot','threat','qwen','phi-3','edge-iiot'].some(w => m.includes(w))) return aiResponses.iot_project;
  if (['grading','eecs','hackathon','award'].some(w => m.includes(w))) return aiResponses.grading_project;
  if (['bert','text detection','ai text','ai generated'].some(w => m.includes(w))) return aiResponses.bert_project;
  if (['trainer','fitness','virtual ai','chart.js'].some(w => m.includes(w))) return aiResponses.trainer_project;
  if (['lenox','chatbot','resume bot'].some(w => m.includes(w))) return aiResponses.chatbot_project;
  if (['whatsapp','mimic','texting style','autonomous agent'].some(w => m.includes(w))) return aiResponses.whatsapp_project;
  if (['job hunt','job search','serper','job dashboard'].some(w => m.includes(w))) return aiResponses.jobhunter_project;
  if (['resume tailor','tailor','ats','chrome extension'].some(w => m.includes(w))) return aiResponses.resume_project;
  // Broader categories
  if (['experience','work','intern','job','professional'].some(w => m.includes(w))) return aiResponses.experience;
  if (['edu','university','degree','college','syracuse','vit','pune','studying','school'].some(w => m.includes(w))) return aiResponses.education;
  if (['skill','tech','python','react','aws','langchain','rag','fastapi','flask','mongo','docker'].some(w => m.includes(w))) return aiResponses.skills;
  if (['project','portfolio','build','made','created'].some(w => m.includes(w))) return aiResponses.projects;
  if (['contact','email','phone','reach','hire','connect','linkedin','github'].some(w => m.includes(w))) return aiResponses.contact;
  if (['about','who','summary','tell me','yourself','chetanya','him'].some(w => m.includes(w))) return aiResponses.summary;
  return aiResponses.default;
};

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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [active, setActive] = useState('#home');
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // Auto-hide nav on scroll down
      const y = window.scrollY;
      setShow(y < 100 || y < lastY.current);
      lastY.current = y;

      // Active section detection
      const ids = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && y >= el.offsetTop - 250) {
          setActive('#' + ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="floating-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: show ? 0 : -80, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <a href="#home" className="nav-link" style={{ fontWeight: 700, color: '#7c5cfc', fontSize: '0.9rem' }}>CR</a>
      <span className="nav-divider" />
      {navItems.map((n) => (
        <a
          key={n.label}
          href={n.href}
          className={`nav-link ${active === n.href ? 'active' : ''}`}
          onClick={() => setActive(n.href)}
        >
          {n.label}
        </a>
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
            style={{ flexShrink: 0 }}
          >
            <img
              src={profilePic}
              alt="Chetanya Rathi"
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(124,92,252,0.3)',
                boxShadow: '0 0 40px rgba(124,92,252,0.15)',
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
          <a href="https://www.linkedin.com/in/chetanya-rathi/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
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

        <motion.span variants={fadeUp} className="section-label">About Me</motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="section-heading">
          Building the future with <br />intelligent systems
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          Passionate CS grad student at Syracuse University, NY with a focus on AI/ML and scalable software.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {/* Photo card */}
          <motion.div variants={scaleIn} custom={3} className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={aboutPhoto} alt="Chetanya Rathi" style={{ width: '100%', maxWidth: '340px', borderRadius: '12px', objectFit: 'cover' }} />
          </motion.div>

          {/* Story */}
          <motion.div variants={fadeUp} custom={4} className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>My Story</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#aaa', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <p>
                I'm a Computer Science graduate student at Syracuse University, New York, specializing in <strong style={{ color: '#f0f0f5' }}>Generative AI, intelligent agent systems, and full-stack development.</strong> My journey began with a B.Tech in AI & Data Science from Vishwakarma Institute of Technology, Pune, India.
              </p>
              <p>
                Through internships at <strong style={{ color: '#f0f0f5' }}>Main 10</strong> and <strong style={{ color: '#f0f0f5' }}>Hum Aspen Wellness</strong>, I've engineered end-to-end AI solutions — from automating cloud workflows with AWS Lambda to integrating LLM-driven insights that boosted user engagement by 35%.
              </p>
              <p>
                Currently exploring how <strong style={{ color: '#f0f0f5' }}>LangChain, LangGraph, RAG architectures, and vector databases</strong> can power the next generation of context-aware applications.
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
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
        <motion.span variants={fadeUp} className="section-label">Experience</motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="section-heading">Where I've worked</motion.h2>
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
                    <li key={j} style={{ color: '#aaa', fontSize: '0.88rem', lineHeight: 1.65 }}>{b}</li>
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
          <motion.span variants={fadeUp} className="section-label">Skills & Expertise</motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="section-heading">Technical Proficiency</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
            Technologies and tools I use to bring ideas to life.
          </motion.p>

          <div className="skills-grid">
            {/* Skill category cards — 2 columns, 3 rows */}
            <div className="skills-categories">
              {skillCategories.map((cat, i) => (
                <motion.div key={i} variants={scaleIn} custom={i + 3} className="glass" style={{ padding: '24px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '14px', color: '#ccc' }}>{cat.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cat.items.map((s) => <span key={s} className="pill">{s}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Proficiency bars */}
            <motion.div variants={fadeUp} custom={9} className="glass" style={{ padding: '28px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '20px', color: '#ccc' }}>Proficiency</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {proficiency.map((p) => (
                  <div key={p.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem' }}>
                      <span style={{ color: '#ccc' }}>{p.name}</span>
                      <span style={{ color: '#8888a0' }}>{p.pct}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: inView ? `${p.pct}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
        <motion.span variants={fadeUp} className="section-label">Portfolio</motion.span>
        <motion.h2 variants={fadeUp} custom={1} className="section-heading">Featured Projects</motion.h2>
        <motion.p variants={fadeUp} custom={2} className="section-sub" style={{ marginBottom: '48px' }}>
          A showcase of my work across AI, ML, and full-stack engineering.
        </motion.p>

          <div className="projects-grid">
          {projectsData.map((p, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i + 3}
              className="glass"
              style={{ padding: '0', overflow: 'hidden', cursor: p.github ? 'pointer' : 'default' }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onClick={() => p.github && window.open(p.github, '_blank')}
            >
              {/* Visual */}
              <div className="project-visual">
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                <div
                  className="overlay"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, rgba(10,10,15,0.85) 100%)`,
                  }}
                />
                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  <span className="pill" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', fontSize: '0.72rem' }}>{p.category}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ color: '#8888a0', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '16px' }}>{p.description}</p>
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
                      color: '#a78bfa',
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
      </motion.div>
    </div>
  </section>
);

// ---- Contact ----
const ContactSection = () => (
  <section id="contact" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.span variants={fadeUp} className="section-label" style={{ justifyContent: 'center' }}>Contact</motion.span>
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
          <a href="https://www.linkedin.com/in/chetanya-rathi/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
          <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            GitHub
          </a>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} style={{ marginTop: '80px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#555566', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Chetanya Rathi · Built with React & Framer Motion
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
  // Init Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Ambient background */}
      <div className="ambient-bg">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
      <div className="grid-overlay" />

      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <AIAssistant />
    </div>
  );
}

export default App;