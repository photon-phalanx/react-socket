import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render () {
    return (
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
