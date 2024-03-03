import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import store from '@/redux/store';
import { uiSliceActions } from '@ui/ui-slice';
import { authSliceActions } from '@features/authentication/auth-slice';

class AxiosUtil {
    public static async sendRequest(
        axiosConfig: AxiosRequestConfig,
        options: { showError?: boolean; showSpinner?: boolean } = {}
    ) {
        const { showError, showSpinner } = options;

        store.dispatch(uiSliceActions.clearNotification());

        if (showSpinner !== false) {
            store.dispatch(uiSliceActions.setLoading(true));
        }

        let responseData;

        try {
            responseData = (await axios({ ...axiosConfig })).data;
        } catch (err) {
            if (showError !== false) {
                const errResponse = err as AxiosError<any, any>;
                const response = errResponse.response?.data;
                const errorMsg =
                    response?.message ||
                    errResponse.message ||
                    'something wrong has been occurred, try again!';

                store.dispatch(
                    uiSliceActions.setNotification({
                        type: 'error',
                        content: errorMsg
                    })
                );
            }
        }

        store.dispatch(uiSliceActions.setLoading(false));

        return responseData;
    }

    public static requestInterceptor() {
        axios.interceptors.request.use(
            (config) => {
                const token = store.getState().auth.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    public static responseInterceptor() {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError<any, any>) => {
                if (error.response?.status === 401) {
                    store.dispatch(authSliceActions.resetAuthInfo());
                }

                return Promise.reject(error);
            }
        );
    }
}

export default AxiosUtil;
