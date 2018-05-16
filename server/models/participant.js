"use strict";
module.exports = (sequelize, DataTypes) => {
  var Participant = sequelize.define(
    "Participant",
    {
      leagueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      authorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Participant.associate = function(models) {
    Participant.belongsTo(models.League, {
      foreignKey: "leagueId",
      onDelete: "CASCADE"
    });

    Participant.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Participant;
};
