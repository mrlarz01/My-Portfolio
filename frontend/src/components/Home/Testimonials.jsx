import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import './Testimonials.scss';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="testimonials section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Testimonials</h2>
          <p className="section-description">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {loading ? (
          <div className="loading-state">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="no-testimonials">No testimonials available</div>
        ) : (
          <div className="testimonials-carousel">
            <div className="carousel-wrapper">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="testimonial-card-wrapper"
                >
                  <div className="testimonial-card">
                    <div className="quote-icon">
                      <FaQuoteLeft />
                    </div>
                    <p className="testimonial-content">"{currentTestimonial.content}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {currentTestimonial.name.charAt(0)}
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{currentTestimonial.name}</h4>
                        <p className="author-role">{currentTestimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                className="carousel-button carousel-button-prev"
                onClick={() => paginate(-1)}
                aria-label="Previous testimonial"
              >
                <HiArrowLeft />
              </button>
              <button
                className="carousel-button carousel-button-next"
                onClick={() => paginate(1)}
                aria-label="Next testimonial"
              >
                <HiArrowRight />
              </button>
            </div>

            {testimonials.length > 1 && (
              <div className="carousel-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

