
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// ACTION CREATERS
import signInAction from '../actions/actions';

// CSS
import '../styles/components/Header.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    renderHeaderElements(items) {
        return (
            <ul className="header__items">
                {
                    items.map((item, index) => {
                        return (
                            <li key={index}>{item}</li>
                        );
                    })
                }
            </ul>
        )
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="header__container">
                <div className="header__content">
                    {this.renderHeaderElements(["Votify"])}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: () => {
            dispatch(signInAction({ uuid: 'test', role: 'test' }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
