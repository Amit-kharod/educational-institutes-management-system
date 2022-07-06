import axios from 'axios';
import {
  ADD_DEPARTMENT,
  ADD_PROGRAMME,
  ADD_SUBJECT,
  ADD_TEACHER,
  MODIFY_DEPARTMENT,
  MODIFY_PROGRAMME,
  MODIFY_SUBJECT,
  MODIFY_TEACHER,
  RESET_CURRENT_DEPARTMENT,
  RESET_CURRENT_PROGRAMME,
  RESET_CURRENT_SUBJECT,
  RESET_CURRENT_TEACHER,
  ADD_DEPARTMENT_SUCCESS,
  SET_DEPARTMENT_DATA,
  SET_ADMIN_DATA,
  VERIFY_STUDENT,
} from './types';
import { setAlert } from './alert';
import { loadTeacher } from './auth';
import setAuthToken from '../utils/setAuthToken';

// Add new department
export const addDepartment = (name) => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ name });
    console.log(body);
    try {
      const res = await axios.post('/api/department', body, config);
      console.log(res)
      dispatch(setAlert(res.data.msg, 'success'))
      dispatch({
        type: ADD_DEPARTMENT,
        payload: res.data.name
      });
      dispatch({
        type: ADD_DEPARTMENT_SUCCESS,
        payload: true,
      })
      dispatch(setDepartmentData());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert(err.response.data.msg, 'danger'))
    }
  }
};

// Reset current department
export const resetDepartment = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_DEPARTMENT
  })
  dispatch({
    type: ADD_DEPARTMENT_SUCCESS,
    payload: false,
  })
}

// Modify a department
export const modifyDepartment = (department) => dispatch => {
  console.log(department)
  dispatch({
    type: MODIFY_DEPARTMENT,
    payload: department,
  })
}

// Add new Programme
export const addProgramme = (fullName, shortForm, isOdd, duration, departmentName) => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ fullName, shortForm, isOdd, duration, departmentName });
    console.log(body);
    try {
      const res = await axios.post('/api/programme', body, config);
      dispatch(setDepartmentData());
      dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert(err.response.data.msg, 'danger'))
    }
  }
  dispatch({
    type: ADD_PROGRAMME,
  });
};

// Get department data and set it to state
export const setDepartmentData = () => async (dispatch) => {
  const res = await axios.get('/api/data');
  dispatch({
    type: SET_DEPARTMENT_DATA,
    payload: res.data.departments,
  });
};

// Department which is currently being edited
export const changeCurrentDepartment = (dep) => (dispatch)=> {
  console.log(dep)
  dispatch({
    type: ADD_DEPARTMENT,
    payload: dep
  });
}

// Get department data and set it to state
export const setAdminData = () => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.get('/api/data/admin');
      console.log(res)
      dispatch({
        type: SET_ADMIN_DATA,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.msg, 'danger'))
    }
  }
};

export const setTeacherData = () => async (dispatch) => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.get('/api/data/teacher');
      console.log(res)
      dispatch({
        type: SET_ADMIN_DATA,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err.response.data.msg, 'danger'))
    }
  }
};

// Verify a student

export const verifyStudent = (registrationNo, programme, sem, status) => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ registrationNo, programme, sem, status });
    console.log(body);
    try {
      const res = await axios.post('/api/admin/studentVerification', body, config);
      console.log(res)
      dispatch(setAlert(res.data.msg, 'success'))
      dispatch({
        type: VERIFY_STUDENT,
        payload: true
      });
      dispatch(setAdminData());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert(err.response.data.msg, 'danger'))
    }
  }
};

// Add new Subject
export const addNewSubject = (name, programme, sem, lectures) => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ name, programme, sem, lectures });
    console.log(body);
    try {
      const res = await axios.post('/api/subject', body, config);
      dispatch(setDepartmentData());
      dispatch(setAdminData());
      console.log(res);
      dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert("Request failed", 'danger'))
    }
  }
};

// Add new Teacher
export const addNewTeacher = (data) => async (dispatch) => {
  if(localStorage.adminToken){
    setAuthToken(localStorage.adminToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify(data);
    console.log(body);
    try {
      const res = await axios.post('/api/teacher', body, config);
      dispatch(setDepartmentData());
      dispatch(setAdminData());
      console.log(res);
      dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert(errors, 'danger'))
    }
  }
};

// Add new Assignment
export const addAssignment = (name, subject, programme, sem, isHardCopy, topics, date) => async (dispatch) => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const body = JSON.stringify({ name, subject, programme, sem, isHardCopy, topics, date });
    try {
      const res = await axios.post('/api/assignment', body, config);
      dispatch(setDepartmentData());
      dispatch(setAdminData());
      console.log(res);
      dispatch(setAlert(res.data.msg, 'success'))
      dispatch(loadTeacher());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.msg;
      dispatch(setAlert(errors, 'danger'))
    }
  }
};