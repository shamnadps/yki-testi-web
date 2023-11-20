import React from 'react';
import './styles/SpeakingSelectionScreen.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { useTranslation } from 'react-i18next';
import speaking from '../data/speaking/speaking';
import conversations from '../data/conversations/conversations';


const SpeakingSelectionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToSpeakingScreen = (content) => {
    navigate('/speaking-screen', { speaking: content });
  };

  return (
    <div className="speaking-container">
      <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <div className="title-container">
        <img src={require('../assets/icons/logo_transparent.png')} alt="Logo" className="logo" />
      </div>
      <div className="book-selector">
        <div className="chapter-tile" onClick={() => navigateToSpeakingScreen(speaking)}>
          <p className="chapterText">Monologue</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToSpeakingScreen(conversations)}>
          <p className="chapterText">Conversations</p>
        </div>
      </div>
    </div>
  );
};

export default SpeakingSelectionScreen;

