// VocabularyListScreen.js
import React, { useState } from 'react';
import './styles/VocabularyListScreen.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom'; 

// Import your vocabulary data here
import vocabulary_A1 from '../data/vocabulary_A1';
import vocabulary_A2 from '../data/vocabulary_A2';
import vocabulary_B1 from '../data/vocabulary_B1';
import vocabulary_B2 from '../data/vocabulary_B2';
import extra_vocabulary from '../data/extra_vocabulary';

const VocabularyListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const vocabularyData = [
    ...vocabulary_A1,
    ...vocabulary_A2,
    ...vocabulary_B1,
    ...vocabulary_B2,
    ...extra_vocabulary,
  ];

  const filteredVocabularyData = vocabularyData.filter(
    (item) =>
      String(item.question)
        .trim()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      String(item.answer)
        .trim()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );


  const renderItem = ({ item }) => (
    <div className="item">
      <div>
        <div className="question">{item.question}</div>
        <div className="answer">{item.answer}</div>
      </div>
{/*       <button
        className={styles.button}
        onClick={() => {
          Tts.speak(item.question);
        }}
      >
        <img src={require('../assets/images/voice.png')} alt="Voice" className={styles.icon} />
      </button> */}
    </div>
  );

  return (
    <div className="container">
        
        <div className="menuLinks">
            <Link to="/" className="menu-link">
            Home
            </Link>
            <Link to="/vocabularyList" className="menu-link">
            Vocabulary List
            </Link>
        </div>
        <h1 className="title">Vocabulary List</h1>
      <input
        type="text"
        className="searchBar"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredVocabularyData.map((item, index) => (
          <div key={index}>{renderItem({ item })}</div>
        ))}
      </div>
    </div>
  );
};
export default VocabularyListScreen;

