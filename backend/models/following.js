'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Following extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            //userId
            this.belongsTo(User, { foreignKey: 'userUuid', as: 'user' });
        }
        toJSON() {
            return {...this.get(), id: undefined }
        }
    };
    Following.init({
        followingUuid: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'followings',
        modelName: 'Following',
    });
    return Following;
};