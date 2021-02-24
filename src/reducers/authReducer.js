
// TYPES
import types from '../actions/types';

// CONFIG > ROLES
// import roles from '../_config/roles';

// initial values
const initialValue = {
    user: {
        role: '',
        emailVerified: null,
        email: '',
        userName: ''
    },
    users: [],
    isLoggedIn: false,
    loading: false,
    authInfo: null,
    warningPopUp: false
}

export default function authReducer(state = initialValue, action) {
    switch (action.type) {
        case types.LOG_IN:
        
            return { 
                ...state, 
                user: { 
                    ...action.payload.user
                }, 
                isLoggedIn: action.payload.success, 
                authInfo: action.payload.msg  
            };
            
        case types.REGISTER:
            return {
                ...state,
                user: { 
                    role: '',
                    emailVerified: null,
                    email: '',
                    userName: ''
                },
                isLoggedIn: false,
                authInfo: action.payload.message
            }

        case types.LOG_OUT:
            return {
                ...state,
                user: { 
                    role: null,
                    emailVerified: null,
                    email: '',
                    userName: ''
                 },
                isLoggedIn: false,
                authInfo: action.payload ? action.payload.authInfo : 'Successfully logged out'
            }
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload
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

        case types.WARNING_POPUP:
            return {
                ...state,
                warningPopUp: action.payload
            }

        default:
            return state;
    }
}

