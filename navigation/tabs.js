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
import { AntDesign } from '@expo/vector-icons';
import SettingsScreen from '../screens/Settings/Settings';
import GlobalContext from '../context/GlobalContext';
import Company from '../screens/Company/CompanyProfile';
import Business from '../screens/Business/Business';
import SecurityScreen from '../screens/Security/Security'
import SearchedOffers from '../screens/SearchedOffers/SearchedOffers';


const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const SavedOffersStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const CompanyProfileStack = createNativeStackNavigator()


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
                headerRight: (props) => (
                    <AntDesign style={{ marginHorizontal: 20 }} name="message1" size={30} color="#A7A7A7" />
                )
            }} />
            <HomeStack.Screen name="OfferDetails" component={OfferDetails} options={{
                title: 'Offer Details',
            }} />
            <HomeStack.Screen name="Company" component={Company} options={{

            }} />
            <HomeStack.Screen name="Business" component={Business} options={{

            }} />
            <HomeStack.Screen name="Search" component={SearchedOffers} options={{

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

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfilePage" component={ProfileScreen} options={{
                title: 'Profile'

            }} />
            <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{
                animation: 'slide_from_right'
            }} />
            <ProfileStack.Screen name="Security" component={SecurityScreen} options={{
                animation: 'slide_from_right'
            }} />
        </ProfileStack.Navigator>
    );
}


const CompanyProfileStackScreen = () => {
    return (
        <CompanyProfileStack.Navigator>
            <CompanyProfileStack.Screen name="CompanyProfilePage" component={Company} options={{
                title: 'Company'

            }} />
            <CompanyProfileStack.Screen name="SettingsCompany" component={SettingsScreen} options={{
                animation: 'slide_from_right'
            }} />
        </CompanyProfileStack.Navigator>
    );
}

const Tabs = (props) => {
    const context = React.useContext(GlobalContext)
    const getUnreadNotificationsLength = () => {
        return context.notifications.filter(notif => !notif.read).length
    }
    return (
        <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
            <Tab.Screen name='Home' component={HomeStackScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <FontAwesome name="home" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                ),
                tabBarActiveTintColor: '#52BCF6',
                headerShown: false,
                // tabBarStyle: { display: context.tabBarVisibility ? 'flex' : 'none' }

            }} />
            <Tab.Screen name='SavedOffersStack' component={SavedOffersStackScreen} options={{
                tabBarIcon: ({ focused, color }) => (
                    <React.Fragment>
                        {
                            context.user?.savedOffers.length > 0 ?
                                <FontAwesome name="bookmark" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} /> :
                                <FontAwesome name="bookmark-o" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                        }
                    </React.Fragment>

                ),
                tabBarActiveTintColor: '#52BCF6',
                headerShown: false,
                title: 'Saved Offers'
            }} />
            {
                getUnreadNotificationsLength() ?
                    <Tab.Screen name='Notifications' component={NotificationsScreen} options={{
                        tabBarIcon: ({ focused, color }) => (
                            <FontAwesome style={focused && { transform: [{ rotate: '40deg' }] }}
                                name="bell" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                        ),
                        tabBarActiveTintColor: '#52BCF6',
                        tabBarBadge: getUnreadNotificationsLength(),
                    }} /> :
                    <Tab.Screen name='Notifications' component={NotificationsScreen} options={{
                        tabBarIcon: ({ focused, color }) => (
                            <FontAwesome style={focused && { transform: [{ rotate: '20deg' }] }}
                                name="bell" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                        ),
                        tabBarActiveTintColor: '#52BCF6',
                    }} />
            }
            {
                // context.user.role === 'consultant' ?
                <Tab.Screen name='Profile' component={ProfileStackScreen} options={{
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome name="user" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                    ),
                    tabBarActiveTintColor: '#52BCF6',
                    headerShown: false,
                }} />
                // :
                // <Tab.Screen name='CompanyProfile' component={CompanyProfileStackScreen} options={{
                //     tabBarIcon: ({ focused, color }) => (
                //         <FontAwesome name="user" size={25} color={focused ? '#52BCF6' : '#A7A7A7'} />
                //     ),
                //     tabBarActiveTintColor: '#52BCF6',
                //     headerShown: false,
                // }} />
            }
        </Tab.Navigator>
    )
}

export default Tabs