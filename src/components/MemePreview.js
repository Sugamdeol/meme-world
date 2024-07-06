import React from "react";

function MemePreview({ template, topText, bottomText, fontSize, fontColor }) {
  return (
    <div className="meme-preview">
      {template && <img src={template.url} alt={template.name} />}
      <div
        className="top-text"
        style={{ fontSize: `${fontSize}px`, color: fontColor }}
      >
        {topText}
      </div>
      <div
        className="bottom-text"
        style={{ fontSize: `${fontSize}px`, color: fontColor }}
      >
        {bottomText}
      </div>
    </div>
  );
}

export default MemePreview;
