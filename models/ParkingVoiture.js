const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const parkingVoitureSchema = new mongoose.Schema({
    nom:  String,
    places: String,
    capacite: Number,
    complet: String,
    adresse: String,
    coord: {
        x: Number,
        y:  Number
    }
}, { timestamps: true });

const ParkingVoiture = mongoose.model('ParkingVoiture', parkingVoitureSchema);

module.exports = ParkingVoiture;
