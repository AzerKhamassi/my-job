import React from 'react'
import asyncStorageService from '../utlis/asyncStorageService'
import GlobalContext from './GlobalContext'
import axios from '../utlis/axios'

const AppContext = (props) => {
    const [user, setUser] = React.useState(null)
    const [loadingUser, setLoadingUser] = React.useState(true)

    React.useEffect(async () => {
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

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {!loadingUser && props.children}
        </GlobalContext.Provider>
    )
}

export default AppContext
