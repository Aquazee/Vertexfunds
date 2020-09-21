import { REQUEST_FAILED, ALLCOMPETITION_REQUESTED, ALLCOMPETITION_SUCCESS, GETARCHIVEDCOMPETITION_REQUESTED, GETARCHIVEDCOMPETITION_SUCCESS, UPDATESELECTEDFILTER, GETCOMPETITIONDETAILS_REQUESTED, GETCOMPETITIONDETAILS_SUCCESS } from '../actions/types';
import { THEMES } from '../themes/themes';
import { AUDIENCE } from '../actions/roles';

const initialAuthState = {
  loading: true,
  status: 0,
  data: [],
  archivedData: [],
  page: 0,
  role: AUDIENCE,
  pageSize: 1,
  totalPages: 1,
  selectedFilter: null,
};

function competition(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case ALLCOMPETITION_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case ALLCOMPETITION_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loading: false
        };
      } else if (payload.data.code == 3001) {
        return {
          ...state,
          data: []
        }
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
    case UPDATESELECTEDFILTER:
      return {
        ...state,
        selectedFilter: payload
      };
    case GETARCHIVEDCOMPETITION_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case GETARCHIVEDCOMPETITION_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loading: false
        };
      } else if (payload.data.code == 3002) {
        return {
          ...state,
          loading: false,
          archivedData: []
        }
      } else {
        var payload1 = payload.data.data
        return {
          ...state,
          archivedData: payload1.content,
          arcNumber: payload1.number,
          arcTotalElements: payload1.totalElements,
          arcTotalPages: payload1.totalPages,
          status: 1,
          loading: false
        }
      };
    case GETCOMPETITIONDETAILS_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case GETCOMPETITIONDETAILS_SUCCESS:
      var obj = null;
      if (error) {
        return {
          ...state,
          status: error ? 0 : 1,
          loading: false
        };
      } else {
        return {
          ...state,
          CompetitionData: payload.data.data,
          status: 1,
          loading: false
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

export default competition;
