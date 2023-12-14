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
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <div className="title-container">
        <img src={require('../assets/icons/logo.png')} alt="Logo" className="logo" />
        <div className='page-title'>Welcome to the YKI Test app! <br/>This app is designed to assist you prepare for the Finnish language test (YKI test).</div>
      </div>
      
      <div className="book-selector">
        <div className="chapter-tile" onClick={vocabulary}>
          <p className="chapterText">Sanastoa</p>
          <p className="chapterText">(Vocabulary)</p>
        </div>
        <div className="chapter-tile" onClick={writing}>
          <p className="chapterText">Kirjoittaminen</p>
          <p className="cchapterText">(Writing)</p>
        </div>
        <div className="chapter-tile" onClick={speaking}>
          <p className="chapterText">Puhuminen</p>
          <p className="chapterText">(Speaking)</p>
        </div>
      </div>
      <div className="app-links">
        <div className="app-links-row1">Download the app for a better user experience!.</div>
        <div className="app-links-row2">
        <a href="https://apps.apple.com/fi/app/yki-test/id6468961028" target="_blank">
          <img src={require('../assets/images/app-logo-store.png')} alt="Download on the App Store" className="store-badge" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.YKITest&pcampaignid=web_share" target="_blank">
          <img src={require('../assets/images/android-logo.png')} alt="Get it on Google Play" className="store-badge" />
        </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;