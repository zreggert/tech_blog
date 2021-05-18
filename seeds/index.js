const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seedData = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedData();