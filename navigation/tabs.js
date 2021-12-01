import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import { createStackNavigator } from 'react-navigation-stack'


const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default Tabs