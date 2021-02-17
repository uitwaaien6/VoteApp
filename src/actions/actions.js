

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

function loading(payload) {
    return {
        type: types.LOADING,
        payload
    }
}

function getVotes(payload) {
    return {
        type: types.GET_VOTES,
        payload
    };
}

function warningPopUp(payload) {
    return {
        type: types.WARNING_POPUP,
        payload
    }
}

const actions = {
    logIn,
    logOut,
    authInfo,
    loading,
    getVotes,
    warningPopUp
}

export default actions;

