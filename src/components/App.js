
// NODE MODULES
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// SCREENS
import Home from '../screens/Home';
import Votes from '../screens/Votes';
import Login from '../screens/Login';
import Register from '../screens/Register';

// COMPONENTS
//import Header from './Header';
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
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/login" exact component={Login} />
                                <Route path="/register" exact component={Register} />
                                <Route path="/votes" exact component={Votes} />
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

