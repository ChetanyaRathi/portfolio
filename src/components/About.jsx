// src/components/About.jsx
import React from 'react';
import './About.css';
import aboutPhoto from '../assets/about-photo.png'; // Import your new photo

const About = () => {
  return (
    <section id="about">
      <h2>About <span className="highlight">Me</span></h2>
      <div className="about-container">
        <div className="about-image">
          <img src={aboutPhoto} alt="Chetanya Rathi working" />
        </div>
        <div className="about-text">
          <p>
            I am a passionate and driven Computer Science graduate student at <strong>Syracuse University</strong>. My journey into technology began with a Bachelor's degree in AI & Data Science, which sparked my interest in building intelligent and efficient software solutions.
          </p>
          <p>
            Through my internships, I've had the opportunity to dive deep into full-stack development, contributing to real-world applications using the MERN stack and cloud platforms like AWS. From improving data management productivity by 40% at Main 10 to increasing user engagement by 35% on a wellness app at Hum Aspen, I've enjoyed tackling challenges that deliver measurable impact.
          </p>
          <p>
            Beyond the code, I am fascinated by the potential of machine learning and enjoy working on projects that involve complex problem-solving. I am driven by the challenge of turning innovative ideas into impactful digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;