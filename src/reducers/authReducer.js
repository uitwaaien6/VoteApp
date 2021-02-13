
// TYPES
import types from '../actions/types';

// initial values
const initialValue = {
    user: {
        role: null,
        emailVerified: false,
        email: '',
        userName: ''
    },
    isLoggedIn: false,
    loading: false,
    authInfo: null,
}

export default function authReducer(state = initialValue, action) {
    switch (action.type) {
        case types.LOG_IN:
        
            const { success, msg, role, emailVerified, email, userName } = action.payload;

            return { 
                ...state, 
                user: { 
                    role,
                    emailVerified,
                    email,
                    userName
                }, 
                isLoggedIn: success, 
                authInfo: msg  
            };
            
        case types.REGISTER:
            return {
                ...state,
                authInfo: action.payload.message
            }

        case types.LOG_OUT:
            return {
                ...state,
                user: { role: null },
                isLoggedIn: false,
                authInfo: action.payload.authInfo
            }
            
        case types.AUTH_INFO:
            return { 
                ...state,
                authInfo: action.payload.authInfo
            };

        case types.LOADING:
            return {
                ...state,
                loading: action.payload
            };

        default:
            return state;
    }
}

