import * as ACTION_TYPES from "./types";

export const getAllItems = (userId, page, size) => ({
  types: [
    ACTION_TYPES.GETITEMS_REQUESTED,
    ACTION_TYPES.GETITEMS_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/post/list?userId=" + userId + "&page=" + page + "&size=" + size,
      // params: { userId: userId, page: page, size: size }
      // data: { params: { userId, page, size } },
    }
  }
});


