
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import actions from '../store/actions';

const { checkToken: checkTokenAction } = actions;

class Loading extends Component {
  componentDidMount() {
    const spotifyOptions = {
      clientID: '84f3966b6522451686c303f5900fc12b',
      sessionUserDefaultsKey: 'SpotifySession',
      redirectURL: 'juxerhost://auth',
      scopes: ['user-read-private', 'user-read-email', 'playlist-read', 'playlist-read-private', 'streaming'],
    };

    Promise.all([
      this.props.checkToken(),
      Spotify.initialize(spotifyOptions),
    ]).then((response) => {
      console.log(response);
      if (response[0].code === 401) {
        this.props.navigation.navigate('Auth');
      } else if (response[1]) {
        this.props.navigation.navigate('App');
      }
      this.props.navigation.navigate('Auth');
    }).catch((error) => {
      console.log(error);
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Juxer
        </Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

Loading.propTypes = {
  checkToken: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoadingConnector = connect(() => (
  {
  }
), dispatch => (
  {
    checkToken: () => (
      dispatch(checkTokenAction())
    ),
  }
))(Loading);

export default LoadingConnector;
