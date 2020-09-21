import { LOGIN, LOGOUT, THEME, REQUEST_FAILED, USER_LOGIN_REQUESTED, USER_LOGIN_SUCCESS, UPDATEPROFILEDETAILS, UPDATEPROFILEDETAILS_REQUESTED, UPDATEPROFILEDETAILS_SUCCESS, USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUESTED, UPDATE_AUTH_DATA, UPDATEPASSWORD_REQUESTED, UPDATEPASSWORD_SUCCESS, ADDFOLLOWER_REQUESTED, ADDFOLLOWER_SUCCESS, REMOVEFOLLOWER_REQUESTED, REMOVEFOLLOWER_SUCCESS } from '../actions/types';
import { THEMES } from '../themes/themes';

const initialAuthState = {
  loading: true,
  status: 0,
  userToken: null,
  interests: [],
  role: [],
  userId: "",
  user: null,
  mobile: "",
  username: "",
  theme: THEMES[1]
};

function auth(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case UPDATE_AUTH_DATA:
      return Object.assign({}, state, payload);
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case USER_LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        mobile: payload.data.ph_number,
        userid: payload.data.pk,
        status: error ? 0 : 1,
        loading: false
      };
    case USER_SIGNUP_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload.data.data,
        userToken: payload.data.data.authToken,
        interests: payload.data.data.interests,
        role: payload.data.data.role,
        userId: payload.data.data.userId,
        username: payload.data.data.username,
        status: error ? 0 : 1,
        loading: false
      };
    case REQUEST_FAILED:
      return {
        ...state,
        loading: false
      };
    case UPDATEPROFILEDETAILS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case UPDATEPROFILEDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: ''
      };
    case UPDATEPROFILEDETAILS:
      return {
        ...state,
        user: payload.data.data,
        interests: payload.data.data.interests
      };
    case UPDATEPASSWORD_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case UPDATEPASSWORD_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case LOGOUT:
      return {
        ...initialAuthState,
        loading: false
      }
    case THEME:
      return {
        ...state,
        theme: action.payload
      };
    case REMOVEFOLLOWER_REQUESTED:
      return {
        ...state,
        loading: false
      };
    case REMOVEFOLLOWER_SUCCESS:
      return {
        ...state,
        profile: action.payload.data.data,
        loading: false
      };
    default:
      return state;
  }
}

export default auth;
