import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import profileImage from '../../../assets/azer.jpg'
import FormateDate from '../../../utlis/FormatDate'

const NotificationCard = (props) => {

    const [loadingNotification, setLoadingNotification] = React.useState(true)
    const [notificationContent, setNotifictionContent] = React.useState(null)
    const [notificationImage, setNotificationImage] = React.useState(null)


    React.useEffect(() => {
        let _notificationContent = ''
        const notificationVariables = JSON.parse(props.notification.variables)
        switch (props.notification.type) {
            case 'appliedOffer':
                _notificationContent = `${notificationVariables.user.firstName} ${notificationVariables.user.lastName} has applied to ${notificationVariables.offer.name}`
                setNotificationImage(notificationVariables.user.profileImage)

                break;
            case 'acceptedApplication':
                _notificationContent = `Your application at ${notificationVariables.offer.name} has been accepted`
                setNotificationImage(notificationVariables.client.profileImage)

                break;
            case 'rejectedApplication':
                _notificationContent = `Your application at ${notificationVariables.offer.name} has been rejected`
                setNotificationImage(notificationVariables.client.profileImage)
                break;

            case 'newOffer':
                _notificationContent = `A new offer ${notificationVariables.offer.name} has been posted by ${notificationVariables.client.name}`
                setNotificationImage(notificationVariables.client.profileImage)

                break;
            case 'following':
                _notificationContent = `${notificationVariables.user.firstName} ${notificationVariables.user.lastName} started following you`
                setNotificationImage(notificationVariables.user.profileImage)
                break;


            default:
                break;
        }
        setNotifictionContent(_notificationContent)
        setLoadingNotification(false)
    }, [])
    if (!loadingNotification)

        return (
            <View style={styles.card}>
                <View>
                    <Image source={{ uri: notificationImage }} style={styles.profileImage}></Image>
                </View>
                <View style={{ flex: 2 }}>
                    <Text>
                        {notificationContent}
                    </Text>
                    <Text style={styles.date}>
                        <FormateDate>{props.notification.date}</FormateDate>
                    </Text>
                </View>

            </View >
        )
    return null
}

const styles = StyleSheet.create({
    card: {
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
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
