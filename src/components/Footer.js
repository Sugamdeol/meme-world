import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Meme World. All rights reserved.
            </p>
            <p>
              <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
