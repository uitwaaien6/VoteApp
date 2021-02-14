
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
import AuthBar from '../components/AuthBar';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="home__container">
                <div className="home__content">
                    <AuthBar />
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

export default connect(mapStateToProps, null)(Home);
