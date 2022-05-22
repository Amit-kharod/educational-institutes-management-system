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
  SET_DEPARTMENT_DATA
} from './types';
import { setAlert } from './alert';
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
      console.log(res)
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
  const res = await axios.get('/api/department');
  dispatch({
    type: SET_DEPARTMENT_DATA,
    payload: res.data.departments,
  });
};
