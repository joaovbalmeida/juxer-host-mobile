import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { paramsForServer } from 'feathers-hooks-common';

import api from '../api';
import Track from '../components/track';
import actions from '../store/actions';

const {
  stopEvent: stopEventAction,
} = actions;

class Queue extends Component {
  static navigationOptions = () => ({
    title: 'Fila',
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderColor: '#15191B',
    },
    headerTintColor: '#ff005a',
    headerTitleStyle: {
      fontFamily: 'Raleway',
      fontWeight: '800',
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.playlists}
          data={this.props.event.queue}
          renderItem={({ item, index }) => {
            if (index === 0) return null;
            return (
              <Track
                order={index.toString()}
                name={item.name}
                artist={item.artist}
                cover={item.cover}
                owner={item.owner}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id} // eslint-disable-line
        />
        <Button
          title="Criar Evento"
          onPress={() => {
            api.events.patch(this.props.event._id, { $push: { queue: {
              name: 'Mr Blue Sky',
              album: 'Out of the Blue',
              artist: 'Electric Light Orchestra',
              cover: 'https://i.scdn.co/image/1c4bacfab0e2fc59ea1f400bac4b57d9382476f5',
              owner: 'joaovbalmeida',
              uri: 'spotify:track:2RlgNHKcydI9sayD2Df2xp',
            }}}, paramsForServer({ user: this.props.user }));
          }}
        />
      </View>
    );
  }
}

Queue.propTypes = {
  event: PropTypes.shape({
    queue: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playlists: {
    backgroundColor: '#15191B',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#15191B',
  },
});

const QueueConnector = connect(state => (
  {
    event: state.event.event.data,
    user: state.auth.user.data,
  }
), dispatch => (
  {
    stopEvent: event => (
      dispatch(stopEventAction(event))
    ),
  }
))(Queue);

export default QueueConnector;
