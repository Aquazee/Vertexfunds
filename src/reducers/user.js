import { REQUEST_FAILED, GETPOSTSBYUSER_SUCCESS, GETPOSTSBYUSER_REQUESTED, OTHERPROFILE_REQUESTED, OTHERPROFILE_SUCCESS, GETFOLLOWER_REQUESTED, GETFOLLOWER_SUCCESS, GETFOLLOWING_REQUESTED, GETFOLLOWING_SUCCESS } from '../actions/types';
import { THEMES } from '../themes/themes';

const initialAuthState = {
  loading: false,
  status: 0,
  profile: null,
  follower: null,
  following: null,
  postsData: {
    totalPages: 1,
    pageSize: 15,
    page: 0,
    content: []
  },
  postsLoading: false
};

function auth(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {

    case OTHERPROFILE_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case OTHERPROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.data.data,
        loading: false
      };
    case GETFOLLOWER_REQUESTED:
      return {
        ...state,
        loading: false
      };
    case GETFOLLOWER_SUCCESS:
      return {
        ...state,
        follower: action.payload.data.data,
        loading: false
      };
    case GETFOLLOWING_REQUESTED:
      return {
        ...state,
        loading: false
      };
    case GETFOLLOWING_SUCCESS:
      return {
        ...state,
        following: action.payload.data.data,
        loading: false
      };
    case GETPOSTSBYUSER_REQUESTED:
      return {
        ...state,
        postsLoading: true
      };
    case GETPOSTSBYUSER_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          postsLoading: false
        };
      } else if (payload.data.code == 3005) {
        return {
          ...state,
          data: []
        }
      } else {
        var payload1 = payload.data.data
        return {
          ...state,
          postsData: payload1,
          status: 1,
          postsLoading: false
        }
      };
    case REQUEST_FAILED:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default auth;
