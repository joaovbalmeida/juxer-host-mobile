import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  auth: authAction,
  fetchUser: fetchUserAction,
  fetchSptUser: fetchSptUserAction,
  sptAuth: sptAuthAction,
} = actions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  login() {
    this.props.sptAuth().then((result) => {
      if (result.refreshToken) {
        this.props.fetchSptUser().then((user) => {
          if (user.product === 'premium') {
            this.props.auth().then((response) => {
              if (response.accessToken) {
                const credentials = {
                  email: user.email,
                  name: user.display_name,
                  picture: user.images.length ? user.images[0].url : null,
                  spotifyId: user.id,
                };
                this.props.fetchUser(credentials).then((data) => {
                  if (data.createdAt || data.data.length) {
                    this.props.navigation.navigate('App');
                  } else {
                    Alert.alert('Erro', 'Não foi possivel fazer login com esse email.');
                  }
                });
              }
            });
          }
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.error}
        </Text>
        <Button
          title="Spotify Login"
          onPress={() => this.login()}
        />
      </View>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.func.isRequired,
  sptAuth: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchSptUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginConnector = connect(() => (
  {
  }
), dispatch => (
  {
    auth: token => (
      dispatch(authAction(token))
    ),
    sptAuth: () => (
      dispatch(sptAuthAction())
    ),
    fetchUser: email => (
      dispatch(fetchUserAction(email))
    ),
    fetchSptUser: () => (
      dispatch(fetchSptUserAction())
    ),
  }
))(Login);

export default LoginConnector;
