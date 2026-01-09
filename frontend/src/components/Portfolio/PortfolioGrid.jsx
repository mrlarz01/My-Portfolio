import React from 'react';
import { motion } from 'framer-motion';
import './PortfolioGrid.scss';

const PortfolioGrid = ({ projects, onProjectClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getImageUrl = (project) => {
    // Use coverImage if available, fallback to image
    const imageUrl = project.coverImage || project.image;
    
    if (!imageUrl || imageUrl === 'portfolio-placeholder') {
      return null;
    }
    
    // If it's a full URL, use it directly
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Otherwise, prepend the API URL
    return `http://localhost:5000${imageUrl}`;
  };

  return (
    <motion.div
      className="portfolio-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => {
        const imageUrl = getImageUrl(project);
        
        return (
          <motion.div
            key={project.id}
            className="portfolio-item"
            variants={itemVariants}
            onClick={() => onProjectClick(project)}
            whileHover={{ y: -5 }}
          >
            <div className="portfolio-image">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={project.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="image-placeholder" style={{ display: imageUrl ? 'none' : 'flex' }}>
                {project.title}
              </div>
              <div className="portfolio-overlay">
                <span className="view-text">View Project</span>
              </div>
            </div>
            <div className="portfolio-info">
              <span className="portfolio-category">{project.category}</span>
              <h3 className="portfolio-title">{project.title}</h3>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PortfolioGrid;

