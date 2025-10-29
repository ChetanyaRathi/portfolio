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
            I’m a passionate and results-driven Computer Science graduate student at Syracuse University, specializing in <strong>Generative AI, intelligent agent systems, and full-stack development.</strong>  My journey began with a Bachelor’s in Artificial Intelligence and Data Science, where I discovered my enthusiasm for building scalable, data-driven, and human-centric software.
          </p>
          <p>
Through hands-on experience at <strong>Main 10</strong> and <strong>Hum Aspen Wellness</strong>, I’ve engineered end to end AI powered solutions, from automating cloud workflows using <strong>AWS Lambda</strong> and <strong>FastAPI</strong>  to integrating <strong>LLM-driven insights</strong>  that increased user engagement by 35%. I enjoy transforming complex technical challenges into seamless digital experiences that deliver measurable impact.          </p>
          <p>
            Currently, I’m exploring how <strong>LangChain, LangGraph, RAG architectures, and vector databases</strong> can power the next generation of context-aware applications. I’m motivated by innovation and the belief that intelligent systems should not only be smart, but meaningful, efficient, and user-focused.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;