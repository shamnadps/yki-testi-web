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

  const speakNow = (textToRead) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "fi-FI";
    synth.speak(utterance);
  };

  const renderItem = ({ item }) => (
    <div className="item">
      <div>
        <div className="question">{item.question}
        <img
                      src={require('../assets/images/voice-dark.png')}
                      style={{ width: 30, height: 30 , marginLeft: 5 }}
                      className='voiceIcon'
                      alt="Speak" onClick={() => speakNow(item.question)}
                    /></div>
        <div className="answer">{item.answer}</div>
      </div>
{/*       <button
        className={styles.button}
        onClick={() => {
          Tts.speak(item.question);
        }}
      >
        <img src={require('../assets/images/voice-dark.png')} alt="Voice" className={styles.icon} />
      </button> */}
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
        <h1 className="title">Vocabulary List</h1>
      <input
        type="text"
        className="searchBar"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="itemDiv">
        {filteredVocabularyData.map((item, index) => (
          <div  key={index}>{renderItem({ item })}</div>
        ))}
      </div>
    </div>
  );
};
export default VocabularyListScreen;

