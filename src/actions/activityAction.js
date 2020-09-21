import * as ACTION_TYPES from "./types";

export const getActivity = (userId, page, pageSize) => ({
  types: [
    ACTION_TYPES.ACTIVITY_REQUESTED,
    ACTION_TYPES.ACTIVITY_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/activity/list?userId=" + userId + "&page=" + page + "&size=" + pageSize,
    }
  }
});

export const loadMoreActivity = (userId, page, size) => ({
  types: [
    ACTION_TYPES.LOADMOREACTIVITY_REQUESTED,
    ACTION_TYPES.LOADMOREACTIVITY_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/activity/list?userId=" + userId + "&page=" + page + "&size=" + size,
      // params: { userId: userId, page: page, size: size }
      // data: { params: { userId, page, size } },
    }
  }
});
