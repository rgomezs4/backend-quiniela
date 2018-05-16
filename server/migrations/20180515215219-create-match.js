"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Matches", {
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
      team1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
          as: "team1"
        }
      },
      team2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Teams",
          key: "id",
          as: "team2"
        }
      },
      stadiumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Stadia",
          key: "id",
          as: "stadiumId"
        }
      },
      winner: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
          as: "winner"
        }
      },
      resultTeam1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      resultTeam2: {
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
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable("Matches")
};
