import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Input } from '../components/Input.js';
import { Button } from '../components/Button';
import AppNavigation from '../AppNavigation';

export default class LoginScreen extends React.Component{
	state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
	}
	onPressSignIn() {
    this.setState({
      authenticating: true,
    });

	const { email, password } = this.state;

	firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
          }))
      })
	}

	onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
	}
	  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
		this.props.navigation.navigate('Home', {user: this.state.email})
       // <View style={styles.form}>
       //   <Text>Logged In</Text>
       //   <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
       // </View>
      )
    }

    return (
      <View style={styles.form}>
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => this.onPressSignIn()}>Log In</Button>
        <Text>{this.state.error}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container1}>
        {this.renderCurrentState()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },

  TextStyle: {

	color: '#E91E63',
	fontSize: 20,

},
  flatListItem: {
        color: 'white',
		textDecorationLine: 'underline',
        padding: 10,
        fontSize: 16,
},
container1: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});
