import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  Database,
  RefreshCw
} from 'lucide-react';
import { submitContact, getApiUrl } from '../services/googleSheetsAPI';
import { portfolioData } from '../data/portfolioData';

export default function Contact({ setActiveView }) {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string, serverSaved?: boolean }
  const [lastSubmittedHash, setLastSubmittedHash] = useState('');

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validate()) {
      return;
    }

    // Prevent duplicate accidental submissions
    const currentHash = `${formData.name}_${formData.email}_${formData.subject}_${formData.message}`;
    if (currentHash === lastSubmittedHash) {
      setSubmitStatus({
        type: 'error',
        message: 'This exact message was already submitted. Please edit your message before resubmitting.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContact(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.serverSaved 
            ? 'Thank you! Your message has been safely recorded in the Google Sheets database.'
            : (result.warning || 'Thank you! Your message has been saved in the mock database.'),
          serverSaved: result.serverSaved
        });

        setLastSubmittedHash(currentHash);

        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to submit form. Please check your connection and try again.'
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        message: 'A network error occurred while submitting. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isConnectedToAppsScript = !!getApiUrl();

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Get in Touch</span>
          </div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">
            Have a project in mind, a question, or a career opportunity? Send a message directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Backend Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)' }}>
                Contact Information
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                Feel free to reach out through the form or using the direct contact channels below.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</div>
                    <a href={`mailto:${personal.email}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {personal.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--color-secondary)' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone</div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {personal.phone}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Location</div>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {personal.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Architecture Status Indicator */}
            <div className="card" style={{ borderLeft: `4px solid ${isConnectedToAppsScript ? 'var(--color-success)' : 'var(--color-warning)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Database size={18} color={isConnectedToAppsScript ? 'var(--color-success)' : 'var(--color-warning)'} />
                <h4 style={{ margin: 0, fontSize: '1rem' }}>
                  {isConnectedToAppsScript ? 'Google Sheets Live Connected' : 'Local Storage Mock Active'}
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                {isConnectedToAppsScript 
                  ? 'Submissions synchronize directly to the cloud Google Spreadsheet via Apps Script API.' 
                  : 'Submissions are stored in browser localStorage. Admins can view/manage them in the Admin Dashboard.'}
              </p>
              <button
                type="button"
                onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  marginTop: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <ShieldCheck size={14} />
                <span>Open Admin Response Dashboard →</span>
              </button>
            </div>
          </div>

          {/* Contact Me Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: 'var(--space-md)' }}>
              Send a Message
            </h3>

            {submitStatus && (
              <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} animate-fade-in`}>
                {submitStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <div style={{ fontSize: '0.9rem' }}>{submitStatus.message}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Jane Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <div className="form-error"><AlertCircle size={13} /> {errors.name}</div>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email Address <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="e.g. jane@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <div className="form-error"><AlertCircle size={13} /> {errors.email}</div>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* Phone Number */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. +1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Subject <span style={{ color: 'var(--color-danger)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                    placeholder="e.g. Project Consultation"
                    disabled={isSubmitting}
                  />
                  {errors.subject && <div className="form-error"><AlertCircle size={13} /> {errors.subject}</div>}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Message <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                  placeholder="Share details regarding your timeline, requirements, or inquiry..."
                  disabled={isSubmitting}
                />
                {errors.message && <div className="form-error"><AlertCircle size={13} /> {errors.message}</div>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

