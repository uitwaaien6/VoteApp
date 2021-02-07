
// ACTION TYPES
import types from './types';

function logInAction(payload) {
    return {
        type: types.SIGN_IN,
        payload
    }
}

const actions = {
    logInAction
}

export default actions;

