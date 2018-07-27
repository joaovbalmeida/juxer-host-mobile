import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Playlist = ({
  name,
  qty,
  image,
}) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      resizeMode="contain"
      source={{ uri: image }}
    />
    <Text>
      {name}
    </Text>
    <Text>
      {`${qty} `}
      Músicas
    </Text>
  </View>
);

Playlist.propTypes = {
  name: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
  },
});

export default Playlist;
