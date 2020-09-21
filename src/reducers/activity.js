import { ACTIVITY_REQUESTED, ACTIVITY_SUCCESS, REQUEST_FAILED, UPDATE_ACTIVITY_DATA, LOADMOREACTIVITY_REQUESTED, LOADMOREACTIVITY_SUCCESS  } from '../actions/types';
import { THEMES } from '../themes/themes';

const initialAuthState = {
    loading: false,
    status: 0,
    feeds: [],
    empty: false,
    first: true,
    last: false,
    number: 0,
    totalElements: 0,
    totalPages: 1,
    pageSize: 15,
    page: 0,
    pageable: null,
    sort: null
};

function activity(state = initialAuthState, action) {
    const { type, payload, error } = action;
    switch (type) {
        case UPDATE_ACTIVITY_DATA:
            return Object.assign({}, state, payload);
        case ACTIVITY_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case ACTIVITY_SUCCESS:
            console.log('success')
            var obj = null;
            if (error) {
              return {
                ...state,
                status: error ? 0 : 1,
                loading: false
              }
            } else if (payload && payload.status == 200 && payload.data == "") {
              console.log('error' + error)
              return {
                ...state,
                status: error ? 0 : 1,
                loading: false,
                loggedout: true
              };
            } else {
              var payload1 = payload.data.data
              return {
                ...state,
                data: payload1.content,
                empty: payload1.empty,
                first: payload1.first,
                last: payload1.last,
                number: payload1.number,
                totalElements: payload1.totalElements,
                totalPages: payload1.totalPages,
                pageable: payload1.pageable,
                sort: payload1.sort,
                status: 1,
                loading: false
              }
            };
            case LOADMOREACTIVITY_REQUESTED:
      return {
        ...state,
        loading: false
      };
    case LOADMOREACTIVITY_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loadingM: false
        };
      } else if (payload.data.code == 3003) {
        return {
          ...state
        }
      } else {
        var payload1 = payload.data.data
        var data = state.feeds;
        data = data.concat(payload1.content)
        return {
          ...state,
          feeds: data,
          empty: payload1.empty,
          first: payload1.first,
          last: payload1.last,
          number: payload1.number,
          totalElements: payload1.totalElements,
          totalPages: payload1.totalPages,
          pageable: payload1.pageable,
          sort: payload1.sort,
          status: 1,
          loadingM: false
        }
      };
        case REQUEST_FAILED:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

export default activity;
