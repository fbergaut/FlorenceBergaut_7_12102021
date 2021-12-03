'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Followers extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            //userId
            this.belongsTo(User, { foreignKey: 'userIdFollowers', as: 'user' });
        }
        toJSON() {
            return {...this.get(), id: undefined }
        }
    };
    Followers.init({
        followersUuid: {
            type: DataTypes.STRING
        },
        userUuid0: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'followers',
        modelName: 'Followers',
    });
    return Followers;
};