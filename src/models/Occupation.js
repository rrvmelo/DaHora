const { Model, DataTypes} = require('sequelize');

class Occupation extends Model {
    static init(sequelize) {
        super.init({
            funcao: DataTypes.STRING,
            vencimento: DataTypes.STRING
        }, {
            sequelize
        })
    }
}
module.exports = Occupation;