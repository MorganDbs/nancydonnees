const Event = require('../models/Event.js');
var Comment = require('../models/Comment.js')
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

exports.addEventForm = (req, res) => {
    res.locals.login = req.isAuthenticated();
    if(res.locals.login){
        res.render('addEventForm', {});
    }else{
        res.redirect('/events');
    }
};


exports.addEvent = (req, res) => {
    var date = req.body.date.split('-')[2] + '/' + req.body.date.split('-')[1] + '/' + req.body.date.split('-')[0];
    new Event({
        titre: req.body.titre,
        type: req.body.type,
        adresse: req.body.adresse,
        date: date,
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
            res.render('eventDetails', {
                eventDetails: docs,
                auth: res.locals.login,
                comments: docs_comments,
                user: user
            });
        });
    });
};
