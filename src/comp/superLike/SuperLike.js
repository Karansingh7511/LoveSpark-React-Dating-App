// src/components/SuperLike.js
import React, { useEffect, useState } from 'react';
import './SuperLike.css'; // Import additional styles

const SuperLike = ({ onSuperLikeAnimationEnd, onSwipeRight }) => {
  const [showSuperLike, setShowSuperLike] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuperLike(false);
      onSuperLikeAnimationEnd();
      onSwipeRight(); // Automatically swipe right to the next user after the animation
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onSuperLikeAnimationEnd, onSwipeRight]);

  return (
    <>
      {showSuperLike && (
        <div className={`super-like-animation ${showSuperLike ? 'visible' : ''}`}>
          <div className="super-like-container">
            <div className="star-icons">
              {/* Add your custom star SVG or image here for a super like effect */}
              <span className="super-like-text">Super Like!</span>
            </div>
            <p className="super-like-message">You've sent a Super Like. Prepare for something special!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperLike;
