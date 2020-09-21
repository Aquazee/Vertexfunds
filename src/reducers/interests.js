import { REQUEST_FAILED, GETINTEREST_REQUESTED, GETINTEREST_SUCCESS, POSTINTERESTS_REQUESTED, POSTINTERESTS_SUCCESS  } from '../actions/types';

const initialAuthState = {
  loading: true,
  status:0,
  data: null
};

function auth(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case GETINTEREST_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case GETINTEREST_SUCCESS:
      var all = {"id":"","name":"ALL","version":0,"createdDate":"","modifiedDate":""};
      var temp = payload.data.data;
      temp.unshift(all)
      return {
        ...state,
        data: payload.data.data,
        status: error ? 0 : 1,
        loading: false
      };
    case POSTINTERESTS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case POSTINTERESTS_SUCCESS:
      return {
        ...state,
        feeds: payload,
        status: error ? 0 : 1,
        loading: false
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
