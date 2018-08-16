import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

const ImageButton = ({
  image,
  onPress,
  height,
  width,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 15 }}>
      <Image
        style={{
          height,
          width,
          alignSelf: 'center',
        }}
        source={image}
      />
    </View>
  </TouchableOpacity>
);

ImageButton.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onPress: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default ImageButton;
