import React from 'react'
import io from 'socket.io-client'
// import { connect } from 'react-redux'
import { List, InputItem} from 'antd-mobile'
import { login } from '../../redux/user.redux'
// import { login } from '../../redux/user.redux'

const socket = io('ws://localhost:9093')
class Chat extends React.Component {
  //
  // register = () => {
  //   this.props.history.push('/register')
  // }
  //
  //
  // handleLogin = () => {
  //   this.props.login(this.props.state)
  // }

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  handleSubmit = () => {
    socket.emit('sendmsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }
  componentDidMount () {
    socket.on('recvmsg', (data) => {
      console.log(data)
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }
  render () {
    return (
      <div>
        {this.state.msg.map((v, index) => {
          return <p key={index}>{v}</p>
        })}
        <div className="stick-footer">
          <List>
            <InputItem placeholder="请输入" value={this.state.text}
                       onChange={text => {this.setState({text})}}
                       extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >信息</InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat