import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { multiClientMiddleware } from "redux-axios-middleware";
import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from "redux-thunk";
import { name as appName } from "../../app.json";
import clients from "./clients";
import rootReducer from "../reducers";
const middlewareConfig = {
  interceptors: {
    request: [{
      success: function ({ getState, dispatch, getSourceAction }, req) {
        var token = getState().auth.userToken;
        req.headers.Authorization = `Bearer ${token}`
        return req;
      },
      error: function ({ getState, dispatch, getSourceAction }, error) {
        return error
      }
    }]
  }
}

const persistConfig = {
  key: "root",
  blacklist: [],
  whitelist: ["auth"],
  keyPrefix: appName,
  storage: AsyncStorage
};
const middlewares = [
  thunkMiddleware,
  multiClientMiddleware(clients, middlewareConfig),
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  let persistor = persistStore(store);
  return { store, persistor };
};
