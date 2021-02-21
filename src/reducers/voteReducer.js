
// TYPES
import types from '../actions/types';

// CONFIG > ROLES
// import roles from '../_config/roles';

// initial values
const initialValue = {
    votesInfo: null,
    votes: [],
    vote: null
}

export default function voteReducer(state = initialValue, action) {
    switch (action.type) {

        case types.GET_VOTES:
            return { ...state, votes: [...action.payload] };
        
        case types.GET_VOTE:
            return { ...state, vote: action.payload };

        default:
            return state;
    }
}

