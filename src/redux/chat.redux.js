import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0
}

export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload, unread: action.payload.filter((v) => v.read).length}
    case MSG_RECV:
    case MSG_READ:
    default:
      return state
  }
}

function msgList (msgs) {
  return {type: MSG_LIST, payload: msgs}
}

export function getMsgList () {
  return dispatch => {
    axios.get('/user/getMsgList')
      .then(res => {
        if (res.state === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.mags))
        }
      })
  }
}