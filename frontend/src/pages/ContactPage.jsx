import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/Contact/ContactForm';
import ContactInfo from '../components/Contact/ContactInfo';
import SocialLinks from '../components/Contact/SocialLinks';
import './ContactPage.scss';

const ContactPage = () => {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="contact-header section">
        <div className="container">
          <h1 className="page-title">Contact Me</h1>
          <p className="page-subtitle">Let's work together to bring your ideas to life</p>
        </div>
      </div>

      <div className="contact-content section">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-form-section">
              <ContactForm />
            </div>
            <div className="contact-info-section">
              <ContactInfo />
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;

