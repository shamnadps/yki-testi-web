import React from 'react';
import './styles/SpeakingSelectionScreen.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import speaking from '../data/speaking/speaking';
import conversations from '../data/conversations/conversations';


const SpeakingSelectionScreen = () => {
  const navigate = useNavigate();

  const navigateToSpeakingScreen = (content, title) => {
    navigate('/speaking-screen', {state:{ speaking: content, title: title }});
  };

  return (
    <div className="speaking-container">
      <div className="top-menu">
        <Link to="/" >
          <img src={require('../assets/images/home.png')} alt="About Us" className="menu-image" />
        </Link>
        <Link to="/vocabularyList" >
          <img src={require('../assets/images/dictionary-dark.png')} alt="Vocabulary List" className="dictionary-image" />
        </Link>
      </div>
      <div className="title-container">
        <img src={require('../assets/icons/logo.png')} alt="Logo" className="logo" />
        <div className='page-title'>Speaking</div>
      </div>
      <div className="book-selector">
        <div className="chapter-tile" onClick={() => navigateToSpeakingScreen(speaking, 'Monologue')}>
          <p className="chapterText">Monologue</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToSpeakingScreen(conversations, 'Conversations')}>
          <p className="chapterText">Conversations</p>
        </div>
      </div>
    </div>
  );
};

export default SpeakingSelectionScreen;

