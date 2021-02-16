
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import AuthBar from '../components/AuthBar';

class Votes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    
    componentDidMount() {
        
    }

    render() {
        return (
            <div className="votes__container">
                <div className="votes__content">
                    <AuthBar />
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votes);
