import axios from 'axios'
import { getRedirectPath } from '../util'

// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
  // pwd: ''
}

export function user (state = initState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {...state, ...action.data}
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.data), ...action.data}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function errorMsg (msg) {
  return {type: ERROR_MSG, msg}
}

function authSuccess (obj) {
  // 去掉pwd字段的一种做法，值得学习
  const {pwd, ...data} = obj
  return {type: AUTH_SUCCESS, data}
}

export function loadData (data) {
  return {type: LOAD_DATA, data}
}

export function login ({user, pwd}) {
  if (!user || !pwd) return errorMsg('用户名和密码必须输入')
  return (dispatch) => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register ({user, pwd, repeatPwd, type}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不同')
  }
  return (dispatch) => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update (data) {
  return (dispatch) => {
    axios.post('/user/update', data)
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}