import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function MemeGallery() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes))
      .catch((error) => console.log(error));
  }, []);

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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MemeGallery;
