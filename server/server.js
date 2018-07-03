const Koa = require('koa')
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')();
const userRoutes = require('./user')
app.use(bodyParser())

// return json
app.use(async (ctx, next) => {
  ctx.response.type = 'json'
  await next()
})

router.use('/user', userRoutes.routes())

app.use(router.routes());
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    io.emit('recvmsg', data)
  })
})

server.listen(9093);
console.log('server listen on port 9093')