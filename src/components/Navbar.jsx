import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Code2, 
  FileDown, 
  Users, 
  ShieldCheck, 
  Home,
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  FolderGit2,
  Award,
  Mail
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Navbar({ activeView, setActiveView }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll offset for navbar shadow and active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (activeView !== 'portfolio') return;

      const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (activeView !== 'portfolio') {
      setActiveView('portfolio');
      // Timeout ensures view renders before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border-primary)' : 'transparent'}`,
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Name & Title */}
        <button
          onClick={() => { setActiveView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
          aria-label="Atharv Srivastava Portfolio"
        >
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}>
              Atharv Srivastava
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Full-Stack Developer
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeView === 'portfolio' && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--color-primary-light)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={15} />
                {link.label}
              </button>
            );
          })}

          <div style={{ width: '1px', height: '24px', background: 'var(--border-primary)', margin: '0 0.4rem' }} />

          {/* SPA Switchers */}
          <button
            onClick={() => { setActiveView('contact-manager'); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.8rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeView === 'contact-manager' ? '#ffffff' : 'var(--text-primary)',
              background: activeView === 'contact-manager' ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            title="React Contact Cards Manager & Like Card Showcase"
          >
            <Users size={15} />
            React Cards SPA
          </button>

          <button
            onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.8rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: activeView === 'admin' ? '#ffffff' : 'var(--text-primary)',
              background: activeView === 'admin' ? 'var(--color-primary)' : 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            title="Admin Login & Google Sheets Response Manager"
          >
            <ShieldCheck size={15} />
            Admin
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            style={{ marginLeft: '0.35rem' }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
          >
            {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>
        </nav>

        {/* Mobile Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleTheme}
            className="btn-icon mobile-menu-btn"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-primary)',
            padding: 'var(--space-md) var(--space-lg)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}
        >
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeView === 'portfolio' && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--text-primary)',
                  background: isActive ? 'var(--color-primary-light)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} />
                {link.label}
              </button>
            );
          })}

          <div style={{ height: '1px', background: 'var(--border-primary)', margin: '0.5rem 0' }} />

          <button
            onClick={() => { setActiveView('contact-manager'); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: activeView === 'contact-manager' ? 'var(--color-secondary)' : 'var(--text-primary)',
              background: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            <Users size={18} />
            React Contact Cards SPA & Mini Project
          </button>

          <button
            onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: activeView === 'admin' ? 'var(--color-primary)' : 'var(--text-primary)',
              background: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={18} />
            Admin Response Dashboard
          </button>
        </div>
      )}
    </header>
  );
}

