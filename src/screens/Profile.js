
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// API
import checkAuthStatus from '../api/checkAuthStatus';

// CSS
import '../styles/screens/Profile.css';

// IMAGES
import authSculp_gif from '../images/sculp_unauthorized.gif';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderAuthStatus(isLoggedIn) {

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

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="profile__container">
                <div className="profile__content">
                    {this.renderAuthStatus(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        checkAuthStatus: checkAuthStatus(dispatch, ownProps)
    }
}

export default connect(mapStateToProps, null)(Profile);

