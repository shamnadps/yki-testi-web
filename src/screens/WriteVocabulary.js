// WriteVocabulary.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFailedQuestions } from './FailedQuestionsContext';
import './styles/WriteVocabulary.css';
import vocabulary_A1 from '../data/vocabulary_A1';
import vocabulary_A2 from '../data/vocabulary_A2';
import vocabulary_B1 from '../data/vocabulary_B1';
import vocabulary_B2 from '../data/vocabulary_B2';
import extra_vocabulary from '../data/extra_vocabulary';

const WriteVocabulary = () => {
  const location = useLocation();

  const { totalQuestions, selectedCategories } = location.state || {};

  const { failedWritings, setFailedWritings } = useFailedQuestions();

  const categoryToVocabulary = {
    A1: vocabulary_A1,
    A2: vocabulary_A2,
    B1: vocabulary_B1,
    B2: vocabulary_B2,
    extras: extra_vocabulary,
    failed: failedWritings,
  };

    const vocabularyData = selectedCategories.reduce((data, categoryId) => {
      const categoryVocabulary = categoryToVocabulary[categoryId];
    
      if (categoryVocabulary) {
        data.push(...categoryVocabulary);
      }
      return data;
    }, []);


    const generateQuestions = (vocabularyData, numberOfQuestions) => {
        const questions = [];
        const usedIndexes = new Set();
        let currentQuestionIndex = 0;
        if (numberOfQuestions > vocabularyData.length) {
          numberOfQuestions = vocabularyData.length;
        }
        while (questions.length < numberOfQuestions) {
          const randomIndex = Math.floor(Math.random() * vocabularyData.length);
      
          // Check if the index has been used to avoid duplicates
          if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            const question = vocabularyData[randomIndex].question;
            const answer = vocabularyData[randomIndex].answer;
            questions.push({question, answer});
            currentQuestionIndex++;
          }
        }
        return questions;
      };

  const storeFailedQuestions = async (failedQuestions) => {
    try {
      await localStorage.setItem('failedWritings', JSON.stringify(failedQuestions));
    } catch (error) {
      console.error('Error storing failedWritings:', error);
    }
  };

  const getFailedQuestions = async () => {
    try {
      const storedData = await localStorage.getItem('failedWritings');
      if (storedData !== null) {
        return JSON.parse(storedData);
      }
      return [];
    } catch (error) {
      console.error('Error retrieving failedWritings:', error);
      return [];
    }
  };

  useEffect(() => {
    getFailedQuestions().then((storedFailedQuestions) => {
      setFailedWritings(storedFailedQuestions);
    });
  }, [setFailedWritings]);

  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const speakNow = (line) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.lang = "fi-FI";
    synth.speak(utterance);
  };

  useEffect(() => {
    // Generate questions only on the initial load
    if (questions.length === 0) {
      const generatedQuestions = generateQuestions(vocabularyData, totalQuestions);
      if (generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
      }
    }

    return () => {
      // Cleanup and remove event listeners here
    };
  }, [questions, vocabularyData, totalQuestions]);

  const [answers, setAnswers] = useState(Array.from({ length: questions.length }, () => ''));
  

  const handleAnswerChange = (question, text) => {
    const index = questions.findIndex((q) => q.question === question);
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length === 0) {
      setFailedWritings((prevFailedWriting) => [...prevFailedWriting, ...questions]);
    }
    const newResults = answers.map((answer, index) => {
      if (questions[index] && questions[index].question) {
        const actualAnswer = questions[index].question.trim().toLowerCase();
        const submittedAnswer = answer ? answer.trim().toLowerCase() : '';
        const isCorrect = submittedAnswer === actualAnswer;
        const questionToRemove = questions[index].question.trim().toLowerCase();
        setFailedWritings((prevFailedWriting) =>
          prevFailedWriting.filter((failedAnswer) => failedAnswer.question.trim().toLowerCase() !== questionToRemove)
        );
        if (!isCorrect) {
          setFailedWritings((prevFailedWriting) => [...prevFailedWriting, questions[index]]);
        }
        return isCorrect;
      }
      return false;
    });
    setResults(newResults);
    storeFailedQuestions(failedWritings);
  };

  const handleClear = () => {
    setAnswers(Array.from({ length: questions.length }, () => ''));
    setResults([]);
    setSubmitted(false);
  };

  const countCorrectAnswers = () => {
    return results.filter((result) => result).length;
  };

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
      <p className="title-container">Write Vocabulary</p>
      {questions.length === 0 ? (
        <div className="noQuestionsContainer">
          <p className="noQuestionsText">No questions available</p>
        </div>
      ) : (
        <div className="scrollContainer">
          {questions.map(({ question, answer }, index) => {
            const isCorrect = results[index] !== undefined && results[index] === true;
            const isWrong = (results[index] !== undefined && results[index] === false) || (submitted && !isCorrect);

            return (
                <div key={question} className="questionContainer">
                <p className="writing-questionText">
                  {index + 1}. {answer}
                </p>
                <div className="inputContainer">
                  <input
                    className="input"
                    style={{
                      borderColor: isCorrect ? 'green' : isWrong ? 'red' : 'gray',
                    }}
                    type="text"
                    onChange={(e) => handleAnswerChange(question, e.target.value)}
                    value={answers[index] || ''}
                  />
                  {isCorrect && (
                    <img
                      src={require('../assets/images/ok.png')}
                      style={{ width: 30, height: 30, marginLeft: 5 }}
                      
                      alt="Correct"
                    />
                  )}
                  {isWrong && (
                    <img
                      src={require('../assets/images/refresh-dark.png')}
                      style={{ width: 30, height: 30, marginLeft: 5 }}
                      alt="Refresh"
                      className='voiceIcon'
                      onClick={() => { handleSubmit(); setSubmitted(true); }}
                    />
                  )}
                </div>          

                {submitted && (isWrong || !isCorrect) && (
                  <div className="correctAnswerContainer">
                  <div className="wrongResultText">{`Correct answer: ${question}`}
           
                    <img
                      src={require('../assets/images/voice-dark.png')}
                      style={{ width: 30, height: 30 , marginLeft: 5 }}
                      className='voiceIcon'
                      alt="Speak" onClick={() => speakNow(question)}
                    />
                 </div>
                  
                </div>
                )}
                {submitted && isCorrect && (
                  <div className="correctAnswerContainer">
                  <div className="resultText">{`Correct answer: ${question}`}
             
                    <img
                      src={require('../assets/images/voice-dark.png')}
                      style={{ width: 30, height: 30, marginLeft: 5 }}
                      alt="Speak"
                      className='voiceIcon'
                      onClick={() => speakNow(question)}
                    />
                  </div>
                  
                </div>
                )}
              </div>
            );
          })}
          {submitted && (
            <div className="bottomContainer">
              <p className="countText">{`Correct Answers: ${countCorrectAnswers()} / ${totalQuestions}`}</p>
            </div>
          )}
          <div className="buttonContainer">
            <div className="submitButton" onClick={() => { handleSubmit(); setSubmitted(true); }}>
              <p className="submitButtonText">Submit</p>
            </div>
            <div className="clearButton" onClick={handleClear}>
              <p className="clearButtonText">Clear</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WriteVocabulary;
