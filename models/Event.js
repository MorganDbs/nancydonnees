const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
    titre:  String,
    type: String,
    id_user: ObjectId,
    adresse: String,
    date: String,
    date_not_formated: Date,
    time: String,
    description: String
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
