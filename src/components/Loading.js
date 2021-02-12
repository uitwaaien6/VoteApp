
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// NODE MODULES > REACT ICONS
import { VscLoading } from 'react-icons/vsc';

// CSS
import '../styles/components/Loading.css';

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.renderLoadingIcon = this.renderLoadingIcon.bind(this);
    }

    renderLoadingIcon(loading) {
        if (loading) {
            return (
                <div className="loading__icon">
                    <VscLoading
                        id="loading__icon"
                    />
                </div>
            );
        };

        return null;
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="loading__container">
                <div className="loading__content">
                    {this.renderLoadingIcon(this.props.loading)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, null)(Loading);
