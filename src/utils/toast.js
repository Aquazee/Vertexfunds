import Toast from 'react-native-root-toast';
import configureStore from '../stores/configureStore';
// import ConstantColor from "../theme/ConstantColor";
const { persistor, store } = configureStore();
export const showToast = (msg) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: store.getState().auth.theme.primaryColor,
    textColor: store.getState().auth.theme.container.backgroundColor,
  });
};

export const showCenterToast = (msg) => {
  let toast = Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: getStore.getState().auth.theme.primaryColor,
    textColor: getStore.getState().auth.theme.container.backgroundColor,
  });
};

