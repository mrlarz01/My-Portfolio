import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import './CTA.scss';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="cta section">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Start a Project?</h2>
          <p className="cta-description">
            Let's work together to bring your ideas to life. Get in touch and
            let's discuss how we can create something amazing.
          </p>
          <Link to="/contact" className="btn-primary cta-button">
            Contact Me
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

