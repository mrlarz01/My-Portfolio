import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { HiArrowLeft, HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './ProjectModal.scss';

const ProjectModal = ({ project, onClose, projects }) => {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  
  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl === 'portfolio-placeholder') {
      return null;
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `http://localhost:5000${imageUrl}`;
  };

  const coverImageUrl = getImageUrl(project.coverImage || project.image);
  const galleryImages = project.galleryImages || [];
  const hasGallery = galleryImages.length > 0;

  const handlePrevGallery = () => {
    setSelectedGalleryIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextGallery = () => {
    setSelectedGalleryIndex((prev) => 
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="project-modal-overlay"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="project-modal"
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            <IoClose />
          </button>

          <div className="modal-header">
            <div className="modal-hero-image">
              {coverImageUrl ? (
                <img src={coverImageUrl} alt={project.title} />
              ) : (
                <div className="image-placeholder-large">{project.title}</div>
              )}
            </div>
          </div>

          <div className="modal-content">
            <div className="modal-header-info">
              <span className="modal-category">{project.category}</span>
              <h2 className="modal-title">{project.title}</h2>
              {project.client && (
                <p className="modal-client">Client: {project.client}</p>
              )}
              {project.year && (
                <p className="modal-year">Year: {project.year}</p>
              )}
              <div className="modal-tools">
                {project.tools?.map((tool, index) => (
                  <span key={index} className="tool-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-body">
              <h3>Overview</h3>
              <p>{project.fullDescription || project.description}</p>

              <div className="modal-tags">
                {project.tags?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {hasGallery && (
              <div className="modal-gallery">
                <h3>Project Gallery</h3>
                <div className="gallery-main">
                  <div className="gallery-image-container">
                    <img 
                      src={getImageUrl(galleryImages[selectedGalleryIndex])} 
                      alt={`Gallery ${selectedGalleryIndex + 1}`}
                    />
                    {galleryImages.length > 1 && (
                      <>
                        <button 
                          className="gallery-nav prev" 
                          onClick={handlePrevGallery}
                          aria-label="Previous image"
                        >
                          <HiChevronLeft />
                        </button>
                        <button 
                          className="gallery-nav next" 
                          onClick={handleNextGallery}
                          aria-label="Next image"
                        >
                          <HiChevronRight />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="gallery-counter">
                    {selectedGalleryIndex + 1} / {galleryImages.length}
                  </div>
                </div>
                
                {galleryImages.length > 1 && (
                  <div className="gallery-thumbnails">
                    {galleryImages.map((img, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${index === selectedGalleryIndex ? 'active' : ''}`}
                        onClick={() => setSelectedGalleryIndex(index)}
                      >
                        <img src={getImageUrl(img)} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="modal-navigation">
              <button className="nav-button prev" onClick={() => {}}>
                <HiArrowLeft />
                Previous
              </button>
              <button className="nav-button next" onClick={() => {}}>
                Next
                <HiArrowRight />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

