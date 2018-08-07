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
  createEvent: createEventAction,
} = actions;

class Queue extends Component {
  static navigationOptions = () => ({
    title: 'Evento',
  });

  render() {
    return (
      <View>
        <FlatList
          style={styles.playlists}
          data={this.props.event.queue}
          renderItem={({ item, index }) => (
            <Track
              order={index.toString()}
              name={item.name}
              artist={item.artist}
              album={item.album}
              cover={item.cover}
              owner={item.owner}
            />
          )}
          keyExtractor={item => item._id} // eslint-disable-line
        />
        <Button
          title="Criar Evento"
          onPress={() => {
            api.events.patch(this.props.event._id, { $push: { queue: {
              name: 'Baby Im Yours (feat. Irfane)',
              album: 'By Your Side',
              artist: 'Breakbot',
              cover: 'https://i.scdn.co/image/1c4bacfab0e2fc59ea1f400bac4b57d9382476f5',
              owner: 'joaovbalmeida',
              uri: 'spotify:track:4qPTaehSZWKeaIgiIyprLs',
            }}}, paramsForServer({ user: this.props.user }));
          }}
        />
      </View>
    );
  }
}

Queue.propTypes = {
  event: PropTypes.shape({
    queue: PropTypes.array.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  playlists: {
    height: '80%',
    width: '100%',
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
  },
  rightView: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const QueueConnector = connect(state => (
  {
    event: state.event.event.data,
    user: state.auth.user.data,
  }
), dispatch => (
  {
    createEvent: event => (
      dispatch(createEventAction(event))
    ),
  }
))(Queue);

export default QueueConnector;
