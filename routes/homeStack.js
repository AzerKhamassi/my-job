import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login/Login'
import Signup from '../screens/Signup/Signup'
import Home from '../screens/Home/Home'

screens = {
    login: {
        screen: Login,
    },
    signup: {
        screen: Signup
    },
    home: {
        screen: Home
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerShown: false
    }
})

export default createAppContainer(HomeStack)