import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import profileImage from '../../../assets/azer.jpg'

const NotificationCard = (props) => {
    return (
        <View style={styles.card}>
            <View>
                <Image source={profileImage} style={styles.profileImage}></Image>
            </View>
            <View style={{ flex: 2 }}>
                <Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                </Text>
                <Text style={styles.date}>2h</Text>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        borderTopColor: '#eee',
        borderTopWidth: 2,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 60,
        marginHorizontal: 10
    },
    date: {
        fontSize: 10
    }
})

export default NotificationCard
