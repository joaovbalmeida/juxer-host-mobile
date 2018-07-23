import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import actions from '../store/actions';

const {
  logout: logoutAction,
} = actions;

class Home extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
      <View>
        <Text>
          If you like React on the web, like React Native.
        </Text>
        <Text>
          You just use native components like
          instead of web components like
        </Text>
        <Button
          title="logout"
          onPress={() => {
            this.props.logout().then(() => {
              this.props.navigation.navigate('Auth');
            });
          }}
        />
      </View>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const HomeConnector = connect(() => (
  {
  }
), dispatch => (
  {
    logout: () => (
      dispatch(logoutAction())
    ),
  }
))(Home);

export default HomeConnector;
