const Koa = require('koa')
const app = new Koa();
const router = require('koa-router')();
const userRoutes = require('./user')

// return json
app.use(async (ctx, next) => {
  ctx.response.type = 'json'
  next()
  console.log(ctx)
})

app.use(router.routes());

userRoutes(router)

// app.use(async ctx => {
//   ctx.body = JSON.stringify({msg: 'helloworld'});
// });

app.listen(9093);
console.log('server listen on port 9093')