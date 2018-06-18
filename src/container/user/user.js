import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'

@connect(
  state => state.user,
  {}
)
class User extends React.Component {

  componentDidMount () {
  }

  render () {
    return this.props.user ?(
      <div>
        <Result img={<img src={require(`../../component/img/${this.props.avatar}.png`)} style={{width: 50}} alt='avatar'/>}
                title={this.props.user}
                msg={this.props.type === 'boss' ? this.props.company : null}
        />

        <List renderHeader={'简介'}>
          <List.Item multipleLine={true}>
            {this.props.title}
            {this.props.desc.split('\n').map((item) => (
              <List.Item.Brief key={item}>{item}</List.Item.Brief>
            ))}
            {this.props.money ? <List.Item.Brief>薪资:{this.props.money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace/>
        <List>
          <List.Item>退出登录</List.Item>
        </List>
      </div>
    ) : null
  }
}

export default User
