import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Subtitle = ({
  subtitle,
}) => (
  <View style={styles.container}>
    <Text style={styles.subtitle}>
      {subtitle}
    </Text>
  </View>
);

Subtitle.propTypes = {
  subtitle: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 5,
    justifyContent: 'center',
  },
  subtitle: {
    fontFamily: 'Raleway',
    fontSize: 12,
    color: 'white',
  },
});

export default Subtitle;
