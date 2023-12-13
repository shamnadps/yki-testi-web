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

  const speakNow = (textToRead) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "fi-FI";
    synth.speak(utterance);
  };

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
            <img src={require('../assets/images/back-dark.png')} className="voiceIcon" alt="back" />
          </button>
          <button
            onClick={() => {
              const textToRead = currentFlashcard.question;
              speakNow(textToRead)
            }}
            className="button speakButton"
          >
            <img src={require('../assets/images/voice-dark.png')} className="voiceIcon" alt="voice" />
          </button>
          <button onClick={showNextCard} className="button backButton">
            <img src={require('../assets/images/next-dark.png')} className="voiceIcon" alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
