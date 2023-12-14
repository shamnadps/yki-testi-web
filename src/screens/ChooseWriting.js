import React, { useState, useEffect } from 'react';
import './styles/ChooseWriting.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

const ChooseWriting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content} = location.state || {};

  const showContent = (file, translationFile) => {
    navigate('/test-writing', { state: {
      content: file.content,
      name: file.name,
      translation: translationFile.content,
    }});
  };

  const getContentByLanguage = (language) => {
    const languageObject = content.find((speak) => speak.name === language);
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
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
      </div>
      <div className="titleContainer">
        <img
          src={require('../assets/icons/logo.png')}
          alt="Logo"
          className="logo"
        />
      </div>
      <div
        className="scrollcontainer"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 50%)', // Adjust as needed
        }}
      >
        {fi_speaking.map((file, index) => (
          <div
            key={index}
            className="chapterTile"
            onClick={() =>
              showContent(file, getFileAtIndex(user_language_speaking, index))
            }
          >
            <p className="chapterText">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseWriting;
