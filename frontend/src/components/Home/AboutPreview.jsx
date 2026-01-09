import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import aboutImage from '../../assets/image2.jpg';
import './AboutPreview.scss';

const AboutPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skills = ['UI/UX Design', 'Branding', 'Web Design', 'Mobile App Design', 'Graphic Design', 'User Research'];

  return (
    <section ref={ref} className="about-preview section">
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a passionate UI/UX designer with over 5 years of experience
              creating digital products that users love. I specialize in
              transforming complex problems into simple, beautiful, and intuitive
              designs.
            </p>
            <p className="about-description">
              When I'm not designing, you can find me exploring new design trends,
              contributing to open-source projects, or sharing my knowledge with
              the design community.
            </p>
            <div className="skills-container">
              <h3>Best Skills On</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="About Me" className="about-image-photo" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;

