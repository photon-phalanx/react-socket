import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'

const reduxDevtools= window.devToolsExtension? window.devToolsExtension() : () => {}
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  reduxDevtools
))



ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
      </div>
    </BrowserRouter>
  </Provider>
  ),
  document.getElementById('root'));
