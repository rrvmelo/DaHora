const { Model, DataTypes} = require('sequelize');

class Record extends Model {
    static init(sequelize) {
        super.init({
            entrada: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}
module.exports = Record;