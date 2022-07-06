import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  STUDENT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_ADMIN,
  ADMIN_LOGIN,
  TEACHER_LOGIN,
  SET_ADMIN_DATA,
  TEACHER_LOADED,
} from './types';
import { setAlert } from './alert';
import { setAdminData, setTeacherData } from './data';
import setAuthToken from '../utils/setAuthToken';

// Load Student
export const loadStudent = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.get('/api/auth');
      console.log('hi');
      dispatch({
        type: STUDENT_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

// Load Teacher
export const loadTeacher = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      console.log('teacher');
      const res = await axios.get('/api/auth/teacher');
      dispatch({
        type: TEACHER_LOADED,
        payload: res.data,
      });
      dispatch(setTeacherData());
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

// Register Student
export const register =
  ({ name, email, registrationNo, rollNo, password, programme, sem }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      name,
      email,
      registrationNo,
      rollNo,
      password,
      programme,
      sem,
    });
    try {
      const res = await axios.post('/api/students', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadStudent());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAILED,
      });
    }
  };

// Login Student/Teacher
export const login = (registrationNo, password, type) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (type) {
    const body = JSON.stringify({ registrationNo, password });
    try {
      const res = await axios.post('/api/auth', body, config);
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadStudent());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: LOGIN_FAILED,
      });
    }
  }
  else {
    const userID = registrationNo;
    const body = JSON.stringify({ userID, password });
    try {
      const res = await axios.post('/api/teacher/login', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: TEACHER_LOGIN,
        payload: res.data.teacher
      });
      dispatch(setTeacherData());
      dispatch(loadTeacher());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: LOGIN_FAILED,
      });
    }
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Admin login
export const adminLogin = (id, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ id, password });
  try {
    const res = await axios.post('/api/admin', body, config);
    console.log(res);
    dispatch({
      type: ADMIN_LOGIN,
      payload: res.data,
    });
    dispatch(setAdminData());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

// Get User IP address

export const getIP = () => async (dispatch) => {
  const res = await axios.get('https://geolocation-db.com/json/');
  const config = {
    headers: {
      'ip-address': res.data.IPv4,
    },
  };
  const res2 = await axios.get('/api/admin/verify', config);
  dispatch({
    type: CHECK_ADMIN,
    payload: res2.data,
  });
};
