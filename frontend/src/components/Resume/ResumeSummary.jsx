import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './ResumeSummary.scss';

const ResumeSummary = ({ summary }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (!summary) {
    return null;
  }

  // Split summary into paragraphs (assuming sentences separated by periods)
  const paragraphs = summary.split(/(?<=\.)\s+(?=[A-Z])/).filter(p => p.trim());

  return (
    <motion.section
      ref={ref}
      className="resume-summary"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title">Professional Summary</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="summary-text">
          {paragraph.trim()}
        </p>
      ))}
    </motion.section>
  );
};

export default ResumeSummary;

