const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        funcao: DataTypes.STRING,
        senha: DataTypes.STRING,
        entrada: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        isRH: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }
}

module.exports = User;