import React from 'react';

const VocabularyListScreen = () => {
  const vocabularyList = [
    { word: 'Placeholder1', translation: 'Translation1' },
    { word: 'Placeholder2', translation: 'Translation2' },
    { word: 'Placeholder3', translation: 'Translation3' },
    // Add more vocabulary items as needed
  ];

  return (
    <div>
      <h2>Vocabulary List</h2>
      <ul>
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
