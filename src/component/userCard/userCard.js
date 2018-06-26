import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick = (item, event) => {
    this.props.history.push(`/chat/${item.user}`)
  }

  render () {
    return (
      <WingBlank>
        {this.props.userList.map((item) => (
          item.avatar ?
            <Card
              key={item._id}
              onClick={this.handleClick.bind(this, item)}>
              <Card.Header
                title={item.user}
                thumb={require(`../../component/img/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}>
              </Card.Header>
              <Card.Body>
                {item.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                  ))}
                {item.type === 'boss' ? (
                  <div>
                    {item.money ? <div>薪资:{ item.money }</div> : null}
                    {item.money ? <div>公司:{ item.company }</div> : null}
                  </div>
                ) : null}
              </Card.Body>
            </Card>
            : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard
