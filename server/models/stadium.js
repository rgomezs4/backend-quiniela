"use strict";
module.exports = (sequelize, DataTypes) => {
  var Stadium = sequelize.define(
    "Stadium",
    {
      leagueId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Stadium.associate = function(models) {
    Stadium.belongsTo(models.League, {
      foreignKey: "leagueId",
      onDelete: "CASCADE"
    });

    Stadium.hasMany(models.Match, {
      foreignKey: "stadiumId",
      as: "Matches"
    });
  };
  return Stadium;
};
