"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leagueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Leagues",
          key: "id",
          as: "leagueId"
        }
      },
      group: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logo: {
        type: Sequelize.BOOLEAN
      },
      played: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      won: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tied: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eliminated: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Teams")
};
