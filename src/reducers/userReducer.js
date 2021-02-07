
// TYPES
import types from '../actions/types';

const initialValue = {
    user: {
        uuid: null,
        role: null
    }
}

export default function userReducer(state = initialValue, action) {
    switch (action.type) {
        case types.SIGN_IN:
            
            return { ...state, user: { ...action.payload } };
    
        default:
            return state;
    }
}

