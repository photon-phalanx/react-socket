import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  type: '',
  pwd: ''
}


export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, ...action.data}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function errorMsg (msg) {
  return {type: ERROR_MSG, msg}
}

function registerSuccess (data) {
  return {type: REGISTER_SUCCESS, data}
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
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}