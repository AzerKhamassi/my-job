import axios from 'axios';
import asyncStorageService from './asyncStorageService';
const apiHost = 'https://my-job-api.herokuapp.com';
const axiosInstance = axios.create({ baseURL: apiHost });

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await asyncStorageService.getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        if (error.response)
            if (error.response.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;
                let _accessToken
                asyncStorageService.getAccessToken().then(token => _accessToken = token)
                return axios.post(`${apiHost}/user/token`, {
                    accessToken: _accessToken
                })
                    .then(async res => {
                        if (res.status === 200) {
                            // 1) put token to LocalStorage
                            await asyncStorageService.setAccessToken(res.data.accessToken);
                            // 2) Change Authorization header
                            axios.defaults.headers.common['Authorization'] =
                                'Bearer ' + await asyncStorageService.getAccessToken();
                            originalRequest.headers['Authorization'] =
                                'Bearer ' + await asyncStorageService.getAccessToken();
                            // 3) return originalRequest object with Axios.
                            return axios(originalRequest);
                        }
                    });
            } else if (error.response.status === 403) {
                asyncStorageService.clearToken().then();
                // window.location.href = "/login";
            } else return Promise.reject(error);
        else return Promise.reject(error);
    }
);


export default axiosInstance;
