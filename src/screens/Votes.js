
// NODE MODULES
import React from 'react';
import { Link } from 'react-router-dom';

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
                    Votes Screen

                    <Link to="/">Go to Home</Link>
                </div>
            </div>
        );
    };
}

export default Votes;
