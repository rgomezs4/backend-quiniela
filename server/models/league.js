"use strict";
module.exports = (sequelize, DataTypes) => {
  var League = sequelize.define(
    "League",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fee: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      phase: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  League.associate = function(models) {
    League.hasMany(models.Participant, {
      foreignKey: "leagueId",
      as: "Participants"
    });

    League.hasMany(models.Team, {
      foreignKey: "leagueId",
      as: "Teams"
    });

    League.hasMany(models.Match, {
      foreignKey: "leagueId",
      as: "Matches"
    });

    League.hasMany(models.Stadium, {
      foreignKey: "leagueId",
      as: "Stadiums"
    });
  };
  return League;
};
