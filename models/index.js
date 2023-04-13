require('../config/connection');

module.exports = {
    Netflix: require('./Netflix'),
    Hulu: require('./Hulu'),
    Disney: require('./Disney'),
    seedNetflix: require('./seedNetflix'),
    seedHulu: require('./seedHulu'),
    seedDisney: require('./seedDisney')
};