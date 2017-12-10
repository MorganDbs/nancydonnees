const ParkingVoiture = require('../models/ParkingVoiture.js');
const ParkingVelo = require('../models/ParkingVelo.js');
const axios = require('axios');
var parseString = require('xml2js').parseString;

exports.updateParkingVoiture = (req, res) => {
    ParkingVoiture.remove({}, function() {});

    axios.get('https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson')
        .then(response => {
            for (var i = 0; i < response.data.features.length; i++) {
                new ParkingVoiture({
                    nom: response.data.features[i].attributes.NOM,
                    places: response.data.features[i].attributes.PLACES,
                    capacite: response.data.features[i].attributes.CAPACITE,
                    complet: response.data.features[i].attributes.COMPLET,
                    adresse: response.data.features[i].attributes.ADRESSE,
                    coord: {
                        x: response.data.features[i].geometry.x,
                        y: response.data.features[i].geometry.y
                    }
                }).save(ParkingVoiture);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

exports.updateParkingVelo = (req, res) => {
    ParkingVelo.remove({}, function() {});
    axios.get('http://www.velostanlib.fr/service/carto')
        .then(response => {
            parseString(response.data, function(err, result) {
                for (var i = 0; i < result.carto.markers[0].marker.length; i++) {
                    const station = result.carto.markers[0].marker[i].$;
                    axios.get('http://www.velostanlib.fr/service/stationdetails/nancy/' + parseInt(result.carto.markers[0].marker[i].$.number))
                        .then(response2 => {
                            parseString(response2.data, function(err, result2) {
                                new ParkingVelo({
                                    nom: station.name,
                                    numero: station.number,
                                    places_libres: result2.station.free,
                                    velos_disponibles: result2.station.available,
                                    ouvert: station.open,
                                    adresse: station.address,
                                    coord: {
                                        x: station.lat,
                                        y: station.lng
                                    }
                                }).save(ParkingVelo);
                            });
                        });
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
};
