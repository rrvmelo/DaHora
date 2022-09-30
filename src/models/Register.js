const { Model, DataTypes} = require('sequelize');

class Register extends Model {
    static init(sequelize) {
        super.init({
            input: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}
module.exports = Register;