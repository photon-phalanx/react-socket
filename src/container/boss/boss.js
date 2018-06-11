import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

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
      <div>
        <WingBlank>
          {this.props.userList.map((item) => (
            item.avatar ?
              <Card key={item._id}>
                <Card.Header
                  title={item.user}
                  thumb={require(`../../component/img/${item.avatar}.png`)}
                  extra={<span>{item.title}</span>}>
                </Card.Header>
                <Card.Body>
                  {item.desc.split('\n').map(v => (
                    <div key={v}>{v}</div>
                  ))}
                </Card.Body>
              </Card>
              : null
          ))}
        </WingBlank>
      </div>
    )
  }
}

export default Boss
