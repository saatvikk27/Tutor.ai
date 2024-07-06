import React from 'react';
import '../assets/styles/Footer.css';
import Logo from '../assets/images/gl_logo_dark.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <a href='/'>
          <img className='logo img-fluid' src={Logo} alt='Tutor.ai' />
        </a>
      </div>
      <div className="footer-links">
        <a href="https://www.instagram.com/globalpathways_studyabroad/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram social-icon"></i>
        </a>
        <a href="https://www.linkedin.com/company/globuslearn-inc/" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin social-icon"></i>
        </a>
      </div>
      <div className="footer-text">
        <p>© Copyright <span>Globus Learn.</span> All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
