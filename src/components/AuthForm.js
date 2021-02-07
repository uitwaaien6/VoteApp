
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ACTIONS
import actions from '../actions/actions';

// CSS
import '../styles/components/AuthForm.css';

class AuthForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            passwordVerification: '',
            recoveryEmail: '',
            isForgetPassword: false
        };
    }

    // AUTH FUNCTIONS


    // RENDER FUNCTIONS
    renderForgetPassword(isLogin) {
        if (isLogin) {
            return (

                <>

                    {
                        this.state.isForgetPassword ?
                        <div>
                            <input
                                type="email" 
                                placeholder="Email..."
                                value={this.state.recoveryEmail} 
                                onChange={(event) => {
                                    this.setState({ ...this.state, recoveryEmail: event.target.value });
                                }} 
                            />
                        </div> :
                        null
                    }

                    <div>
                        <Link>
                            <button
                                onClick={(event) => {

                                    if (this.state.isForgetPassword) {
                                        console.log('Sending password reset link');
                                    }

                                    this.setState({ ...this.state, isForgetPassword: true });
                                }}
                            >
                                {this.state.isForgetPassword ? "Send Password Reset Link to the email above." : "Forgot your password ?"} 
                            </button>
                        </Link>
                    </div>

                </>
            );
        };
    }

    renderEssentialInputs() {
        return (
            <>

                <div>
                    <input 
                        type="email"
                        placeholder="Email..."
                        value={this.state.email} 
                        onChange={(event) => {
                            this.setState({ ...this.state, email: event.target.value });
                        }} 
                    />
                </div>

                <div>
                    <input
                        className="password-input"
                        type="password" 
                        placeholder="Password..."
                        value={this.state.password} 
                        onChange={(event) => {
                            this.setState({ ...this.state, password: event.target.value });
                        }} 
                    />
                </div>

            </>
        );
    };

    renderEssentialButtons(isLogin) {
        return (
            <>
                <div>
                    <Link>
                        <button
                            onClick={() => {
                                this.props.logIn({ email: this.state.email, password: this.state.password });
                            }}
                        >
                            {isLogin ? 'Log In' : 'Register'}
                        </button>
                    </Link>
                    
                </div>

                {this.renderForgetPassword(isLogin)}

                <div>
                    <Link to={isLogin ? "/register" : "/login"}>
                        <button>
                            {isLogin ? "Don't have an account ? Register instead it's free." : "Already have an account ? Log in instead"}
                        </button>
                    </Link>
                </div>

            </>
        );
    };

    renderForm(isLogin) {

        if (isLogin) {
            return (
                <div className="auth-form__form">
                    {this.renderEssentialInputs()}
                    {this.renderEssentialButtons(isLogin)}
                </div>
            );
        };

        return (
            <div className="auth-form__form">

                <div>
                    <input 
                        type="text"
                        placeholder="User Name..."
                        value={this.state.userName} 
                        onChange={(event) => {
                            this.setState({ ...this.state, userName: event.target.value });
                        }}
                    />
                </div>

                {this.renderEssentialInputs()}

                <div>
                    <input 
                        className="password-input"
                        type="password"
                        placeholder="Password Verify..."
                        value={this.state.passwordVerification} 
                        onChange={(event) => {
                            this.setState({ ...this.state, passwordVerification: event.target.value });
                        }} 
                    />
                </div>

                {this.renderEssentialButtons(isLogin)}

            </div>
        )
    };

    renderAuthInformation() {
        return (
            <>

            </>
        );
    };

    componentDidMount() {

    }

    render() {
        return (
            <div className="auth-form__container">
                <div className="auth-form__content">
                    {this.renderForm(this.props.login)}
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
        logIn: ({ email, password }) => {
            dispatch(actions.logInAction({ uuid: 1, role: 'admin' }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
