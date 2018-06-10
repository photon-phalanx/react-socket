const model = require('./model')
const User = model.getModel('user')

module.exports = function (router) {
  router.get('/user/info', async (ctx, next) => {
    console.log(ctx)
    ctx.response.body = JSON.stringify({code: 1})
    next()
  })
  router.get('/user/list', async (ctx, next) => {
    console.log('get list')
    let result = await User.find({}).exec()
    ctx.body = JSON.stringify(result)
  })
}