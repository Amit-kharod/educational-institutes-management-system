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
import AboutPage from './components/homepage/AboutPage';
import HomePage from './components/homepage/HomePage';
import StudentDashboard from './components/student/StudentDashboard';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadStudent());
    console.log('hi')
  }, []);
  console.log(store.getState());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginBox />} />
          <Route exact path="/signup" element={<SignupBox />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/studentDashboard" element={<StudentDashboard />} />
        </Routes>
        <Alert />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
