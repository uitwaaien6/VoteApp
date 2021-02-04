
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';


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
                    Home Screen
                    
                    <Link to="/votes">Go to Votes</Link>
                </div>
            </div>
        );
    };
}

export default Home;