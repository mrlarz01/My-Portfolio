import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import './ServicesManagement.scss';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    order: 1,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'order' ? parseInt(value) || 1 : value,
      slug: name === 'name' ? value.toLowerCase().replace(/\s+/g, '-') : formData.slug,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (editingService) {
        await axios.put(`/api/admin/services/${editingService.id}`, formData, config);
      } else {
        await axios.post('/api/admin/services', formData, config);
      }

      setShowModal(false);
      setEditingService(null);
      setFormData({ name: '', slug: '', order: services.length + 1 });
      fetchServices();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      slug: service.slug || '',
      order: service.order || 1,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete service');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ name: '', slug: '', order: services.length + 1 });
    setError('');
  };

  if (loading) {
    return <div className="loading-state">Loading services...</div>;
  }

  return (
    <div className="services-management">
      <div className="page-header">
        <h1>Services Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Service
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="services-list">
        {services.length === 0 ? (
          <div className="empty-state">
            <p>No services yet. Add your first service!</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-item-card">
              <div className="item-header">
                <div className="item-info">
                  <h3>{service.name}</h3>
                  <div className="item-meta">
                    <span className="slug-badge">/{service.slug}</span>
                    <span className="order-badge">Order: {service.order}</span>
                  </div>
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => handleEdit(service)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(service.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="service-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>Service Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="service-slug"
                />
                <small>URL-friendly identifier (auto-generated from name)</small>
              </div>

              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingService ? 'Update' : 'Create'} Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;

