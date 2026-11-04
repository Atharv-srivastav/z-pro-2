import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career History</span>
          </div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">Track record of building production software and leading technical initiatives.</p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {experience.map((exp, index) => (
            <article 
              key={exp.id} 
              className="card"
              style={{
                position: 'relative',
                paddingLeft: 'var(--space-2xl)'
              }}
            >
              {/* Timeline Indicator */}
              <div 
                style={{
                  position: 'absolute',
                  top: 'var(--space-xl)',
                  left: 'var(--space-md)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: index === 0 ? 'var(--color-primary)' : 'var(--border-secondary)',
                  border: '3px solid var(--bg-card)',
                  boxShadow: index === 0 ? '0 0 0 3px var(--color-primary-light)' : 'none'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
                  {exp.role}
                </h3>
                <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={13} />
                  {exp.period}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{exp.company}</span>
                <span style={{ color: 'var(--border-secondary)' }}>•</span>
                <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} />
                  {exp.location}
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-md) 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    <ChevronRight size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="badge badge-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
