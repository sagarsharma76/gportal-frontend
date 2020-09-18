import * as actionTypes from './action-types';

const initialState = {
  token : null
}

export default function AuthenticationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        user: action.token
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        token: action.token
      };
    case actionTypes.LOGOUT:
      return {
        token:null
      };
    default:
      return state
  }
}