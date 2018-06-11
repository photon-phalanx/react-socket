import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import { List, InputItem, Button, TextareaItem } from 'antd-mobile'
import { update } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  {update}
)
class Geniusinfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      avatar: ''
    }
  }

  onChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  selectAvatar = (text) => {
    this.setState({
      avatar: text
    })
  }

  render () {
    const path = this.props.location.pathname
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== path ? <Redirect to={this.props.redirectTo}/> : null}
        <NavBar mode="dark">牛人信息完善</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <List>
          <InputItem onChange={(v) => {this.onChange('title', v)}}>求职岗位</InputItem>
          <TextareaItem
            rows={3}
            autoHeight
            title='个人简介'
            onChange={(v) => {this.onChange('desc', v)}}/>
          <Button onClick={() => {this.props.update(this.state)}} type='primary'>保存</Button>
        </List>
      </div>
    )
  }
}

export default Geniusinfo
