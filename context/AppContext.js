import React from 'react'
import asyncStorageService from '../utlis/asyncStorageService'
import GlobalContext from './GlobalContext'
import axios from '../utlis/axios'
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Image } from 'react-native'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)
    const [notifications, setNotifications] = React.useState([])
    const [tabBarVisibility, setTabBarVisibility] = React.useState(true)

    const notificationListener = React.useRef();




    React.useEffect(() => {
        if (user) {
            registerForPushNotificationsAsync().then(token => {
                axios.patch('/user/notification-token', { token })
                    .then(res => {
                        console.log(token)
                    })
                    .catch(err => {
                        console.log(err)
                    })

            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                const newNotification = notification.request.content.data
                setNotifications((_notifications) => {

                    return [newNotification, ..._notifications]
                });
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
            };
        }
    }, [user]);

    React.useEffect(async () => {
        await refreshUser()

    }, [])
    const refreshUser = async () => {
        setLoadingUser(true)
        const accessToken = await asyncStorageService.getAccessToken()
        if (accessToken)
            axios.get(`/user/connected-user`)
                .then(response => {
                    setUser(response.data.connectedUser)
                    setNotifications(response.data.notifications.slice(0).reverse())
                    setLoadingUser(false)

                }).catch(err => {
                    setUser(null)
                    setLoadingUser(false)

                    console.log(err)
                })
        else
            setLoadingUser(false)


    }

    const logoutUser = () => {
        setLoadingUser(true)
        axios.patch('/user/logout').then(async () => {
            await asyncStorageService.clearToken()
            setUser(null)
            setLoadingUser(false)

        }).catch(err => console.log(err))
    }
    const addUserSavedOffer = (offer) => {
        console.log(user.savedOffers.map(o => o._id))
        setUser({
            ...user,
            savedOffers: [...user.savedOffers, offer]
        })
    }

    const addUserAppliedOffer = (offer) => {
        setUser({
            ...user,
            appliedOffers: [...user.appliedOffers, offer]
        })
    }



    const removeUserSavedOffer = (offerId) => {
        console.log(offerId)
        console.log(user.savedOffers.map(o => o._id))
        setUser({
            ...user,
            savedOffers: [...user.savedOffers.filter(o => o._id !== offerId)]
        })
    }
    const markNotificationsAsRead = () => {
        axios.patch('/user/notifications')
            .then(res => {
                console.log('successfully updated')
            })
            .catch(err => {
                console.log(err)
            })
    }
    const errorOccured = (err) => {
        if (err.response.status === 403) {
            setLoadingUser(true)
            setUser(null)
            setLoadingUser(false)
        }

    }


    const updateUserLocation = (geoLocation) => {
        const patchedGeoLocation = [{
            propName: 'position',
            value: geoLocation
        }]
        axios.patch('/user', patchedGeoLocation)
            .then(res => {
                console.log(res.data)
                setUser({
                    ...user,
                    position: geoLocation
                })

            })
            .catch(err => {
                errorOccured(err)
            })
    }
    const registerForPushNotificationsAsync = async () => {
        let token;

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('token', token);


        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                removeUserSavedOffer,
                addUserSavedOffer,
                notifications,
                markNotificationsAsRead,
                tabBarVisibility,
                setTabBarVisibility,
                refreshUser,
                logoutUser,
                errorOccured,
                addUserAppliedOffer,
                updateUserLocation

            }}
        >
            {!loadingUser ? props.children
                :
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../assets/splash.png')}></Image>
                </View>
            }
        </GlobalContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: '100%',
        width: '100%'
    },
})

export default AppContext
