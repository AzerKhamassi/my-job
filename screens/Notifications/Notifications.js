import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import NotificationCard from './NotificationCard/NotificationCard';
import GlobalContext from '../../context/GlobalContext';

const Notifications = () => {

    const context = React.useContext(GlobalContext)
    React.useEffect(() => {
        context.markNotificationsAsRead();
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="never">
                {
                    context.notifications.map((notification, i) => (
                        <NotificationCard key={i} notification={notification} />
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
        // paddingTop: Constants.statusBarHeight + 15,
        // paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
    }
})

export default Notifications
