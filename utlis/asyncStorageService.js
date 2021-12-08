import AsyncStorage from '@react-native-async-storage/async-storage';


const asyncStorageService = (

    function () {

        const _setToken = (accessToken) => {
            return AsyncStorage.setItem("access_token", accessToken);
        }

        const _getAccessToken = () => {
            return AsyncStorage.getItem("access_token");
        }

        const _clearToken = () => {
            return AsyncStorage.removeItem("access_token");
        }

        const _setAccessToken = (accessToken) => {
            return AsyncStorage.setItem("access_token", accessToken);
        }


        return {
            setToken: _setToken,
            setAccessToken: _setAccessToken,
            getAccessToken: _getAccessToken,
            clearToken: _clearToken,

        };
    })();
export default asyncStorageService;
