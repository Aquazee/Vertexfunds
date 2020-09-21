import { REQUEST_FAILED, ADDSTORY_REQUESTED, TRENDINGPOSTS_REQUESTED, TRENDINGPOSTS_SUCCESS, ADDFOLLOWER_REQUESTED, SEARCHUSER_REQUESTED,SEARCHUSER_SUCCESS, ADDFOLLOWER_SUCCESS, ADDSTORY_SUCCESS, GETSTORIES_REQUESTED, GETSTORIES_SUCCESS, DELETESTORY_REQUESTED, DELETESTORY_SUCCESS, UPDATELIKE_REQUESTED, UPDATELIKE_SUCCESS, DELETEPOSTLIKE_REQUESTED, DELETEPOSTLIKE_SUCCESS, LOADMORESTORIES_REQUESTED, LOADMORESTORIES_SUCCESS } from '../actions/types';

const initialAuthState = {
  loading: false,
  loadingM: false,
  status: 0,
  feeds: [],
  empty: false,
  first: true,
  last: false,
  number: 0,
  totalElements: 0,
  totalPages: 1,
  pageSize: 2,
  page: 0,
  pageable: null,
  sort: null,
  tposts:null,
  searchedUsers: []
};

function auth(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case ADDSTORY_REQUESTED:
      var x = state.feeds
      x.unshift(payload)
      return {
        ...state,
        //feeds: x
      };
    case ADDSTORY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case TRENDINGPOSTS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case TRENDINGPOSTS_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loading: false
        }
      } else if (payload && payload.status == 200 && payload.data == "") {
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
          tposts: payload1,
          status: 1,
          loading: false
        }
      };
    case GETSTORIES_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case GETSTORIES_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loading: false
        }
      } else if (payload && payload.status == 200 && payload.data == "") {
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
          feeds: payload1.content,
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
    case SEARCHUSER_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case SEARCHUSER_SUCCESS:
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
          searchedUsers: payload1,
          // empty: payload1.empty,
          // //first: payload1.first,
          // //last: payload1.last,
          // snumber: payload1.number,
          // stotalElements: payload1.totalElements,
          // stotalPages: payload1.totalPages,
          // spageable: payload1.pageable,
          // ssort: payload1.sort,
          // status: 1,
          loading: false
        }
      };
    case LOADMORESTORIES_REQUESTED:
      console.log("requested")
      return {
        ...state,
        loading: false
      };
    case LOADMORESTORIES_SUCCESS:
      
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
    case UPDATELIKE_REQUESTED:
      return {
        ...state,
        //loading: true
      };
    case UPDATELIKE_SUCCESS:
      var { data } = payload
      return {
        ...state,
        status: data.code == 2000 ? 0 : 1,
        feeds: data.code == 2000 ? state.feeds.map(i => {
          if (data.data.id == i.id) {
            i.likes = data.data.likes
            return i
          } else {
            return i
          }
        }) : state.feeds,
        loading: false
      };
    case ADDFOLLOWER_REQUESTED:
      return {
        ...state,
        loading: false
      };
    case ADDFOLLOWER_SUCCESS:
      var { data } = payload
      return {
        ...state,
        status: data.code == 2000 ? 0 : 1,
        feeds: data.code == 2000 ? state.feeds.map(i => {
          i.user.following.push(data.data);
          i.user.totalFollowing =  i.user.totalFollowing + 1
          return i
        }) : state.feeds,
        loading: false
      };
    case DELETEPOSTLIKE_REQUESTED:
      return {
        ...state,
        //loading: true
      };
    case DELETEPOSTLIKE_SUCCESS:
      if (payload.data.code == 2000) {
        return {
          ...state,
          feeds: state.feeds.map(i => {
            if (i.id == payload.data.data.id)
              i.likes = payload.data.data.likes
            return i
          }),
          status: 1,
          loading: false
        }
      } else {
        return {
          ...state,
          status: 0,
          loading: false
        };
      }
    case DELETESTORY_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case DELETESTORY_SUCCESS:
      return {
        ...state,
        //feed: payload,
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
