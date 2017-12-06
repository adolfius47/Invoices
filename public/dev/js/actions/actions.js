import * as types from '../actions';
import $ from 'jquery'

import axios from "axios"
// import { createParams } from '../../utils/api';


export const addInvoice=(data) => (dispatch) => {
  const url = `/api/invoices`

  return axios
    .post(url,data)
    .then((res) => {
      dispatch({
        type: types.GET_INVOICES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_INVOICES_FAILURE });
    });
};
export const loadProducts=() => (dispatch) => {
  const url = `/api/products`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_PRODUCTS_FAILURE });
    });
};
export const loadCustomer=() => (dispatch) => {
  const url = `/api/customers`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_CUSTOMERS_FAILURE });
    });
};
export const loadInvoices=() => (dispatch) => {
  const url = `/api/invoices`

  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: types.GET_INVOICES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_INVOICES_FAILURE });
    });
};



  
