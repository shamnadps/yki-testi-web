import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider'; // Import Slider from a React slider library
import 'rc-slider/assets/index.css'; // Import styles for the slider
import { Link, useNavigate } from 'react-router-dom'; 

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
      style={styles.categoryItem}
      onClick={() => toggleCategory(item.id)}
    >
      <span style={styles.categoryText}>{item.label}</span>
      <div style={styles.checkbox}>
        {selectedCategories.includes(item.id) ? <span>&#10003;</span> : null}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
        <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <div style={styles.setting}>
        <div style={styles.sliderContainer}>
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

      <div style={styles.setting}>
        <div style={styles.sliderContainer}>
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

      <div style={styles.setting}>
        <div style={styles.sliderContainer}>
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

      <div style={styles.setting}>
        <div style={styles.sliderContainer}>
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

      <div style={styles.categoryContainer}>
        {categories.map((item) => (
          <React.Fragment key={item.id}>{renderCategoryItem({ item })}</React.Fragment>
        ))}
      </div>

      <div style={styles.startButton} onClick={startQuiz}>
        <span style={styles.startButtonText}>Start</span>
      </div>
    </div>
  );
};

const styles = {
  adView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: 10,
    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)',
  },
  sliderContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    color:'black'
  },
  slider: {
    width: '100%',
    marginTop: 10,
  },
  categoryContainer: {
    marginBottom: 10,
    color:'black'
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: 5,
    border: '1px solid #ccc',
    color:'black'
  },
  categoryText: {
    fontSize: '16px',
    color:'black'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    border: '1px solid #007AFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#6495ED',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    cursor: 'pointer',
  },
  startButtonText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default PlaySettingScreen;
