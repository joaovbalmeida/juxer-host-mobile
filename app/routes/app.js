import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';

const AppStack = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home',
});

export default AppStack;
