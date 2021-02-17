
// TYPES
import types from '../actions/types';

// CONFIG > ROLES
// import roles from '../_config/roles';

// initial values
const initialValue = {
    votesInfo: null,
    votes: []
}

export default function voteReducer(state = initialValue, action) {
    switch (action.type) {

        case types.GET_VOTES:
            return { ...state, votes: [...action.payload] };

        default:
            return state;
    }
}

