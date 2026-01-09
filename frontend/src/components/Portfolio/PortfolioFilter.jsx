import React from 'react';
import { motion } from 'framer-motion';
import './PortfolioFilter.scss';

const PortfolioFilter = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="portfolio-filter">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          className={`filter-button ${activeFilter === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

export default PortfolioFilter;

