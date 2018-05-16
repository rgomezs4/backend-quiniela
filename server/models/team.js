"use strict";
module.exports = (sequelize, DataTypes) => {
  var Team = sequelize.define(
    "Team",
    {
      leagueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      group: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      played: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      won: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tied: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lost: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      eliminated: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Team.associate = function(models) {
    Team.belongsTo(models.League, {
      foreignKey: "leagueId",
      onDelete: "CASCADE"
    });

    Team.hasMany(models.Match, {
      foreignKey: "team1",
      as: "MatchesAsHome"
    });
    Team.hasMany(models.Match, {
      foreignKey: "team2",
      as: "MatchesAsAway"
    });
    Team.hasMany(models.Match, {
      foreignKey: "winner",
      as: "MatchesWon"
    });
  };
  return Team;
};
