import React from 'react';
import { FolderGit2, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects({ setActiveView }) {
  const { projects } = portfolioData;

  const handleDemoClick = (e, demoUrl) => {
    if (demoUrl === '#contact-manager-preview') {
      e.preventDefault();
      setActiveView('contact-manager');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (demoUrl === '#admin-preview') {
      e.preventDefault();
      setActiveView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FolderGit2 size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">Projects & Applications</h2>
          <p className="section-subtitle">A showcase of full-stack systems, interactive SPAs, and cloud integrations.</p>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <article 
              key={project.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden'
              }}
            >
              {/* Project Thumbnail */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-normal)'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Project Body */}
              <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', flex: 1 }}>
                  {project.tagline}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: 'var(--space-lg)' }}>
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="badge badge-secondary">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-md)' }}>
                  <a 
                    href={project.demoUrl} 
                    onClick={(e) => handleDemoClick(e, project.demoUrl)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'var(--color-primary)'
                    }}
                  >
                    <span>Launch App</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-icon"
                    aria-label={`View ${project.title} source code on GitHub`}
                    title="View Source on GitHub"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
