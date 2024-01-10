import React from 'react';
import { render } from 'react-dom';
import { useState, useEffect } from 'react';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(200);
  const [timer, setTimer] = useState(null);

    const startTimer = () => {
      console.log(time);
      setTime(12);
      setStatus('work');
      setTimer(setInterval(() => {
        setTime(time => time - 1);
      },1000));
    }

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    if(time === 0) {
      if(status === 'rest') {
        playBell();
        setStatus('work');
        setTime(12);
      } else if (status === 'work') {
        playBell();
        setStatus('rest');
        setTime(20);
      }
    }
  },[time, timer]);

  const stopTimer = () => {
    clearInterval(timer);
    setTime(time => time = 0);
    setStatus('off');
  }

  const closeApp = () => {
    window.close(); 
  }

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play(); 
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (<img src="./images/work.png" />)}
      {status === 'rest' && (<img src="./images/rest.png" />)}
      {status !== 'off' && (<div className="timer">
        {formatTime(time)}
      </div>
      )}

      {status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      {status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
