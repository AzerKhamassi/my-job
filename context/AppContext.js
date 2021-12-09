import React from 'react'
import asyncStorageService from '../utlis/asyncStorageService'
import GlobalContext from './GlobalContext'
import axios from '../utlis/axios'

const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)

    React.useEffect(async () => {
        // await asyncStorageService.clearToken()
        const accessToken = await asyncStorageService.getAccessToken()
        if (accessToken) {
            axios.get(`/user/connected-user`)
                .then(response => {
                    setUser(response.data.connectedUser)
                    setLoadingUser(false)
                }).catch(err => {
                    console.log(err)
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
    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                removeUserSavedOffer,
                addUserSavedOffer
            }}
        >
            {!loadingUser && props.children}
        </GlobalContext.Provider>
    )
}

export default AppContext
