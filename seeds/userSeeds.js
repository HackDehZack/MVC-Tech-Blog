const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: 'DookieFart345',
        email: 'DookieTheFart@345.com',
        password: 'ILOVEDOOKIE345'
    },
    {
        id: 2,
        name: 'TheRealSlimShady',
        email: 'SlimShurdy@420.com',
        password: 'nowTHISlooksLIKEaJOBforME'
    },

];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed;