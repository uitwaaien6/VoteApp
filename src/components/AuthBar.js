
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// REACT ICONS
import { GiHamburgerMenu } from 'react-icons/gi';

// CONFIG > ROLES
import roles from '../_config/roles';

// CSS
import '../styles/components/AuthBar.css';

class AuthBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthBarOpen: false
        };

        this.authBarItems = React.createRef();

        this.handleResize = this.handleResize.bind(this);
    }

    renderHamburgerIcon() {
        return (
            <GiHamburgerMenu
                onClick={() => {

                    this.setState({ ...this.state, isAuthBarOpen: !this.state.isAuthBarOpen });

                    if (this.authBarItems.current && window.innerWidth < 900) {

                        if (this.state.isAuthBarOpen) {
                            return this.authBarItems.current.style.left = '20%';
                        }

                        return this.authBarItems.current.style.left = '-150%';
                        
                    }
                    
                }}
                id="auth-bar__hamburger"
            />
        );
    }

    renderBarItems(isLoggedIn) {
        if (isLoggedIn) {

            const userRole = this.props.user.role;
            
            const barItems = [
                {
                    title: 'Profile',
                    uri: '/profile',
                    role: 'user'
                },
                {
                    title: 'Votes',
                    uri: '/votes',
                    role: 'user'
                },
                {
                    title: 'Start Vote',
                    uri: '/start-vote',
                    role: 'admin'
                },
                {
                    title: 'Register Voter',
                    uri: '/register-executive',
                    role: 'admin'
                }
            ];

            return (
                <div 
                    className="auth-bar__items"
                    ref={this.authBarItems}
                >
                    <ul>

                        {barItems.map((item ,index) => {
                            const role = item.role;
                        
                            if (role === roles.ADMIN && userRole !== roles.ADMIN) {
                                return null;
                            }

                            return (
                                <Link 
                                    to={item.uri}
                                    key={index}
                                >
                                    <li>{item.title}</li>
                                </Link>
                            );
                            
                        })}

                    </ul>
                </div>
            );
        };

        return null;
    }

    handleResize() {

        if (this.authBarItems.current) {

            if (window.innerWidth > 900) {
                return this.authBarItems.current.style.left = '0%';
            }

            return this.authBarItems.current.style.left = '20%';

        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    render() {

        // TODO Replace true with real isLoggedIn
        return (
            <div className="auth-bar__container">
                <div className="auth-bar__content">
                    {this.renderHamburgerIcon()}
                    {this.renderBarItems(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(AuthBar);

