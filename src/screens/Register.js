
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
// import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

// API
import checkAuthStatus from '../api/checkAuthStatus'; // dispatch function

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.checkAuthStatus();
    }

    render() {
        return (
            <div className="login__container">
                <div className="login__content">
                    <AuthForm
                        history={this.props.history} // we pass the history object which comes from the router component
                    />
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isLoading: state.auth.isLoading
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        checkAuthStatus: checkAuthStatus(dispatch, ownProps) // returns a function
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
