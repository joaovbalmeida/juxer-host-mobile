import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';
import EventScreen from '../screens/event';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Event: EventScreen,
}, {
  initialRouteName: 'Home',
});

export default AppStack;
