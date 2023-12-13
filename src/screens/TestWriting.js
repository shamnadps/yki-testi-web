// TestWriting.js

import React, { useState, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom'; 

import './styles/TestWriting.css';

const TestWriting = () => {
    const location = useLocation();
  const { content, name, translation } = location.state || {};
  const lines = content.split('\n').filter((line) => line.trim().length > 0);
  const translatedLines = translation.split('\n').filter((line) => line.trim().length > 0);

  const [showOverview, setShowOverview] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const loadUserLanguage = async () => {
      setSelectedLanguage('en');
    };

    loadUserLanguage();
  }, []);

  const speakNow = (line) => {

  };


  const [answers, setAnswers] = useState(new Array(lines.length).fill(''));
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const newResults = answers.map(
      (answer, index) => answer.trim().toLowerCase() === lines[index].trim().toLowerCase()
    );
    setResults(newResults);
  };

  const handleClear = () => {
    setAnswers(new Array(lines.length).fill(''));
    setResults([]);
    setSubmitted(false);
  };

  const handleAnswerChange = (text, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const countCorrectAnswers = () => {
    return results.filter((result) => result).length;
  };

  const totalQuestions = lines.length;

  return (
      <div className="container">
        <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
      </div>
        {translatedLines.length === 0 ? (
          <div className="noQuestionsContainer">
            <p className="noQuestionsText">No questions available</p>
          </div>
        ) : (
          <div className="scrollContainer">
            {translatedLines.map((question, index) => (
              <div key={index} className="questionContainer">
                <p className="questionText">{`${index + 1}. ${translatedLines[index]}`}</p>
                <div className="answerContainer">
                  <input
                    className={`input ${results[index] !== undefined ? (results[index] ? 'correct' : 'incorrect') : ''}`}
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(e.target.value, index)}
                  />
                  {results[index] && (
                    <img
                      src={require('../assets/images/ok.png')}
                      alt="correct"
                      className="resultIcon"
                    />
                  )}
                  {results[index] === false && (
                    <img
                      src={require('../assets/images/refresh.png')}
                      alt="refresh"
                      className="resultIcon"
                      onClick={() => {
                        handleSubmit();
                        setSubmitted(true);
                      }}
                    />
                  )}
                </div>
                {results[index] === false && (
                  <div className="correctAnswerContainer">
                    <p className="wrongResultText">{`Correct answer: ${lines[index]}`}</p>
                    <img
                      src={require('../assets/images/voice.png')}
                      alt="speak"
                      className="voiceIcon"
                      onClick={() => speakNow(lines[index])}
                    />
                  </div>
                )}
                {results[index] && (
                  <div className="correctAnswerContainer">
                    <p className="resultText">{`Correct answer: ${lines[index]}`}</p>
                    <img
                      src={require('../assets/images/voice.png')}
                      alt="speak"
                      className="voiceIcon"
                      onClick={() => speakNow(lines[index])}
                    />
                  </div>
                )}
              </div>
            ))}
            {submitted && (
              <div className="bottomContainer">
                <p className="countText">{`Correct Answers: ${countCorrectAnswers()} / ${totalQuestions}`}</p>
              </div>
            )}
            <div className="buttonContainer">
              <button className="submitButton" onClick={() => {
                handleSubmit();
                setSubmitted(true);
              }}>
                Submit
              </button>
              <button className="clearButton" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        )}

      </div>
  );
};

export default TestWriting;
