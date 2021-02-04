// NODE MODULES
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// SCREENS
import Home from '../screens/Home';
import Votes from '../screens/Votes';

// COMPONENTS
import Header from './Header';

// STORE
import store from '../stores/store';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.StrictMode>
                <Provider store={store}>
                    <Router>
                        <div className="app__container">
                            <div className="app__content">
                                <Header />
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/votes" exact component={Votes} />
                                </Switch>
                            </div>  
                        </div>
                    </Router>
                </Provider>
            </React.StrictMode>
        );
    };
    
}

export default App;
