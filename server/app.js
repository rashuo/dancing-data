const http = require('http');
const Koa = require('koa');
const config = require('./config');
const initRouter = require('./router/init');

const app = new Koa();

app.use(initRouter.routes());

console.log(initRouter.routes());
app.use(ctx => {
  ctx.body = 'Hello World';
});

const server = http.createServer(app.callback())

server.listen(config.port)
server.on('error', (error) => {
  console.log(error);
})
server.on('listening', () => {
  console.log('Listening on port: %d', config.port)
})

module.exports = app;
