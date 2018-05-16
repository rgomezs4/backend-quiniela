"use strict";
module.exports = (sequelize, DataTypes) => {
  var Match = sequelize.define(
    "Match",
    {
      leagueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      team1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      team2: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stadiumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      winner: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      resultTeam1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      resultTeam2: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Match.associate = function(models) {
    Match.belongsTo(models.League, {
      foreignKey: "leagueId",
      onDelete: "CASCADE"
    });

    Match.belongsTo(models.Team, {
      foreignKey: "team1"
    });
    Match.belongsTo(models.Team, {
      foreignKey: "team2"
    });

    Match.belongsTo(models.Stadium, {
      foreignKey: "stadiumId"
    });

    Match.belongsTo(models.Team, {
      foreignKey: "winner"
    });

    Match.hasMany(models.Prediction, {
        foreignKey: "matchId",
        as: "Predictions"
    });
  };
  return Match;
};
