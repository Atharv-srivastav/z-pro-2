import React, { useState } from 'react';
import { Mail, Phone, Trash2, User, Clock } from 'lucide-react';

export default function UserCard({ contact, onDelete }) {
  const [imageError, setImageError] = useState(false);

  // Generate deterministic gradient for initial avatar
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const formattedDate = contact.createdAt 
    ? new Date(contact.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <article 
      className="card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: 'var(--space-lg)'
      }}
    >
      <div>
        {/* Top Header: Avatar + Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: 'var(--space-md)' }}>
          {contact.imageUrl && !imageError ? (
            <img 
              src={contact.imageUrl} 
              alt={contact.name} 
              onError={() => setImageError(true)}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--color-primary)'
              }}
            />
          ) : (
            <div 
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'var(--color-accent-gradient)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {getInitials(contact.name)}
            </div>
          )}

          <div style={{ overflow: 'hidden' }}>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.15rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {contact.name}
            </h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} />
              Added {formattedDate}
            </span>
          </div>
        </div>

        {/* Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: 'var(--space-lg)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Mail size={15} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <a href={`mailto:${contact.email}`} style={{ color: 'inherit', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {contact.email}
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Phone size={15} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <a href={`tel:${contact.phone}`} style={{ color: 'inherit' }}>
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Delete Action Button */}
      <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-md)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => onDelete(contact.id)}
          className="btn btn-outline"
          style={{
            fontSize: '0.825rem',
            padding: '0.4rem 0.75rem',
            color: 'var(--color-danger)',
            borderColor: 'var(--color-danger-bg)',
            gap: '0.35rem'
          }}
          title="Delete Contact Card"
        >
          <Trash2 size={14} />
          <span>Delete Card</span>
        </button>
      </div>
    </article>
  );
}
