import React from 'react'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import selfForm from '../../component/form/selfForm'
@connect(
  state => state.user,
  {login}
)
@selfForm
class Login extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     user: '',
  //     pwd: ''
  //   }
  // }

  register = () => {
    this.props.history.push('/register')
  }


  handleLogin = () => {
    this.props.login(this.props.state)
  }

  render () {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo!== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <div className='error-msg'>{this.props.msg}</div> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
          </List>
          <Button type='primary' onClick={v => this.handleLogin()}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>

    )
  }
}

export default Login