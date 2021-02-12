
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ACTIONS
import actions from '../actions/actions';

// API
import votifyServer from '../api/votifyServer';

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

        this.onAuthenticate = this.onAuthenticate.bind(this);
    }

    // AUTH FUNCTIONS
    onAuthenticate(isLogin) {
        if (isLogin) {

            return () => {
                console.log('Logging in')
                this.props.logIn({ 
                    email: this.state.email, 
                    password: this.state.password 
                });
            }

        } 

        return () => {
            console.log('Registering');
            this.props.register({ 
                userName: this.state.userName, 
                email: this.state.email, 
                password: this.state.password, 
                passwordVerification: this.state.passwordVerification 
            });
        }

    }


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
                        <button
                            onClick={(event) => {

                                if (this.state.isForgetPassword) {
                                    this.props.passwordReset({ email: this.state.recoveryEmail });
                                }

                                this.setState({ ...this.state, isForgetPassword: true });
                            }}
                        >
                            {this.state.isForgetPassword ? "Send Password Reset Link to the email above." : "Forgot your password ?"} 
                        </button>
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
                    <button
                        onClick={this.onAuthenticate(isLogin)}
                    >
                        {isLogin ? 'Log In' : 'Register'}
                    </button>
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

    renderAuthInfo(message) {
        if (message) {
            return (
                <div>
                    <div className="auth-form__info">
                        <p>{message}</p>
                    </div>
                </div>
            );
        }

        return null;

    };

    renderForm(isLogin) {

        if (isLogin) {
            return (
                <div className="auth-form__form">
                    {this.renderAuthInfo(this.props.authInfo)}
                    {this.renderEssentialInputs()}
                    {this.renderEssentialButtons(isLogin)}
                </div>
            );
        };

        return (
            <div className="auth-form__form">

                {this.renderAuthInfo(this.props.authInfo)}

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

    componentDidMount() {
        this.props.clearAuthInfo();
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
        user: state.auth.user,
        authInfo: state.auth.authInfo,
        loading: state.auth.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logIn: async ({ email, password }) => {

            try {

                dispatch(actions.loading(true));
                if (!email || !password) {
                    dispatch(actions.authInfo({ authInfo: 'Please fill all the credentials' }));
                }
                const response = await votifyServer.post('/login', { email, password });
                const { data } = response;
                if (data.success) {
                    dispatch(actions.logIn({ role: data.role, success: data.success, msg: data.msg }));
                }

                dispatch(actions.loading(false));

            } catch (error) {
                dispatch(actions.authInfo({ authInfo: 'Something went wrong.' }));
                dispatch(actions.loading(false));
            }

            dispatch(actions.loading(false));

        },
        register: async ({ userName, email, password, passwordVerification }) => {

            try {
                dispatch(actions.loading(true));
                if (!userName || !email || !password || !passwordVerification) {
                    dispatch(actions.authInfo({ authInfo: 'Please fill all the credentials' }));
                }
                const response = await votifyServer.post('/register', { userName, email, password, passwordVerification });
                const { data } = response;
                if (data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                }
                dispatch(actions.loading(false));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: 'Something went wrong' }));
                dispatch(actions.loading(false));
            }

            dispatch(actions.loading(false));

        },
        passwordReset: async ({ email }) => {
            try {
                dispatch(actions.loading(true));
                if (!email) {
                    dispatch(actions.authInfo({ authInfo: 'Please enter a valid email' }));
                }

                const response = await votifyServer.post('/password-reset/send-link', { email });
                const { data } = response;
                if (data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                }
                dispatch(actions.loading(false));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: 'Error sending password reset link' }));
                dispatch(actions.loading(false));
            }

            dispatch(actions.loading(false));
        },
        clearAuthInfo: () => {

            try {
                
                dispatch(actions.authInfo({ authInfo: null }));
            } catch (error) {
                dispatch(actions.loading(false));
            }

            dispatch(actions.loading(false));

        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
