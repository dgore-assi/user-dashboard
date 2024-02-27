import axios from 'axios';
import { isValidToken } from '../contexts/JWTAuthContext';
import { BASE_API } from '../shared/constant/environment';

const axiosInstance = axios.create();

export let refreshTokenData = {
    isExecuting: false,
    promise: null,
};

export const updateRefreshTokenData = (isExecuting: any, promise: any) => {
    refreshTokenData = {
        isExecuting,
        promise,
    };
};
const logout = () => {
    setSession("", "",);
};
const refreshSession = (accessToken: any, refreshToken: any) => setSession(accessToken, refreshToken);


export const setSession = (accessToken: any, refreshToken: any) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
        }
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        delete axiosInstance.defaults.headers.common.Authorization
    }
}

axiosInstance.interceptors.request.use(
    async (conf) => {
        const accessToken = window.localStorage.getItem('accessToken')
        if (
            !accessToken ||
            !isValidToken(accessToken)

        ) {
            const refreshToken = window.localStorage.getItem('refreshToken')
            if (
                !refreshToken ||
                !isValidToken(refreshToken)
            ) {
                updateRefreshTokenData(false, null);
                logout();
                return Promise.reject("Unauthorized User");
            } else {
                try {
                    let refreshTokenPromise;
                    if (refreshTokenData?.isExecuting && refreshTokenData?.promise) {
                        refreshTokenPromise = refreshTokenData.promise;
                    } else {
                        refreshTokenPromise = axios.post(`${BASE_API}auth/token/refresh`,
                            {
                                refreshToken: refreshToken
                            }
                        );
                        updateRefreshTokenData(true, refreshTokenPromise);
                    }
                    const response: any = await refreshTokenPromise;
                    updateRefreshTokenData(false, null);
                    if (response.data.accessToken) {
                        const { accessToken } = response.data;
                        refreshSession(accessToken, refreshToken);
                        conf.headers["Authorization"] = `Bearer ${accessToken}`;
                    } else {
                        updateRefreshTokenData(false, null);
                        logout();
                        return Promise.reject("Unauthorized User");
                    }
                } catch (error) {
                    updateRefreshTokenData(false, null);
                    logout();
                    return Promise.reject(error);
                }
            }
        }
        return conf;
    },
    (error) => {
        updateRefreshTokenData(false, null);
        return Promise.reject(error);
    }
);
export default axiosInstance