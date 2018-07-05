const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/socket');

const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require: true},
    type: {type: String, require: true},
    avatar: {type: String},
    desc: {type: String},
    title: {type: String},

    company: {type: String},
    money: {type: String}
  },
  chat: {
    from: {type: String, require: true},
    to: {type: String, require: true},
    content: {type: String, require: true, default: ''},
    create_time: {type: Number, default: new Date().getTime()},
    chatid: {type: String, require: true},
    read: {type: Boolean, require: true, default: false}
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel (name) {
    return mongoose.model(name)
  }
}