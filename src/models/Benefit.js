const { Model, DataTypes} = require('sequelize');

class Benefit extends Model {
    static init(sequelize) {
        super.init({
            beneficio: DataTypes.STRING,
            porcentagemCalculo: DataTypes.STRING,
            valorDiario: DataTypes.FLOAT,
            descricao: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}
module.exports = Benefit;