"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Participant, {
      foreignKey: "userId",
      as: "Participants"
    });
  };
  return User;
};
