import React, { useState, useEffect } from 'react';
import vocabulary_A1 from '../data/vocabulary_A1';
import vocabulary_A2 from '../data/vocabulary_A2';
import vocabulary_B1 from '../data/vocabulary_B1';
import vocabulary_B2 from '../data/vocabulary_B2';
import extra_vocabulary from '../data/extra_vocabulary';
import { useFailedQuestions } from './FailedQuestionsContext';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

const VocabularyTestScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { failedQuestions, setFailedQuestions } = useFailedQuestions();

  const { totalQuestions,
    selectedCategories } = location.state || {};

  console.log("selected categories")
  console.log(selectedCategories)

  const categoryToVocabulary = {
    A1: vocabulary_A1,
    A2: vocabulary_A2,
    B1: vocabulary_B1,
    B2: vocabulary_B2,
    extras: extra_vocabulary,
    failed: failedQuestions,
  };

  const vocabularyData = selectedCategories.reduce((data, categoryId) => {
    const categoryVocabulary = categoryToVocabulary[categoryId];

    if (categoryVocabulary) {
      data.push(...categoryVocabulary);
    }
    return data;
  }, []);

  const storeFailedQuestions = async (failedQuestions) => {
    try {
      await localStorage.setItem('failedQuestions', JSON.stringify(failedQuestions));
    } catch (error) {
      console.error('Error storing failedQuestions:', error);
    }
  };

  const getFailedQuestions = async () => {
    try {
      const storedData = await localStorage.getItem('failedQuestions');
      if (storedData !== null) {
        return JSON.parse(storedData);
      }
      return [];
    } catch (error) {
      console.error('Error retrieving failedQuestions:', error);
      return [];
    }
  };

  React.useEffect(() => {
    getFailedQuestions().then((storedFailedQuestions) => {
      setFailedQuestions(storedFailedQuestions);
    });
  }, [setFailedQuestions]);

  const [hasPassed, setHasPassed] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [spokenFirst, setSpokenFirst] = useState(false);

  const handleOptionPress = (optionIndex) => {
    if (selectedOption !== null) {
      // User has already made a selection, do nothing
      return;
    }
    speakAnswer();
    setSelectedOption(optionIndex);

    if (questions[currentQuestionIndex].correctAnswer === optionIndex) {
      // Correct answer
      setScore(score + 1);
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isAlreadyFailed = failedQuestions.some((failedQuestion) => {
      return failedQuestion.question === currentQuestion.toSpeak;
    });

    if (questions[currentQuestionIndex].correctAnswer !== optionIndex && !isAlreadyFailed) {
      // Incorrect answer, add the current question to failedQuestions
      const failedQuestion = {
      question: questions[currentQuestionIndex].toSpeak,
      answer: questions[currentQuestionIndex].answer
      };
      const newFailedQuestions = [...failedQuestions, failedQuestion];
      setFailedQuestions(newFailedQuestions); // Update state

      // Store newFailedQuestions in AsyncStorage
      storeFailedQuestions(newFailedQuestions);
    }
  };

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
        const correctAnswer = vocabularyData[randomIndex].answer;
        const options = getRandomOptions(vocabularyData, randomIndex, 3); // Get 3 random incorrect options
        options.splice(Math.floor(Math.random() * 4), 0, correctAnswer); // Insert the correct answer at a random position
  
        const questionObj = {
          question: `Question ${currentQuestionIndex + 1}/ ${numberOfQuestions}\n\n${question}`,
          toSpeak:question,
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

  const speakFirstQuestion = () => {
    if (questions.length > 0 && !spokenFirst) {
      const questionText = questions[0].toSpeak;
      setSpokenFirst(true);
    }
  };

  React.useEffect(() => {
    // Generate questions only on the initial load
    if (questions.length === 0) {
      const generatedQuestions = generateQuestions(vocabularyData, totalQuestions);
      if (generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        speakQuestion();
      }
    }
    speakFirstQuestion();
    // Add event listeners and set default language here

    return () => {
      // Cleanup and remove event listeners here
    };
  }, [questions, vocabularyData, totalQuestions]);
  const handleRestartButtonPress = () => {
    // Reset quiz state to restart the test
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setHasPassed(false);
    setSpokenFirst(false);
  };

  const generateNewQuestionSet = () => {
    const newQuestions = generateQuestions(vocabularyData, totalQuestions); 
    setQuestions(newQuestions);
    handleRestartButtonPress();
  };

  const handleNextButtonPress = () => {
    // Check if the quiz is finished
    if (currentQuestionIndex < questions.length - 1) {

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const questionText = questions[currentQuestionIndex+1].toSpeak;

      setSelectedOption(null); // Clear selected option for the next question
      
    } else {
      // Calculate the passing threshold (70%)
      const passingThreshold = 0.7; // 70%

      // Check if the user has passed
      const userScore = score / questions.length;
      const hasUserPassed = userScore >= passingThreshold;
      // Set quizFinished and hasPassed state
      setQuizFinished(true);
      setHasPassed(hasUserPassed);
    }
  };


  const speakQuestion = () => {
      const question = questions[currentQuestionIndex];

  };

  const speakAnswer = () => {
    const question = questions[currentQuestionIndex];
    if (question) {
      }
  };
  const passingThreshold = 0.7; // 70%

  // Check if the user has passed
  const quizFinishedBackgroundColor = hasPassed ? '#66bb6a' : '#EF5350';

  return (
  <div className={styles.container}>
    <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
  {quizFinished ? (
    <div>
      <div
        className={[
          styles.quizFinishedContainer,
          { backgroundColor: quizFinishedBackgroundColor },
        ].join(' ')}
      >
        <div className={styles.scorePercent}>
          {((score / questions.length) * 100).toFixed(0)}%
        </div>
        <div className={styles.quizFinishedText}>
          {hasPassed ? 'Congratulations!!' : 'Better luck Next time!'}
        </div>
        <div className={styles.quizScoreText}>
          Your Score: {score}/{questions.length}
        </div>
        <div className={hasPassed ? styles.passedText : styles.failedText}>
          {hasPassed ? 'You Passed!' : 'You Failed!'}
        </div>
        <div className={styles.passingThresholdText}>
          You need {Math.round(passingThreshold * 100)}% to pass
        </div>
      </div>
      <button
        className={styles.restartButton}
        onClick={handleRestartButtonPress}
      >
        Retake Test
      </button>
      <button
        className={styles.restartButton}
        onClick={generateNewQuestionSet}
      >
        New Test
      </button>
    </div>
  ) : (
    <>
      {questions.length === 0 ? (
        // Render the "No questions available" view when vocabularyData is empty
        <div className={styles.noQuestionsContainer}>
          <div className={styles.noQuestionsText}>No questions available</div>
        </div>
      ) : (
        <>
          <div className={styles.questionContainer}>
            <div className={styles.questionText}>
              {questions.length > 0 &&
                questions[currentQuestionIndex].question}
            </div>
          </div>
          <div className={styles.optionsContainer}>
            {questions.length > 0 &&
              questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={[
                    styles.optionButton,
                    selectedOption !== null &&
                      (index === questions[currentQuestionIndex].correctAnswer
                        ? styles.correctOption
                        : index === selectedOption
                        ? styles.wrongOption
                        : null),
                  ].join(' ')}
                  onClick={() => handleOptionPress(index)}
                  disabled={selectedOption !== null}
                >
                  <div className={styles.optionText}>{option}</div>
                </button>
              ))}
          </div>
          <button
            className={[
              styles.nextButton,
              selectedOption === null && styles.nextButtonDisabled,
            ].join(' ')}
            onClick={handleNextButtonPress}
            disabled={selectedOption === null}
          >
            Next
          </button>
        </>
      )}
    </>
  )}
</div>

);
};

const styles = {
  container: {
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizFinishedContainer: {
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
  },
  scorePercent: {
    fontSize: '30px',
    margin: '10px',
  },
  quizFinishedText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  quizScoreText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#fff',
  },
  passedText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#fff',
  },
  failedText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#fff',
  },
  passingThresholdText: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: 'white',
  },
  restartButton: {
    backgroundColor: '#6495ED',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '20px',
    cursor: 'pointer',
  },
  restartButtonText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  noQuestionsContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  noQuestionsText: {
    fontSize: '16px',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  questionText: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    width: '80%',
    padding: '10px',
    marginVertical: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    alignItems: 'center',
    cursor: 'pointer',
  },
  optionText: {
    fontSize: '16px',
  },
  correctOption: {
    backgroundColor: '#66bb6a',
  },
  wrongOption: {
    backgroundColor: '#EF5350',
  },
  nextButton: {
    backgroundColor: '#6495ED',
    width: '50%',
    padding: '10px',
    marginVertical: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    alignItems: 'center',
    cursor: 'pointer',
  },
  nextButtonText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};

export default VocabularyTestScreen;
