import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/login';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
});

export default AuthStack;
