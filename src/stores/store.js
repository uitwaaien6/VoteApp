
// NODE MODULES 
import { combineReducers, createStore } from 'redux';

// REDUCERS
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({
    user: userReducer
});

export default createStore(rootReducer);
