const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, 'It needs a rating, be generous!']
        },
        commentText: {
            type: String,
            required: [true, 'Elaborate on your rating!'],
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        netflix: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Netflix'
        },
        hulu: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hulu'
        },
        disney: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disney'
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;