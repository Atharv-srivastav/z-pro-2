import React, { useState } from 'react';
import { UserPlus, User, Mail, Phone, Image, AlertCircle, CheckCircle } from 'lucide-react';

export default function UserForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [successNotice, setSuccessNotice] = useState(false);

  const validate = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = 'Please provide a valid email format.';
      }
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (phone.trim().length < 7) {
      errs.phone = 'Please provide a valid phone number.';
    }

    // Optional image URL validation if provided
    if (imageUrl.trim()) {
      try {
        new URL(imageUrl.trim());
      } catch (e) {
        errs.imageUrl = 'Please provide a valid URL (e.g. https://...)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newContact = {
      id: 'contact_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      imageUrl: imageUrl.trim() || null,
      createdAt: new Date().toISOString()
    };

    onAddContact(newContact);

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setImageUrl('');
    setErrors({});
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  return (
    <div className="card" style={{ height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'var(--space-md)' }}>
        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
          <UserPlus size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Add New Contact</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dynamically creates and appends a contact card</span>
        </div>
      </div>

      {successNotice && (
        <div className="alert alert-success animate-fade-in" style={{ padding: '0.65rem 1rem' }}>
          <CheckCircle size={16} />
          <span style={{ fontSize: '0.85rem' }}>Contact successfully created!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="user-name">
            User Name <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="user-name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Marcus Vance"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
            />
          </div>
          {errors.name && <div className="form-error"><AlertCircle size={13} /> {errors.name}</div>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="user-email">
            Email Address <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="email"
            id="user-email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="e.g. marcus@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
            }}
          />
          {errors.email && <div className="form-error"><AlertCircle size={13} /> {errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="user-phone">
            Phone Number <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            type="tel"
            id="user-phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="e.g. +1 (555) 345-6789"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
            }}
          />
          {errors.phone && <div className="form-error"><AlertCircle size={13} /> {errors.phone}</div>}
        </div>

        {/* Optional Image URL */}
        <div className="form-group">
          <label className="form-label" htmlFor="user-image">
            Profile Image URL (Optional)
          </label>
          <input
            type="url"
            id="user-image"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            placeholder="https://example.com/photo.jpg"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (errors.imageUrl) setErrors(prev => ({ ...prev, imageUrl: '' }));
            }}
          />
          {errors.imageUrl && <div className="form-error"><AlertCircle size={13} /> {errors.imageUrl}</div>}
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-sm)' }}>
          <UserPlus size={18} />
          Create Contact Card
        </button>
      </form>
    </div>
  );
}
