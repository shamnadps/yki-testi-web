// AboutUs.js

import React from 'react';
import './styles/AboutUs.css'; // Import your CSS file for styling
import { Link, useLocation } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="top-menu">
        <Link to="/" >
          <img src={require('../assets/images/home.png')} alt="About Us" className="menu-image" />
        </Link>
        <Link to="/vocabularyList" className='dict-link' >
          <img src={require('../assets/images/dictionary-dark.png')} alt="Vocabulary List" className="dictionary-image" />
        </Link>
      </div>
      <h1 className="header">About Us</h1>
      <p className="description">
        Welcome to the YKI Test app! This app is designed to assist you in preparing for the Finnish language test (YKI test).
      </p>
      <p className="description">
        This app helps you to:
      </p>
      <ul className="bullet-list">
        <li>Learn Finnish through the use of flashcards.</li>
        <li>Practice and assess your vocabulary skills at your own pace.</li>
        <li>Enhance your writing skills through exercises and feedback.</li>
        <li>Listen to the correct pronunciation of Finnish words and sentences.</li>
        <li>Concentrate on understanding and improving your incorrect responses.</li>
      </ul>
      <p className="description">
        Our goal is to provide a user-friendly platform that adapts to your learning speed and offers valuable tools to enhance your Finnish language proficiency.
      </p>
      <p className="description">
        We are constantly trying to improve the app and provide the best experience for you. Please don't hesitate to leave constructive feedback, and we will strive to enhance the app based on your input.
      </p>
      <p className="description">
        Happy learning!
      </p>
    </div>
  );
};

export default AboutUs;
