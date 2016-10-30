import React, { NavigatorIOS, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage
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
  },
  standardInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 2,
    color: '#48BBEC'
  },
  multilineInput: {
    height: 72,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 2,
    color: '#48BBEC'
  },
  buttonText: {
    marginTop: 1,
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTitle: '',
      activityDescription: ''
    };
  }

  async createActivity() {
    activityData = {
      date: this.props.date,
      activityTitle: this.state.activityTitle,
      activityDescription: this.state.activityDescription
    }

    try {
      await AsyncStorage.getItem('@ActivityStore:activities').then((result) =>  activities = result)
      console.log('old data: ' + activities);
      if(Array.isArray(activities) == false) {
        activities = [activities];
      }
      console.log('old data: ' + activities);
      activities.push(activityData)
      console.log('new_data: ' + activities);
      await AsyncStorage.setItem('@ActivityStore:activities', JSON.stringify(activities));
      await AsyncStorage.getItem('@ActivityStore:activities', (err, result) => {
        console.log('new data: ' + result);
      });
    } catch (error) {
      console.error('Error on ' + this.prototype + ': ' + error);
    }
  }

  async getAndUseVariables() {
    var activities = await AsyncStorage.getItem('@ActivityStore:activities');
    this.setState({ activities: activities });
  }


  async onAddPressed() {
    try {
      await this.createActivity();
      await this.getAndUseVariables();
    } catch (error) {
      console.error('Error on ' + this.prototype + ': ' + error);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.description}>
            {'Add an activity for the ' + this.props.date}
          </Text>
          <TextInput
            style={styles.standardInput}
            value={this.state.activityTitle}
            onChangeText={(title) => {this.setState({ activityTitle: title })}}
            placeholder='Title of the activity'/>
          <TextInput
            style={styles.multilineInput}
            value={this.state.activityDescription}
            onChangeText={(description) => {this.setState({ activityDescription: description })}}
            multiline={true}
            placeholder='Description for the activity'/>
          <TouchableHighlight style={styles.button} onPress={this.onAddPressed.bind(this)}
              underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <Text style={styles.description}>
            '{this.state.activities}'
          </Text>
        </View>
      </View>
    );
  }
}

module.exports = AddActivity;
