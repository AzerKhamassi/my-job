import React from 'react'
import { StyleSheet, StatusBar, Platform } from 'react-native'
import Navigator from './routes/homeStack'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './navigation/tabs';
const App = () => {
  return (
    <React.Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <Navigator />
    </React.Fragment>
    // <NavigationContainer>
    //   <Tabs />
    // </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default App