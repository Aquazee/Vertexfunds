import * as ACTION_TYPES from "./types";

export const Login = (data) => ({
  types: [
    ACTION_TYPES.USER_LOGIN_REQUESTED,
    ACTION_TYPES.USER_LOGIN_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "POST",
      url: "/generate-otp/",
      data: data,
    }
  }
});

export const signUp = (data) => ({
  types: [
    ACTION_TYPES.USER_SIGNUP_REQUESTED,
    ACTION_TYPES.USER_SIGNUP_SUCCESS,
    ACTION_TYPES.REQUEST_FAILED
  ],
  payload: {
    client: "default",
    request: {
      method: "POST",
      url: "/apis/auth/signup",
      data: data,
    }
  }
});

export function Logout() {
  return {
    type: ACTION_TYPES.LOGOUT,
    payload: {},
  };
}

export function updateAuthData(data) {
  return {
    type: ACTION_TYPES.UPDATE_AUTH_DATA,
    payload: data,
  };
}
