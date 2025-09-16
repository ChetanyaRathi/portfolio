// src/components/Contact.jsx
import React from 'react';
import './Contact.css';
import { useScrollFadeIn } from '../hooks/useScrollFadeIn';

const Contact = () => {
  const animatedItem = useScrollFadeIn();

  return (
    <section id="contact" {...animatedItem}>
      <h2>Contact</h2>
      <p className="contact-tagline">Always open to chat, reach out anytime!</p>
      <div className="contact-details">
        <p>Syracuse, NY</p>
        <p><a href="tel:+13152783090">+1 (315)-278-3090</a></p>
        <p><a href="mailto:rathi.chetanya@gmail.com">rathi.chetanya@gmail.com</a></p>
      </div>
      <div className="contact-socials">
        {/* TODO: Add your actual profile URLs */}
        <a href="https://github.com/ChetanyaRathi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/chetanya-rathi-b7413b206/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
      </div>
    </section>
  );
};

export default Contact;