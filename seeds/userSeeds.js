const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: 'Lexi',
        email: 'LexiIsCute@69.com',
        password: '6969'
    },
    {
        id: 2,
        name: 'hackerman44',
        email: 'hackerman44@420.com',
        password: '420420'
    },

];
const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;