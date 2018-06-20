const router = require('koa-router')()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const _filter = {'pwd': 0, '__v': 0}

router.get('/info', async (ctx, next) => {
  let userId = ctx.cookies.get('userId')
  if (!userId) {
    ctx.body = {code: 1}
    return
  }
  try {
    let result = await User.findOne({_id: userId}, _filter)
    if (!result) {
      ctx.body = {code: 1}
      return
    }
    ctx.body = {code: 0, data: result}
  } catch (e) {
    ctx.body = {code: 1, msg: '后端错误'}
  }
})

router.post('/register', async (ctx, next) => {
  const {user, pwd, type} = ctx.request.body
  let result = await User.findOne({user})
  if (result) {
    ctx.body = {code: 1, msg: '用户已存在'}
  } else {
    try {
      const userModel = new User({user, pwd: md5Pwd(pwd), type})
      let result = await userModel.save()
      ctx.cookies.set('userId', result._id, {httpOnly: false})
      ctx.body = {code: 0, data: {user: result.user, type: result.type, _id: result._id}}
    } catch (e) {
      ctx.body = {code: 1, msg: '后端错误'}
    }
  }
})

router.post('/login', async (ctx, next) => {
  const {user, pwd} = ctx.request.body
  try {
    let result = await User.findOne({user, pwd: md5Pwd(pwd)}, _filter)
    if (!result) {
      ctx.body = {code: 1, msg: '用户不存在或者密码错误'}
    } else {
      ctx.cookies.set('userId', result._id, {httpOnly: false})
      ctx.body = {code: 0, data: result}
    }
  } catch (e) {
    ctx.body = {code: 1, msg: '后端错误'}
  }
})

router.post('/update', async (ctx, next) => {
  let userId = ctx.cookies.get('userId')
  if (!userId) {
    ctx.body = {code: 1}
    return
  }
  const body = ctx.request.body
  try {
    let result = await User.findByIdAndUpdate({_id: userId}, body)
    console.log(result)
    const data = {userId, ...result._doc, ...body}
    ctx.body = {code: 0, data}
  } catch (e) {
    ctx.body = {code: 1, msg: '后端错误'}
  }
})

router.get('/list', async (ctx, next) => {
  const {type} = ctx.query
  try {
    let data = await User.find({type})
    // let data = await User.remove({})
    ctx.body = {code: 0, data}
  } catch (e) {
    ctx.body = {code: 1, msg: '后端错误'}
  }
  next()
})

function md5Pwd (pwd) {
  const salt = 'photon_phalanx_salt'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = router
