
// ACTIONS
import actions from '../actions/actions';

// API
import votifyServer from './votifyServer';

// dispatch function
export default function checkAuthStatus(dispatch, ownProps) {

    return async () => {
        try {
            
            const response = await votifyServer.get('/check-auth-status');
            const { data } = response;

            if (data.success) {
                dispatch(actions.logIn(data));
                return null;
            }

            dispatch(actions.logOut({ authInfo: 'Successfully logged out.' }));

        } catch (error) {
            //dispatch(actions.logOut({ authInfo: 'Successfully logged out.' }));
        }

    }

}
