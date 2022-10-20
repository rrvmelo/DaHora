"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("benefits", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      beneficio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      porcentagemCalculo: {
        type: Sequelize.STRING,
      },
      valorDiario: {
        type: Sequelize.FLOAT,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("benefits");
  },
};
