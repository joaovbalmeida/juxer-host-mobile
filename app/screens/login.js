import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import sptLogo from '../assets/images/sptLogo.png';
import logo from '../assets/images/logo.png';
import actions from '../store/actions';

const {
  auth: authAction,
  fetchUser: fetchUserAction,
  fetchSptUser: fetchSptUserAction,
  sptAuth: sptAuthAction,
} = actions;

class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  login() {
    this.props.sptAuth().then((result) => {
      if (result.refreshToken) {
        this.props.fetchSptUser().then((user) => {
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
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#d3006a', '#5d005e']} style={styles.gradient}>
          <Text style={styles.title}>
            JUXER
          </Text>
          <Image source={logo} style={styles.logo} />
          <View style={styles.middle}>
            <Text style={styles.subtitle}>
              Seja bem-vindo!
            </Text>
            <Text style={styles.welcome}>
              Faça login com sua conta do Spotify para criar seu jukebox virtual.
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => this.login()}
            style={styles.button}
            underlayColor="#17a349"
          >
            <Image source={sptLogo} style={styles.buttonImage} />
          </TouchableHighlight>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Raleway',
    color: 'white',
    fontWeight: '400',
    fontSize: 60,
  },
  subtitle: {
    fontFamily: 'Raleway',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    paddingBottom: 5,
  },
  welcome: {
    fontFamily: 'Raleway',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    height: 38,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#1ED760',
  },
  buttonImage: {
    width: 100,
    height: 30,
  },
  logo: {
    width: 100,
    height: 142,
  },
});

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
