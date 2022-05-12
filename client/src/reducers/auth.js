import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  STUDENT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_ADMIN,
  ADMIN_LOGIN
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  student: null,
  teacher: null,
  admin: null,
  firstLogin: false,
  isAdmin:false,
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
      localStorage.removeItem('adminToken');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        firstLogin: false,
        student: null,
        admin: null,
        teacher: null,
      };
    case CHECK_ADMIN:
      return {
        ...state,
        isAdmin: payload
      }
    case ADMIN_LOGIN:
      localStorage.setItem('adminToken', payload.token);
      return {
        ...state,
        admin: payload,
        isAuthenticated: true,
      }
    default:
      return state;
  }
}
