import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Event = ({
  name,
}) => (
  <View style={styles.container}>
    <Text>
      {name}
    </Text>
  </View>
);

Event.propTypes = {
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Event;
