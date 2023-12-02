import React, { createContext, useContext, useState } from 'react';

const FailedQuestionsContext = createContext();

export const FailedQuestionsProvider = ({ children }) => {
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [failedWritings, setFailedWritings] = useState([]); 

  return (
    <FailedQuestionsContext.Provider value={{ failedQuestions, setFailedQuestions, failedWritings, setFailedWritings }}>
      {children}
    </FailedQuestionsContext.Provider>
  );
};

export const useFailedQuestions = () => {
  return useContext(FailedQuestionsContext);
};