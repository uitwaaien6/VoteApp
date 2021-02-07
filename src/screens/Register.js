
// NODE MODULES
import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import AuthForm from '../components/AuthForm';

class Register extends React.Component {

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
                    <AuthForm />
                </div>
            </div>
        );
    };
}

export default Register;
