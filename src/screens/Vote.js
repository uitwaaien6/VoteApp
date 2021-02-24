
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import actions from '../actions/actions';

// COMPONENTS
import WarningPopUp from '../components/WarningPopUp';
import AuthBar from '../components/AuthBar';

// API
import votifyServer from '../api/votifyServer';
import checkAuthStatus from '../api/checkAuthStatus';

// IMAGES
import sculpGif from '../images/sculp_unauthorized.gif'

// CSS
import '../styles/screens/Vote.css';

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteOption: null,
            voteClientId: null
        };

        this.configPage = this.configPage.bind(this);
        this.renderVote = this.renderVote.bind(this);
        this.renderVotes = this.renderVotes.bind(this);
        this.onMakeVote = this.onMakeVote.bind(this);
        this.onVoteOptionClick = this.onVoteOptionClick.bind(this);
    }

    onMakeVote() {
        this.props.makeVote({ voteOption: this.state.voteOption, voteClientId: this.state.voteClientId });
    }

    onVoteOptionClick({ voteOption, voteClientId }) {
        return () => {
            this.setState({ ...this.state, voteOption, voteClientId });
            this.props.setWarningPopUp(true);
        }
    }

    renderVotes(vote) {
        if (!vote) {
            return <h1>No votes found</h1>
        }

        const votesProps = Object.getOwnPropertyNames(vote.votes);

        return votesProps.map((voteProp, index) => {
            return (
                <div 
                    className="vote__vote-option"
                    onClick={this.onVoteOptionClick({ voteOption: voteProp, voteClientId: vote.clientId })}
                >
                    {voteProp}: <span id="vote-value">{ vote.votes[voteProp]} </span>
                    
                </div>
            );
        });

    }
    
    renderVote(vote) {
        if (!vote) {
            return <h1>Vote you searching for cannot be find</h1>
        }

        return (
            <div className="vote__vote">
                
                {
                    this.props.authInfo ?
                    <div className="vote__info">
                        <p>{this.props.authInfo}</p>
                    </div> : 
                    null
                }

                <div>
                    <h1>
                        {this.props.vote.title}
                    </h1>
                </div>

                <div
                    className="vote__votes"
                >
                    {this.renderVotes(this.props.vote)}
                </div>

            </div>
        );
    }

    configPage(isLoggedIn) {

        if (!isLoggedIn) {
            return (
                <div className="votes__unauthorized">
                    <iframe
                        title="sculpGif"
                        src={sculpGif}
                        frameBorder="0"
                    />

                    <p>You are logged out.</p>
                </div>
            );
        }

        const configuration = {
            title: 'You want to give vote to this option ?',
            callback: this.onMakeVote
        }

        return (
            <>
                <WarningPopUp
                    configuration={configuration}
                />
                <AuthBar />
                {this.renderVote(this.props.vote)}
            </>

        );
    }

    componentDidMount() {
        this.props.checkAuthStatus();
        this.props.getVote();
    }

    render() {
        return (
            <div className="vote__container">
                <div className="vote__content">
                    {this.configPage(this.props.isLoggedIn)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        authInfo: state.auth.authInfo,
        vote: state.vote.vote
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getVote: async () => {
            try {
                dispatch(actions.loading(true));
                const voteClientId = window.location.pathname.split('/').pop();
                const { data } = await votifyServer.get(`/votes/${voteClientId}`);
                
                if (!data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                    return dispatch(actions.loading(false));
                }

                dispatch(actions.getVote(data.vote));
                dispatch(actions.authInfo({ authInfo: data.msg }));

            } catch (error) {
                console.log(error);
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }
            dispatch(actions.loading(false));
        },
        checkAuthStatus: checkAuthStatus(dispatch, ownProps),
        setWarningPopUp: (payload) => {
            dispatch(actions.warningPopUp(payload));
        },
        makeVote: async ({ voteOption, voteClientId }) => {
            try {
                dispatch(actions.warningPopUp(false));
                dispatch(actions.loading(true));

                const makeVoteResponse = await votifyServer.post('/make-vote', { voteOption, voteClientId });

                if (!makeVoteResponse.data.success) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: makeVoteResponse.data.msg }));
                }

                dispatch(actions.authInfo({ authInfo: makeVoteResponse.data.msg }))

                const voteClientIdInUrl = window.location.pathname.split('/').pop();
                const { data } = await votifyServer.get(`/votes/${voteClientIdInUrl}`);
                
                if (!data.success) {
                    dispatch(actions.authInfo({ authInfo: data.msg }));
                    return dispatch(actions.loading(false));
                }

                dispatch(actions.getVote(data.vote));

                //dispatch(actions.authInfo({ authInfo: data.msg }));
            } catch (error) {
                console.log(error);
                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }

            dispatch(actions.loading(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);


