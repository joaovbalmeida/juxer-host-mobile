import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Track from '../components/track';
import Clear from '../assets/images/clear.png';

class Queue extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', ''),
    headerStyle: {
      backgroundColor: '#0E1214',
      borderBottomWidth: 1,
      borderBottomColor: '#15191B',
    },
    headerTintColor: '#ff005a',
    headerTitleStyle: {
      fontFamily: 'Raleway',
      fontWeight: '800',
    },
    headerLeft: (
      <TouchableOpacity
        onPress={() => navigation.getParam('clear', () => {})()}
        style={{ paddingHorizontal: 10, marginLeft: 5, paddingVertical: 10 }}
      >
        <Image
          source={Clear}
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>
    ),
  });

  componentWillMount() {
    this.props.navigation.setParams({
      clear: this.props.screenProps.clear,
      title: this.props.event.name,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.playlists}
          data={this.props.event.queue
            ? this.props.event.queue.filter((_, k) => k > this.props.event.index)
            : []
          }
          renderItem={({ item, index }) => (
            <Track
              order={(index + 1).toString()}
              name={item.name}
              artist={item.artist}
              cover={item.cover}
              owner={item.owner}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item._id} // eslint-disable-line
        />
      </View>
    );
  }
}

Queue.propTypes = {
  event: PropTypes.shape({
    queue: PropTypes.array,
    index: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  screenProps: PropTypes.shape({
    clear: PropTypes.func.isRequired,
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
  }
), () => (
  {
  }
))(Queue);

export default QueueConnector;
