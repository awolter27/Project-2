const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: [true, 'It needs a rating, be generous!'],
            min: 1,
            max: 5
        },
        commentText: {
            type: String,
            required: [true, 'Elaborate on your rating!'],
            trim: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;