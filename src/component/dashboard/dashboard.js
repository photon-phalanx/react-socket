import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, WingBlank, WhiteSpace, Button, NavBar } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import { Route, Switch } from 'react-router-dom'
import Boss from '../../container/boss/boss'

function Genius () {
  return <h1>GENIUS</h1>
}

function Msg () {
  return <h1>img</h1>
}

function User () {
  return <h1>user</h1>
}

@connect(
  state => state,
  {}
)
class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const user = this.props.user
    const {pathname} = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '信息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return (
      <div>
        <NavBar className='fixed-header' mode='dard'>{navList.find((item) => item.path === pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map((item) => {
              return <Route key={item.path} path={item.path} component={item.component}/>
            })}
          </Switch>
        </div>
        <NavLink data={navList}/>
      </div>
    )
  }
}

export default Dashboard
