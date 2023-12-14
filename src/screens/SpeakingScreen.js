import React, { useState, useEffect } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom'; 
import './styles/SpeakingScreen.css'; 

const SpeakingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { speaking, title } = location.state || {};



  const showContent = (file, translationFile) => {
    navigate('/content-screen',{state: { content: file.content, name: file.name, translation: translationFile.content }});
  };

  const getContentByLanguage = (language) => {
    const languageObject = speaking.find((speak) => speak.name === language);
    return languageObject ? languageObject.content : null;
  };

  const getFileAtIndex = (speakingArray, index) => {
    return speakingArray[index];
  };

  const fi_speaking = getContentByLanguage('fi');
  const user_language_speaking = getContentByLanguage('en');

  return (
    <div className="container">
      <div className="top-menu">
        <Link to="/" >
          <img src={require('../assets/images/home.png')} alt="About Us" className="menu-image" />
        </Link>
        <Link to="/vocabularyList" >
          <img src={require('../assets/images/dictionary-dark.png')} alt="Vocabulary List" className="dictionary-image" />
        </Link>
      </div>
      <div className="title-container">
        <img src={require('../assets/icons/logo.png')} className="logo" />
        <div className='page-title'>{title}</div>
      </div>
      <div className="scrollcontainer">
        {fi_speaking.map((file, index) => (
          <div
            key={index}
            className="chapterTile"
            onClick={() => showContent(file, getFileAtIndex(user_language_speaking, index))}
          >
            <span className="chapterText">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakingScreen;
