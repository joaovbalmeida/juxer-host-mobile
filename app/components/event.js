import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

const Event = ({
  name,
  onPress,
}) => (
  <TouchableWithoutFeedback
    style={styles.container}
    onPress={onPress}
  >
    <View
      style={styles.view}
    >
      <Text>
        {name}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

Event.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

Event.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
  },
});

export default Event;
