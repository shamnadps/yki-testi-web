import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './styles/WriteVocabularySettings.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

const categories = [
  { id: 'A1', label: 'Finnish A1', selected: true },
  { id: 'A2', label: 'Finnish A2', selected: true },
  { id: 'B1', label: 'Finnish B1', selected: true },
  { id: 'B2', label: 'Finnish B2', selected: true },
  { id: 'extras', label: 'Extra Vocabulary', selected: true },
  { id: 'failed', label: 'Failed', selected: true },
];

const WriteVocabularySettings = () => {
  const navigate = useNavigate();

  const [totalQuestions, setTotalQuestions] = useState(25);
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((item) => item.id)
  );

  const toggleCategory = (categoryId) => {
    if (
      selectedCategories.length === 1 &&
      selectedCategories.includes(categoryId)
    ) {
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
    navigate('/write-vocabulary',{ state:  { totalQuestions: totalQuestions, selectedCategories: selectedCategories }});
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
        <Link to="/" >
          <img src={require('../assets/images/home.png')} alt="About Us" className="menu-image" />
        </Link>
        <Link to="/vocabularyList"  className='dict-link'>
          <img src={require('../assets/images/dictionary-dark.png')} alt="Vocabulary List" className="dictionary-image" />
        </Link>
      </div>
      <p className="title-container">Write Vocabulary Settings</p>
      

      <div className="categoryContainer">
      <div className="setting">
        <div className="sliderContainer">
          <span>Total Questions: {totalQuestions.toFixed(0)}</span>
          <Slider
            className="slider"
            value={totalQuestions}
            onChange={(value) => setTotalQuestions(value)}
            min={1}
            max={500}
            step={1}
          />
        </div>
      </div>
        {categories.map((item) => (
          <div key={item.id}>{renderCategoryItem({ item })}</div>
        ))}
        <div className="startButton" onClick={startQuiz}>
        <span className="startButtonText">Start</span>
      </div>
      </div>

      

    </div>
  );
};

export default WriteVocabularySettings;
