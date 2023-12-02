import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider'; 
import 'rc-slider/assets/index.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import './styles/TestSettingScreen.css';

const categories = [
  { id: 'A1', label: 'Finnish A1', selected: true },
  { id: 'A2', label: 'Finnish A2', selected: true },
  { id: 'B1', label: 'Finnish B1', selected: true },
  { id: 'B2', label: 'Finnish B2', selected: true },
  { id: 'extras', label: 'Extra Vocabulary', selected: true },
  { id: 'failed', label: 'Failed', selected: true },
];

const TestSettingScreen = () => {
    const navigate = useNavigate();
  const [totalQuestions, setTotalQuestions] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((item) => item.id)
  );

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

    navigate('/vocabulary-test-screen',{ state:  { totalQuestions: totalQuestions, selectedCategories: selectedCategories }});
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
      <p className="title-container">Test Settings</p>
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

export default TestSettingScreen;
