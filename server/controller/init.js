
const initService = require('../service/init');

const controller = {};

for (const serviceName in initService) {
  if (initService.hasOwnProperty(serviceName)) {
    controller[serviceName] = async (ctx) => {
      const res = await initService[serviceName](ctx);
      ctx.body = res;
    }
  }
}

module.exports = controller;

