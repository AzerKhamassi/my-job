import React from 'react'
import { StyleSheet, StatusBar, Platform } from 'react-native'
import Navigator from './routes/homeStack'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login/Login'
import Tabs from './navigation/tabs';
import Signup from './screens/Signup/Signup';
import OfferDetails from './screens/OfferDetails/OfferDetails';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <React.Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          {/* <Stack.Screen name="OfferDetails" component={OfferDetails} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
        {/* <Tabs /> */}
      </NavigationContainer>
      {/* <Navigator /> */}
    </React.Fragment>


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