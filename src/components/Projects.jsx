// src/components/Projects.jsx
import React, { useState } from 'react';
import './Projects.css'; // Make sure this file exists

const projectsData = [

  {
    role: 'Real-Time IoT Threat Monitoring & Mitigation using Tiny LLMs ',
    company: 'Personal Project',
    
    // --- LINK ADDED HERE ---

    description: [
      'Developed an intelligent Intrusion Detection System (IDS) by fine-tuning state-of-the-art "Tiny" LLMs (Qwen3-4B, Phi-3-mini, Gemma-3-270M) on the Edge-IIoTset dataset to secure resource-constrained IoT networks',
      'Implemented Parameter-Efficient Fine-Tuning (PEFT) using Low-Rank Adaptation (LoRA) and 4-bit quantization via the Unsloth and Hugging Face TRL libraries, optimizing models for edge deployment on limited hardware.',
      'Achieved 100% accuracy in binary classification and ~77% accuracy in complex multi-class attack scenarios, significantly outperforming traditional ML baselines like XGBoost (53.56%).',
      'Engineered a novel mitigation generation module that maps detected threats to MITRE CAPEC security standards, delivering context-aware remediation strategies with a ROUGE-L quality score of 0.6211.',
      'Built a preprocessing pipeline to serialize raw IoT sensor and protocol logs into structured textual narratives, enabling the model to leverage semantic reasoning for detecting sophisticated attacks.',
      
    ],
  },
  {
    role: 'Context-Driven Agentic RAG System ',
    company: 'CuseHacks, Syracuse University',
    
    // --- LINK ADDED HERE ---
    githubLink: 'https://github.com/vinaytiparadi/CuseAgenticRag', 

    description: [
      'Engineered a modular Agentic RAG framework using LangGraph to orchestrate three specialized autonomous agents (Corrective, Pre-Act, and Workflow), replacing static retrieval with dynamic, iterative problem-solving workflows.',
      'Implemented a Pre-Act Agent capable of explicit multi-step planning and query decomposition for complex tasks, alongside a Corrective Agent that autonomously grades document relevance and triggers self-correction loops',
      'Integrated ChromaDB for vector storage with real-time web search augmentation using Perplexity (for synthesis) and Tavily (for raw content extraction), ensuring responses are grounded in up-to-date external knowledge.',
      'Developed an LLM-based routing mechanism utilizing Gemini 2.5 Flash Lite that achieved 97.96% accuracy in dynamically selecting optimal agent execution paths based on query intent and complexity.',
      'Validated system performance using the DeepEval framework across 120 diverse test cases, achieving a 93% Faithfulness score and significantly reducing hallucinations compared to monolithic RAG baselines.',
      
    ],
  },
  
  
  {
    role: 'Virtual AI Trainer ',
    company: 'Personal Project',
    
    // --- LINK ADDED HERE ---
    githubLink: 'https://github.com/ChetanyaRathi/Virtual-AI-Trainer', 

    description: [
      'Integrated Google Gemini (Vertex AI) to generate personalized insights and fitness recommendations, analyzing logged health data for actionable progress tracking%.',
      'Integrated Designed interactive dashboards using Chart.js and optimized SQLite + SQL Alchemy storage, improving data visualization and user engagement by 45%.',
      
    ],
  },
  {
    role: 'Automated Grading System',
    company: 'EECS Hackathon, Syracuse University',
    
    // --- LINK ADDED HERE ---
    githubLink: 'https://github.com/ChetanyaRathi/syracuse-ecs-challenege', 

    description: [
      'Developed an award-winning system, reducing manual grading time by 60% through NLP and constraint-based scheduling.',
      'Built a Flask web application for real-time scoring, processing 500+ assignment submissions with an automated pipeline.',
      'Integrated web scraping of faculty research data and structured reporting, increased assignment-matching accuracy by 40%',
    ],
  },
  {
    role: 'Lenox AI - Chatbot ',
    company: 'Personal Project',
    
    // --- Link was already here ---
    githubLink: 'https://github.com/ChetanyaRathi/LenoxAI-ChatBot', 
    
    description: [
      'Built an intelligent chatbot that answers personalized questions about my resume and experience.',
      'Integrated Lang Chain, Google Vertex AI, Chroma DB to enable sematic retrieval and accurate query matching.',
    ],
  },
  {
    role: 'Tweet AI Generated - Text Detection',
    company: 'Personal Project',
    
    // --- LINK ADDED HERE ---


    description: [
      'Deployed a BERT-based classifier to distinguish AI-generated tweets from human-written text with 96.81% accuracy.',
      'Implemented advanced preprocessing, tokenization, and fine-tuning techniques to optimize model performance and reliability.',
    ],
  },
  {
    role: 'Computer Activity Logging System',
    company: 'Personal Project',
    description: [
      'Designed a real-time monitoring system using the MERN stack and OpenCV, reducing unauthorized browsing by 50%.',
      'Built a Java-based application to enhance system compatibility and improve monitoring accuracy by 40%.',
      'Successfully deployed the system in a college computer lab, tracking 100+ student sessions daily.',
    ],
  },
  {
    role: 'Voice Cloning & Forgery Detection',
    company: 'Personal Project',
    description: [
      'Developed a deep learning model to detect forged voice samples with 95% accuracy.',
      'Applied advanced machine learning techniques for audio signal processing.',
      'Implemented Wave GAN and Spec GAN, achieving 20% higher precision than baseline models.',
    ],
  },
];

const Projects = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="projects">
      <h2>Projects & Hackathons</h2>
      <div className="project-accordion">
        {projectsData.map((project, index) => (
          <div className={`accordion-item ${openIndex === index ? 'active' : ''}`} key={index}>
            <div className="accordion-title" onClick={() => handleToggle(index)}>
              <h3>{project.role}</h3>
              <div className="accordion-icon">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </div>
            </div>
            <div className="accordion-content">
              <p className="project-company">
                {project.company}
                
                {/* This code automatically handles rendering any link you add to the data */}
                {project.githubLink && (
                  <a 
                    href={project.githubLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-github-link" 
                    onClick={(e) => e.stopPropagation()} // Prevents accordion from closing
                  >
                    (GitHub Link)
                  </a>
                )}
              </p>
              <ul>
                {project.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;