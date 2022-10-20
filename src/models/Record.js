const { Model, DataTypes} = require('sequelize');

class Record extends Model {
    static init(sequelize) {
        super.init({
            entrada: DataTypes.STRING,
            userId: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    }
}

module.exports = Record;