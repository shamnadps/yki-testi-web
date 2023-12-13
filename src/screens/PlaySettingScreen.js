import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider'; // Import Slider from a React slider library
import 'rc-slider/assets/index.css'; // Import styles for the slider
import { Link, useNavigate } from 'react-router-dom'; 
import './styles/PlaySettingScreen.css';

const categories = [
  { id: 'A1', label: 'Finnish A1', selected: true },
  { id: 'A2', label: 'Finnish A2', selected: true },
  { id: 'B1', label: 'Finnish B1', selected: true },
  { id: 'B2', label: 'Finnish B2', selected: true },
  { id: 'extras', label: 'Extra Vocabulary', selected: true },
];

const PlaySettingScreen = () => {

  const navigate = useNavigate();
  const [speechRate, setSpeechRate] = useState(0.5);
  const [disableSpeech, setDisableSpeech] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((item) => item.id)
  );
  const [nextQuestionDelay, setNextQuestionDelay] = useState(5);
  const [answerDelay, setAnswerDelay] = useState(3);

  useEffect(() => {
    // If you have any side effects on mount, you can place them here
  }, []);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.length === 1 && selectedCategories.includes(categoryId)) {
      return;
    }

    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  const startQuiz = () => {
    navigate('/play-vocabulary-screen', { state: { speechRate,
        disableSpeech,
        totalQuestions,
        selectedCategories,
        nextQuestionDelay: nextQuestionDelay * 1000, 
        answerDelay: answerDelay * 1000, 
    }});
};

const renderCategoryItem = ({ item }) => (
    <div
      className="categoryItem"
      onClick={() => toggleCategory(item.id)}
    >
      <div className="categoryContent">
        <span className="categoryText">{item.label}</span>
        <div className="checkbox">
          {selectedCategories.includes(item.id) ? <span>&#10003;</span> : null}
        </div>
      </div>
    </div>
  );

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
      <p className="title-container">Play Vocabulary Settings</p>
      <div className="setting">
        <div className="sliderContainer">
          <span>Total Questions: {totalQuestions.toFixed(0)}</span>
          <Slider
            value={totalQuestions}
            onChange={(value) => setTotalQuestions(value)}
            min={1}
            max={500}
            step={1}
          />
        </div>
      </div>

      <div className="setting">
        <div className="sliderContainer">
          <span>Next Question Delay (seconds): {nextQuestionDelay}</span>
          <Slider
            value={nextQuestionDelay}
            onChange={(value) => setNextQuestionDelay(value)}
            min={1}
            max={30}
            step={1}
          />
        </div>
      </div>

      <div className="setting">
        <div className="sliderContainer">
          <span>Answer Delay (seconds): {answerDelay}</span>
          <Slider
            value={answerDelay}
            onChange={(value) => setAnswerDelay(value)}
            min={1}
            max={30}
            step={1}
          />
        </div>
      </div>

      <div className="setting">
        <div className="sliderContainer">
          <span>Speech Rate: {speechRate.toFixed(1)}</span>
          <Slider
            value={speechRate}
            onChange={(value) => setSpeechRate(value)}
            min={0.1}
            max={2.0}
            step={0.1}
          />
        </div>
      </div>

      <div className="categoryContainer">
        {categories.map((item) => (
          <React.Fragment key={item.id}>{renderCategoryItem({ item })}</React.Fragment>
        ))}
      </div>

      <div className="startButton" onClick={startQuiz}>
        <span className="startButtonText">Start</span>
      </div>
    </div>
  );
};

export default PlaySettingScreen;
