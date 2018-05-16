"use strict";
module.exports = (sequelize, DataTypes) => {
    var Prediction = sequelize.define(
        "Prediction",
        {
            participantId: { type: DataTypes.INTEGER, allowNull: false },
            matchId: { type: DataTypes.INTEGER, allowNull: false },
            winnerTeam: { type: DataTypes.INTEGER, allowNull: false },
            resultTeam1: { type: DataTypes.INTEGER, allowNull: false },
            resultTeam2: { type: DataTypes.INTEGER, allowNull: false }
        },
        {}
    );
    Prediction.associate = function(models) {
        Prediction.belongsTo(models.Participant, {
            foreignKey: "participantId",
            onDelete: "CASCADE"
        });

        Prediction.belongsTo(models.Match, {
            foreignKey: "matchId"
        });

        Prediction.belongsTo(models.Team, {
            foreignKey: "winnerTeam",
            onDelete: "CASCADE"
        });
    };
    return Prediction;
};
