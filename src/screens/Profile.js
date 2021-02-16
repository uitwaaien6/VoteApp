
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import chalk from 'chalk';

// COMPONENTS
import AuthBar from '../components/AuthBar';

// API
import votifyServer from '../api/votifyServer';
import checkAuthStatus from '../api/checkAuthStatus';

// ACTIONS
import actions from '../actions/actions';

// CSS
import '../styles/screens/Profile.css';

// IMAGES
import authSculp_gif from '../images/sculp_unauthorized.gif';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // normalizes the camelCase words and make first letter upper
    normalizeCamelCase(word) {

        let normalizedWord = '';

        for (let i = 0; i < word.length; i++) {
            const isUpperCase = word[i] === word[i].toUpperCase();

            if (!isUpperCase) {
                normalizedWord += word[i];
            } else {
                normalizedWord += ` ${word[i].toLowerCase()}`;
            }
        }

        return normalizedWord[0].toUpperCase() + normalizedWord.substr(1, normalizedWord.length);
    }

    renderProfile() {

        const userProps = Object.getOwnPropertyNames(this.props.user);
        // cant display boolean values so whenever a props value is bool that means is email verified, we display yes instead of true.
        let isBool = false;

        return (
            <div className="profile__profile-info">
                <ul>
                    {
                        userProps.map((item, index) => {
                            isBool = false;

                            if (typeof this.props.user[item] === 'boolean') {
                                isBool = true;
                            }

                            return (
                                <li key={index} >{this.normalizeCamelCase(item)}: {isBool ? 'Yes' : this.props.user[item]}</li>
                            );
                        })
                    }
                </ul>
            </div>
        );

    }

    renderAuthButtons() {

        return (
            <div className="profile__auth-buttons">
                <button
                    onClick={() => {
                        this.props.sendPasswordResetLink({ email: this.props.user.email });
                    }}
                >
                    Change Password
                </button>

                <button
                    onClick={() => {
                        this.props.sendEmailResetLink({ email: this.props.user.email });
                    }}
                >
                    Change Email
                </button>
            </div>
        )
    }

    configProfilePage(isLoggedIn) {

        if (!isLoggedIn) {
            return (
                <div className="profile__unauthorized">
                    <iframe
                        src={authSculp_gif}
                        frameBorder="0"
                    />

                    <p>You are not logged in.</p>
                </div>
            );
        }

        return (
            <>
                <AuthBar />

                {this.renderProfile(true)}
                <p>
                    {this.props.authInfo ? this.props.authInfo : null}
                </p>
                {this.renderAuthButtons(true)}
            </>
        );
    };

    componentDidMount() {
        this.props.checkAuthStatus();
    }

    render() {

        // TODO Replace true with real isLoggedIn
        return (

            <div className="profile__container">
                <div className="profile__content">
                    {this.configProfilePage(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        authInfo: state.auth.authInfo,
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        sendPasswordResetLink: async ({ email }) => {
            try {
                dispatch(actions.loading(true));
                if (!email) {
                    dispatch(actions.loading(false));
                    return console.log('email doesnt exist');
                }
                const response = await votifyServer.post('/password-reset/send-link', { email });
    
                const { data } = response;
    
                if (data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                }

                dispatch(actions.loading(false));
    
            } catch (error) {
                dispatch(actions.loading(false));
                dispatch(actions.authInfo({ authInfo: 'Something went wrong while sending password reset link' }));
            }
            dispatch(actions.loading(false));
        },
        sendEmailResetLink: async ({ email }) => {
            try {
                dispatch(actions.loading(true));

                if (!email) {
                    dispatch(actions.loading(true));
                    return console.log('email is not provided');
                }

                const response = await votifyServer.post('/email-reset/send-link', { email });
                
                const { data } = response;

                if (data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                }

                dispatch(actions.loading(false));
            } catch (error) {
                dispatch(actions.loading(false));
                dispatch(actions.authInfo({ authInfo: 'Something went wrong' }));
            }

            dispatch(actions.loading(false));
        },
        checkAuthStatus: checkAuthStatus(dispatch, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

