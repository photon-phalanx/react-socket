import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import './config'
import './index.css'
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => {}
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'))
