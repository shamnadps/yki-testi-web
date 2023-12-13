import React, { useState, useEffect } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom'; 
import './styles/ContentScreen.css';


const ContentScreen = () => {
  const [isCounting, setIsCounting] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { content, name, translation } = location.state || {};

  const lines = content.split('\n').filter((line) => line.trim().length > 0);
  const translatedLines = translation.split('\n').filter((line) => line.trim().length > 0);


  let counter = 0;
  const onStart = (event) => {
    if (isCounting !== -2) {
      setIsCounting((prevCount) => {
        if (prevCount === 0) {
          counter = 0;
        }
        if (prevCount !== -2) {
          setIsSpeaking(counter);
          counter++;
          if (counter === lines.length) {
            counter = 0;
            setIsSpeaking(-1);
          }
          return counter;
        }
      });
    }
    };



  const speakNow = (line) => {
    
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.lang = "fi-FI";
    synth.speak(utterance);
    
  };

  const [isSpeaking, setIsSpeaking] = useState(-1);

  const toggleSpeaking = (index, line) => {

  };

  const [isTextStopped, setIsTextStopped] = useState(true);



  React.useEffect( () => {
    if (!isTextStopped) {
      let index = 0;
      const intervalId = setInterval( () => {
        if (index < lines.length) {
          speakNow(lines[index]);
          index++;
        } else {
          clearInterval(intervalId);
          setIsTextStopped(true);
          setIsSpeaking(-1);
        }
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isTextStopped]);

  return (
    <div className="contentContainer">
        <div className="top-menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/vocabularyList" className="menu-link">
          Vocabulary List
        </Link>
        
      </div>
      <h1 className="title">{name}</h1>
      {lines.map((line, index) => (
        <div key={index} className="row">
          {true ? (
            <div className="content-line">
            <p className="text">
              {line}<img
                      src={require('../assets/images/voice-dark.png')}
                      alt="speak"
                      className="voiceIcon"
                      onClick={() => speakNow(lines[index])}
                    />
            </p>
            <p className="content-line">
              {translatedLines[index]}
            </p>
          </div>
          ) : (
            <div className="content-line">
              <p>{line}</p>
              <p>{translatedLines[index]}</p>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default ContentScreen;
