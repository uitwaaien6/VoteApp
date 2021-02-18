
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// API
import checkAuthStatus from '../api/checkAuthStatus';
import votifyServer from '../api/votifyServer';

// IMAGES
import sculpGif from '../images/sculp_unauthorized.gif';

// ACTIONS
import actions from '../actions/actions';

// CONFIG > ROLES
import roles from '../_config/roles';

// CSS
import '../styles/screens/StartVote.css';

class StartVote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            optionCount: 0
        }

        this.optionsContainer = React.createRef();

        this.onAddOption = this.onAddOption.bind(this);
        this.onCreateVote = this.onCreateVote.bind(this);
    }

    onCreateVote() {
        this.props.createVote(this);
        
    }

    onAddOption() {
        this.setState({ ...this.state, optionCount: this.state.optionCount + 1 });
    }

    renderOptions(optionCount) {
        if (optionCount === null || optionCount === undefined) {
            console.log('Please provide options');
            return null;
        }

        const optionsArray = [];
        for (let i = 0; i < optionCount; i++) {
            optionsArray.push(i);
        }

        return optionsArray.map((item, index) => {
            return (
                <div>
                    <input
                        key={index}
                        type="text"
                        placeholder="Option..."
                    />
                </div>
            );
        });

    }

    configPage(isLoggedIn, role) {
        if (!isLoggedIn && role !== roles.ADMIN) {
            return (
                <div className="start-vote__unauthorized">
                    <iframe
                        title="sculpGif"
                        src={sculpGif}
                        frameBorder="0"
                    />

                    <p>Sorry Couldnt find the page you are looking for :(</p>
                </div>
            );
        }

        return (
            <div className="start-vote__config">

                {
                    this.props.authInfo ?
                    <div className="start-vote__info">
                        <p>{this.props.authInfo}</p>
                    </div> : 
                    null
                }

                <div>
                    <input
                        onChange={(event) => this.setState({ ...this.state, title: event.target.value })}
                        value={this.state.title}
                        type="text"
                        placeholder="Enter Title..."
                    />
                </div>

                <div>
                    <button
                        onClick={this.onCreateVote}
                    >
                        Create Vote
                    </button>
                </div>

                <div>
                    <button
                        onClick={this.onAddOption}
                    >
                        Add Option
                    </button>
                </div>

                <div
                    ref={this.optionsContainer}
                    className="start-vote__options"
                >
                    {this.renderOptions(this.state.optionCount)}
                </div>

            </div>
        );
    }

    componentDidMount() {
        this.props.checkAuthStatus();
        setTimeout(() => this.props.clearAuthInfo(), 500);
    }

    render() {
        return (
            <div className="start-vote__container">
                <div className="start-vote__content">
                    {this.configPage(this.props.isLoggedIn, this.props.user.role)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
        authInfo: state.auth.authInfo
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        checkAuthStatus: checkAuthStatus(dispatch, ownProps),
        clearAuthInfo: () => {
            dispatch(actions.authInfo({ authInfo: '' }));
        },
        createVote: async (component) => {
            try {
                dispatch(actions.loading(true));
                const childCount = component.optionsContainer.current.childNodes.length;
                const container = component.optionsContainer.current;
        
                const optionValues = [];
        
                for (let i = 0; i < childCount; i++) {
                    optionValues.push(container.childNodes[i].childNodes[0].value); // enter the first child which is a empty div for css purposes and then enter one more child to reach the input value, might change later
                }
        
                const configedOptions = [];
        
                optionValues.forEach((item, index) => {
                    if (item && !item.includes(' ')) {
                        configedOptions.push(item);
                    }
                });
        
                
                if (!component.state.title) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: 'Title cannot be empty!' }));
                }
        
                let emptyCount = 0;
        
                for (let i = 0; i < component.state.title.length; i++) {
        
                    if (component.state.title[i] === ' ') {
                        emptyCount++;
                    }
                }
        
                if (emptyCount === component.state.title.length) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: 'Title cannot be empty!' }));
                }
                
                const { data } = await votifyServer.post('/start-vote', { title: component.state.title, options: configedOptions });

                if (!data.success) {
                    return dispatch(actions.authInfo({ authInfo: 'Couldnt create Vote!' }));
                }

                dispatch(actions.authInfo({ authInfo: 'New Vote successfully created !' }));
                
            } catch (error) {
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }

            dispatch(actions.loading(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartVote);

