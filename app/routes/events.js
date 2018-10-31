import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';
import EventScreen from '../screens/event';
import PlaylistScreen from '../screens/playlist';

const EventsStack = createStackNavigator({
  Home: HomeScreen,
  Event: EventScreen,
  Playlist: PlaylistScreen,
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerTintColor: '#ff005a',
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderBottomColor: '#15191B',
    },
  },
});

export default EventsStack;
