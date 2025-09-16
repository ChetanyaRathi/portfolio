// src/components/Skills.jsx
import React from 'react';
import './Skills.css';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const skillCategories = [
  {
    title: 'Frontend & Web',
    skills: [
      { name: 'React', iconClass: 'fa-brands fa-react' },
      { name: 'JavaScript', iconClass: 'fa-brands fa-js-square' },
      { name: 'MERN Stack', iconClass: 'fa-brands fa-react' }, // ADDED
      { name: 'PHP', iconClass: 'fa-brands fa-php' }, // ADDED
      { name: 'HTML5', iconClass: 'fa-brands fa-html5' },
      { name: 'CSS3', iconClass: 'fa-brands fa-css3-alt' },
    ],
  },
  {
    title: 'Languages & Backend',
    skills: [
      { name: 'Python', iconClass: 'fa-brands fa-python' },
      { name: 'Java', iconClass: 'fa-brands fa-java' }, // ADDED
      { name: 'C++', iconClass: 'fa-solid fa-c' },
      { name: 'Node.js', iconClass: 'fa-brands fa-node-js' },
      { name: 'Flask', iconClass: 'fa-brands fa-python' },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'SQL', iconClass: 'fa-solid fa-database' },
      { name: 'MongoDB', iconClass: 'fa-solid fa-leaf' },
      { name: 'PostgreSQL', iconClass: 'fa-solid fa-database' }, // ADDED
      { name: 'AWS S3', iconClass: 'fa-brands fa-aws' },
      { name: 'AWS Lambda', iconClass: 'fa-brands fa-aws' }, // ADDED
      { name: 'REST API', iconClass: 'fa-solid fa-server' }, // ADDED
    ],
  },
  {
    title: 'Tools & Other',
    skills: [
      { name: 'Git', iconClass: 'fa-brands fa-git-alt' },
      { name: 'GitHub', iconClass: 'fa-brands fa-github' },
      { name: 'Linux', iconClass: 'fa-brands fa-linux' },
      { name: 'OpenCV', iconClass: 'fa-solid fa-camera-retro' },
    ],
  },
];

const Skills = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section id="skills" {...animatedItem}>
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div className="category-card" key={index}>
            <h3>{category.title}</h3>
            <div className="skills-list">
              {category.skills.map((skill, sIndex) => (
                <div className="skill-item" key={sIndex}>
                  <i className={skill.iconClass}></i>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;