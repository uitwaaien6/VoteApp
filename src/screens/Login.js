
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
// import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

// API
import checkAuthStatus from '../api/checkAuthStatus';

// ACTIONS
import actions from '../actions/actions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    configPage(isLoggedIn) {
        if (isLoggedIn) {
            return this.props.history.push('/profile');
        }

        return (
            <>
                <AuthForm  
                    history={this.props.history} // we pass the history object which comes from the router component
                />
            </>
        );
    }

    componentDidMount() {
        this.props.checkAuthStatus();
        this.props.clearAuthInfo();
        
    }

    render() {

        return (
            <div className="login__container">
                <div className="login__content">
                    {this.configPage(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        loading: state.auth.loading
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        checkAuthStatus: checkAuthStatus(dispatch, ownProps),
        clearAuthInfo: () => {
            dispatch(actions.authInfo({ authInfo: '' }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
