const Event = require('../models/Event.js');
const Comment = require('../models/Comment.js')
const ParkingVoiture = require('../models/ParkingVoiture.js')
const ParkingVelo = require('../models/ParkingVelo.js')
var ObjectId = require('mongoose').Types.ObjectId;

exports.getEvent = (req, res) => {
    res.locals.login = req.isAuthenticated();
    Event.find((err, docs_event) => {
        res.render('events', {
            events: docs_event,
            auth: res.locals.login
        });
    });
};

exports.getEventById = (req, res) => {
    var id_event = req.params.id;
    Event.find({ _id: id_event}, function(err, docs_event){
        res.render('editEvent', {
            events: docs_event
        });
    });
};

exports.saveEvent = (req, res) => {
    var id_event = req.params.id;
    Event.findById(id_event, function(err, event){
        var date = req.body.date.split('-')[2] + '/' + req.body.date.split('-')[1] + '/' + req.body.date.split('-')[0];
        event.titre = req.body.titre;
        event.type = req.body.type;
        event.adresse = req.body.adresse;
        event.date = date;
        event.date_not_formated = req.body.date;
        event.time = req.body.time;
        event.description = req.body.description;
        event.save((err) => {
            if (err) {
                if (err.code === 11000) {
                  req.flash('errors', { msg: "Les informations de l'évenement n'ont pas pu être sauvegardé" });
                  return res.redirect('/account');
                }
                return next(err);
            }
          req.flash('success', { msg: "Les informations de l'évenement ont été sauvegardé" });
          res.redirect('/account');
        });
    });
};

exports.deleteEvent = (req, res) => {
    var id_event = req.params.id;
    Event.remove({ _id: id_event}, function(){
        res.redirect('/account');
    });
};
exports.addEventForm = (req, res) => {
    res.locals.login = req.isAuthenticated();
    if(res.locals.login){
        res.render('addEventForm', {});
    }else{
        res.redirect('/events');
    }
};

exports.clearDoneEvent = (req, res) => {
    var today = new Date();
    Event.remove({date_not_formated: {$lte: today}});
};


exports.addEvent = (req, res) => {
    var date = req.body.date.split('-')[2] + '/' + req.body.date.split('-')[1] + '/' + req.body.date.split('-')[0];
    new Event({
        titre: req.body.titre,
        type: req.body.type,
        id_user: req.user._id,
        adresse: req.body.adresse,
        date: date,
        date_not_formated: req.body.date,
        time: req.body.time,
        description: req.body.description
    }).save(Event).then(function(){
        res.redirect('/events');
    });
};

exports.getEventDetails = (req, res) => {
    var id_event = req.params.id;
    res.locals.login = req.isAuthenticated();
    var user = req.user;
    Event.find({ _id: id_event}, function (err, docs) {
        Comment.find({ id_event: id_event}, function (err, docs_comments) {
            ParkingVoiture.find((err, docs_parking_voiture) => {
                ParkingVelo.find((err, docs_parking_velo) => {
                    res.render('eventDetails', {
                        eventDetails: docs,
                        auth: res.locals.login,
                        comments: docs_comments,
                        user: user,
                        parkings_voiture: docs_parking_voiture,
                        parkings_velo: docs_parking_velo
                    });
                });
            });

        });
    });
};
