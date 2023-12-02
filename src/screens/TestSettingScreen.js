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
    console.log("selectedcategories")
    console.log(selectedCategories)
    navigate('/vocabulary-test-screen',{ state:  { totalQuestions: totalQuestions, selectedCategories: selectedCategories }});
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
    width: '100%',
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    color:'black'
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

export default TestSettingScreen;
