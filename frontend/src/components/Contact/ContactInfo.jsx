import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './ContactInfo.scss';

const ContactInfo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactItems = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'bakrinola80@gmail.com',
      link: 'mailto:bakrinola80@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+234 903-301-0067',
      link: 'tel:+234 903-301-0067',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Nigeria, Lagos',
      link: null,
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="contact-info"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="info-title">Get in Touch</h2>
      <div className="contact-items">
        {contactItems.map((item, index) => {
          const Icon = item.icon;
          const content = item.link ? (
            <a href={item.link} className="contact-item">
              <div className="contact-icon">
                <Icon />
              </div>
              <div className="contact-details">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </div>
            </a>
          ) : (
            <div className="contact-item">
              <div className="contact-icon">
                <Icon />
              </div>
              <div className="contact-details">
                <span className="contact-label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </div>
            </div>
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {content}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ContactInfo;

