import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../../component/userCard/userCard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends React.Component {

  componentDidMount () {
    this.props.getUserList('genius')
  }

  render () {
    return (
      <UserCard userList={this.props.userList}/>
    )
  }
}

export default Boss
