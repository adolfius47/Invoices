import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import store from './store'
import Routing from './router'
import 'react-select/dist/react-select.css';
import './style/style.scss'

const id = 'table'
const app = document.getElementById(id)
if (!app) throw 'Element was not found: ' + id

render(
    <Provider store={store}>
        {Routing(store.getState, store.dispatch)}
    </Provider>, app
)


