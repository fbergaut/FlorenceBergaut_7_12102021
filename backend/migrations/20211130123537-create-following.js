'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('followings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            followingUuid: {
                type: DataTypes.STRING
            },
            userId: {
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
        await queryInterface.dropTable('followings');
    }
};