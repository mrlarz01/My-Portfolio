import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PortfolioFilter from '../components/Portfolio/PortfolioFilter';
import PortfolioGrid from '../components/Portfolio/PortfolioGrid';
import ProjectModal from '../components/Portfolio/ProjectModal';
import './PortfolioPage.scss';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/portfolio');
        setProjects(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load portfolio projects');
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Extract unique categories from projects
  const categories = ['All', ...new Set(projects.map((project) => project.category))];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="portfolio-header section">
        <div className="container">
          <h1 className="page-title">My Portfolio</h1>
          <p className="page-subtitle">Explore my recent work and creative projects</p>
        </div>
      </div>

      <div className="portfolio-content section">
        <div className="container">
          {loading ? (
            <div className="loading-state">Loading portfolio...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : (
            <>
              <PortfolioFilter
                categories={categories}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
              <PortfolioGrid
                projects={filteredProjects}
                onProjectClick={setSelectedProject}
              />
            </>
          )}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          projects={projects}
        />
      )}
    </motion.div>
  );
};

export default PortfolioPage;

