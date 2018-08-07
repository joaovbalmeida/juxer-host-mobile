import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const Track = ({
  order,
  name,
  artist,
  album,
  cover,
  owner,
}) => (
  <View style={styles.container}>
    <Text>
      {order}
    </Text>
    <Image
      style={styles.image}
      resizeMode="contain"
      source={{ uri: cover }}
    />
    <View style={styles.rightSection}>
      <Text>
        {name}
      </Text>
      <Text>
        {artist}
         -
        {album}
      </Text>
      <Text>
        {owner}
      </Text>
    </View>
  </View>
);

Track.propTypes = {
  order: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
  },
  rightSection: {
  },
});

export default Track;
