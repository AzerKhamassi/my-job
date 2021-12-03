import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants'
import { Feather } from '@expo/vector-icons';
import profileImage from '../../assets/azer.jpg'
import { MaterialIcons } from '@expo/vector-icons';

const Profile = (props) => {
    return (
        <View style={styles.container}>
            <Feather name="settings" size={24} color="black" />
            <View style={styles.imageContainer}>
                <Image source={profileImage} style={styles.profileImage}></Image>
                <View style={styles.editIcon}>
                    <MaterialIcons name="edit" size={16} color="white" />
                </View>
            </View>
            <View style={styles.title}>
                <Text style={styles.fullName}>Azer Khamassi</Text>
                <Text style={styles.role}>Full Stack Developer</Text>
            </View>
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold' }}>
                    Description
                </Text>
            </View>
            <View style={styles.description}>
                <Text style={{ color: '#909090' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
            <View style={styles.navigationHeader}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Info</Text>
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Applied jobs </Text>
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Reviews</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold' }}>
                    Current Location
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    navigationHeader: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        // padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    description: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    section: {
        paddingHorizontal: 25,
        marginTop: 10
    },
    fullName: {
        fontSize: 18,
        fontWeight: '700'
    },
    role: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    editIcon: {
        backgroundColor: '#7CCCF8',
        height: 25,
        width: 25,
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 120,
        bottom: 10
    }

})

export default Profile
