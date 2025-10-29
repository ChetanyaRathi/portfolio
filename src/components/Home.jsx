import React, { useState, useEffect } from 'react';
import './Home.css';
import profilePic from '../assets/profile.png';
import StatusBox from './StatusBox'; // <-- 1. IMPORT IT HERE

const titles = [
  'SOFTWARE DEVELOPER',
  'MACHINE LEARNING ENGINEER',
  'AI ENTHUSIAST',
  'FULL STACK ENGINEER',
];

const Home = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setFadeState('fade-in');
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home">
      <div className="home-container">
        <div className="home-content">
          <h1>Hi, I am Chetanya Rathi</h1>
          <h2 className={`title-subheader ${fadeState}`}>{titles[titleIndex]}</h2>
          <p className="tagline">"Building efficient, full-stack AI solutions with a focus on great user experience."</p>
          <p className="description">
            Innovative Software Developer specializing in Generative AI, LLM applications, and intelligent agent systems. Hands-on experience building advanced RAG pipelines, LangChain / LangGraph agent architectures, and AI-integrated full-stack solutions using Python, FastAPI, and React.js. Skilled in leveraging vector databases (ChromaDB), embeddings, and cloud infrastructure (AWS, Vertex AI, Gemini) to design scalable, context-aware AI products. Proven record in developing intelligent automation systems, optimizing database performance, and leading AI-driven innovations across academic and professional projects.
          </p>
          <a href="/Chetanya_Resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
            View or Download Resume
          </a>
        </div>

        {/* 2. CREATE THIS NEW WRAPPER */}
        <div className="home-right-column">
          <div className="home-image-wrapper">
            <div className="home-image">
              <img src={profilePic} alt="Chetanya Rathi" />
            </div>
            <div className="orbit"></div>
            <div className="floating-icons">
              <span className="icon-item icon-1"><i className="fa-brands fa-react"></i></span>
              <span className="icon-item icon-2"><i className="fa-brands fa-js-square"></i></span>
              <span className="icon-item icon-3"><i className="fa-brands fa-python"></i></span>
              <span className="icon-item icon-4"><i className="fa-brands fa-aws"></i></span>
            </div>
          </div>
          <StatusBox /> {/* <-- 3. ADD THE COMPONENT HERE */}
        </div>
      </div>
    </section>
  );
};

export default Home;