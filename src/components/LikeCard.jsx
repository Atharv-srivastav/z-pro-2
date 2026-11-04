import React, { useState } from 'react';
import { Heart, Tag, Sparkles } from 'lucide-react';

/**
 * REUSABLE LIKE / UNLIKE CARD COMPONENT (Part 7 Requirement)
 * Receives title, description, category, and initial tag via props.
 * Manages its own internal liked state using useState().
 */
export default function LikeCard({ 
  title, 
  description = "A modular React component showcasing isolated state hooks and dynamic button rendering.", 
  category = "Technology" 
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleToggleLike = () => {
    setIsLiked(prev => {
      const nextState = !prev;
      setLikeCount(c => (nextState ? c + 1 : Math.max(0, c - 1)));
      return nextState;
    });
  };

  return (
    <div 
      className="card animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        borderTop: isLiked ? '3px solid var(--color-danger)' : '1px solid var(--border-primary)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div>
        {/* Category Badge & Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
          <span className="badge badge-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Tag size={12} />
            {category}
          </span>

          <span 
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: isLiked ? 'var(--color-danger)' : 'var(--text-muted)'
            }}
          >
            <span 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isLiked ? 'var(--color-danger)' : 'var(--border-secondary)'
              }} 
            />
            {isLiked ? 'Liked' : 'Not Liked'}
          </span>
        </div>

        {/* Card Title (Passed via Props) */}
        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {title}
        </h4>

        {/* Card Description */}
        <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>

      {/* Card Action: Like / Unlike Button */}
      <div 
        style={{
          borderTop: '1px solid var(--border-primary)',
          paddingTop: 'var(--space-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {likeCount} {likeCount === 1 ? 'favorite' : 'favorites'}
        </span>

        <button
          onClick={handleToggleLike}
          className={`btn ${isLiked ? 'btn-danger' : 'btn-outline'}`}
          style={{
            fontSize: '0.875rem',
            padding: '0.45rem 1rem',
            gap: '0.4rem',
            transition: 'all var(--transition-fast)'
          }}
          aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
        >
          <Heart 
            size={16} 
            fill={isLiked ? '#ffffff' : 'none'} 
            color={isLiked ? '#ffffff' : 'currentColor'} 
          />
          <span>{isLiked ? 'Unlike' : 'Like'}</span>
        </button>
      </div>
    </div>
  );
}
