import React from 'react';
import { 
  Wrench, 
  Layout, 
  Server, 
  Terminal, 
  BookOpen, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  const categoryIcons = {
    'Programming Languages': Terminal,
    'Front-End Development': Layout,
    'Backend, Databases & APIs': Server,
    'Developer Tools & Testing': Wrench,
    'Computer Science Core': BookOpen,
    'AI & Agentic Tools': Sparkles
  };

  return (
    <section id="skills" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <Wrench size={14} />
            <span>Technical Expertise</span>
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">Proficiencies across full-stack engineering, CS core disciplines, and AI tooling.</p>
        </div>

        <div className="skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {skills.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Wrench;
            return (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-lg)' }}>
                  <div 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{cat.category}</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto' }}>
                  {cat.items.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      style={{
                        padding: '0.45rem 0.85rem',
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        border: '1px solid var(--border-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <Check size={13} color="var(--color-primary)" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
