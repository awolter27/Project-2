const mongoose = require('mongoose');

const huluSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'You must enter the name of a show!'],
            unique: true
        },
        synopsis: {
            type: String
        },
        img: {
            type: String,
            required: [true, 'It would make it look much nicer if you add an image.']
        },
        genre: {
            type: [String],
            required: [true, 'Please enter the genre!']
        },
        seasons: [{
            year: Number,
            episodes: [String]
        }]
    },
    {
        timestamps: true
    }
);

const Hulu = mongoose.model('Hulu', huluSchema);

module.exports = Hulu;
//an option for a user to add as many episodes as needed since every show has its own amount of episodes in every season.
// require('mongoose').model('Hulu').schema.add({episode: String});