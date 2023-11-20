import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import './styles/FlashCard.css';

const Flashcard = () => {
  const location = useLocation();

  const { subsetflashcards, selectedChapter, vocabIndex } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentFlashcard = subsetflashcards[currentIndex];
  const flipCardRef = useRef(null);

  const showNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % subsetflashcards.length);
  };

  const showPreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? subsetflashcards.length - 1 : prevIndex - 1
    );
  };

  const handleFlip = () => {
    console.log("flipped", isFlipped)
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
        <div className="top-menu">
        <Link to="/vocabulary" className="menu-link">
          Back
        </Link>
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <div className="title-div">
        <div className="title-container">
          <img src={require('../assets/icons/logo_transparent.png')} className="logo" alt="logo" />
        </div>
        <p className="title-container">Vocabulary Section {vocabIndex}</p>
        <p className="title-container">
          {currentIndex + 1}/{subsetflashcards.length}
        </p>
      </div>
      <div className="contentContainer">
        <ReactCardFlip
          type="vertical"
          isFlipped={isFlipped}
        >
          {/* Front side */}
          <div className="flashcardContainer flashcardFront" onClick={handleFlip}>
            <p className="flashcardText">{currentFlashcard.question}</p>
          </div>
          {/* Back side */}
          <div className="flashcardContainer flashcardBack" onClick={handleFlip}>
            <p className="flashcardAnswer">{currentFlashcard.answer}</p>
          </div>
        </ReactCardFlip>
        <div className="buttonContainer">
          <button onClick={showPreviousCard} className="button backButton">
            <img src={require('../assets/images/back.png')} className="icon" alt="back" />
          </button>
          <button
            onClick={() => {
              const textToRead = currentFlashcard.question;
            }}
            className="button speakButton"
          >
            <img src={require('../assets/images/voice.png')} className="icon" alt="voice" />
          </button>
          <button onClick={showNextCard} className="button nextButton">
            <img src={require('../assets/images/next.png')} className="icon" alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;