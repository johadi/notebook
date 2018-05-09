import actionTypes from '../actionTypes';

const initialState = {
  registrationValidationErrors: {},
  registrationIsLoading: false,
  registrationFailure: null,
  loginValidationErrors: {},
  loginIsLoading: false,
  loginFailure: null,
  isAuthenticated: false,
  isAuthLoading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginIsLoading: false,
        loginValidationErrors: {},
        loginFailure: null,
        isAuthenticated: true
      };
    case actionTypes.LOGIN_VALIDATION_ERROR:
      return {
        ...state,
        loginIsLoading: false,
        loginFailure: null,
        loginValidationErrors: action.payload
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loginIsLoading: false,
        loginFailure: action.payload,
        loginValidationErrors: {}
      };
    case actionTypes.LOGIN_LOADING:
      return {
        ...state,
        loginIsLoading: true,
        loginFailure: null
      };
    case actionTypes.LOGIN_CLEAR_ERRORS:
      return {
        ...state,
        loginIsLoading: false,
        loginFailure: null,
        loginValidationErrors: {}
      };
    case actionTypes.REGISTRATION_VALIDATION_ERROR:
      return {
        ...state,
        registrationIsLoading: false,
        registrationFailure: null,
        registrationValidationErrors: action.payload
      };
    case actionTypes.REGISTRATION_FAILURE:
      return {
        ...state,
        registrationIsLoading: false,
        registrationValidationErrors: {},
        registrationFailure: action.payload
      };
    case actionTypes.REGISTRATION_LOADING:
      return {
        ...state,
        registrationIsLoading: true,
        registrationFailure: null
      };
    case actionTypes.REGISTRATION_CLEAR_ERRORS:
      return {
        ...state,
        registrationIsLoading: false,
        registrationValidationErrors: {},
        registrationFailure: null
      };
    case actionTypes.REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationIsLoading: false,
        registrationValidationErrors: {},
        registrationFailure: null,
        isAuthenticated: true
      };
    case actionTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        isAuthenticated: true
      };
    case actionTypes.AUTHENTICATE_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false

      };
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;

  }
}
