import {StackNavigator, DrawerNavigator} from 'react-navigation';

import LoginScreen from './containers/LoginScreen';
import RecipeScreen from './containers/RecipeScreen';
import SearchScreen from './containers/SearchScreen';
import HomeScreen from './containers/HomeScreen';
import LogoutScreen from './containers/LogoutScreen';

const LoginStack = StackNavigator({
  Login: { screen: LoginScreen },
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are not logged in',
    headerTintColor: 'white'
  }
});

const DrawerStack = DrawerNavigator({
  Search: { screen: SearchScreen },
  Home: { screen: HomeScreen},
  LogOut: {screen: LogoutScreen}
});

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
  })
});

const RootStack = StackNavigator(
{
	loginStack: { screen: LoginStack},
	drawerStack: { screen: DrawerNavigation }
},
	{
		headerMode: 'none',
		title: 'Main',
		initialRouteName: 'loginStack',
	}
);

export default RootStack
