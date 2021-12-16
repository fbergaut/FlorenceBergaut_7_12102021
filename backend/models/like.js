'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            //userId
            this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
        }
    };
    Like.init({
        postUuid: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'likes',
        modelName: 'Like',
    });
    return Like;
};