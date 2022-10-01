const { Model, DataTypes} = require('sequelize');

class Register extends Model {
    static init(sequelize) {
        super.init({
            entrada: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}
module.exports = Register;