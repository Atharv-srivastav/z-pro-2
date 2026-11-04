import React, { useState, useEffect } from 'react';
import { Users, Heart, Sparkles, PlusCircle, ArrowLeft } from 'lucide-react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import LikeCard from '../components/LikeCard';

const STORAGE_KEY = 'zeravia_react_contacts';

const INITIAL_CONTACTS = [
  {
    id: 'contact_seed_1',
    name: 'Emily Watson',
    email: 'emily.watson@designlab.io',
    phone: '+1 (555) 345-6789',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'contact_seed_2',
    name: 'Carlos Mendez',
    email: 'carlos.m@fintechsys.com',
    phone: '+1 (555) 789-0123',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'contact_seed_3',
    name: 'Aisha Al-Mansoor',
    email: 'aisha@cloudstream.tech',
    phone: '+1 (555) 901-2345',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString()
  }
];

export default function ContactManager({ setActiveView }) {
  // Load initial contacts from local storage or fallback to default sample contacts
  const [contacts, setContacts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved contacts:', e);
    }
    return INITIAL_CONTACTS;
  });

  // Sync contacts with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (e) {
      console.warn('Failed to persist contacts:', e);
    }
  }, [contacts]);

  // Handler: Add new contact
  const handleAddContact = (newContact) => {
    setContacts(prev => [newContact, ...prev]);
  };

  // Handler: Delete contact by ID
  const handleDeleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Handler: Reset default sample contacts
  const handleResetDefaults = () => {
    setContacts(INITIAL_CONTACTS);
  };

  // Mini project sample card data (Part 7)
  const miniProjectCards = [
    {
      title: "React 18 Concurrent Rendering",
      description: "Explores how automatic batching and transitions provide fluid 60fps rendering without UI freezes under high state loads.",
      category: "Frontend Core"
    },
    {
      title: "Google Apps Script Serverless",
      description: "Low-overhead serverless execution runtime with direct spreadsheet database bindings and token authorization.",
      category: "Cloud Architecture"
    },
    {
      title: "Declarative CSS Custom Properties",
      description: "Modern design token architecture powering instant zero-flash light and dark mode palette switches.",
      category: "UI / UX Design"
    },
    {
      title: "Zero-Vulnerability Formula Sanitization",
      description: "Defensive spreadsheet input sanitization mitigating CSV injection and malicious formula execution vectors.",
      category: "Web Security"
    }
  ];

  return (
    <div style={{ paddingTop: 'calc(76px + var(--space-2xl))', paddingBottom: 'var(--space-3xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation & Breadcrumb */}
        <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setActiveView('portfolio')}
            className="btn btn-outline"
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          <span className="badge badge-primary">
            React 18 SPA Architecture
          </span>
        </div>

        {/* SECTION 1: REACT CONTACT CARDS (Part 6) */}
        <section className="section" style={{ padding: '0 0 var(--space-3xl) 0' }}>
          <div className="section-header">
            <div className="section-badge">
              <Users size={14} />
              <span>Part 6: Interactive React SPA</span>
            </div>
            <h1 className="section-title">Contact Cards Manager</h1>
            <p className="section-subtitle">
              Dynamic contact card generation using React functional components, hooks, props drilling prevention, and array mapping.
            </p>
          </div>

          <div className="contact-manager-grid">
            {/* Form Column */}
            <div>
              <UserForm onAddContact={handleAddContact} />
            </div>

            {/* List Column */}
            <div>
              <UserList 
                contacts={contacts} 
                onDeleteContact={handleDeleteContact}
                onResetDefaults={handleResetDefaults}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: REACT MINI PROJECT - LIKE / UNLIKE CARD (Part 7) */}
        <section className="section" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-3xl)' }}>
          <div className="section-header">
            <div className="section-badge" style={{ backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' }}>
              <Heart size={14} fill="#ec4899" />
              <span>Part 7: React Mini Project</span>
            </div>
            <h2 className="section-title">Like / Unlike Card Showcase</h2>
            <p className="section-subtitle">
              Reusable card component demonstrating isolated useState() toggle state, prop inheritance, and dynamic button updates without DOM manipulation.
            </p>
          </div>

          <div className="cards-grid">
            {miniProjectCards.map((card, idx) => (
              <LikeCard
                key={idx}
                title={card.title}
                description={card.description}
                category={card.category}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
