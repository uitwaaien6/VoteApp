
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

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

export default Login;
