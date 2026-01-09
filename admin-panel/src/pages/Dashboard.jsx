import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import './Dashboard.scss';

const Dashboard = () => {
  const [stats, setStats] = useState({
    portfolioCount: 0,
    contactCount: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon portfolio">
            <FaBriefcase />
          </div>
          <div className="stat-content">
            <h3>{stats.portfolioCount}</h3>
            <p>Portfolio Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon contact">
            <FaEnvelope />
          </div>
          <div className="stat-content">
            <h3>{stats.contactCount}</h3>
            <p>Total Contacts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon unread">
            <FaEnvelopeOpen />
          </div>
          <div className="stat-content">
            <h3>{stats.unreadContacts}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

