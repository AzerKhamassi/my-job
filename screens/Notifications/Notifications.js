import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import NotificationCard from './NotificationCard/NotificationCard';

const Notifications = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="never">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                        <NotificationCard key={i} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: Constants.statusBarHeight + 15,
        // paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
    }
})

export default Notifications
