

// ACTION TYPES
import types from './types';

function logIn(payload) {
    return {
        type: types.LOG_IN,
        payload
    }
}

function logOut(payload) {
    return {
        type: types.LOG_OUT,
        payload
    }
}

function authInfo(payload) {
    return {
        type: types.AUTH_INFO,
        payload
    }
}

const actions = {
    logIn,
    logOut,
    authInfo
}

export default actions;

