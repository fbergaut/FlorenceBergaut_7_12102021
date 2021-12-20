'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            //likersId
            this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
        }
    };
    Likers.init({
        posterUuid: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'likers',
        modelName: 'Likers',
    });
    return Likers;
};