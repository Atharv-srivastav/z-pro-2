import React from 'react';
import { 
  FileDown, 
  Send, 
  FolderGit2, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onNavigate }) {
  const { personal } = portfolioData;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="section" style={{ paddingTop: 'calc(76px + var(--space-3xl))', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="hero-grid">
          {/* Hero Content */}
          <div className="animate-fade-in">
            <div className="section-badge" style={{ marginBottom: 'var(--space-md)' }}>
              <Sparkles size={14} />
              <span>Available for New Projects & Roles</span>
            </div>

            <h1 style={{ marginBottom: 'var(--space-md)' }}>
              Hi, I'm <span className="text-gradient">{personal.fullName}</span>
            </h1>

            <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--color-primary)', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
              {personal.title}
            </h2>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '580px', marginBottom: 'var(--space-lg)', lineHeight: 1.7 }}>
              {personal.tagline} {personal.bio}
            </p>

            {/* Location & Contact Meta */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: 'var(--space-xl)', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} color="var(--color-primary)" />
                <span>{personal.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} color="var(--color-primary)" />
                <span>{personal.email}</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: 'var(--space-2xl)' }}>
              <button onClick={scrollToContact} className="btn btn-primary">
                <Send size={18} />
                Contact Me
              </button>

              <button onClick={scrollToProjects} className="btn btn-secondary">
                <FolderGit2 size={18} />
                Explore Projects
              </button>

              {/* Resume Download Feature */}
              <a 
                href={personal.resumeUrl} 
                download="Atharv_Srivastava_Resume.pdf"
                className="btn btn-outline"
                id="resume-download-btn"
                title="Download verified resume in PDF format"
              >
                <FileDown size={18} />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Connect:</span>
              <a 
                href={personal.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-icon"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a 
                href={personal.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={`mailto:${personal.email}`}
                className="btn-icon"
                aria-label="Send direct email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Hero Profile Image & Quick Stats Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div 
              style={{
                position: 'relative',
                width: 'min(100%, 360px)',
                aspectRatio: '1 / 1',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                background: 'var(--color-accent-gradient)',
                padding: '6px',
                boxShadow: 'var(--shadow-glow)',
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              <img 
                src={personal.profileImage} 
                alt={`${personal.fullName} - ${personal.title}`} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                  display: 'block'
                }}
              />
            </div>

            {/* Floating Stats Summary */}
            <div 
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                textAlign: 'center',
                padding: '1.25rem',
                marginTop: '-2rem',
                width: 'min(100%, 380px)',
                position: 'relative',
                zIndex: 2,
                backdropFilter: 'blur(8px)'
              }}
            >
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{personal.yearsExperience}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Years Exp.</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-primary)', borderRight: '1px solid var(--border-primary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{personal.projectsCompleted}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Projects</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)' }}>{personal.happyClients}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

