
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

        this.findUser = this.findUser.bind(this);
    }

    onUserSave() {
        const activeVal = this.activeSelect.current.value;
        const roleVal = this.roleSelect.current.value;
        this.props.saveUser()
    }

    onUserSaveClick() {
        this.props.setWarningPopUp(true);
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

    findUser(userName) {
        return this.props.users.find((item) => item.userName === userName);
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

            const roles = ['admin', 'executive', 'user'];
            const role = user[item];

            const configedRoles = [role];

            roles.forEach((roleItem, index) => {
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
        }

        return <span id="user__prop-value">{boolVal ? boolVal : user[item]}</span>;
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
                        onClick={}
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

        const user = this.findUser(this.state.userName);
        const configuration = {
            title: 'Are you sure you want to save this user.',
            callback: () => {}
        }

        return (
            <>
                <WarningPopUp
                    configuration={configuration}
                />
                <AuthBar />
                {this.displayUser(user)}
            </>
        );
    }

    componentDidMount() {

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
        users: state.auth.users
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveUser: async () => {
            try {
                dispatch(actions.loading(true));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }
            dispatch(actions.loading(false));
        },
        setWarningPopUp: (payload) => {
            try {
                dispatch(actions.warningPopUp(payload));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: error.message }));
            }
        },
        checkAuthStatus: checkAuthStatus(dispatch, ownProps)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

