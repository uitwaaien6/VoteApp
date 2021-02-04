
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// ACTION CREATERS
import signInAction from '../actions/actions';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.signIn();
    }

    render() {
        console.log(this.props.user);
        return (
            <div className="header__container">
                <div className="header__content">
                    Header
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
