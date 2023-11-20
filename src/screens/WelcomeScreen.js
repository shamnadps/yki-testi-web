import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import VocabularyListScreen from './VocabularyListScreen';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  const vocabulary = () => {
    // Navigate to the VocabularyScreen route
    navigate('/vocabulary');
  };

  const writing = () => {
    // Navigate to the WritingScreen route
    navigate('/writing');
  };

  const speaking = () => {
    // Navigate to the SpeakingSelectionScreen route
    navigate('/speaking');
  };

  const showAboutUs = () => {
    // Navigate to the AboutUs route
    navigate('/aboutus');
  };

  return (
    <div className="container">
      <div className="title-container">
        <img src={require('../assets/icons/logo_transparent.png')} alt="Logo" className="logo" />
      </div>
      <div className="book-selector">
        <div className="chapter-tile" onClick={vocabulary}>
          <p className="chapter-text">Sanastoa</p>
          <p className="chapter-text">(Vocabulary)</p>
        </div>
        <div className="chapter-tile" onClick={writing}>
          <p className="chapter-text">Kirjoittaminen</p>
          <p className="chapter-text">(Writing)</p>
        </div>
        <div className="chapter-tile" onClick={speaking}>
          <p className="chapter-text">Puhuminen</p>
          <p className="chapter-text">(Speaking)</p>
        </div>
      </div>
      <div className="menu-buttons">
        <button className="menu-button" onClick={showAboutUs}>
          About Us
        </button>
        <button className="overview-button" onClick={handleToggleOverview}>
          Overview
        </button>
      </div>
      {showOverview && (
        <div className="modal-container">
          <button className="modal-close-button" onClick={handleToggleOverview}>
            Close
          </button>
          <div className="modal-content">
            <VocabularyListScreen />
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;