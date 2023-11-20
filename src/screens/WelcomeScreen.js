import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import VocabularyListScreen from './VocabularyListScreen';
import './styles/WelcomeScreen.css';

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
      <div className="top-menu">
        <Link to="/aboutus" className="menu-link">
          About Us
        </Link>
        <Link to="/privacy-policy" className="menu-link">
          Privacy Policy
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
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