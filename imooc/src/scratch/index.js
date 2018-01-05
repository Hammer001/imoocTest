import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware ,compose } from 'redux'
import thunk from 'redux-thunk'
import { 
    BrowserRouter, 
    Route, 
    Redirect,
    Switch 
        } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducer from './reducer'
import Auth from './auth.js'
import Dashboard from './dashboard'
import './config'
import 'antd-mobile/dist/antd-mobile.css';

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
console.log(store.getState)

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route> 
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
