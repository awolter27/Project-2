require('../config/connection');

module.exports = {
    User: require('./User'),
    Netflix: require('./Netflix'),
    Hulu: require('./Hulu'),
    Disney: require('./Disney'),
    seedNetflix: require('./seedNetflix'),
    seedHulu: require('./seedHulu'),
    seedDisney: require('./seedDisney')
};