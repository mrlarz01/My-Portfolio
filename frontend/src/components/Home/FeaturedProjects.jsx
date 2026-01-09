import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import axios from 'axios';
import { HiArrowRight } from 'react-icons/hi';
import './FeaturedProjects.scss';

const FeaturedProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axios.get('/api/portfolio');
        // Filter only featured projects and limit to 3
        const featured = response.data
          .filter((project) => project.featured)
          .slice(0, 3);
        setProjects(featured);
        setError(null);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        setError('Failed to load featured projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

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
    return `/uploads/${imageUrl}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="featured-projects section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">My Portfolio</h2>
            <p className="section-subtitle">Visit my portfolio and keep your feedback</p>
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {loading ? (
            <div className="loading-state">Loading featured projects...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : projects.length === 0 ? (
            <div className="no-projects">No featured projects available</div>
          ) : (
            projects.map((project) => {
              const imageUrl = getImageUrl(project);
              
              return (
                <motion.div
                  key={project.id}
                  className="project-card"
                  variants={itemVariants}
                >
                  <div className="project-image">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={project.title}
                        className="project-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="image-placeholder" style={{ display: imageUrl ? 'none' : 'flex' }}>
                      {project.title}
                    </div>
                    <div className="project-overlay">
                      <Link to={`/portfolio/${project.id}`} className="view-project">
                        View Project <HiArrowRight />
                      </Link>
                    </div>
                  </div>
                  <div className="project-info">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        <motion.div
          className="view-all"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/portfolio" className="btn-secondary">
            View All Projects
            <HiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

