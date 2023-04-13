const mongoose = require('mongoose');

const netflixSchema = new mongoose.Schema(
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
        }
        // seasons: {
        //     name: String,
        //     year: Number,
        //         episodes: {
        //             one: String,
        //             two: String,
        //             three: String,
        //             four: String,
        //             five: String,
        //             six: String,
        //             seven: String,
        //             eight: String,
        //             nine: String,
        //             ten: String
        //         }
        //     } 
    },
    {
        timestamps: true
    }
);

const Netflix = mongoose.model('Netflix', netflixSchema);

module.exports = Netflix;
//an option for a user to add as many episodes as needed since every show has its own amount of episodes in every season.
// require('mongoose').model('Netflix').schema.add({episode: String});

// {
//     name: "Somebody Feed Phil",
//     synopsis: "Phil travels around the world sampling food and tradition with friends and a sense of humor.",
//     img: "https://i1.wp.com/wineyparent.com/wp-content/uploads/2020/12/Somebody-Feed-Phil-feature-image-EDIT-AGAIN.png?w=882&ssl=1",
//     genre: ["docuseries", "lifestyle", "reality", "travel and adventure"],
//     seasons: {
//         one: {
//             year: 2018,
//             episodes: {
//                 one: "Bangkok",
//                 two: "Saigon",
//                 three: "Tel Aviv",
//                 four: "Lisbon",
//                 five: "New Orleans",
//                 six: "Mexico City",
//             }
//         },
//         two: {