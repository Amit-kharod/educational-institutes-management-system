import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  STUDENT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  student: null,
  firstLogin: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_LOADED:
      console.log(payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        student: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        firstLogin: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAILED:
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('http://amitkharod.com:state');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        firstLogin: false,
      };
    default:
      return state;
  }
}
