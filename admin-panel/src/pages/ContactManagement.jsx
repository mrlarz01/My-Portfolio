import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaEnvelopeOpen, FaEye, FaTimes, FaPhone, FaCalendar } from 'react-icons/fa';
import './ContactManagement.scss';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (contactId, currentReadStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `/api/admin/contact/${contactId}/read`,
        { read: !currentReadStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update local state
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, read: !currentReadStatus } : contact
        )
      );
      // Update selected contact if it's the one being toggled
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact({ ...selectedContact, read: !currentReadStatus });
      }
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };

  const handleViewMessage = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    // Mark as read when viewing
    if (!contact.read) {
      handleToggleRead(contact.id, contact.read);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  if (loading) {
    return <div className="loading-state">Loading contacts...</div>;
  }

  return (
    <div className="contact-management">
      <div className="page-header">
        <div>
          <h1>Contact Management</h1>
          {unreadCount > 0 && (
            <p className="unread-badge">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="contacts-list">
        {contacts.length === 0 ? (
          <div className="empty-state">
            <p>No contacts yet.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-item ${!contact.read ? 'unread' : ''}`}
            >
              <div className="contact-header">
                <div className="contact-info-main">
                  <div className="contact-name-row">
                    <h3>{contact.name}</h3>
                    {!contact.read && <span className="unread-indicator">New</span>}
                  </div>
                  <div className="contact-meta">
                    <span className="contact-email">
                      <FaEnvelope /> {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="contact-phone">
                        <FaPhone /> {contact.phone}
                      </span>
                    )}
                    <span className="contact-date">
                      <FaCalendar /> {new Date(contact.date).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="contact-actions">
                  <button
                    className="btn-view"
                    onClick={() => handleViewMessage(contact)}
                    title="View Message"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className={`btn-toggle-read ${contact.read ? 'read' : 'unread'}`}
                    onClick={() => handleToggleRead(contact.id, contact.read)}
                    title={contact.read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    {contact.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                    {contact.read ? 'Read' : 'Unread'}
                  </button>
                </div>
              </div>
              <div className="contact-preview">
                <p className="contact-subject">
                  <strong>Subject:</strong> {contact.subject}
                </p>
                <p className="contact-message-preview">
                  {contact.message.length > 150
                    ? `${contact.message.substring(0, 150)}...`
                    : contact.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message Details</h2>
              <button className="close-button" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <div className="message-details">
              <div className="detail-section">
                <h3>Contact Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>
                      <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                    </span>
                  </div>
                  {selectedContact.phone && (
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>
                        <a href={`tel:${selectedContact.phone}`}>{selectedContact.phone}</a>
                      </span>
                    </div>
                  )}
                  <div className="detail-item">
                    <label>Date:</label>
                    <span>{new Date(selectedContact.date).toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status-badge ${selectedContact.read ? 'read' : 'unread'}`}>
                      {selectedContact.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Subject</h3>
                <p className="message-subject">{selectedContact.subject}</p>
              </div>

              <div className="detail-section">
                <h3>Message</h3>
                <div className="message-content">{selectedContact.message}</div>
              </div>

              <div className="modal-actions">
                <button
                  className={`btn-toggle-read ${selectedContact.read ? 'read' : 'unread'}`}
                  onClick={() => {
                    handleToggleRead(selectedContact.id, selectedContact.read);
                  }}
                >
                  {selectedContact.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                  Mark as {selectedContact.read ? 'Unread' : 'Read'}
                </button>
                <button className="btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
