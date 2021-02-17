
// NODE MODULES 
import { combineReducers, createStore } from 'redux';

// REDUCERS
import authReducer from '../reducers/authReducer';
import voteReducer from '../reducers/voteReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    vote: voteReducer
});

export default createStore(rootReducer);

