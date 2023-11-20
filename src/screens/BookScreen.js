import React from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import './styles/BookScreen.css';
import vocabulary_A1 from '../data/vocabulary_A1';
import vocabulary_A2 from '../data/vocabulary_A2';
import vocabulary_B1 from '../data/vocabulary_B1';
import vocabulary_B2 from '../data/vocabulary_B2';
import extra_vocabulary from '../data/extra_vocabulary';


const BookScreen = () => {
  const navigate = useNavigate();

  const chapters = [
    { number: 1, link: 'Finnish_A1', name: 'Finnish A1', vocabulary: vocabulary_A1 },
    { number: 2, link: 'Finnish_A2', name: 'Finnish A2', vocabulary: vocabulary_A2 },
    { number: 3, link: 'Finnish_B1', name: 'Finnish B1', vocabulary: vocabulary_B1 },
    { number: 4, link: 'Finnish_B2', name: 'Finnish B2', vocabulary: vocabulary_B2 },
    { number: 5, link: 'Extra_Vocabulary', name: 'Extra Vocabulary', vocabulary: extra_vocabulary },
  ];

  const handleChapterPress = (chapterNumber) => {
    const selectedChapter = chapters.find((chapter) => chapter.number === chapterNumber);
    navigate(`/vocab-screen/${selectedChapter.link}`, { state: { chapterNumber, selectedChapter } });
  };


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
      <div className="title-container">
        <img src={require('../assets/icons/logo_transparent.png')} alt="Logo" className="logo" />
      </div>
      <div className="book-selector">
        {chapters.map((chapter) => (
          <div
            key={chapter.number}
            className="chapter-tile"
            onClick={() => handleChapterPress(chapter.number)}
          >
            <p className="chapterText">{chapter.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookScreen;