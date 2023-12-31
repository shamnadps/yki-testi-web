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
import WriteVocabulary from './screens/WriteVocabulary';
import WriteVocabularySettings from './screens/WriteVocabularySettings';
import ChooseWriting from './screens/ChooseWriting';
import TestWriting from './screens/TestWriting';
import SpeakingScreen from './screens/SpeakingScreen';
import ContentScreen from './screens/ContentScreen';
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
        <Route path="/write-vocabulary" element={<WriteVocabulary />} />
        <Route path="/write-vocabulary-settings" element={<WriteVocabularySettings />} />
        <Route path="/choose-writing" element={<ChooseWriting />} />
        <Route path="/test-writing" element={<TestWriting />} />
        <Route path="/speaking-screen" element={<SpeakingScreen />} />
        <Route path="/content-screen" element={<ContentScreen />} />
      </Routes>
    </Router>
    </FailedQuestionsProvider>
  );
};

export default App;
