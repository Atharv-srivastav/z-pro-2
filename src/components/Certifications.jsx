import React from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Award size={14} />
            <span>Credentials</span>
          </div>
          <h2 className="section-title">Certifications & Accreditations</h2>
          <p className="section-subtitle">Industry recognized certifications validating technical proficiency.</p>
        </div>

        <div className="certifications-grid">
          {certifications.map(cert => (
            <article 
              key={cert.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                  <span className="badge badge-primary">
                    <ShieldCheck size={13} />
                    Verified
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Issued: {cert.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  {cert.title}
                </h3>

                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                  {cert.issuer}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-md)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ID: {cert.credentialId}
                </span>

                <a 
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span>Verify</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

