
// ACTION TYPES
import types from './types';

export default function signInAction(payload) {
    return {
        type: types.SIGN_IN,
        payload
    }
}

