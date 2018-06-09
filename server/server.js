const Koa = require('koa')
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(9093);
console.log('server listen on port 9093')