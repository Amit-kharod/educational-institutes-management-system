import React, { useState, useEffect } from 'react';
import MainHead from './components/MainHead';
import './app.css';
import LoginBox from './components/LoginBox';

function App() {
  const [apiResponse, setResponse] = useState({ apiResponse: '' });

  const callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => setResponse({ apiResponse: res }));
  };

  useEffect(() => {
    callAPI();
    console.log(apiResponse);
  });

  return (
    <div className='App'>
      <MainHead />
      <LoginBox />
    </div>
  );
}

export default App;
