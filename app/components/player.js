
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Placeholder from '../assets/images/coverPlaceholder.png';

const Player = ({
  name,
  artist,
  album,
  cover,
  owner,
  visible,
  hide,
}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={hide}
        >
          <View style={{ padding: 15 }}>
            <Image
              style={styles.upArrow}
              source={Placeholder}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mid}>
        <Image
          style={{ height: 150, width: 150, alignSelf: 'center', borderRadius: 10 }}
          source={cover || Placeholder}
        />
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
  </Modal>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  cover: PropTypes.string,
  owner: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

Player.defaultProps = {
  cover: Placeholder,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1214',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  mid: {
    alignItems: 'center',
  },
  upArrow: {
    width: 20,
    height: 20,
  },
  playArrow: {
    width: 27,
    height: 27,
  },
});

export default Player;
