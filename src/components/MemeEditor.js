import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import MemePreview from "./MemePreview";

function MemeEditor() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memeTemplate, setMemeTemplate] = useState("");
  const [memeTemplates, setMemeTemplates] = useState([]);
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [generatedMeme, setGeneratedMeme] = useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setMemeTemplates(data.data.memes))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      template_id: memeTemplate,
      text0: topText,
      text1: bottomText,
      font: "impact",
      max_font_size: fontSize,
      textcolor: fontColor.replace("#", ""),
      username: "your_username",
      password: "your_password",
    };

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        setGeneratedMeme(data.data.url);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h2>Create Your Meme</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="topText">
          <Form.Label>Top Text</Form.Label>
          <Form.Control
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="bottomText">
          <Form.Label>Bottom Text</Form.Label>
          <Form.Control
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fontSize">
          <Form.Label>Font Size</Form.Label>
          <Form.Control
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="fontColor">
          <Form.Label>Font Color</Form.Label>
          <Form.Control
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="memeTemplate">
          <Form.Label>Meme Template</Form.Label>
          <Row>
            {memeTemplates.map((template) => (
              <Col key={template.id} xs={6} md={4}>
                <div
                  className={`template-item ${
                    memeTemplate === template.id ? "selected" : ""
                  }`}
                  onClick={() => setMemeTemplate(template.id)}
                >
                  <img src={template.url} alt={template.name} />
                  <div className="template-name">{template.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Generate Meme
        </Button>
      </Form>

      <Row>
        <Col>
          <MemePreview
            template={memeTemplates.find((t) => t.id === memeTemplate)}
            topText={topText}
            bottomText={bottomText}
            fontSize={fontSize}
            fontColor={fontColor}
          />
        </Col>
      </Row>

      {generatedMeme && (
        <div>
          <h3>Your Meme:</h3>
          <img src={generatedMeme} alt="Generated Meme" />
        </div>
      )}
    </Container>
  );
}

export default MemeEditor;
