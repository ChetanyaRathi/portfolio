// src/components/Projects.jsx
import React, { useState } from 'react'; // Import useState
import './Projects.css'; // Change the import back to Projects.css

const projectsData = [
  {
    role: 'Automated Grading System',
    company: 'EECS Hackathon, Syracuse University',
    description: [
      'Developed an award-winning system, reducing manual grading time by 60% through NLP and constraint-based scheduling.',
      'Built a Flask web application for real-time scoring, processing 500+ assignment submissions with an automated pipeline.',
      'Integrated web scraping of faculty research data and structured reporting, increased assignment-matching accuracy by 40%',
,
    ],
  },
  {
    role: 'Tweet AI Generated - Text Detection',
    company: 'Personal Project',
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
  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState(null);

  // Function to handle clicks, toggling the item
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
              <p className="project-company">{project.company}</p>
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