import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login/Login'
import Signup from '../screens/Signup/Signup'
import Home from '../screens/Home/Home'
import OfferDetails from '../screens/OfferDetails/OfferDetails';
import Profile from '../screens/Profile/Profile'
import SavedOffers from '../screens/SavedOffers/SavedOffers';
import Notifications from '../screens/Notifications/Notifications';
screens = {
    login: {
        screen: Login,

    },
    signup: {
        screen: Signup,

    },
    home: {
        screen: Home,
        // navigationOptions: {
        //     headerStyle: {
        //         backgroundColor: 'blue'
        //     },
        //     title: 'Home'
        // },

    },
    offerDetails: {
        screen: OfferDetails
    },
    profile: {
        screen: Profile
    },
    savedOffers: {
        screen: SavedOffers
    },
    notifications: {
        screen: Notifications
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerShown: false
    }
})

export default createAppContainer(HomeStack)