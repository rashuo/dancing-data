import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/dancing');

const db = mongoose.connection;
const IncomeSchema = mongoose.Schema({
  income: Number,
  source: Number,
  time: String,
})
const IncomeCol = mongoose.model('income', IncomeSchema);

class Mongoose {

  constructor() {
    this.connect();
  }

  connect() {
    this.listenDB();
  }
  listenDB() {
    db.on('error', console.error.bind(console, '连接mongodb失败'));
    
    db.on('open', () => {
      console.log('连接mongoose成功');
      this.constructorDB();
    })
  }
  find(query) {
    const res = IncomeCol.find(query, (err, income) => {
      if (err) return console.error(err);
      return income;
    })
    return res;
  }
  add(item) {
    const income = new IncomeCol(item);
    income.save((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('保存数据成功');
      }
    })
    return item;
  }
  constructorDB() {
    // const item = { 
    //   income: 10000,
    //   source: 1,
    //   time: '2018/7/31', 
    // }
    // this.add(item);
  }
}

export default Mongoose;
