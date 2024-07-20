import { toast } from "react-toastify";
import { loginApi } from "../../service/Userservice";
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_LOGIN_ERROR = 'FETCH_USER_LOGIN_ERROR';
export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';
export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginApi(email.trim(), password);
        if (res?.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', email.trim());
            dispatch({
                type: FETCH_USER_LOGIN_SUCCESS,
                data: { email, token: res.token }
            });
            toast.success("Login success");
        } else if (res?.status >= 400) {
            dispatch({
                type: FETCH_USER_LOGIN_ERROR
            });
            toast.error("Login error");
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        });
    }
}

export const handleUserRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        });
    }
}