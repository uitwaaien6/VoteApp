
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

// REACT ICONS
import { GiHamburgerMenu } from 'react-icons/gi';

// ACTION CREATERS
import actions from '../actions/actions';

// APIS
import votifyServer from '../api/votifyServer';

// CSS
import '../styles/components/Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHamburgerMenu: false
        }

        this.hamburgerMenu = React.createRef();

        this.onLogOut = this.onLogOut.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    async onLogOut() {
        this.props.logOut();
    }

    renderAuthElements(isLoggedIn) {

        if (isLoggedIn) {
            return (
                <ul>
                    <li>
                        <Link
                            to="/profile"
                        >
                            Profile
                        </Link>
                    </li>

                    <li onClick={this.onLogOut}>
                        <Route
                            render={({ history }) => <Link onClick={() => history.push('/login')}>Log out</Link>}
                        />
                    </li>
                </ul>
            );
        }

        return (
            <ul>
                <li>
                    <Link
                        to="/login"
                    >
                        Log in
                    </Link>
                </li>

                <li>
                    <Link
                        to="/register"
                    >
                        Register
                    </Link>
                </li>
            </ul>
        );
    }

    renderHeaderElements(isLoggedIn) {
        return (
            <div className="header__default">
                <h1>Votify</h1>

                {this.renderAuthElements(isLoggedIn)}

                <GiHamburgerMenu 
                    onClick={() => {
                        this.setState({ ...this.state, isHamburgerMenu: !this.state.isHamburgerMenu });
                    }} 
                    id="header-hamburger"
                />

            </div>
        )
    }

    renderHamburgerMenu(isHamburgerMenu, isLoggedIn) {
        if (isHamburgerMenu) {
            return (
                <div
                    ref={this.hamburgerMenu}
                    className="header__hamburger"
                >
                    {this.renderAuthElements(isLoggedIn)}
                </div>
            );
        };

        return null;
    }

    handleResize() {
        if (this.hamburgerMenu.current && window.innerWidth > 900) {

            this.setState({ ...this.state, isHamburgerMenu: false });
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <div className="header__container">
                <div className="header__content">
                    {this.renderHeaderElements(this.props.isLoggedIn)}
                    {this.renderHamburgerMenu(this.state.isHamburgerMenu, this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: async () => {

            try {
                dispatch(actions.loading(true));
                const response = await votifyServer.get('/logout');
                const { data } = response;
                if (data.success) {
                    dispatch(actions.logOut({ authInfo: data.msg }));
                }
                dispatch(actions.loading(false));
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: error.message }));
                dispatch(actions.loading(false));
            }

            dispatch(actions.loading(false));

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
