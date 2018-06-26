import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navLink/navLink'
import { Route, Switch } from 'react-router-dom'
import Boss from '../../container/boss/boss'
import Genius from '../../container/genius/genius'
import User from '../../container/user/user'

function Msg () {
  return <h1>img</h1>
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
    let selected = navList.find((item) => item.path === pathname)
    return (
      <div>
        <NavBar className='fixed-header' mode='dard'>{selected && selected.title}</NavBar>
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
