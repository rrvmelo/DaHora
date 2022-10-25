const { Model, DataTypes } = require("sequelize");

class Benefit extends Model {
  static init(sequelize) {
    super.init(
      {
        beneficio: DataTypes.STRING,
        porcentagemCalculo: DataTypes.STRING,
        valorDiario: DataTypes.FLOAT,
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: "benefitId",
      through: "userBenefits",
      as: "users",
    });
  }
}
module.exports = Benefit;
