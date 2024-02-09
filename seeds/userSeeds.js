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
        password: 'nowTHISlooksLIKEaJOBforME123'
    },
];

const userSeed = async () => {
    try {
        await User.sync({ force: true }); 
        await User.bulkCreate(userData);
        console.log('User data seeded successfully');
    } catch (error) {
        console.error('Error seeding user data:', error);
    }
};

module.exports = userSeed;