
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS 
import AuthBar from '../components/AuthBar';

// CSS
import '../styles/screens/Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderMainPage() {
        return (
            <div className="home__main-page">
                <h1>Welcome to Votify.</h1>
            </div>
        );
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="home__container">
                <div className="home__content">

                    <AuthBar />
                    {this.renderMainPage()}
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
