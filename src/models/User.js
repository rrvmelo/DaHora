const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        funcao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        senha: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        entrada: {
          type: DataTypes.STRING,
          allowNull: false,
          isAlphanumeric: true,
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        isRH: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Record, {
      foreignKey: "UserId",
      as: "records",
    });
    this.belongsToMany(models.Benefit, {
      foreignKey: "userId",
      through: "userBenefits",
      as: "benefits",
    });
  }
}

module.exports = User;
