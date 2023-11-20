import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import VocabularyScreen from './screens/VocabularyScreen';
import WritingScreen from './screens/WritingScreen';
import SpeakingSelectionScreen from './screens/SpeakingSelectionScreen';
import VocabularyListScreen from './screens/VocabularyListScreen';
import AboutUs from './screens/AboutUs';
import BookScreen from './screens/BookScreen';
import VocabScreen from './screens/VocabScreen';
import Flashcard from './screens/FlashCard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/vocabulary" element={<VocabularyScreen />} />
        <Route path="/writing" element={<WritingScreen />} />
        <Route path="/speaking" element={<SpeakingSelectionScreen />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/vocabularyList" element={<VocabularyListScreen />} />
        <Route path="/book-screen" element={<BookScreen />} />
        <Route path="/vocab-screen/:chapterNumber" element={<VocabScreen />} />
        <Route path="/flash-card" element={<Flashcard />} />
      </Routes>
    </Router>
  );
};

export default App;
