
const propertyService = require('../service/property');

const controller = {};

for (const serviceName in propertyService) {
  if (propertyService.hasOwnProperty(serviceName)) {
    controller[serviceName] = async (ctx) => {
      const res = await propertyService[serviceName](ctx);
      ctx.body = res;
    }
  }
}

module.exports = controller;

