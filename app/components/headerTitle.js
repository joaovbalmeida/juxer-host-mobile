import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const HeaderTitle = ({
  title,
}) => (
  <Text style={styles.title}>
    {title}
  </Text>
);

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Raleway',
    fontSize: 16,
    color: '#ff005a',
    fontWeight: '600',
  },
});

export default HeaderTitle;
