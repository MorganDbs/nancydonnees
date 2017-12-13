const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    name: String,
    id_user: ObjectId,
    id_event: ObjectId,
    contenu: String
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
