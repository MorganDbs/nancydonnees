/**
 * GET /
 * Home page.
 */

const ParkingVoiture = require('../models/ParkingVoiture.js');
const ParkingVelo = require('../models/ParkingVelo.js');

exports.index = (req, res) => {
    ParkingVoiture.find((err, docs_parking_voiture) => {
        ParkingVelo.find((err, docs_parking_velo) => {
            res.render('home', {
                parkings_voiture: docs_parking_voiture,
                parkings_velo: docs_parking_velo
            });
        });
    });
};
