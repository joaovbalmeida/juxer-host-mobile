import { createSwitchNavigator } from 'react-navigation';
import AuthStack from './auth';
import AppStack from './app';
import LoadingScreen from '../screens/loading';

export default createSwitchNavigator({
  Loading: LoadingScreen,
  Auth: AuthStack,
  App: AppStack,
}, {
  initialRouteName: 'Loading',
});
