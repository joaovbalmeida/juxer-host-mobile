import React from 'react';
import {
  StyleSheet,
  View,
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const ProgressBar = ({
  progress,
}) => Platform.select({
  ios: () => (
    <View style={styles.container}>
      <ProgressViewIOS
        progress={progress}
        progressTintColor="#FF005A"
        trackTintColor="#FFFFFF"
      />
    </View>
  ),
  android: () => (
    <View style={styles.container}>
      <ProgressBarAndroid
        progress={progress}
        color="#FF005A"
      />
    </View>
  ),
})();

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});

export default ProgressBar;
