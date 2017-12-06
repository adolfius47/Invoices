"use strict";
import React from "react";
import {hashHistory, IndexRoute, Route, Router} from "react-router";
import App from './components/App'
import InvoicesList from './components/InvoicesList'
import AddInvoice from './components/AddInvoice'

const createRouter = (getState, dispatch) => {


    return (
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={InvoicesList}/>
				<Route path='/add' component={AddInvoice}/>
				

            </Route>
        </Router>
    )
}

export default createRouter;
