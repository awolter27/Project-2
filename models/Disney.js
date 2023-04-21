const mongoose = require('mongoose');

const disneySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'You must enter a name!']
        },
        synopsis: {
            type: String,
            required: [true, 'You must enter a synopsis!']
        },
        img: {
            type: String,
            required: [true, 'You must enter an image!']
        },
        genre: [{
            type: String,
            required: [true, 'You must enter a genre!']
        }],
        seasons: [{
            name: {
                type: Number,
                required: [true, 'You must enter a year!']
            },
            year: {
                type: Number,
                required: [true, 'You must enter a year!']
            },
            episodes: [{
                type: String,
                required: [true, 'You must enter an episode!']
            }]
        }]
    },
    {
        timestamps: true
    }
);

const Disney = mongoose.model('Disney', disneySchema);

module.exports = Disney;