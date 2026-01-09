import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './Navbar.scss';

const Navbar = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortfolioDropdownOpen, setIsPortfolioDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio', hasDropdown: true },
    { path: '/resume', label: 'Resume' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    // Exact match for home page
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other pages, check exact match only (not startsWith)
    return location.pathname === path;
  };
  
  const isPortfolioActive = location.pathname.startsWith('/portfolio');

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.svg" alt="Larz Design Logo" className="logo-image" />
        </Link>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li 
              key={item.path} 
              className={`navbar-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
              onMouseEnter={() => item.hasDropdown && setIsPortfolioDropdownOpen(true)}
              onMouseLeave={() => item.hasDropdown && setIsPortfolioDropdownOpen(false)}
            >
              {item.hasDropdown ? (
                <>
                  <Link
                    to={item.path}
                    className={`navbar-link ${isPortfolioActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                    <span className="dropdown-arrow">▼</span>
                  </Link>
                  <AnimatePresence>
                    {isPortfolioDropdownOpen && (
                      <motion.ul
                        className="navbar-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {services.map((service) => (
                          <li key={service.id}>
                            <Link
                              to={`/portfolio/service/${service.slug}`}
                              className={`dropdown-link ${location.pathname === `/portfolio/service/${service.slug}` ? 'active' : ''}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsPortfolioDropdownOpen(false);
                              }}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <button
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

