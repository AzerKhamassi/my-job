import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/Notifications/Notifications'
import SavedOffersScreen from '../screens/SavedOffers/SavedOffers'
import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import { Foundation } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferDetails from '../screens/OfferDetails/OfferDetails';
import { Text, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import logo from '../assets/my-job.png'
const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const SavedOffersStack = createNativeStackNavigator()
import { Feather } from '@expo/vector-icons';

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomePage" component={HomeScreen} options={{
                title: '',
                headerLeft: (props) => (
                    <React.Fragment>
                        <Image source={logo} alt='logo' style={{ height: 30, width: 55, marginHorizontal: 10 }}></Image>
                    </React.Fragment>
                ),
            }} />
            <HomeStack.Screen name="OfferDetails" component={OfferDetails} options={{
                title: 'Offer Details',
            }} />
        </HomeStack.Navigator>
    );
}

const SavedOffersStackScreen = () => {
    return (
        <SavedOffersStack.Navigator>
            <SavedOffersStack.Screen name="Saved Offers" component={SavedOffersScreen} options={{

            }} />
            <SavedOffersStack.Screen name="OfferDetails" component={OfferDetails} options={{
                title: 'Offer Details',

            }} />
        </SavedOffersStack.Navigator>
    );
}

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
            <Tab.Screen name='Home' component={HomeStackScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <FontAwesome name="home" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                ),
                tabBarActiveTintColor: '#52BCF6',
                headerShown: false


            }} />
            <Tab.Screen name='SavedOffersStack' component={SavedOffersStackScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <Foundation name="bookmark" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                ),
                tabBarActiveTintColor: '#52BCF6',
                headerShown: false,
                title: 'Saved Offers'
            }} />
            <Tab.Screen name='Notifications' component={NotificationsScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <FontAwesome name="bell" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                ),
                tabBarActiveTintColor: '#52BCF6',
                tabBarBadge: 3
            }} />
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <FontAwesome name="user" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                ),
                tabBarActiveTintColor: '#52BCF6',
            }} />
        </Tab.Navigator>
    )
}

export default Tabs