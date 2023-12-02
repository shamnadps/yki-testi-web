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
import PrivacyPolicy from './screens/PrivacyPolicy';
import PlaySettingScreen from './screens/PlaySettingScreen';
import VocabularyTestScreen from './screens/VocabularyTestScreen';
import PlayVocabularyScreen from './screens/PlayVocabularyScreen';
import TestSettingScreen from './screens/TestSettingScreen';

import { FailedQuestionsProvider } from './screens/FailedQuestionsContext';

const App = () => {
  return (
    <FailedQuestionsProvider>
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/test-setting-screen" element={<TestSettingScreen />} />
        <Route path="/play-setting-screen" element={<PlaySettingScreen />} />
        <Route path="/vocabulary-test-screen" element={<VocabularyTestScreen />} />
        <Route path="/play-vocabulary-screen" element={<PlayVocabularyScreen />} />
      </Routes>
    </Router>
    </FailedQuestionsProvider>
  );
};

export default App;
