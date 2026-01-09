import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCertificate } from 'react-icons/fa';
import './Certifications.scss';

const Certifications = ({ certifications = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="certifications">
      <h2 className="section-title">Certifications</h2>
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="certification-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="cert-icon">
              <FaCertificate />
            </div>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <span className="cert-year">{cert.year}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;

