import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {

  componentDidMount () {
    window.reactHistory = this.props.history
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathname
    if (publicList.includes(pathName)) return null

    axios.get('/user/info')
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 成功
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }

  render () {
    return (
      <div>
      </div>

    )
  }
}

export default AuthRoute
