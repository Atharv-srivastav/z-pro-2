import React from 'react';
import { User, CheckCircle2, FileDown, Terminal, Layers, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, about } = portfolioData;

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">Professional Background & Vision</h2>
          <p className="section-subtitle">A glimpse into my engineering mindset and development philosophies.</p>
        </div>

        <div className="about-grid">
          {/* Biography & Principles */}
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-md)', color: 'var(--text-primary)' }}>
              {about.heading}
            </h3>

            {about.paragraphs.map((para, idx) => (
              <p key={idx} style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                {para}
              </p>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              {about.highlights.map((item, idx) => (
                <div key={idx} className="card" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <a 
              href={personal.resumeUrl} 
              download="Atharv_Srivastava_Resume.pdf"
              className="btn btn-primary"
              style={{ display: 'inline-flex' }}
            >
              <FileDown size={18} />
              Download Full Resume (PDF)
            </a>
          </div>

          {/* Core Architectural Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <Terminal size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.35rem' }}>Clean Code & Modularity</h4>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  Writing decoupled, self-documenting code with reusable patterns, atomic design components, and comprehensive test suites.
                </p>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'rgba(139, 92, 246, 0.12)', color: 'var(--color-secondary)' }}>
                <Layers size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.35rem' }}>Scalable Full-Stack Architecture</h4>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  Designing resilient systems spanning modern frontend frameworks, cloud serverless microservices, and high-throughput data stores.
                </p>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ marginBottom: '0.35rem' }}>Security & Injection Defense</h4>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  Enforcing strict server-side validation, formula sanitization, robust CORS rules, and secure session token handling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

