import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Navbar from './components/homepage/Navbar';
import './app.css';
import LoginBox from './components/homepage/LoginBox';
import SignupBox from './components/homepage/SignupBox';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadStudent } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
  console.log('he')
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadStudent());
  }, [])
  console.log(store.getState())

  return (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<LoginBox />} />
        <Route exact path="/signup" element={<SignupBox />} />
      </Routes>
      <Alert />
    </BrowserRouter>
  </Provider>
)};

export default App;
