import React from 'react';
import { Code2, Github, Linkedin, Mail, Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ setActiveView }) {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-primary)',
        padding: 'var(--space-2xl) 0 var(--space-xl) 0'
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: 'var(--space-md)' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Code2 size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                {personal.fullName}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Full-Stack Developer & Software Architect crafting modern web applications and resilient cloud backends.
            </p>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li>
                <button 
                  onClick={() => { setActiveView('portfolio'); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  About Me
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('portfolio'); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Technical Skills
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('portfolio'); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Projects & Applications
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('portfolio'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                >
                  Contact Form
                </button>
              </li>
            </ul>
          </div>

          {/* Applications & Portals Col */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              Integrated SPAs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => { setActiveView('contact-manager'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', justifyContent: 'flex-start', padding: '0.5rem 0.75rem' }}
              >
                React Contact Cards & Mini Project
              </button>

              <button
                onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', justifyContent: 'flex-start', padding: '0.5rem 0.75rem' }}
              >
                <ShieldCheck size={15} color="var(--color-primary)" />
                Admin Response Dashboard
              </button>
            </div>
          </div>

          {/* Socials & Top Scroll Col */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              Connect & Legal
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: 'var(--space-lg)' }}>
              <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${personal.email}`} className="btn-icon" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>

            <button 
              onClick={scrollToTop}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
            >
              <ArrowUp size={15} />
              Back to Top
            </button>
          </div>
        </div>

        <div 
          style={{
            borderTop: '1px solid var(--border-primary)',
            paddingTop: 'var(--space-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {personal.fullName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>Crafted with</span>
            <Heart size={14} color="#ef4444" fill="#ef4444" />
            <span>using React, Vite & Google Sheets API</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

