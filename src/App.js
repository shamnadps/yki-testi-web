import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import VocabularyScreen from './screens/VocabularyScreen';
import WritingScreen from './screens/WritingScreen';
import SpeakingSelectionScreen from './screens/SpeakingSelectionScreen';
import VocabularyListScreen from './screens/VocabularyListScreen';
import AboutUs from './screens/AboutUs';

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
      </Routes>
    </Router>
  );
};

export default App;
