import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';

import HomePage from '../containers/home';
import CartPage from '../containers/cart';

export default class MainRouter extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/cart" component={CartPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Router>
        );
    }
}