import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import TextType from './TextType';
import heroImage from '../../assets/image1.jpg';
import './Hero.scss';


const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="hero section">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-image-wrapper">
            <motion.div
              className="hero-image"
              variants={imageVariants}
            >
              <img src={heroImage} alt="Bakrin Isaiah" className="profile-image" />
              <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
              </div>
            </motion.div>
          </div>

          <div className="hero-text">
            <motion.p className="hero-greeting" variants={itemVariants}>
              Welcome to my world
            </motion.p>
            <motion.h2 className="hero-title" variants={itemVariants}>
              Hi, I'm Bakrin Isaiah
              a{' '}<br/>
              <span className="gradient-text">
                <TextType
                  text={['UI/UX Designer.', 'Graphic Designer.']}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </motion.h2>
            <motion.p className="hero-description" variants={itemVariants}>
              I use design as a third dimension by which to simplify experiences
              and guide through each and every interaction. I'm not adding
              elements just to spruce things up, but doing it in ways that
              matter.
            </motion.p>
            <motion.div className="hero-buttons" variants={itemVariants}>
              <Link to="/contact" className="btn-primary">
                Hire Me
                <HiArrowRight />
              </Link>
              <Link to="/portfolio" className="btn-secondary">
                View Portfolio
              </Link>
            </motion.div>
            <motion.div className="hero-social" variants={itemVariants}>
              <span>Find with me</span>
              <div className="social-badges">
                <div className="badge">Behance</div>
                <div className="badge">Instagram</div>
                <div className="badge">LinkedIn</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

