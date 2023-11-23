import React, { useEffect, useState } from 'react';
import './MatchAnimation.css'; 

const MatchAnimation = ({  user }) => {
  const [showMatch, setShowMatch] = useState(true);

  useEffect(() => {

      // Reset the animation after a certain delay (e.g., 3 seconds)
      const timeout = setTimeout(() => {
        setShowMatch(false);
        user()
      }, 3000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);

  }, []);

  return (
    <>
    {showMatch && <div className={`match-animation ${showMatch ? 'visible' : ''}`}>
      <div className="match-container">
        <div className="heart-icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="heart-icon heart-icon-left"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l2 2m0 0l2-2m-2 2V21H6V7m0 0v14h12V7"
            />
          </svg>
          <span className="match-text">It's a Match!</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="heart-icon heart-icon-right"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-2 2m0 0l-2-2m2 2V5h12v16m0 0V5h-4"
            />
          </svg>
        </div>
        <p className="match-message">Congrats!! You've found a match.</p>
      </div>
    </div>}
    </>
  );
};

export default MatchAnimation;
