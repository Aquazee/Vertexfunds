import { NetInfo } from 'react-native';
import App, { getStore } from '../../App';
import { CONNECTION_STATE_CHANGED } from '../actions/types';

NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
  getStore.dispatch({
    type: CONNECTION_STATE_CHANGED,
    payload: isConnected,
  });
});

export const isConnected = () => App.isConnected();
