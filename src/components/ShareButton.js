import React from 'react';
import { Button } from 'react-bootstrap';

function ShareButton({ platform, url, text }) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(url)}`,
  };

  return (
    <Button variant="outline-primary" href={shareUrls[platform]} target="_blank" rel="noopener noreferrer">
      Share on {platform}
    </Button>
  );
}

export default ShareButton;
