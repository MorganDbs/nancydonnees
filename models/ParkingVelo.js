const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const parkingVeloSchema = new mongoose.Schema({
    nom:  String,
    numero: String,
    places_libres: String,
    velos_disponibles: String,
    ouvert: String,
    adresse: String,
    coord: {
        x: Number,
        y:  Number
    }
}, { timestamps: true });

const ParkingVelo = mongoose.model('ParkingVelo', parkingVeloSchema);

module.exports = ParkingVelo;
