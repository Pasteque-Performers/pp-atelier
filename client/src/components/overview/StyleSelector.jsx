import React, { useState } from 'react';
// import './StyleSelector.css';

const StyleSelector = ({ styles }) => {
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);

  const handleClick = (style) => {
    setSelectedStyle(style);
  };

  const renderStyles = () => {
    return styles.map((style, index) => {
      const isSelected = style === selectedStyle;
      const checkmarkClass = isSelected ? 'checkmark visible' : 'checkmark';

      return (
        <div
          key={index}
          className="thumbnail-container"
          onClick={() => handleClick(style)}
        >
          <img className="style-thumbnail" src={style.image} alt={style.name} />
          <div className={checkmarkClass}>&#10003;</div>
        </div>
      );
    });
  };

  return (
    <div className="style-selector">
      <h3 className="selected-style-title">{selectedStyle.name}</h3>
      <div className="style-thumbnails">{renderStyles()}</div>
    </div>
  );
};

export default StyleSelector;
