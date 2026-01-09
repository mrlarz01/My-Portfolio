import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaFigma, FaSketch } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiInvision } from 'react-icons/si';
import './SoftwareSkills.scss';

// Icon mapping for dynamic icon loading
const iconMap = {
  FaFigma,
  FaSketch,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiInvision,
};

const SoftwareSkills = ({ software = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (!software || software.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="software-skills">
      <h2 className="section-title">Software Skills</h2>
      <div className="software-grid">
        {software.map((item, index) => {
          const Icon = iconMap[item.icon] || FaFigma; // Fallback to FaFigma if icon not found
          return (
            <motion.div
              key={item.name}
              className="software-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="software-icon" style={{ color: item.color }}>
                <Icon />
              </div>
              <span className="software-name">{item.name}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default SoftwareSkills;

