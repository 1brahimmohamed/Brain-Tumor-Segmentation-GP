import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import store from '@/redux/store';
import { uiSliceActions } from '@ui/ui-slice';
import { authSliceActions } from '@features/authentication/auth-slice';

class AxiosUtil {
    /**
     * Sends an asynchronous request using Axios with the provided configuration and options.
     *
     * @param {AxiosRequestConfig} axiosConfig - The Axios request configuration.
     * @param {Object} options - The options for the request.
     * @param {boolean} options.showError - Whether to show error notifications. Defaults to true.
     * @param {boolean} options.showSpinner - Whether to show a loading spinner. Defaults to true.
     * @return {Promise<any>} A Promise that resolves to the response data.
     */
    public static async sendRequest(
        axiosConfig: AxiosRequestConfig,
        options: { showError?: boolean; showSpinner?: boolean } = {}
    ): Promise<any> {
        const { showError, showSpinner } = options;

        store.dispatch(uiSliceActions.clearNotification());

        if (showSpinner !== false) {
            store.dispatch(uiSliceActions.setLoading(true));
        }

        let responseData;

        try {
            responseData = (await axios({ ...axiosConfig })).data;
        } catch (err: unknown) {
            if (showError !== false) {
                const errResponse = err as AxiosError;
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

    /**
     * Sets up an Axios request interceptor that adds an authorization token to the request headers if it exists.
     *
     * @return {void} This function does not return anything.
     */
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

    /**
     * Sets up an Axios response interceptor that handles errors and dispatches actions based on the response status.
     *
     * @return {void} This function does not return anything.
     */
    public static responseInterceptor() {
        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: unknown) => {
                const err = error as AxiosError;

                if (err.response?.status === 401) {
                    store.dispatch(authSliceActions.resetAuthInfo());
                }

                return Promise.reject(error);
            }
        );
    }
}

export default AxiosUtil;
