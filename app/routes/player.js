import { createStackNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';
import SettingsScreen from '../screens/settings';

const PlayerStack = createStackNavigator({
  Queue: QueueScreen,
  Settings: SettingsScreen,
}, {
  initialRouteName: 'Queue',
});

export default PlayerStack;
