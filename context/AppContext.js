import React from 'react'
import asyncStorageService from '../utlis/asyncStorageService'
import GlobalContext from './GlobalContext'
import axios from '../utlis/axios'
import { View, Text, StyleSheet, Image } from 'react-native'

const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)
    const [notifications, setNotifications] = React.useState([])
    const [tabBarVisibility, setTabBarVisibility] = React.useState(true)

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
                    setNotifications(response.data.notifications)
                    setLoadingUser(false)

                }).catch(err => {
                    setUser(null)
                    setLoadingUser(false)

                    console.log(err)
                })
        else
            setLoadingUser(false)


    }

    const logoutUser = async () => {
        setLoadingUser(true)
        await asyncStorageService.clearToken()
        setUser(null)
        setLoadingUser(false)
    }
    const addUserSavedOffer = (offer) => {
        console.log(user.savedOffers.map(o => o._id))
        setUser({
            ...user,
            savedOffers: [...user.savedOffers, offer]
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
    const errorOccured = () => {
        if (err.response.status === 403) {
            setLoadingUser(true)
            setUser(null)
            setLoadingUser(false)
        }

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
                errorOccured
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
