
// NODE MODULES 
import { combineReducers, createStore } from 'redux';

// REDUCERS
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export default createStore(rootReducer);

