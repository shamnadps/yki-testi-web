import React from 'react';
import { Link,useNavigate, useParams, useLocation } from 'react-router-dom'; 
import './styles/VocabScreenStyles.css';


const VocabScreen = () => {
const location = useLocation();
const { chapterNumber, selectedChapter } = location.state || {};
  const navigation = useNavigate();
  const flashcards = selectedChapter.vocabulary;
  const numberOfCardsPerTab = 40;
  const numVocabSelectors = Math.ceil(flashcards.length / numberOfCardsPerTab);

  const handleChapterPress = (vocabIndex) => {
    const startIdx = (vocabIndex - 1) * numberOfCardsPerTab;
    const endIdx = vocabIndex * numberOfCardsPerTab;
    const subsetflashcards = flashcards.slice(startIdx, endIdx);
    navigation('/flash-card', { state: { vocabIndex, subsetflashcards, selectedChapter }});
  };

  const renderVocabSelectors = () => {
    const selectors = [];
    for (let i = 1; i <= numVocabSelectors; i++) {
      selectors.push(
        <div
        className="chapter-tile"
          key={i}
          onClick={() => handleChapterPress(i)}
        >
          <p className="chapterText">{`Sanastoa (Vocabulary) ${i}`}</p>
        </div>
      );
    }
    return selectors;
  };

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
      <div className="title-container">
        <img src={require('../assets/icons/logo.png')} className="logo" alt="logo" />
        <div className='page-title'>{selectedChapter.name}</div>
      </div>
      <div className="scrollContainer">
        <div className="scrollContent">
          <div className="book-selector">{renderVocabSelectors()}</div>
        </div>
      </div>
    </div>
  );
};

export default VocabScreen;
