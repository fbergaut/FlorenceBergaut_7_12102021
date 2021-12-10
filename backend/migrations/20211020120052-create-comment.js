'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            commenterUuid: {
                type: DataTypes.STRING,
            },
            commenterUsername: {
                type: DataTypes.STRING,
            },
            postUuid: {
                type: DataTypes.STRING,
            },
            text: {
                type: DataTypes.STRING
            },
            userId: {
                type: DataTypes.INTEGER,
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments');
    }
};