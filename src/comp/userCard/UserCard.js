import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar , faThumbsUp , faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import TinderCard from 'react-tinder-card';
import SuperLike from '../superLike/SuperLike';
import MatchAnimation from '../matchAnimation/MatchAnimation';
import users from '../../user';
import { useSwipeable } from 'react-swipeable';
const UserCard = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [rightSwipeOccurred, setRightSwipeOccurred] = useState(false);
  const [superLikeOccurred, setSuperLikeOccurred] = useState(false);
  const cardRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipeLeft(),
    onSwipedRight: () => handleSwipeRight(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipeLeft = () => {
    setRightSwipeOccurred(false);
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeRight = () => {
    setRightSwipeOccurred(true);
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };

  const handleSuperLike = () => {
    setSuperLikeOccurred(true);
    setTimeout(() => {
      setSuperLikeOccurred(false);
      handleSwipeRight();
    }, 2000);
  };

  const onSwipe = (direction) => {
    if (direction === 'right') {
      handleSwipeRight();
    } else if (direction === 'left') {
      handleSwipeLeft();
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  const renderUserCard = () => {
    if (currentUserIndex >= users.length) {
      return <div>No more users</div>;
    }

    const currentUser = users[currentUserIndex];

    return (
      <div className='tinderCard_container' {...handlers}>
        <TinderCard
          className="swipe"
          key={currentUser.id}
          onSwipe={onSwipe}
          ref={cardRef}
          preventSwipe={['up', 'down']}
        >
          <div className="card">
            <img src={currentUser.image} alt={currentUser.name} className="card-image w-full h-full" />
            {!currentUser.checkMatch || !rightSwipeOccurred ? (
              <div className="card-info py-10 sm:py-0 md:py-9 lg:py-2 border">
                <h2>{currentUser.name}</h2>
                <p>{currentUser.bio}</p>
                <p>{`${currentUser.age} | ${currentUser.gender} | ${currentUser.location}`}</p>
              </div>
            ) : null}
            {rightSwipeOccurred && currentUser.checkMatch && <MatchAnimation user={handleSwipeRight} />}
            {superLikeOccurred && <SuperLike user={handleSuperLike} />}
          </div>
        </TinderCard>
      </div>
    );
  };

  // Conditionally render the buttons only when there are more users
  const renderButtons = () => {
    if (currentUserIndex >= users.length) {
      return null; // No more users, so don't render the buttons
    }

    return (
      <div className="card-buttons">
        <button onClick={handleSwipeLeft}><FontAwesomeIcon icon={faThumbsDown} style={{ fontSize: '28px' }} /></button>
        <button onClick={handleSuperLike}><FontAwesomeIcon icon={faStar} style={{ fontSize: '28px' }} /></button>
        <button onClick={handleSwipeRight}><FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: '28px' }} /></button>
      </div>
    );
  };

  return (
    <div>
      {renderUserCard()}
      {renderButtons()}
    </div>
  );
};

export default UserCard;