import http from 'http';
import Koa from 'koa';
import config from './config';
import initRouter from './router/init';

class App {
  constructor() {
    this.app = new Koa();

    this.initServer();
    this.initMidderWare();
  }
  initMidderWare() {
    this.initRoutes();
  }

  initRoutes() {
    this.app.use(initRouter.routes());
  }
  initServer() {
    this.server = http.createServer(this.app.callback());
    this.server.listen(config.port);
    this.server.on('listening', () => {
      console.log('Listening on port: %d', config.port)
    })
  }
}
export default new App();
