import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import vocabulary_A1 from '../data/vocabulary_A1';
import vocabulary_A2 from '../data/vocabulary_A2';
import vocabulary_B1 from '../data/vocabulary_B1';
import vocabulary_B2 from '../data/vocabulary_B2';
import extra_vocabulary from '../data/extra_vocabulary';
import './styles/PlayVocabularyScreen.css';

const PlayVocabularyScreen = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuestions,
    selectedCategories,
    nextQuestionDelay, 
    answerDelay } = location.state || {};
  const categoryToVocabulary = {
    A1: vocabulary_A1,
    A2: vocabulary_A2,
    B1: vocabulary_B1,
    B2: vocabulary_B2,
    extras: extra_vocabulary,
  };

  const vocabularyData = selectedCategories.reduce((data, categoryId) => {
    const categoryVocabulary = categoryToVocabulary[categoryId];
  
    if (categoryVocabulary) {
      data.push(...categoryVocabulary);
    }
    return data;
  }, []);
  
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [spokenFirst, setSpokenFirst] = useState(false);


  useEffect(() => {
    const speakAnswerWithDelay = () => {
        setTimeout(() => {
          speakAnswer();
        }, answerDelay);
      };

    const navigateToNextQuestion = () => {
      if (!isPaused) {
        if (currentQuestionIndex < questions.length - 1) {
          handleNextButtonPress();
          speakQuestion();
        } else {
          setQuizFinished(true);
        }
      }
    };

    speakAnswerWithDelay();
    // Set up an interval to navigate automatically every 10 seconds
    const intervalId = setInterval(navigateToNextQuestion, nextQuestionDelay);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, questions.length, isPaused]);

  const getRandomOptions = (vocabularyData, currentIndex, count) => {
    // This function returns an array of `count` random incorrect options
    const randomOptions = [];
    while (randomOptions.length < count) {
      const randomIndex = Math.floor(Math.random() * vocabularyData.length);
      if (randomIndex !== currentIndex && !randomOptions.includes(vocabularyData[randomIndex].answer)) {
        randomOptions.push(vocabularyData[randomIndex].answer);
      }
    }
    return randomOptions;
  };

  const generateQuestions = (vocabularyData, numberOfQuestions) => {
    const questions = [];
    const usedIndexes = new Set();
    let currentQuestionIndex = 0;
    while (questions.length < numberOfQuestions) {
      const randomIndex = Math.floor(Math.random() * vocabularyData.length);
  
      // Check if the index has been used to avoid duplicates
      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        const question = vocabularyData[randomIndex].question;
        const correctAnswer = vocabularyData[randomIndex].answer;
        const options = getRandomOptions(vocabularyData, randomIndex, 3); // Get 3 random incorrect options
        options.splice(Math.floor(Math.random() * 4), 0, correctAnswer); // Insert the correct answer at a random position
  
        const questionObj = {
          question: `Question ${currentQuestionIndex + 1}/ ${numberOfQuestions}`,
          toSpeak: question,
          options,
          answer: correctAnswer,
          correctAnswer: options.indexOf(correctAnswer),
        };
        questions.push(questionObj);
        currentQuestionIndex++;
      }
    }
    return questions;
  };
  
  const speakFirstQuestion = () => {
    if (questions.length > 0 && !spokenFirst) {
      const questionText = questions[0].toSpeak;
      setSpokenFirst(true);
    }
  };

  useEffect(() => {
    // Generate questions only on the initial load
    if (questions.length === 0) {
      const generatedQuestions = generateQuestions(vocabularyData, totalQuestions);
      setQuestions(generatedQuestions);
      setSelectedOption(null);
      speakQuestion();
    }
    speakFirstQuestion();

    return () => {
      // Cleanup and remove event listeners here
    };
  }, [questions, vocabularyData, totalQuestions]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleRestartButtonPress = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizFinished(false);
    setSpokenFirst(false);
  };

  const handleNextButtonPress = () => {
    setSelectedOption(null); 
    
    // Check if the quiz is finished
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const generateNewQuestionSet = () => {
    const newQuestions = generateQuestions(vocabularyData, totalQuestions); 
    setQuestions(newQuestions);
    handleRestartButtonPress();
  };

  const speakQuestion = () => {
    setSelectedOption(null);
    const question = questions[currentQuestionIndex + 1];
    if (question) {
    }
  };

  const speakAnswer = () => {
    const question = questions[currentQuestionIndex];
    if (question) {
      setSelectedOption(question.correctAnswer);
    }
  };

  return (
    <div className="container">
      <div className="top-menu">
      <Link to="/play-setting-screen" className="menu-link">
          Settings
        </Link>
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
      </div>

      {quizFinished ? (
        <div>
          <div>
            {/* Empty div */}
          </div>
          <button className="restartButton" onClick={handleRestartButtonPress}>
            Replay
          </button>
          <button className="restartButton" onClick={generateNewQuestionSet}>
            Start new Set
          </button>
        </div>
      ) : (
        <>
          <div className="questionContainer">
            <p className="questionText">
              {questions.length > 0 && questions[currentQuestionIndex].question}
            </p>
            <p className="questionText">
              {questions.length > 0 && questions[currentQuestionIndex].toSpeak}
            </p>
          </div>
          <div className="optionsContainer">
            {questions.length > 0 &&
              questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`optionButton ${
                    selectedOption !== null &&
                    (index === questions[currentQuestionIndex].correctAnswer
                      ? 'correctOption'
                      : index === selectedOption
                      ? null
                      : null)
                  }`}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
          </div>
          <button
            className="nextButton"
            onClick={togglePause}
            disabled={selectedOption === null}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </>
      )}

      {/* Your Banner Ad Component */}
      <div className="bannerAd">
        {/* Your Banner Ad Component */}
      </div>
    </div>
  );
};


export default PlayVocabularyScreen;
