import React from 'react'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { register } from '../../redux/user.redux'
import { withRouter } from 'react-router-dom'
import selfForm from '../../component/form/selfForm'

const RadioItem = Radio.RadioItem

@withRouter
@connect(
  state => state.user,
  {register}
)
@selfForm
class Register extends React.Component {
  constructor (props) {
    super(props)
  }

  // 也可以用redirect标签……好像还是redirect标签快一点……
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    let replace = nextProps.history.replace
    let redirectTo = nextProps.redirectTo
    redirectTo && replace(redirectTo)
  }

  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }

  handleRegister = () => {
    this.props.register(this.props.state)
  }

  render () {
    return (
      <div>
        {/*{this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}*/}
        <Logo/>
        <div>register</div>
        <List>
          {this.props.msg ? <div className='error-msg'>{this.props.msg}</div> : null}
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v => this.props.handleChange('repeatPwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem onChange={v => this.props.handleChange('type', 'genius')} checked={this.props.state.type === 'genius'}>
            牛人
          </RadioItem>
          <RadioItem onChange={v => this.props.handleChange('type', 'boss')} checked={this.props.state.type === 'boss'}>
            boss
          </RadioItem>
          <WhiteSpace/>
          <Button onClick={v => this.handleRegister()} type='primary'>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register