import React from 'react'
import asyncStorageService from '../utlis/asyncStorageService'
import GlobalContext from './GlobalContext'
import axios from '../utlis/axios'

const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)
    const [notifications, setNotifications] = React.useState([])
    const [tabBarVisibility, setTabBarVisibility] = React.useState(true)

    React.useEffect(async () => {
        const accessToken = await asyncStorageService.getAccessToken()
        if (accessToken) {
            axios.get(`/user/connected-user`)
                .then(response => {
                    setUser(response.data.connectedUser)
                    setNotifications(response.data.notifications)
                    setLoadingUser(false)
                }).catch(err => {
                    setLoadingUser(false)
                })

        }
        else {
            setLoadingUser(false)
        }
    }, [])
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
                setTabBarVisibility
            }}
        >
            {!loadingUser && props.children}
        </GlobalContext.Provider>
    )
}

export default AppContext
