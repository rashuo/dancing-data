import database from '../database/mongoose';

const db = new database();

module.exports = {
  // 接口定义
  
  getIncome: async (ctx) => {
    const query = {};
    const res = await db.find(query);
    return res;
  },
}
