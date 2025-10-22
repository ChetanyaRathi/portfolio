// src/components/Skills.jsx
import React from 'react';
import './Skills.css';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const skillCategories = [
  // Your skillCategories array remains the same
  {
    title: 'Frontend & Web',
    skills: [
        { name: 'React', iconClass: 'fa-brands fa-react' },
        { name: 'JavaScript', iconClass: 'fa-brands fa-js-square' },
        { name: 'MERN Stack', iconClass: 'fa-brands fa-react' },
        { name: 'PHP', iconClass: 'fa-brands fa-php' },
        { name: 'HTML5', iconClass: 'fa-brands fa-html5' },
        { name: 'Tailwind CSS', iconClass: 'fa-brands fa-css3-alt' },
    ],
  },
  {
    title: 'Languages & Backend',
    skills: [
        { name: 'RAG', iconClass: 'fa-brands fa-python' },
        { name: 'Python', iconClass: 'fa-brands fa-java' },
        { name: 'GenAI', iconClass: 'fa-brands fa-java' },
        { name: 'C++', iconClass: 'fa-solid fa-c' },
        { name: 'Node.js', iconClass: 'fa-brands fa-node-js' },
        { name: 'Flask', iconClass: 'fa-brands fa-python' },
        { name: 'Java', iconClass: 'fa-brands fa-python' },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
        { name: 'Google Cloud', iconClass: 'fa-brands fa-aws' },
        { name: 'Gemini', iconClass: 'fa-brands fa-aws' },
        { name: 'Vertex AI', iconClass: 'fa-solid fa-server' },
        { name: 'OpenAI', iconClass: 'fa-solid fa-server' },
        { name: 'SQL', iconClass: 'fa-solid fa-database' },
        { name: 'MongoDB', iconClass: 'fa-solid fa-leaf' },
        { name: 'PostgreSQL', iconClass: 'fa-solid fa-database' },
        { name: 'AWS S3', iconClass: 'fa-brands fa-aws' },
        { name: 'AWS RDS', iconClass: 'fa-brands fa-aws' },
        { name: 'AWS Lambda', iconClass: 'fa-brands fa-aws' },
        { name: 'REST API', iconClass: 'fa-solid fa-server' },
        
    ],
  },
  {
    title: 'Tools & Other',
    skills: [
        { name: 'Git', iconClass: 'fa-brands fa-git-alt' },
        { name: 'GitHub', iconClass: 'fa-brands fa-github' },
        { name: 'Linux', iconClass: 'fa-brands fa-linux' },
        { name: 'OpenCV', iconClass: 'fa-solid fa-camera-retro' },
        { name: 'Netlify', iconClass: 'fa-brands fa-linux' },
        { name: 'Render', iconClass: 'fa-solid fa-camera-retro' },
    ],
  },
];

const Skills = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section id="skills" {...animatedItem}>
      <h2>Technical <span className="highlight">Skills</span></h2>

      <div className="skills-main-container">
        {/* Left Column: SVG Animation */}
        <div className="skills-animation-container">
          <svg viewBox="0 0 200 200" className="skills-svg">
            <defs>
              <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-color)" />
                <stop offset="100%" stopColor="#00bfff" />
              </linearGradient>
            </defs>
            {/* Rotating Orbits */}
            <circle className="orbit" cx="100" cy="100" r="80" />
            <circle className="orbit" cx="100" cy="100" r="60" />
            {/* Central Brain Icon */}
            <g className="central-icon">
              <path d="M100 85c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-15 10c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm30 0c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z M100 65c-8.28 0-15 6.72-15 15v20c0 8.28 6.72 15 15 15s15-6.72 15-15V80c0-8.28-6.72-15-15-15z"/>
            </g>
            {/* Orbiting Icons */}
            <g className="orbit-icons">
              <text x="100" y="24" textAnchor="middle" dominantBaseline="middle">💻</text>
              <text x="180" y="100" textAnchor="middle" dominantBaseline="middle">🌐</text>
              <text x="100" y="176" textAnchor="middle" dominantBaseline="middle">☁️</text>
              <text x="20" y="100" textAnchor="middle" dominantBaseline="middle">⚙️</text>
            </g>
          </svg>
        </div>

        {/* Right Column: Skills Grid */}
        <div className="skills-grid-container">
          {skillCategories.map((category, index) => (
            <div className="category-card" key={index}>
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, sIndex) => (
                  <div className="skill-item" key={sIndex}>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;