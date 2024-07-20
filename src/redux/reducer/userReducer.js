import ReactDOM from "react-dom/client";
import { FETCH_USER_LOGIN, FETCH_USER_LOGIN_ERROR, FETCH_USER_LOGIN_SUCCESS, USER_LOGIN, USER_LOGOUT, USER_REFRESH } from "../action/useraction";
const INIT_USER = {
    user: {
        email: '',
        auth: null,
        token: ""
    },
    isLoading: false,
    isError: false
}

const useReducer = (state = INIT_USER, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return state;
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case FETCH_USER_LOGIN_ERROR:
            return {
                ...state,
                user: {
                    auth: false
                },
                isLoading: false,
                error: false
            };
        case FETCH_USER_LOGIN_SUCCESS:
            console.log("Check action ", action);
            return {
                ...state,
                user: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                error: false
            };
        case USER_LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            return {
                ...state,
                user: {
                    email: "",
                    token: "",
                    auth: false
                },
                isLoading: false,
                error: false
            };
        case USER_REFRESH:
            return {
                ...state,
                user: {
                    email: localStorage.getItem('email'),
                    token: localStorage.getItem('token'),
                    auth: true
                },
                isLoading: false,
                error: false
            }

        default:
            return state;
    }
};
export default useReducer;