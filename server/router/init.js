
const Router = require('koa-router');
const initController = require('../controller/init');

const router = new Router({prefix: '/api/init'});

for (const serviceName in initController) {
  if (initController.hasOwnProperty(serviceName)) {
    router.get('/'.concat(serviceName), initController[serviceName]);
  }
}

module.exports = router;

