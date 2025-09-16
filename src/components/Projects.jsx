// src/components/Projects.jsx
import React from 'react';
import './Experience.css'; // Use the timeline styles from the Experience component
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const projectsData = [
  {
    role: 'Automated Grading System',
    company: 'EECS Hackathon, Syracuse University',
    date: 'Jan 2024 - Feb 2025',
    description: [
      'Developed an award-winning system, reducing manual grading time by 60% through NLP and constraint-based scheduling.', 
      'Built a Flask web application for real-time scoring, processing 500+ assignment submissions with an automated pipeline.', 
      'Integrated web scraping for faculty research interests to improve assignment matching accuracy by 40%.', 
    ],
  },
  {
    role: 'Voice Cloning & Forgery Detection',
    company: 'Personal Project',
    date: 'Jan 2024 - May 2024',
    description: [
      'Developed a deep learning model to detect forged voice samples with 95% accuracy.', 
      'Applied advanced machine learning techniques for audio signal processing.', 
      'Implemented Wave GAN and Spec GAN, achieving 20% higher precision than baseline models.', 
    ],
  },
  {
    role: 'Computer Activity Logging System',
    company: 'Personal Project',
    date: 'Aug 2022 - Dec 2022',
    description: [
      'Designed a real-time monitoring system using the MERN stack and OpenCV, reducing unauthorized browsing by 50%.', 
      'Built a Java-based application to enhance system compatibility and improve monitoring accuracy by 40%.', 
      'Successfully deployed the system in a college computer lab, tracking 100+ student sessions daily.', 
    ],
  },
];

const Projects = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section id="projects" {...animatedItem}>
      <h2>Projects & Hackathons</h2>
      <div className="experience-timeline">
        {projectsData.map((project, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>{project.role}</h3>
              <p className="experience-company">{project.company}</p>
              <p className="experience-date">{project.date}</p>
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