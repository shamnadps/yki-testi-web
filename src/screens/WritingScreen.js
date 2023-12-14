// WritingScreen.js

import React from 'react';
import './styles/WritingScreen.css'; // Import your CSS file for styling
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import speaking from '../data/speaking/speaking';
import essays from '../data/writing/Essays/essays';
import complaints from '../data/writing/complaints/complaints';
import letters from '../data/writing/letters/letters';
import opinions from '../data/writing/opinions/opinions';

const WritingScreen = () => {
    const navigate = useNavigate();

  const navigateToChooseWriting = (content) => {
    navigate('/choose-writing', { state: {content }});
  };


  return (
    <div className="writing-container">
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
        <div className='page-title'>Writing</div>
      </div>
      <div className="book-selector">
        <div className="chapter-tile" onClick={() => navigateToChooseWriting(complaints)}>
          <p className="chapterText">Complaints</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToChooseWriting(opinions)}>
          <p className="chapterText">Opinions</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToChooseWriting(letters)}>
          <p className="chapterText">Letters</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToChooseWriting(essays)}>
          <p className="chapterText">Essays</p>
        </div>
        <div className="chapter-tile" onClick={() => navigateToChooseWriting(speaking)}>
          <p className="chapterText">Speaking Content</p>
        </div>
      </div>
    </div>
  );
};

export default WritingScreen;

