import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBriefcase, FaFileAlt, FaEnvelope, FaSignOutAlt, FaCog, FaTags } from 'react-icons/fa';
import './Layout.scss';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FaHome },
    { path: '/portfolio', label: 'Portfolio', icon: FaBriefcase },
    { path: '/services', label: 'Services', icon: FaCog },
    { path: '/categories', label: 'Categories', icon: FaTags },
    { path: '/resume', label: 'Resume', icon: FaFileAlt },
    { path: '/contact', label: 'Contacts', icon: FaEnvelope },
  ];

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Larz Design</h2>
          <span className="admin-badge">Admin</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'active' : ''}`}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

