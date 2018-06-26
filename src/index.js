import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

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
          <Switch>
            <Route path='/bossinfo' component={BossInfo}/>
            <Route path='/geniusinfo' component={GeniusInfo}/>
            {/*<Route path='/login' component={Login}/>*/}

            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route component={Dashboard}/>
            <Route path='/chat/:user' component={Chat}/>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'))
