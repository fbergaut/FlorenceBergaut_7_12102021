'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.addColumn('posts', 'posterUuid', Sequelize.STRING, {
            after: 'uuid' // after option is only supported by MySQL
        });
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.removeColumn('posts', 'posterUuid', Sequelize.STRING, {
            after: 'uuid' // after option is only supported by MySQL
        });
    }
};