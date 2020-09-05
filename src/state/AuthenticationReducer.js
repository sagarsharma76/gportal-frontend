import * as actionTypes from './action-types';

const initialState = {
  loggedIn: false,
  user : null
}

export default function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state
  }
}