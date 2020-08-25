const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

let tokenSchema = new Schema({
    _userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario'},
    token: {type: String, required: true},
    createAt : {type: Date, required: true, default: Date.now, expires: 43200},

});

module.exports = mongoose.model('Token', tokenSchema);