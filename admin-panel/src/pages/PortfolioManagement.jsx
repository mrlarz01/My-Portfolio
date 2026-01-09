import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaStar, FaImage } from 'react-icons/fa';
import './PortfolioManagement.scss';

const PortfolioManagement = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    serviceId: '',
    categoryId: '',
    description: '',
    fullDescription: '',
    tags: '',
    tools: '',
    featured: false,
    client: '',
    year: new Date().getFullYear().toString(),
  });
  const [coverImage, setCoverImage] = useState(null); // Cover image file
  const [existingCoverImage, setExistingCoverImage] = useState(null); // Existing cover image URL
  const [galleryImages, setGalleryImages] = useState([]); // Gallery image files
  const [existingGalleryImages, setExistingGalleryImages] = useState([]); // Existing gallery URLs
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
    fetchCategories();
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (formData.serviceId) {
      const filtered = categories.filter((cat) => cat.serviceId === parseInt(formData.serviceId));
      setFilteredCategories(filtered);
      // Reset categoryId if current category doesn't belong to selected service
      if (formData.categoryId) {
        const currentCategory = categories.find((cat) => cat.id === parseInt(formData.categoryId));
        if (!currentCategory || currentCategory.serviceId !== parseInt(formData.serviceId)) {
          setFormData({ ...formData, categoryId: '' });
        }
      }
    } else {
      setFilteredCategories([]);
    }
  }, [formData.serviceId, categories]);

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
    }
  };

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio(response.data);
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      setError('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prev) => [...prev, ...files]);
  };

  const handleRemoveCoverImage = () => {
    setCoverImage(null);
    setExistingCoverImage(null);
  };

  const handleRemoveGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingGalleryImage = (index) => {
    setExistingGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();

      // Add form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('serviceId', formData.serviceId);
      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('fullDescription', formData.fullDescription);
      formDataToSend.append('tags', JSON.stringify(formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean)));
      formDataToSend.append('tools', JSON.stringify(formData.tools.split(',').map((tool) => tool.trim()).filter(Boolean)));
      formDataToSend.append('featured', formData.featured);
      formDataToSend.append('client', formData.client);
      formDataToSend.append('year', formData.year);

      // Handle cover image
      if (editingItem) {
        if (existingCoverImage) {
          formDataToSend.append('existingCoverImage', existingCoverImage);
        }
        formDataToSend.append('existingGalleryImages', JSON.stringify(existingGalleryImages));
      }

      // Add cover image if new one is selected
      if (coverImage) {
        formDataToSend.append('images', coverImage);
        formDataToSend.append('coverImageUpload', 'true');
      }

      // Add gallery images
      galleryImages.forEach((file) => {
        formDataToSend.append('images', file);
      });

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      if (editingItem) {
        await axios.put(`/api/admin/portfolio/${editingItem.id}`, formDataToSend, config);
      } else {
        await axios.post('/api/admin/portfolio', formDataToSend, config);
      }

      setShowModal(false);
      setEditingItem(null);
      setCoverImage(null);
      setExistingCoverImage(null);
      setGalleryImages([]);
      setExistingGalleryImages([]);
      setFormData({
        title: '',
        serviceId: '',
        categoryId: '',
        description: '',
        fullDescription: '',
        tags: '',
        tools: '',
        featured: false,
        client: '',
        year: new Date().getFullYear().toString(),
      });
      fetchPortfolio();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save portfolio item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      serviceId: item.serviceId ? item.serviceId.toString() : '',
      categoryId: item.categoryId ? item.categoryId.toString() : '',
      description: item.description || '',
      fullDescription: item.fullDescription || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      tools: Array.isArray(item.tools) ? item.tools.join(', ') : item.tools || '',
      featured: item.featured || false,
      client: item.client || '',
      year: item.year || new Date().getFullYear().toString(),
    });
    
    // Load existing cover image
    if (item.coverImage) {
      setExistingCoverImage(item.coverImage);
    } else if (item.image) {
      setExistingCoverImage(item.image);
    } else {
      setExistingCoverImage(null);
    }
    
    // Load existing gallery images
    if (item.galleryImages && Array.isArray(item.galleryImages)) {
      setExistingGalleryImages(item.galleryImages);
    } else {
      setExistingGalleryImages([]);
    }
    
    setCoverImage(null);
    setGalleryImages([]);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPortfolio();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete item');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setCoverImage(null);
    setExistingCoverImage(null);
    setGalleryImages([]);
    setExistingGalleryImages([]);
    setFormData({
      title: '',
      serviceId: '',
      categoryId: '',
      description: '',
      fullDescription: '',
      tags: '',
      tools: '',
      featured: false,
      client: '',
      year: new Date().getFullYear().toString(),
    });
    setError('');
  };

  if (loading) {
    return <div className="loading-state">Loading portfolio...</div>;
  }

  return (
    <div className="portfolio-management">
      <div className="page-header">
        <h1>Portfolio Management</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <FaPlus /> Add New Item
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="portfolio-list">
        {portfolio.length === 0 ? (
          <div className="empty-state">
            <p>No portfolio items yet. Add your first item!</p>
          </div>
        ) : (
          portfolio.map((item) => (
            <div key={item.id} className="portfolio-item-card">
              <div className="item-header">
                <div className="item-info">
                  <h3>{item.title}</h3>
                  <div className="item-meta">
                    {(() => {
                      const service = services.find((s) => s.id === item.serviceId);
                      const category = categories.find((c) => c.id === item.categoryId);
                      return (
                        <>
                          {service && <span className="service-badge">{service.name}</span>}
                          {category && <span className="category-badge">{category.name}</span>}
                        </>
                      );
                    })()}
                    {item.featured && (
                      <span className="featured-badge">
                        <FaStar /> Featured
                      </span>
                    )}
                    {item.year && <span className="year-badge">{item.year}</span>}
                  </div>
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => handleEdit(item)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
              <p className="item-description">{item.description}</p>
              {item.client && <p className="item-client">Client: {item.client}</p>}
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="portfolio-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
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
                <label>Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.serviceId}
                >
                  <option value="">{formData.serviceId ? 'Select a category' : 'Select a service first'}</option>
                  {filteredCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="UI/UX, Dashboard, Web App"
                  />
                </div>

                <div className="form-group">
                  <label>Tools (comma-separated)</label>
                  <input
                    type="text"
                    name="tools"
                    value={formData.tools}
                    onChange={handleInputChange}
                    placeholder="Figma, Adobe XD, React"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Client</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image * (Main project thumbnail)</label>
                <div className="image-upload-section">
                  <input
                    type="file"
                    id="cover-image-upload"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="cover-image-upload" className="upload-button">
                    <FaImage /> Choose Cover Image
                  </label>
                  <p className="upload-hint">This will be the main thumbnail for your project</p>

                  {(existingCoverImage || coverImage) && (
                    <div className="cover-image-preview">
                      <h4>Cover Image</h4>
                      <div className="image-preview-single">
                        <img
                          src={
                            coverImage
                              ? URL.createObjectURL(coverImage)
                              : existingCoverImage.startsWith('http')
                              ? existingCoverImage
                              : `http://localhost:5000${existingCoverImage}`
                          }
                          alt="Cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ECover%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          className="remove-image"
                          onClick={handleRemoveCoverImage}
                        >
                          <FaTimes />
                        </button>
                        {coverImage && <span className="image-name">{coverImage.name}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Project Gallery (Multiple images)</label>
                <div className="image-upload-section">
                  <input
                    type="file"
                    id="gallery-images-upload"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryImagesChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="gallery-images-upload" className="upload-button">
                    <FaImage /> Add Gallery Images
                  </label>
                  <p className="upload-hint">Select multiple images to showcase your project</p>

                  {existingGalleryImages.length > 0 && (
                    <div className="existing-images">
                      <h4>Existing Gallery Images ({existingGalleryImages.length})</h4>
                      <div className="images-grid">
                        {existingGalleryImages.map((img, index) => (
                          <div key={index} className="image-preview existing">
                            <img
                              src={img.startsWith('http') ? img : `http://localhost:5000${img}`}
                              alt={`Gallery ${index + 1}`}
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => handleRemoveExistingGalleryImage(index)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {galleryImages.length > 0 && (
                    <div className="selected-images">
                      <h4>New Gallery Images ({galleryImages.length})</h4>
                      <div className="images-grid">
                        {galleryImages.map((file, index) => (
                          <div key={index} className="image-preview new">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                            />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => handleRemoveGalleryImage(index)}
                            >
                              <FaTimes />
                            </button>
                            <span className="image-name">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Update' : 'Create'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
