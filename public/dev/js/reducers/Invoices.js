"use strict"
import {combineReducers} from 'redux'
import * as Action from '../actions';


const invoices= (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.GET_INVOICES_SUCCESS:
            return action.payload

        default:
            return previousState;


    }
}
const customers= (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.GET_CUSTOMERS_SUCCESS:
            return action.payload

        default:
            return previousState;


    }
}
const products= (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.GET_PRODUCTS_SUCCESS:
            return action.payload

        default:
            return previousState;


    }
}

export default combineReducers({
invoices,
customers,
products,
})