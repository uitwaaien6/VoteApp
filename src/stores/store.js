
// NODE MODULES 
import { combineReducers, createStore } from 'redux';

// REDUCERS
import userReducer from '../reducers/userReducer';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
});

export default createStore(rootReducer);
