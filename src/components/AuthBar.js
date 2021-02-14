
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// REACT ICONS
import { GiHamburgerMenu } from 'react-icons/gi';

// CSS
import '../styles/components/AuthBar.css';

class AuthBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthBarOpen: false
        };

        this.authBarItems = React.createRef();
    }

    renderHamburgerIcon(isAuthBarOpen) {
        if (!isAuthBarOpen) {
            return (
                <GiHamburgerMenu
                    onClick={() => {

                        this.setState({ ...this.state, isAuthBarOpen: !this.state.isAuthBarOpen });

                        if (this.authBarItems.current) {

                            if (this.state.isAuthBarOpen) {
                                return this.authBarItems.current.style.left = '20%';
                            }

                            return this.authBarItems.current.style.left = '-100%';
                            
                        }
                        
                    }}
                    id="auth-bar__hamburger"
                />
            );
        };
    }

    renderBarItems(isLoggedIn, isAuthBarOpen) {
        if (true) {
            return (
                <div 
                    className="auth-bar__items"
                    ref={this.authBarItems}
                >
                    <ul>
                        <li>
                            <Link
                                to="/votes"
                            >
                                Votes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/votes"
                            >
                                Votes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/votes"
                            >
                                Votes
                            </Link>
                        </li>
                    </ul>
                </div>
            );
        };

        return null;
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            console.log(this.authBarItems.current);
        });
    }

    render() {
        return (
            <div className="auth-bar__container">
                <div className="auth-bar__content">
                    {this.renderHamburgerIcon(false)}
                    {this.renderBarItems(null, this.state.isAuthBarOpen)}

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

