import React from 'react'
// import { connect } from 'react-redux'
// import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
// import { login } from '../../redux/user.redux'

class Chat extends React.Component {

  register = () => {
    this.props.history.push('/register')
  }


  handleLogin = () => {
    this.props.login(this.props.state)
  }

  render () {
    return (
      <div>
        chat with user:{this.props.match.params.user}
      </div>

    )
  }
}

export default Chat