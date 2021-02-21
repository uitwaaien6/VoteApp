
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import actions from '../actions/actions';

// CSS
import '../styles/components/WarningPopUp.css';

class WarningPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.warningPopUp = React.createRef();
    }

    configPopup(configuration, warningPopUp) {
        if (!configuration) {
            window.alert('configuration is not provided to popup');
            return null;
        }

        if (!warningPopUp) {
            return null;
        }

        const { title, callback } = configuration;

        return (
            <div
                className="warning-popup__window"
                ref={this.warningPopUp}
            >
                <div>
                    <h1>{title}</h1>
                </div>

                <div>
                    <button
                        onClick={callback}
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => this.props.setWarningPopUp(false)} 
                    >
                        No
                    </button>
                </div>

            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            if (this.warningPopUp.current) {
                this.warningPopUp.current.style.top = `${window.pageYOffset}px`;
            }
        });
    }

    render() {
        return (
            <div
                className="warning-popup__container"
            >
                <div className="warning-popup__content">
                    {this.configPopup(this.props.configuration, this.props.warningPopUp)}
                </div>
            </div>
        );
    };
}


function mapStateToProps(state) {
    return {
        warningPopUp: state.auth.warningPopUp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setWarningPopUp: (payload) => {
            try {
                dispatch(actions.warningPopUp(payload));
            } catch (error) {
                
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningPopUp);

