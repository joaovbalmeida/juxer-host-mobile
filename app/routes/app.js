import { createSwitchNavigator } from 'react-navigation';

import EventsStack from './events';
import PlayerScreen from '../screens/player';

const AppStack = createSwitchNavigator({
  Events: EventsStack,
  Player: PlayerScreen,
}, {
  initialRouteName: 'Events',
});

export default AppStack;
