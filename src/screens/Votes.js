
// NODE MODULES
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaTrashAlt } from 'react-icons/fa';

// COMPONENTS
import AuthBar from '../components/AuthBar';
import WarningPopUp from '../components/WarningPopUp';

// ACTIONS
import actions from '../actions/actions';

// API
import votifyServer from '../api/votifyServer';

// CSS
import '../styles/screens/Votes.css';

// IMAGES
import sculpGif from '../images/sculp_unauthorized.gif';

class Votes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.renderVoteElements = this.renderVoteElements.bind(this);
        this.onVoteDelete = this.onVoteDelete.bind(this);
    }

    onVoteDelete() {
        console.log(this.props);
        this.props.setWarningPopUp(true);
    }

    renderVoteElements(votes) {

        const userRole = this.props.user.role;
        const isAdmin = userRole === 'admin';

        return votes.map((vote, index) => {
            return (
                <li>
                    <Link
                        to={`/votes/${vote.clientId}`}
                    >
                        <div>
                            {vote.title} 
                        </div>
                    </Link>


                    <div>
                        {isAdmin ? <div onClick={this.onVoteDelete} id="votes__trash-container"><FaTrashAlt id="votes__trash" /> </div> : null}
                    </div>
                    
                </li>
            );
        })
    };

    renderVotes(votes) {
        return (
            <div className="votes__votes">
                <ul>
                    {this.renderVoteElements(votes)}
                </ul>    
            </div>
        );
    }

    configVotesPage(isLoggedIn) {
        if (!isLoggedIn) {
            return (
                <div className="votes__unauthorized">
                    <iframe
                        src={sculpGif}
                        frameBorder="0"
                    />

                    <p>You are not logged in.</p>
                </div>
            );
        }

        const configuration = {
            title: 'Do you want to delete this vote ?',
            callback: () => this.onVoteDelete()
        }

        return (
            <>
                <WarningPopUp  configuration={configuration} />
                <AuthBar />
                {this.renderVotes(this.props.votes)}
            </>
        );
    }

    componentDidMount() {
        this.props.getVotes();
    }

    render() {
        return (
            <div className="votes__container">
                <div className="votes__content">
                    
                    {this.configVotesPage(true)}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        votes: state.vote.votes,
        warningPopUp: state.auth.warningPopUp
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getVotes: async () => {
            try {
                dispatch(actions.loading(true));
                const { data }  = await votifyServer.get('/votes');

                if (!data.success) {
                    dispatch(actions.loading(false));
                    return dispatch(actions.authInfo({ authInfo: 'Error while getting votes' }));
                }

                dispatch(actions.getVotes(data.votes));


            } catch (error) {

                dispatch(actions.authInfo({ authInfo: error.response.data.error }));
            }

            dispatch(actions.loading(false));
        },
        setWarningPopUp: (payload) => {
            try {
                dispatch(actions.warningPopUp(payload));
            } catch (error) {
                
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Votes);
