'use strict';

module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('followers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            followersUuid: {
                type: DataTypes.STRING
            },
            userUuid0: {
                type: DataTypes.STRING,
            },
            userIdFollowers: {
                type: DataTypes.INTEGER,
                alloNull: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: async(queryInterface, DataTypes) => {
        await queryInterface.dropTable('followers');
    }
};