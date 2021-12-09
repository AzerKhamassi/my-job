import React from 'react'
import { View, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import Card from './Card/Card';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import logo from '../../assets/my-job.png'
import asyncStorageService from '../../utlis/asyncStorageService';


const SETTINGS_ITEMS = [
    {
        name: 'Notifications',
        icon: <SimpleLineIcons name="bell" size={24} color="black" />
    },
    {
        name: 'Privacy',
        icon: <Feather name="lock" size={24} color="black" />
    },
    {
        name: 'Security',
        icon: <MaterialIcons name="security" size={24} color="black" />
    },
    {
        name: 'Payments',
        icon: <MaterialIcons name="payment" size={24} color="black" />
    },
    {
        name: 'Account',
        icon: <FontAwesome5 name="user-circle" size={24} color="black" />
    },
    {
        name: 'Help',
        icon: <Ionicons name="md-help-buoy-outline" size={24} color="black" />
    },
    {
        name: 'About',
        icon: <Feather name="info" size={24} color="black" />
    }
]

const Settings = (props) => {

    const logoutHandler = () => {
        asyncStorageService.clearToken().then(() => {
            // props.navigation.replace('Login')
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <EvilIcons style={styles.searchIcon} name="search" size={24} color="black" />
                    <TextInput style={styles.input} placeholder='Search...' />

                </View>
                <View style={styles.itemsContainer}>
                    {
                        SETTINGS_ITEMS.map(item => (
                            <Card key={item.name} name={item.name} icon={item.icon} />
                        ))
                    }
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10 }}>
                    <Image source={logo} style={{ height: 35, width: 65 }}></Image>
                </View>
                <View style={styles.loginsSection}>
                    <Text style={{ fontWeight: '800', fontSize: 16 }}>Logins</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => logoutHandler()}>
                    <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10, paddingHorizontal: 25 }}>
                        <AntDesign name="logout" size={24} color="#52BCF6" />
                        <Text style={{ fontWeight: 'bold', color: '#52BCF6', marginHorizontal: 5 }}>Log out</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
    },
    searchSection: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginVertical: 10,
        width: 300,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {
                paddingVertical: 10

            },
            default: {

            }
        })
    },
    searchIcon: {
        position: 'absolute',
        left: 55,
        top: 25,
        zIndex: 999
    },
    itemsContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    loginsSection: {
        paddingHorizontal: 25,
        marginVertical: 5,
        borderBottomColor: '#F3F5F9',
        borderBottomWidth: 2,
        paddingBottom: 5
    }
})

export default Settings
