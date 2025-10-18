// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import './Home.css';
import profilePic from '../assets/profile.png';

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
          <p className="tagline">"Building efficient, full-stack solutions with a focus on great user experience."</p>
          <p className="description">
            As a Computer Science Master's student at Syracuse University, I have hands-on internship experience developing with the MERN stack and leveraging cloud technologies like AWS. I thrive at the intersection of design and development, crafting solutions that not only perform seamlessly but also leave a lasting impression.
          </p>
          <a href="/Chetanya_Resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
            View or Download Resume
          </a>
        </div>

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
      </div>
    </section>
  );
};

export default Home;