import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ShareButton from './ShareButton';
import VoteButton from './VoteButton';
import firebase from './firebase';

function MemeGallery() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const memesRef = firebase.database().ref('memes');
    memesRef.on('value', (snapshot) => {
      const memesData = snapshot.val();
      const memesList = Object.entries(memesData || {}).map(([id, meme]) => ({
        id,
        ...meme,
      }));
      memesList.sort((a, b) => (b.upvotes || 0) - (b.downvotes || 0) - ((a.upvotes || 0) - (a.downvotes || 0)));
      setMemes(memesList);
    });

    return () => {
      memesRef.off();
    };
  }, []);

  const handleVote = (memeId, voteType) => {
    const memeRef = firebase.database().ref(`memes/${memeId}`);
    memeRef.transaction((meme) => {
      if (meme) {
        if (voteType === 'up') {
          meme.upvotes = (meme.upvotes || 0) + 1;
        } else if (voteType === 'down') {
          meme.downvotes = (meme.downvotes || 0) + 1;
        }
      }
      return meme;
    });
  };

  return (
    <Container>
      <h2>Trending Memes</h2>
      <Row>
        {memes.map((meme) => (
          <Col key={meme.id} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img variant="top" src={meme.url} />
              <Card.Body>
                <Card.Title>{meme.name}</Card.Title>
                <ShareButton platform="twitter" url={meme.url} text={meme.name} />
                <ShareButton platform="facebook" url={meme.url} />
                <ShareButton platform="instagram" url={meme.url} />
                <div>
                  <VoteButton memeId={meme.id} voteType="up" onVote={handleVote} />
                  <VoteButton memeId={meme.id} voteType="down" onVote={handleVote} />
                </div>
                <div>
                  Upvotes: {meme.upvotes || 0} | Downvotes: {meme.downvotes || 0}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MemeGallery;
