import React from 'react';
import './Contact.css'; // Make sure this path is correct

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <div className="contact-content-wrapper"> {/* New wrapper for two columns */}
          <div className="contact-left-column">

            <p className="contact-description">
              I'm actively pursuing full-time opportunities in Software Development and AI / Machine Learning. 
              Whether you're looking to discuss a project, explore potential collaborations, or just have a chat, 
              I'd be delighted to connect. Reach out anytime!
            </p>
          </div>

          <div className="contact-right-column">
            <div className="message-card">
              <h3>Reach out to me here</h3> {/* Card title */}
              <p className="contact-detail">
                <a href="mailto:rathi.chetanya@gmail.com" target="_blank" rel="noopener noreferrer">
                  rathi.chetanya@gmail.com
                </a>
              </p>
              <p className="contact-detail">
                <a href="https://www.linkedin.com/in/chetanya-rathi/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </p>
              <p className="contact-detail">
                <a href="https://github.com/chetanyarathi" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </p>
              {/* Add your phone number here if you still want it, but I've removed it for a cleaner look */}
              {/* <p className="contact-detail">+1 (315)-278-3090</p> */}
            </div>
            {/* Optional: Add a location or other small details outside the card if desired */}
            {/* <p className="contact-location">Syracuse, NY</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;