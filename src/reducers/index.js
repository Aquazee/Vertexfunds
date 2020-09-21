import {combineReducers} from 'redux';
import auth from './auth';
import feeds from './feed';
import competition from './competition';
import interests from './interests';
import user from './user';
import activity from './activity';

const AppReducer = combineReducers({
  auth,
  feeds,
  competition,
  user,
  interests,
  activity
});

export default AppReducer;
