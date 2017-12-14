const Comment = require('../models/Comment.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.addComment = (req, res) => {
    new Comment({
        name:  req.body.user,
        id_user: req.body.id_user,
        id_event: req.body.id_event,
        contenu: req.body.commentaire
    }).save(Comment).then(function(){
        res.redirect('/event/' + req.body.id_event);
    });
};

exports.deleteComment = (req, res) => {
    var id_comment = req.params.id;
    Comment.remove({ _id: id_comment}, function(){
        res.redirect('back');
    });
};

