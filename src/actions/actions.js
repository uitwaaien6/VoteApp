

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

function getUsers(payload) {
    return {
        type: types.GET_USERS,
        payload
    }
}

function getUser(payload) {
    return {
        type: types.GET_USER,
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

function getVote(payload) {
    return {
        type: types.GET_VOTE,
        payload
    }
}

function warningPopUp(payload) {
    return {
        type: types.WARNING_POPUP,
        payload
    }
}

function placeWarningPopUp(payload) {
    return {
        type: types.PLACE_WARNING_POPUP,
        payload
    }
}

const actions = {
    logIn,
    logOut,
    getUsers,
    getUser,
    authInfo,
    loading,
    getVotes,
    getVote,
    warningPopUp,
    placeWarningPopUp
}

export default actions;

