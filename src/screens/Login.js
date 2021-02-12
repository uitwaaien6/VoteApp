
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';
import Loading from '../components/Loading';

// API
import votifyServer from '../api/votifyServer';

// ACTIONS
//import actions from '../actions/actions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.checkAuthStatus = this.checkAuthStatus.bind(this);
    }

    async checkAuthStatus() {
        try {
            const { data } = await votifyServer.get('/check-auth-status');
            if (data.success) {

            }
        } catch (error) {
            
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="login__container">
                <div className="login__content">
                    <Header />
                    <AuthForm login />
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

export default connect(mapStateToProps, null)(Login);
