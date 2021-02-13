
// ACTIONS
import actions from '../actions/actions';

// API
import votifyServer from './votifyServer';

// dispatch function
export default function checkAuthStatus(dispatch, ownProps) {

    return async () => {
        try {

            dispatch(actions.loading(true));
            
            const response = await votifyServer.get('/check-auth-status');
            const { data } = response;

            if (data.success) {
                dispatch(actions.logIn(data));
                ownProps.history.push('/profile');
            }

            dispatch(actions.loading(false));
        } catch (error) {
            console.log(error);
            dispatch(actions.loading(false));
        }

        dispatch(actions.loading(false));
    }

}
