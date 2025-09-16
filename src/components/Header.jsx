// src/components/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <a href="#home" className="logo">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                {/* This color is now updated to the new Cyber Teal */}
                <stop offset="0%" style={{stopColor: '#07d4f3', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#00bfff', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <path fill="url(#logoGradient)" d="M160,100c0,44.183-35.817,80-80,80S0,144.183,0,100,35.817,20,80,20,160,55.817,160,100ZM30,100c0,27.614,22.386,50,50,50s50-22.386,50-50-22.386-50-50-50-50,22.386-50,50Z"/>
            <path fill="#12121c" d="M120,115V85h-15v7h-22.5c-6.892,0-12.5,5.608-12.5,12.5s5.608,12.5,12.5,12.5H105v7Z"/>
          </svg>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" className="github-button">
          GitHub Profile
        </a>
      </nav>
    </header>
  );
};

export default Header;