import * as ACTION_TYPES from "./types";

export const UpdateProfileDetails1 = (data) => ({
  type: ACTION_TYPES.UPDATEPROFILEDETAILS,
  payload: data
});

export const getOtherProfiles = (id) => ({
  types: [
    ACTION_TYPES.OTHERPROFILE_REQUESTED,
    ACTION_TYPES.OTHERPROFILE_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/users/id/?userId=" + id,
    }
  }
});

export const getFollowers = (id, page, size) => ({
  types: [
    ACTION_TYPES.GETFOLLOWER_REQUESTED,
    ACTION_TYPES.GETFOLLOWER_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/users/follow/followers?userId=" + id + "&page=" + page +"&size=" + size,
    }
  }
});

export const getFollowing = (id, page, size) => ({
  types: [
    ACTION_TYPES.GETFOLLOWING_REQUESTED,
    ACTION_TYPES.GETFOLLOWING_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/users/follow/following?userId=" + id + "&page=" + page +"&size=" + size,
    }
  }
});

export const getPostByUserId = (id, page, size) => ({
  types: [
    ACTION_TYPES.GETPOSTSBYUSER_REQUESTED,
    ACTION_TYPES.GETPOSTSBYUSER_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "GET",
      url: "/apis/post/list/user?userId=" + id + "&page=" + page +"&size=" + size,
    }
  }
});