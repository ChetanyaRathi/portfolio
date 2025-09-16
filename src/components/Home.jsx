// src/components/Home.jsx
import React, { useState, useEffect } from 'react'; // Make sure to import hooks
import './Home.css';
import profilePic from '../assets/profile.png';

// Array of titles to cycle through
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
      setFadeState('fade-out'); // Start fading out

      setTimeout(() => {
        // After fade out, change the title and fade back in
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setFadeState('fade-in');
      }, 500); // This should match the CSS transition time

    }, 3000); // Change title every 3 seconds (3000ms)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  return (
    <section id="home">
      <div className="home-container">
        <div className="home-content">
          <h1>Hi, I am Chetanya Rathi</h1>
          {/* This h2 now uses state to display the cycling title and fade class */}
          <h2 className={`title-subheader ${fadeState}`}>
            {titles[titleIndex]}
          </h2>
          <p className="tagline">
            "Building efficient, full-stack solutions with a focus on great user experience."
          </p>
          <p className="description">
            As a Computer Science Master's student at Syracuse University, I have hands-on internship experience developing with the MERN stack and leveraging cloud technologies like AWS. I thrive at the intersection of design and development, crafting solutions that not only perform seamlessly but also leave a lasting impression.
          </p>
          <a href="/Chetanya_Resume.pdf" className="resume-button" target="_blank" rel="noopener noreferrer">
            View or Download Resume
          </a>
        </div>
        <div className="home-image">
          <img src={profilePic} alt="Chetanya Rathi" />
        </div>
      </div>
    </section>
  );
};

export default Home;