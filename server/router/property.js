
const Router = require('koa-router');
const propertyController = require('../controller/property');

const router = new Router({prefix: '/api/property'});

for (const serviceName in propertyController) {
  if (propertyController.hasOwnProperty(serviceName)) {
    router.post('/'.concat(serviceName), propertyController[serviceName]);
  }
}

module.exports = router;

