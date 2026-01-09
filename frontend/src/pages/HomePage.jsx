import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Home/Hero';
import AboutPreview from '../components/Home/AboutPreview';
import FeaturedProjects from '../components/Home/FeaturedProjects';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';
import CTA from '../components/Home/CTA';
import './HomePage.scss';

const HomePage = () => {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <Services />
      <Testimonials />
      <CTA />
    </motion.div>
  );
};

export default HomePage;

