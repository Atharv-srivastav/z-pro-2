import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <GraduationCap size={14} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">Formal foundation in Computer Science and software engineering principles.</p>
        </div>

        <div className="education-grid">
          {education.map(edu => (
            <article key={edu.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'var(--color-accent-gradient)'
                }} 
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--space-sm)' }}>
                <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={13} />
                  {edu.period}
                </span>
                <span className="badge" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                  <Award size={13} />
                  {edu.grade}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                {edu.degree}
              </h3>

              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 'var(--space-md)' }}>
                {edu.institution}
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                {edu.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

