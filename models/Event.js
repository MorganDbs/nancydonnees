const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    titre:  String,
    type: String,
    adresse: String,
    date: String,
    date_not_formated: Date,
    time: String,
    description: String
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
