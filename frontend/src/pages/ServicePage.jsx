import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import PortfolioFilter from '../components/Portfolio/PortfolioFilter';
import PortfolioGrid from '../components/Portfolio/PortfolioGrid';
import ProjectModal from '../components/Portfolio/ProjectModal';
import './ServicePage.scss';

const ServicePage = () => {
  const { serviceSlug } = useParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch service by slug
        const serviceResponse = await axios.get(`/api/services/${serviceSlug}`);
        setService(serviceResponse.data);
        
        // Fetch categories for this service
        const categoriesResponse = await axios.get(`/api/categories/service/${serviceResponse.data.id}`);
        setCategories(categoriesResponse.data);
        
        // Fetch portfolio items for this service
        const portfolioResponse = await axios.get(`/api/portfolio/service/${serviceResponse.data.id}`);
        setProjects(portfolioResponse.data);
        
        setError(null);
      } catch (err) {
        setError('Failed to load service data');
        console.error('Error fetching service data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      fetchData();
    }
  }, [serviceSlug]);

  // Extract unique categories from projects and combine with service categories
  const allCategories = ['All', ...categories.map((cat) => cat.name)];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => {
          const category = categories.find((c) => c.id === project.categoryId);
          return category && category.name === activeFilter;
        });

  if (loading) {
    return (
      <motion.div
        className="service-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="service-header section">
          <div className="container">
            <div className="loading-state">Loading...</div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !service) {
    return (
      <motion.div
        className="service-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="service-header section">
          <div className="container">
            <div className="error-state">{error || 'Service not found'}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="service-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-header section">
        <div className="container">
          <h1 className="page-title">{service.name}</h1>
          <p className="page-subtitle">Explore my {service.name.toLowerCase()} work and creative projects</p>
        </div>
      </div>

      <div className="service-content section">
        <div className="container">
          {projects.length === 0 ? (
            <div className="no-projects">No projects available for this service</div>
          ) : (
            <>
              {allCategories.length > 1 && (
                <PortfolioFilter
                  categories={allCategories}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              )}
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

export default ServicePage;

