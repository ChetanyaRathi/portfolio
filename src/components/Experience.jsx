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
      'Engineered an AI-powered maintenance management platform using Lang Chain, Fast API, reducing data retrieval time by 25%.',

      'Deployed AWS S3 for scalable cloud storage, ensuring reliable data backup and faster retrieval.',
      'Implemented AWS Lambda functions and deployed AWS RDS (PostgreSQL) to automate workflows and trigger real-time maintenance alerts.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Hum Aspen Wellness Private Limited',
    date: 'June 2023-Dec 2023',
    description: [
      'Enhanced the Now Zone Life wellness app by integrating LLM-driven personalized insights using Lang Chain and Gemini API, increasing user engagement by 35%.',

      'Managed and optimized SQL and NoSQL (MongoDB) databases, improving data handling accuracy by 50%.',
      'Conducted extensive software testing, defining 150+ critical test cases and identifying 30+ key bugs.',
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