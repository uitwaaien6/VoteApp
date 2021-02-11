
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

// API
import votifyServer from '../api/votifyServer';

// ACTIONS
//import actions from '../actions/actions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
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
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: async ({ email, password }) => {
            const response = await votifyServer.post('/login', { email, password });
            console.log(response);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
