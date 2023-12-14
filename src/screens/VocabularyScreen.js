import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './styles/VocabularyScreen.css'; 

const VocabularyScreen = () => {
  const navigate = useNavigate();

  const learnVocabulary = () => {
    navigate('/book-screen');
  };

  const testVocabulary = () => {
    navigate('/test-setting-screen');
  };

  const playVocabulary = () => {
    navigate('/play-setting-screen');
  };

  const listVocabulary = () => {
    navigate('/vocabulary-list-screen');
  };

  const writeVocabulary = () => {
    navigate('/write-vocabulary-settings');
  };

  useEffect(() => {
    // Your ad-related code goes here
  }, []);

  return (
    <div className="container">
        <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <div className="title-container">
        <img src={require('../assets/icons/logo.png')} alt="Logo" className="logo" />
      </div>
      <div className="book-selector">
        <div className="chapter-tile" onClick={learnVocabulary}>
          <p className="chapterText">Opi sanastoa</p>
          <p className="chapterText">(Learn Vocabulary)</p>
        </div>
        <div className="chapter-tile" onClick={testVocabulary}>
          <p className="chapterText">Testi sanasto</p>
          <p className="chapterText">(Test Vocabulary)</p>
        </div>
        <div className="chapter-tile" onClick={playVocabulary}>
          <p className="chapterText">Kuuntele sanastoa</p>
          <p className="chapterText">(Listen Vocabulary)</p>
        </div>
        <div className="chapter-tile" onClick={writeVocabulary}>
          <p className="chapterText">Kirjoita sanastoa</p>
          <p className="chapterText">(Write Vocabulary)</p>
        </div>
      </div>
      
    </div>
  );
};

export default VocabularyScreen;

