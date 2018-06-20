import React from 'react'
import {connect} from 'react-redux'
import browserCookies from 'browser-cookies'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)
class User extends React.Component {

    componentDidMount() {
    }

    logout = () => {
        Modal.alert('注销', '确定注销？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确定', onPress: () => {
                    console.log('logout')
                    browserCookies.erase('userId')
                    this.props.logoutSubmit()
                }
            },
        ])
    }

    render() {
        return this.props.user ? (
            <div>
                <Result img={<img src={require(`../../component/img/${this.props.avatar}.png`)} style={{width: 50}}
                                  alt='avatar'/>}
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
                    <List.Item onClick={this.logout}>退出登录</List.Item>
                </List>
            </div>
        ) : (
            <Redirect to={this.props.redirectTo}/>
        )
    }
}

export default User
