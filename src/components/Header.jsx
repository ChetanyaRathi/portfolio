// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <header>
      <nav>
        <a href="#home" className="logo">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#07d4f3" />
                <stop offset="100%" stopColor="#00bfff" />
              </linearGradient>
            </defs>
            <path fill="url(#logoGradient)" d="M160,100c0,44.183-35.817,80-80,80S0,144.183,0,100,35.817,20,80,20,160,55.817,160,100ZM30,100c0,27.614,22.386,50,50,50s50-22.386,50-50-22.386-50-50-50-50,22.386-50,50Z"/>
            <path fill="#12121c" d="M120,115V85h-15v7h-22.5c-6.892,0-12.5,5.608-12.5,12.5s5.608,12.5,12.5,12.5H105v7Z"/>
          </svg>
        </a>
        
        <ul className={isNavActive ? 'nav-links active' : 'nav-links'}>
          <li><a href="#about" onClick={() => setIsNavActive(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setIsNavActive(false)}>Skills</a></li>
          <li><a href="#experience" onClick={() => setIsNavActive(false)}>Experience</a></li>
          <li><a href="#projects" onClick={() => setIsNavActive(false)}>Projects</a></li>
          <li><a href="#contact" onClick={() => setIsNavActive(false)}>Contact</a></li>
        </ul>
        
        <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" className="github-button">
          GitHub Profile
        </a>

        <div className={`hamburger ${isNavActive ? 'active' : ''}`} onClick={() => setIsNavActive(!isNavActive)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;