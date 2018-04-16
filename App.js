//
// import { StyleSheet, Text, View, Text, Input, Linking, WebView } from 'react-native';
//
// export default class App extends Component<{}> {
//
//   render() {
//
//     return (
//
//       <View style={styles.MainContainer}>
//
//         <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3') } >Click Here To Open Google.</Text>
//
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//
//   MainContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//
//   TextStyle: {
//
//     color: '#E91E63',
//     textDecorationLine: 'underline'
//
//   }
// });

import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text onPress={ ()=>  Linking.openURL(item.href.replace(/\\/,"")) }>{item.title + "\n"}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
