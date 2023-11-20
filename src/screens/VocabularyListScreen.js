// VocabularyListScreen.js

import React from 'react';
import './styles/VocabularyListScreen.css'; // Import your CSS file for styling

const VocabularyListScreen = ({ onClose }) => {
  const vocabularyList = [
    { word: 'Placeholder1', translation: 'Translation1' },
    { word: 'Placeholder2', translation: 'Translation2' },
    { word: 'Placeholder3', translation: 'Translation3' },
    // Add more vocabulary items as needed
  ];

  return (
    <div className="vocabulary-list-container">
      <h2>Vocabulary List</h2>
      <ul className="vocabulary-list">
        {vocabularyList.map((item, index) => (
          <li key={index}>
            <strong>{item.word}:</strong> {item.translation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyListScreen;
