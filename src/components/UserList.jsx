import React, { useState } from 'react';
import { Users, Search, AlertCircle, RefreshCw } from 'lucide-react';
import UserCard from './UserCard';

export default function UserList({ contacts, onDeleteContact, onResetDefaults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => {
    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      {/* Header with counter and search */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: 'var(--space-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--color-secondary)' }}>
            <Users size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Active Contact Directory</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing {filteredContacts.length} of {contacts.length} cards
            </span>
          </div>
        </div>

        {/* Reset defaults button if list is empty */}
        {contacts.length === 0 && (
          <button onClick={onResetDefaults} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}>
            <RefreshCw size={14} />
            Load Sample Cards
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: 'var(--space-lg)' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="form-control"
          placeholder="Filter contacts by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '2.75rem' }}
        />
      </div>

      {/* Render Contact Cards */}
      {filteredContacts.length > 0 ? (
        <div className="cards-grid">
          {filteredContacts.map(contact => (
            <UserCard 
              key={contact.id} 
              contact={contact} 
              onDelete={onDeleteContact} 
            />
          ))}
        </div>
      ) : (
        <div 
          className="card"
          style={{
            textAlign: 'center',
            padding: 'var(--space-3xl) var(--space-xl)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-md) auto'
            }}
          >
            <Users size={32} />
          </div>
          <h4 style={{ marginBottom: '0.5rem' }}>No Contact Cards Found</h4>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto var(--space-lg) auto', fontSize: '0.95rem' }}>
            {searchTerm 
              ? `No contacts match your filter query "${searchTerm}". Try another search keyword.`
              : 'Your contact directory is currently empty. Use the form on the left to add your first contact card!'}
          </p>
          {contacts.length === 0 && (
            <button onClick={onResetDefaults} className="btn btn-primary" style={{ display: 'inline-flex' }}>
              <RefreshCw size={16} />
              Restore Sample Contacts
            </button>
          )}
        </div>
      )}
    </div>
  );
}
