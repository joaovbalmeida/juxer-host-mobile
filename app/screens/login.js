import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import actions from '../store/actions';

const {
  auth: authAction,
  fetchUser: fetchUserAction,
} = actions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  login() {
    Spotify.login().then((logged) => {
      if (logged) {
        Spotify.getMe().then((user) => {
          console.log(user);
          if (user.product === 'premium') {
            Spotify.getAuthAsync().then((auth) => {
              console.log(auth);
              this.props.auth(auth.accessToken, user).then((response) => {
                console.log(response);
                /* if (response.accessToken) {
                  this.props.fetchUser(user.email).then((result) => {
                    if (result.data[0]) {
                      this.props.navigation.navigate('App');
                    } else {
                      Alert.alert('Erro', 'Não foi possivel fazer login com esse email.');
                    }
                  });
                } */
              });
            });
          } else {
            Alert.alert('Ops', 'Sua conta precisa ser Premium para usar nosso serviço');
          }
        });
      } else {
        this.setState({ error: 'Login Cancelado' });
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
  fetchUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginConnector = connect(state => (
  {
    auth: state.auth.authenticated,
  }
), dispatch => (
  {
    auth: (token, credentials) => (
      dispatch(authAction(token, credentials))
    ),
    fetchUser: email => (
      dispatch(fetchUserAction(email))
    ),
  }
))(Login);

export default LoginConnector;
