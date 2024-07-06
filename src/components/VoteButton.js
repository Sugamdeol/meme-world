import React from 'react';
import { Button } from 'react-bootstrap';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function VoteButton({ memeId, voteType, onVote }) {
  const handleClick = () => {
    onVote(memeId, voteType);
  };

  return (
    <Button variant="outline-secondary" onClick={handleClick}>
      {voteType === 'up' ? <FaThumbsUp /> : <FaThumbsDown />}
    </Button>
  );
}

export default VoteButton;
