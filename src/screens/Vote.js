
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// API
import checkAuthStatus from '../api/checkAuthStatus';

// CSS
import '../styles/screens/Vote.css';

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.checkAuthStatus();
    }

    render() {
        return (
            <div className="vote__container">
                <div className="vote__content">

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

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);


