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
  ADD_DEPARTMENT,
  ADD_PROGRAMME,
  ADD_SUBJECT,
  ADD_TEACHER,
  MODIFY_DEPARTMENT,
  RESET_CURRENT_DEPARTMENT,
  MODIFY_PROGRAMME,
  RESET_CURRENT_PROGRAMME,
  MODIFY_SUBJECT,
  RESET_CURRENT_SUBJECT,
  MODIFY_TEACHER,
  RESET_CURRENT_TEACHER,
  ADD_DEPARTMENT_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  student: null,
  teacher: null,
  admin: null,
  firstLogin: false,
  isAdmin: false,
  adminData: { isDepartmentAdded: false },
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
        isAdmin: payload,
      };
    case ADMIN_LOGIN:
      localStorage.setItem('adminToken', payload.token);
      return {
        ...state,
        admin: payload,
        isAuthenticated: true,
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        adminData: { ...state.adminData, currentDepartment: payload },
      };
    case MODIFY_DEPARTMENT:
      return {
        ...state,
        adminData: { ...state.adminData, currentDepartment: payload },
      };
    case ADD_DEPARTMENT_SUCCESS:
      return {
        ...state,
        adminData: { ...state.adminData, isDepartmentAdded: payload },
      };
    case RESET_CURRENT_DEPARTMENT:
      return {
        ...state,
        adminData: { ...state.adminData, currentDepartment: null },
      };
    case ADD_PROGRAMME:
      return {
        ...state,
        adminData: { ...state.adminData, currentProgram: payload },
      };
    case MODIFY_PROGRAMME:
      return {
        ...state,
        adminData: { ...state.adminData, currentProgram: payload },
      };
    case RESET_CURRENT_PROGRAMME:
      return {
        ...state,
        adminData: { ...state.adminData, currentProgram: null },
      };
    case ADD_SUBJECT:
      return {
        ...state,
        adminData: { ...state.adminData, currentSubject: payload },
      };
    case MODIFY_SUBJECT:
      return {
        ...state,
        adminData: { ...state.adminData, currentSubject: payload },
      };
    case RESET_CURRENT_SUBJECT:
      return {
        ...state,
        adminData: { ...state.adminData, currentSubject: null },
      };
    case ADD_TEACHER:
      return {
        ...state,
        adminData: { ...state.adminData, currentTeacher: payload },
      };
    case MODIFY_TEACHER:
      return {
        ...state,
        adminData: { ...state.adminData, currentTeacher: payload },
      };
    case RESET_CURRENT_TEACHER:
      return {
        ...state,
        adminData: { ...state.adminData, currentTeacher: null },
      };
    default:
      return state;
  }
}
