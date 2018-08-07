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
});

export default EventsStack;
