import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Input } from '../components/Input.js';
import { Button } from '../components/Button';
import AppNavigation from '../AppNavigation';


export default class LogoutScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  _handleTextChange = event => {
  this.setState( {text: event.nativeEvent.text});
  global.name = this.state.text;
};

onPressLogOut() {
  firebase.auth().signOut()
	.then(() => {
	  this.setState({
		email: '',
		password: '',
		authenticating: false,
		user: null,
	  })
	  this.props.navigation.navigate('Login')
	}, error => {
	  console.error('Sign Out Error', error);
	});
  }

render() {
   return (
      <View style = {styles.container}>
		  <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
      </View>
    );
  }
}



const styles = StyleSheet.create({
	welcome: {
		margin: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	input: {
		fontSize: 20,
		borderWidth: 2,
		padding: 2,
		height: 40,
		width: 100,
		textAlign: "center"
	},
	title: {
		color: 'white',
		fontFamily: 'sans-serif',
		fontSize: 30,
	},
	otherText: {
		 color: 'lightgray',
		 fontSize: 20,
	 },
	 container: {
		 flex: 1,
		 backgroundColor: '#001F5B',
		 alignItems: 'center',
		 justifyContent: 'center',
	 },
	 coordinates: {
		 backgroundColor: 'white',
	 },
	 nameInput: {
		 height: 40,
		 width: 200,
		 backgroundColor: 'white',
		 borderColor: 'gray',
		 borderWidth: 1,
		 fontSize: 20,
	 },
	 buttonContainer: {
		 backgroundColor: 'lightgray',
		 margin: 30,
		 borderRadius: 10,
	 },
});
