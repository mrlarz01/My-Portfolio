import React from 'react';
import { Link } from 'react-router-dom';
import { FaBehance, FaDribbble, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const socialLinks = [
    { icon: FaBehance, url: 'https://www.behance.net/bakrinola1', label: 'Behance' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, url: 'https://github.com/mrlarz01', label: 'GitHub' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Larz</span>
              <span className="logo-accent">Design</span>
            </Link>
            <p className="footer-tagline">Creating beautiful and functional digital experiences.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <p>Email: bakrinola80@gmail.com</p>
            <p>Phone: +234 903-301-0067</p>
          </div>

          <div className="footer-social">
            <h4>Follow Me</h4>
            <div className="social-icons">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-icon"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Larz Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

