

// ACTION TYPES
import types from './types';

function logIn(payload) {
    console.log(payload);
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

function loading(payload) {
    return {
        type: types.LOADING,
        payload
    }
}

const actions = {
    logIn,
    logOut,
    authInfo,
    loading
}

export default actions;

