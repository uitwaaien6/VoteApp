
// NODE MODULES
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// SCREENS
import Home from '../screens/Home';
import Votes from '../screens/Votes';
import Vote from '../screens/Vote';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import StartVote from '../screens/StartVote';
import RegisterExecutive from '../screens/RegisterExecutive';
import Users from '../screens/Users';
import User from '../screens/User';

// COMPONENTS
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';

// STORE
import store from '../stores/store';

// CSS
import '../styles/components/App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app__container">
                        <div className="app__content">

                            <Loading />

                            <Header />
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/login" exact component={Login} />
                                <Route path="/register" exact component={Register} />
                                <Route path="/profile" exact component={Profile} />
                                <Route path="/votes/:voteId" exact component={Vote} />
                                <Route path="/votes" exact component={Votes} />
                                <Route path="/start-vote" exact component={StartVote} />
                                <Route path="/users" exact component={Users} />
                                <Route path="/users/:userName" exact component={User} />
                                <Route path="/register-executive" exact component={RegisterExecutive} />
                            </Switch>
                            <Footer />

                        </div>  
                    </div>
                </Router>
            </Provider>
        );
    };
    
}

export default App;

