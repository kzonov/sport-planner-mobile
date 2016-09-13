import React, { NavigatorIOS, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    marginTop: 90,
    alignItems: 'center'
  }});

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.description}>
            {'Add an activity for the ' + this.state.date}
          </Text>
        </View>
      </View>
    );
  }
}

module.exports = AddActivity;
