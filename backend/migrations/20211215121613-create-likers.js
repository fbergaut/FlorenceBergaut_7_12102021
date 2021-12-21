'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('likers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            posterUuid: {
                type: DataTypes.STRING,
                alloNull: false
            },
            postId: {
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
        await queryInterface.dropTable('likers');
    }
};