const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    favorites: {type: [String], require: false}
})

module.exports = model('User', User)