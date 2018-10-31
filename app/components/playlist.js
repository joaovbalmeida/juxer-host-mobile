import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

import tickIcon from '../assets/images/tick.png';

const Playlist = ({
  name,
  qty,
  image,
  onPress,
  selected,
  disabled,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    disabled={disabled}
  >
    <ImageBackground
      style={styles.image}
      resizeMode="contain"
      source={{ uri: image }}
    >
      {
        selected
          ? (
            <ImageBackground style={styles.imageSelected}>
              <Image
                style={{ height: 50, width: 69 }}
                source={tickIcon}
              />
            </ImageBackground>
          ) : null
      }
    </ImageBackground>
    <Text style={styles.text}>
      {name}
    </Text>
    <Text style={styles.text}>
      {`${qty} `}
      Músicas
    </Text>
  </TouchableOpacity>
);

Playlist.propTypes = {
  name: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Playlist.defaultProps = {
  selected: false,
  disabled: false,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 220,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
  },
  imageSelected: {
    height: 150,
    width: 150,
    backgroundColor: 'rgba(0,0,0,.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Raleway',
  },
});

export default Playlist;
