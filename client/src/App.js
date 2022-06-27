import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Navbar from './components/homepage/Navbar';
import './app.css';
import LoginBox from './components/homepage/LoginBox';
import SignupBox from './components/homepage/SignupBox';
import AboutPage from './components/homepage/AboutPage';
import HomePage from './components/homepage/HomePage';
import StudentDashboard from './components/student/StudentDashboard';
import Admin from './components/homepage/Admin';
import AdminDashboard from './components/admin/AdminDashboard';
import Departments from './components/admin/Departments';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadStudent, getIP, loadTeacher } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { setAdminData, setDepartmentData } from './actions/data';
import TeacherDashboard from './components/teacher/TeacherDashboard';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, setState] = useState(null);
  console.log(state);
  useEffect(() => {
    store.dispatch(loadStudent());
    store.dispatch(loadTeacher());
    store.dispatch(setDepartmentData());
    auth.isAdmin && store.dispatch(setAdminData());
  }, []);
  const { auth } = store.getState();
  console.log(auth.isAdmin)
  store.dispatch(getIP());
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {console.log(state)}
          {auth.student && auth.isAuthenticated && (
            <Route
              exact
              path="/studentDashboard"
              element={<StudentDashboard/>}
            />
          )}
          {auth.isTeacher && (
            <Route
              exact
              path="/teacherDashboard"
              element={<TeacherDashboard/>}
            />
          )}
          {auth.isAdmin && (
            <Fragment>
              <Route
                exact
                path="/adminDashboard"
                element={<AdminDashboard />}
              />
              <Route exact path="/departments" element={<Departments />} />
            </Fragment>
          )}
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/login"
            element={<LoginBox setState={setState} />}
          />
          <Route exact path="/signup" element={<SignupBox />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/admin" element={<Admin setState={setState} />} />
        </Routes>
        <Alert />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
