import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaPlus, FaTrash, FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa';
import './ResumeManagement.scss';

const ResumeManagement = () => {
  const [resumeData, setResumeData] = useState({
    summary: '',
    education: [],
    experience: [],
    skills: [],
    software: [],
    certifications: [],
    cvFile: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('summary');
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/resume', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumeData(response.data || {
        summary: '',
        education: [],
        experience: [],
        skills: [],
        software: [],
        certifications: [],
        cvFile: null,
      });
    } catch (error) {
      console.error('Failed to fetch resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('/api/admin/resume', resumeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Resume updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update resume');
      console.error('Error saving resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updated = [...resumeData[section]];
      updated[index] = { ...updated[index], [field]: value };
      setResumeData({ ...resumeData, [section]: updated });
    } else {
      setResumeData({ ...resumeData, [section]: { ...resumeData[section], [field]: value } });
    }
  };

  const handleAddItem = (section) => {
    const templates = {
      education: { id: Date.now(), year: '', degree: '', school: '', description: '' },
      experience: { id: Date.now(), year: '', title: '', company: '', responsibilities: [''] },
      skills: { id: Date.now(), name: '', level: 50 },
      software: { id: Date.now(), name: '', icon: 'FaFigma', color: '#7065ef' },
      certifications: { id: Date.now(), title: '', issuer: '', year: '' },
    };

    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], templates[section]],
    });
  };

  const handleDeleteItem = (section, index) => {
    const updated = resumeData[section].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [section]: updated });
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    const updated = [...resumeData[section]];
    if (field === 'responsibilities') {
      updated[index][field] = value.split('\n').filter(Boolean);
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setResumeData({ ...resumeData, [section]: updated });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setMessage('File size must be less than 10MB');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setUploadingPdf(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('pdf', file);

      console.log('Uploading PDF:', file.name, 'Size:', file.size);

      const response = await axios.post('/api/admin/resume/upload-pdf', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);

      setResumeData({ ...resumeData, cvFile: response.data.cvFile });
      setMessage('Resume PDF uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Upload error details:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload PDF';
      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setUploadingPdf(false);
      e.target.value = ''; // Reset file input
    }
  };

  const handleDeletePdf = async () => {
    if (!window.confirm('Are you sure you want to delete the resume PDF?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete('/api/admin/resume/pdf', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResumeData({ ...resumeData, cvFile: null });
      setMessage('Resume PDF deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to delete PDF');
      console.error('Error deleting PDF:', error);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading resume data...</div>;
  }

  return (
    <div className="resume-management">
      <div className="page-header">
        <h1>Resume Management</h1>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="resume-sections">
        <div className="section-tabs">
          <button
            className={activeSection === 'summary' ? 'active' : ''}
            onClick={() => setActiveSection('summary')}
          >
            Summary
          </button>
          <button
            className={activeSection === 'education' ? 'active' : ''}
            onClick={() => setActiveSection('education')}
          >
            Education
          </button>
          <button
            className={activeSection === 'experience' ? 'active' : ''}
            onClick={() => setActiveSection('experience')}
          >
            Experience
          </button>
          <button
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={() => setActiveSection('skills')}
          >
            Skills
          </button>
          <button
            className={activeSection === 'software' ? 'active' : ''}
            onClick={() => setActiveSection('software')}
          >
            Software
          </button>
          <button
            className={activeSection === 'certifications' ? 'active' : ''}
            onClick={() => setActiveSection('certifications')}
          >
            Certifications
          </button>
          <button
            className={activeSection === 'pdf' ? 'active' : ''}
            onClick={() => setActiveSection('pdf')}
          >
            Resume PDF
          </button>
        </div>

        <div className="section-content">
          {activeSection === 'summary' && (
            <div className="section-panel">
              <h2>Professional Summary</h2>
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                rows="6"
                placeholder="Enter your professional summary..."
              />
            </div>
          )}

          {activeSection === 'education' && (
            <div className="section-panel">
              <div className="section-header">
                <h2>Education</h2>
                <button className="btn-add" onClick={() => handleAddItem('education')}>
                  <FaPlus /> Add Education
                </button>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id || index} className="item-card">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Year (e.g., 2015 - 2019)"
                      value={edu.year || ''}
                      onChange={(e) => handleArrayFieldChange('education', index, 'year', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree || ''}
                      onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school || ''}
                    onChange={(e) => handleArrayFieldChange('education', index, 'school', e.target.value)}
                  />
                  <textarea
                    placeholder="Description"
                    value={edu.description || ''}
                    onChange={(e) => handleArrayFieldChange('education', index, 'description', e.target.value)}
                    rows="2"
                  />
                  <button className="btn-delete" onClick={() => handleDeleteItem('education', index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="section-panel">
              <div className="section-header">
                <h2>Experience</h2>
                <button className="btn-add" onClick={() => handleAddItem('experience')}>
                  <FaPlus /> Add Experience
                </button>
              </div>
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id || index} className="item-card">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Year (e.g., 2021 - Present)"
                      value={exp.year || ''}
                      onChange={(e) => handleArrayFieldChange('experience', index, 'year', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.title || ''}
                      onChange={(e) => handleArrayFieldChange('experience', index, 'title', e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company || ''}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'company', e.target.value)}
                  />
                  <textarea
                    placeholder="Responsibilities (one per line)"
                    value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : ''}
                    onChange={(e) => handleArrayFieldChange('experience', index, 'responsibilities', e.target.value)}
                    rows="4"
                  />
                  <button className="btn-delete" onClick={() => handleDeleteItem('experience', index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="section-panel">
              <div className="section-header">
                <h2>Skills</h2>
                <button className="btn-add" onClick={() => handleAddItem('skills')}>
                  <FaPlus /> Add Skill
                </button>
              </div>
              {resumeData.skills.map((skill, index) => (
                <div key={skill.id || index} className="item-card">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      value={skill.name || ''}
                      onChange={(e) => handleArrayFieldChange('skills', index, 'name', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Level (0-100)"
                      min="0"
                      max="100"
                      value={skill.level || 50}
                      onChange={(e) => handleArrayFieldChange('skills', index, 'level', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteItem('skills', index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'software' && (
            <div className="section-panel">
              <div className="section-header">
                <h2>Software Skills</h2>
                <button className="btn-add" onClick={() => handleAddItem('software')}>
                  <FaPlus /> Add Software
                </button>
              </div>
              {resumeData.software.map((soft, index) => (
                <div key={soft.id || index} className="item-card">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Software Name"
                      value={soft.name || ''}
                      onChange={(e) => handleArrayFieldChange('software', index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Icon (e.g., FaFigma)"
                      value={soft.icon || ''}
                      onChange={(e) => handleArrayFieldChange('software', index, 'icon', e.target.value)}
                    />
                    <input
                      type="color"
                      value={soft.color || '#7065ef'}
                      onChange={(e) => handleArrayFieldChange('software', index, 'color', e.target.value)}
                    />
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteItem('software', index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'certifications' && (
            <div className="section-panel">
              <div className="section-header">
                <h2>Certifications</h2>
                <button className="btn-add" onClick={() => handleAddItem('certifications')}>
                  <FaPlus /> Add Certification
                </button>
              </div>
              {resumeData.certifications.map((cert, index) => (
                <div key={cert.id || index} className="item-card">
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Certification Title"
                      value={cert.title || ''}
                      onChange={(e) => handleArrayFieldChange('certifications', index, 'title', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      value={cert.issuer || ''}
                      onChange={(e) => handleArrayFieldChange('certifications', index, 'issuer', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={cert.year || ''}
                      onChange={(e) => handleArrayFieldChange('certifications', index, 'year', e.target.value)}
                    />
                  </div>
                  <button className="btn-delete" onClick={() => handleDeleteItem('certifications', index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'pdf' && (
            <div className="section-panel">
              <h2>Resume PDF Download</h2>
              <p className="section-description">
                Upload a PDF version of your resume that visitors can download from your website.
              </p>

              {resumeData.cvFile ? (
                <div className="pdf-uploaded">
                  <div className="pdf-info">
                    <FaFilePdf className="pdf-icon" />
                    <div className="pdf-details">
                      <h3>Resume PDF Uploaded</h3>
                      <p>Visitors can download your resume from the website</p>
                      <a 
                        href={`http://localhost:5000${resumeData.cvFile}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="preview-link"
                      >
                        Preview PDF
                      </a>
                    </div>
                  </div>
                  <button className="btn-delete-pdf" onClick={handleDeletePdf}>
                    <FaTimes /> Remove PDF
                  </button>
                </div>
              ) : (
                <div className="pdf-upload-section">
                  <div className="upload-area">
                    <FaUpload className="upload-icon" />
                    <h3>Upload Resume PDF</h3>
                    <p>Choose a PDF file to upload</p>
                    <label className="btn-upload">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        disabled={uploadingPdf}
                        style={{ display: 'none' }}
                      />
                      {uploadingPdf ? 'Uploading...' : 'Choose PDF File'}
                    </label>
                    <small>Maximum file size: 10MB</small>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeManagement;
