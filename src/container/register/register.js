import React from 'react'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
const RadioItem = Radio.RadioItem;

@withRouter
@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      repeatPwd: ''
    }
  }

  // 也可以用redirect标签……好像还是redirect标签快一点……
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    let replace = nextProps.history.replace
    let redirectTo = nextProps.redirectTo
    redirectTo && replace(redirectTo)
  }

  handleChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  handleRegister = () => {
    this.props.register(this.state)
    console.log(this.state)
  }

  render () {
    return (
      <div>
        {/*{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}*/}
        <Logo/>
        <div>register</div>
        <List>
          {this.props.msg ? <div className='error-msg'>{this.props.msg}</div> : null}
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type='password' onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem onChange={v => this.handleChange('type', 'genius')} checked={this.state.type === 'genius'}>
            牛人
          </RadioItem>
          <RadioItem onChange={v => this.handleChange('type', 'boss')} checked={this.state.type === 'boss'}>
            boss
          </RadioItem>
          <WhiteSpace />
          <Button onClick={v => this.handleRegister()} type='primary'>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register