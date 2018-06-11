import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {

  static propTypes = {
    selectAvatar: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      item: {}
    }
  }

  handleClick = (item) => {
    this.setState({
      item
    })
    this.props.selectAvatar(item.text)
  }

  render () {
    const gridHeader = this.state.item.icon ? (
      <div>
        <span>已选择头像</span>
        <img style={{width: 20, marginLeft: 10}} src={this.state.item.icon} alt='avatar'/>
      </div>
    ) : <div>请选择头像</div>
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map((item) => {
        return {
          icon: require(`../img/${item}.png`),
          text: item
        }
      })
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} columnNum={5} onClick={this.handleClick}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector
