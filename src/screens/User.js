
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import AuthBar from '../components/AuthBar';
import WarningPopUp from '../components/WarningPopUp';

// ACTIONS
import actions from '../actions/actions';

// _CONFIG > ROLES
import roles from '../_config/roles';

// API
import votifyServer from '../api/votifyServer';
import checkAuthStatus from '../api/checkAuthStatus';

// IMAGES 
import sculpGif from '../images/sculp_unauthorized.gif';

// CSS
import '../styles/screens/User.css';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: window.location.pathname.split('/').pop()
        };
        
        this.activeSelect = React.createRef();
        this.roleSelect = React.createRef();
        this.elementWarningPopUp = React.createRef();

        this.onUserSaveClick = this.onUserSaveClick.bind(this);
        this.onUserSave = this.onUserSave.bind(this);
    }

    onUserSave() {
        const active = this.activeSelect.current.value;
        const role = this.roleSelect.current.value;
        this.props.saveUser({ userName: this.state.userName, role, active });
    }

    onUserSaveClick() {
        this.props.setWarningPopUp(true, this.elementWarningPopUp.current);
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

        normalizedWord = normalizedWord[0].toUpperCase() + normalizedWord.substr(1, normalizedWord.length);

        return normalizedWord;
    }

    configPropValue(user, item) {

        let boolVal = '';
        if (user[item] === true) boolVal = 'Yes'; 
        else if (user[item] === false) boolVal = 'No';

        if (item === 'active') {


            return (
                <select
                    ref={this.activeSelect}
                >
                    <option value={boolVal}>
                        {boolVal}
                    </option>
                    <option value={boolVal === 'Yes' ? 'No' : 'Yes'}>
                        {boolVal === 'Yes' ? 'No' : 'Yes'}
                    </option>
                </select>
            );
        } else if (item === 'role') {

            const staticRoles = [roles.ADMIN, roles.EXECUTIVE, roles.USER];
            const role = user[item];

            const configedRoles = [role];

            staticRoles.forEach((roleItem, index) => {
                if (roleItem !== role) {
                    configedRoles.push(roleItem);
                }
            });

            return (
                <select
                    ref={this.roleSelect}
                >
                    {
                        configedRoles.map((roleItem, index) => {
                            return <option value={roleItem}>{roleItem}</option>
                        })
                    }
                </select>
            );
        } else {
            return <span id="user__prop-value">{boolVal ? boolVal : user[item]}</span>;
        }

    }

    displayUser(user) {
        if (!user) {
            return null;
        }

        const userProps = Object.getOwnPropertyNames(user);

        const displayProps = userProps.map((item, index) => {

            return (
                <div className="user__display-props">
                    {this.normalizeCamelCase(item)}: {this.configPropValue(user, item)}
                </div>

            );
        });

        return (
            <div className="user__display">
                {
                    this.props.authInfo ?
                    <div className="user__info">
                        <p>{this.props.authInfo}</p>
                    </div> : 
                    null
                }

                <div className="user__props">
                    <h1>{user.userName}</h1>
                    {displayProps}
                </div>

                <div className="user__save">
                    <button
                        onClick={this.onUserSaveClick}
                    >
                        Save User
                    </button>
                </div>

            </div>
        )
    }

    configPage(isLoggedIn) {
        const role = this.props.user.role;

        if (!isLoggedIn || role !== roles.ADMIN) {
            return (
                <div className="user__unauthorized">
                    <iframe
                        title="sculpGif"
                        src={sculpGif}
                        frameBorder="0"
                    />

                    <p>You are logged out.</p>
                </div>
            );
        }

        const configuration = {
            title: 'Are you sure you want to save this user.',
            callback: this.onUserSave
        }

        return (
            <>
                <WarningPopUp
                    ref={this.elementWarningPopUp}
                    configuration={configuration}
                />
                <AuthBar />
                {this.displayUser(this.props.wantedUser)}
            </>
        );
    }

    componentDidMount() {
        this.props.getUser(this.state.userName);
        this.props.checkAuthStatus();
    }

    render() {
        return (
            <div className="user__container">
                <div className="user__content">
                    {this.configPage(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        users: state.auth.users,
        wantedUser: state.auth.wantedUser,
        authInfo: state.auth.authInfo
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveUser: async ({ userName, role, active }) => {
            try {
                dispatch(actions.loading(true));

                const userResponse = await votifyServer.post('/save-user', { userName, role, active });

                if (!userResponse.data.success) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: 'Something went wrong while saving user' }));
                }

                dispatch(actions.getUser(userResponse.data.wantedUser));
                dispatch(actions.authInfo({ authInfo: userResponse.data.msg }));

                dispatch(actions.warningPopUp(false));

                //window.location.reload();

            } catch (error) {
                dispatch(actions.warningPopUp(false));
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }
            dispatch(actions.loading(false));

        },
        setWarningPopUp: (payload, elementWarningPopUp) => {
            try {
                console.log(elementWarningPopUp);
                dispatch(actions.placeWarningPopUp(elementWarningPopUp));
                dispatch(actions.warningPopUp(payload));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: error.message }));
            }
        },
        getUser: async (userName) => {
            try {
                dispatch(actions.loading(true));

                const userResponse = await votifyServer.get(`/users/${userName}`);

                if (!userResponse.data.success) {
                    dispatch(actions.loading(false));
                    dispatch(actions.warningPopUp(false));
                    return dispatch(actions.authInfo({ authInfo: 'Something went wrong while getting user' }));
                }

                dispatch(actions.getUser(userResponse.data.wantedUser));
                dispatch(actions.authInfo({ authInfo: userResponse.data.msg }));
                dispatch(actions.warningPopUp(false));

            } catch (error) {
                console.log(error.message);
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }
            dispatch(actions.loading(false));
        },
        checkAuthStatus: checkAuthStatus(dispatch, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
