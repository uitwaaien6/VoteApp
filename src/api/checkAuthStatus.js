
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
                console.log(ownProps);
                ownProps.history.push('/profile');
                dispatch(actions.logIn(data));
                return;
            }

            dispatch(actions.logOut({ authInfo: 'Successfully logged out.' }));
            ownProps.history.push('/login');

        } catch (error) {

        }

    }

}
