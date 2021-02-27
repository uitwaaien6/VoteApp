
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ACTIONS
import actions from '../actions/actions';

// ENCRYPTION
import RDE from '../encryption/representationalDatabaseEncryption';

// API
import votifyServer from '../api/votifyServer';
// import checkAuthStatus from '../api/checkAuthStatus'; // dispatch function

// VALIDATORS
import authValidators from '../validators/authValidators';

// CSS
import '../styles/components/AuthForm.css';

// AuthForm configures itself with the pathname of location url, it will be register form by default but if the url is === login it will configure itself to login form
class AuthForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            passwordVerification: '',
            recoveryEmail: '',
            isForgetPassword: false,
            formType: window.location.pathname.replace('/', '')
        };

        this.onAuthenticate = this.onAuthenticate.bind(this);
    }

    // AUTH FUNCTIONS
    onAuthenticate(formType) { // configuration for which authentication button should we use login or register ? 
        if (formType === 'login') {

            return () => {
                this.props.logIn({ 
                    email: this.state.email, 
                    password: this.state.password 
                });
            }

        } 

        return () => {
            this.props.register({ 
                userName: this.state.userName, 
                email: this.state.email, 
                password: this.state.password, 
                passwordVerification: this.state.passwordVerification 
            });
        }

    }

    // RENDER FUNCTIONS
    renderForgetPassword(formType) {
        if (formType === 'login') {
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
                                    this.props.sendPasswordResetLink({ email: this.state.recoveryEmail });
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

    renderEssentialButtons(formType) {
        return (
            <>
                <div>
                    <button
                        onClick={this.onAuthenticate(formType)}
                    >
                        {formType === 'login' ? 'Log In' : 'Register'}
                    </button>
                </div>

                {this.renderForgetPassword(formType)}

                <div>
                    <Link to={formType === 'login' ? "/register" : "/login"}>
                        <button>
                            {
                                formType === 'login' ?
                                "Don't have an account ? Register instead it's free." : 
                                "Already have an account ? Log in instead"
                            }
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

    renderForm(formType) {

        if (formType === 'login') {
            return (
                <div className="auth-form__form">
                    {this.renderAuthInfo(this.props.authInfo)}
                    {this.renderEssentialInputs()}
                    {this.renderEssentialButtons(formType)}
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

                {this.renderEssentialButtons(formType)}

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
                    {this.renderForm(this.state.formType)}
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

function mapDispatchToProps(dispatch, ownProps) {
    return {
        logIn: async ({ email, password }) => {

            try {

                dispatch(actions.loading(true));

                if (!email || !password || !authValidators.validateEmail(email) || !authValidators.validatePassword(password)) {
                    console.log('password is invalid');
                    dispatch(actions.authInfo({ authInfo: 'Please fill all the credentials' }));
                }

                const rdeKey = RDE.createKey(password);

                const encryptedPassword = RDE.encrypt(password, rdeKey);

                const response = await votifyServer.post('/login', { email, encryptedPassword, rdeKey });
                const { data } = response;
                if (data.success) {
                    dispatch(actions.logIn(data));
                    // navigate user to the profile with the ownProps,
                    // ownProps doesnt contain anything but the dispatch functions as it is not passed to the router component
                    // so we manually pass the history object to the AuthForm.js from Login and Register
                    ownProps.history.push('/profile');
                }

                dispatch(actions.loading(false));

            } catch (error) {
                console.log(error);
                if (error.response) {
                    dispatch(actions.authInfo({ authInfo: error.response.data.error }));
                } else {
                    dispatch(actions.authInfo({ authInfo: 'Something went wrong while logging in' }));
                }

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
                console.log(error);
                if (error.response) {
                    dispatch(actions.authInfo({ authInfo: error.response.data.error }));
                } else {
                    dispatch(actions.authInfo({ authInfo: 'Something went wrong' }));
                }
            }

            dispatch(actions.loading(false));

        },
        sendPasswordResetLink: async ({ email }) => {
            try {
                dispatch(actions.loading(true));
                if (!email) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: 'Please enter a valid email' }));
                }

                const response = await votifyServer.post('/password-reset/send-link', { email });
                const { data } = response;
                if (data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                }
                dispatch(actions.loading(false));
            } catch (error) {
                console.log(error);
                if (error.response) {
                    dispatch(actions.authInfo({ authInfo: error.response.data.error }));
                } else {
                    dispatch(actions.authInfo({ authInfo: 'Something went wrong' }));
                }
            }

            dispatch(actions.loading(false));
        },
        clearAuthInfo: () => {
            dispatch(actions.loading(false));   
            dispatch(actions.authInfo({ authInfo: null }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
