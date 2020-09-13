import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import PrivateRoute from './PrivateRoute';
import HomePage from './component/HomePage';
import LoginPage from './component/Login';
import AccountNameMaster from './component/AccountNameMaster';
import AccountHolderMaster from './component/AccountHolderMaster';
import CompanyMaster from './component/CompanyMaster';
import HolderGroupMaster from './component/HolderGroupMaster';
import CompanyWiseEntry from './component/CompanyWiseEntry'
import HolderWiseEntry from './component/HolderWiseEntry'

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/account-master" component={AccountNameMaster} />
                        <PrivateRoute exact path="/holder-master" component={AccountHolderMaster} />
                        <PrivateRoute exact path="/company-master" component={CompanyMaster} />
                        <PrivateRoute exact path="/holder-group-master" component={HolderGroupMaster} />
                        <PrivateRoute exact path="/data-entry-company" component={CompanyWiseEntry} />
                        <PrivateRoute exact path="/data-entry-holder" component={HolderWiseEntry} />
                        <Route path="/login" component={LoginPage} />
                    </div>
                </Router>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
