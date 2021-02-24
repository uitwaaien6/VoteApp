
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// COMPONENTS
import AuthBar from '../components/AuthBar';

// ACTIONS
import actions from '../actions/actions';

// _CONFIG > ROLES
import roles from '../_config/roles';

// API
import votifyServer from '../api/votifyServer';
import checkAuthStatus from '../api/checkAuthStatus';

// IMAGES 
import sculpGif from '../images/sculp_unauthorized.gif';

// CSS
import '../styles/screens/Users.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderUsers(users) {
        if (!users) {
            return null;
        }

        const renderedUsers = users.map((item, index) => {
            return (
                <Link to={`/users/${item.userName}`}>
                    <div
                        className="users__user"
                    >
                        {item.userName}
                    </div>
                </Link>

            );
        });

        return (
            <div className="users__users">
                {
                    this.props.authInfo ?
                    <div className="users__info">
                        <p>{this.props.authInfo}</p>
                    </div> : 
                    null
                }

                {renderedUsers}
            </div>
        )
    }

    configPage(isLoggedIn) {
        const role = this.props.user.role;

        if (!isLoggedIn || role !== roles.ADMIN) {
            return (
                <div className="profile__unauthorized">
                    <iframe
                        title="sculpGif"
                        src={sculpGif}
                        frameBorder="0"
                    />

                    <p>You are logged out.</p>
                </div>
            );
        }

        return (
            <>
                <AuthBar />
                {this.renderUsers(this.props.users)}
            </>
        );
    }

    componentDidMount() {
        this.props.checkAuthStatus();
        this.props.getUsers();
    }

    render() {
        return (
            <div className="users__container">
                <div className="users__content">
                    {this.configPage(this.props.isLoggedIn)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        users: state.auth.users
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUsers: async () => {
            try {
                dispatch(actions.loading(true));
                const usersResponse = await votifyServer.get('/users');

                if (!usersResponse.data.success) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: usersResponse.data.success }));
                }

                dispatch(actions.getUsers(usersResponse.data.users));
                dispatch(actions.authInfo({ authInfo: usersResponse.data.success }));

            } catch (error) {

                if (error.response.data) {
                    return dispatch(actions.authInfo({ authInfo: error.response.data.error }));
                }
                dispatch(actions.authInfo({ authInfo: 'Something went wrong' }));

            }

            dispatch(actions.loading(false));
        },
        checkAuthStatus: checkAuthStatus(dispatch, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);


