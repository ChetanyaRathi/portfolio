// src/components/Experience.jsx
import React from 'react';
import './Experience.css';

import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const internshipsData = [
  {
    role: 'Software Development Intern',
    company: 'Main 10-Maintenance Management Tool',
    date: 'Jan 2024-May 2024',
    description: [
      'Architected and deployed an AI-powered maintenance management platform leveraging Lang Chain, Fast API, and Python-based agent frameworks, enabling intelligent task routing and reducing data retrieval latency by 25%.',

      'Designed modular, event-driven microservices integrating AWS S3, Lambda, and RDS (PostgreSQL) to support fault-tolerant, high-throughput operations, enhancing system resilience and recovery efficiency by 40%.',
      'Built multi-agent orchestration pipelines using LLM reasoning and contextual embeddings for predictive maintenance and alert generation, improving operational accuracy by 35%.',

      'Deployed containerized workflows with Docker and automated CI/CD pipelines, achieving consistent rollout of AI components and maintaining high system availability under load.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Hum Aspen Wellness Private Limited',
    date: 'June 2023-Dec 2023',
    description: [
      'Enhanced the Now Zone Life wellness mobile application, an AI-driven lifestyle companion that tracks user activity, mindfulness, and stress levels, by embedding LLM-powered personalized insights using Lang Chain and Gemini API.',

      'Integrated retrieval-augmented generation (RAG) pipelines leveraging vector embeddings within a scalable Fast API-based microservice architecture to deliver real-time, improving personalization accuracy by 50%',
      'Deployed adaptive AI modules capable of summarizing user health trends and generating actionable suggestions, transforming the app into an intelligent health copilot.',
      'Optimized NoSQL (MongoDB) data pipelines for scalable AI inference workloads by streamlining schema design and I/O operations, achieving 30% faster data processing and smoother app performance.',

      'Automated testing and CI/CD validation across 150+ test cases in containerized environments, identifying 30+ critical defects and improving release reliability by 30%.',
    ],
},
];

const Experience = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section id="experience" {...animatedItem}>
      <h2>Work Experience</h2>
      <div className="experience-timeline">
        {internshipsData.map((exp, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{exp.role}</h3>
              <p className="experience-company">{exp.company}</p>
              <p className="experience-date">{exp.date}</p>
              <ul>
                {exp.description.map((point, i) => (
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

export default Experience;