import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import './CategoriesManagement.scss';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    serviceId: '',
    order: 1,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
    fetchCategories();
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
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'order' || name === 'serviceId' ? parseInt(value) || '' : value,
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

      if (editingCategory) {
        await axios.put(`/api/admin/categories/${editingCategory.id}`, formData, config);
      } else {
        await axios.post('/api/admin/categories', formData, config);
      }

      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', serviceId: '', order: 1 });
      fetchCategories();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      serviceId: category.serviceId || '',
      order: category.order || 1,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', serviceId: '', order: 1 });
    setError('');
  };

  const getServiceName = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : 'Unknown';
  };

  if (loading) {
    return <div className="loading-state">Loading categories...</div>;
  }

  return (
    <div className="categories-management">
      <div className="page-header">
        <h1>Categories Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Category
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="categories-list">
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet. Add your first category!</p>
          </div>
        ) : (
          services.map((service) => {
            const serviceCategories = categories
              .filter((cat) => cat.serviceId === service.id)
              .sort((a, b) => a.order - b.order);
            
            if (serviceCategories.length === 0) return null;

            return (
              <div key={service.id} className="service-section">
                <h2 className="service-section-title">{service.name}</h2>
                <div className="categories-grid">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="category-item-card">
                      <div className="item-header">
                        <div className="item-info">
                          <h3>{category.name}</h3>
                          <span className="order-badge">Order: {category.order}</span>
                        </div>
                        <div className="item-actions">
                          <button className="btn-edit" onClick={() => handleEdit(category)}>
                            <FaEdit /> Edit
                          </button>
                          <button className="btn-delete" onClick={() => handleDelete(category.id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Service *</label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
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
                  {editingCategory ? 'Update' : 'Create'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;

