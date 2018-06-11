import React from 'react'
import { connect } from 'react-redux'
import {loadData} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios/index'

@withRouter
  @connect(
    null,
    {loadData}
  )
class AuthRoute extends React.Component {

  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathname
    if (publicList.includes(pathName)) return null

    axios.get('/user/info')
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }

  render () {
    return null
  }
}

export default AuthRoute
