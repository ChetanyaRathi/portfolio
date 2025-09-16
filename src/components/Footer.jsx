// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {currentYear} Developed by Chetanya Rathi. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;