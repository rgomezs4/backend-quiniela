"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn("Participants", "score", {
                type: Sequelize.INTEGER,
                allowNull: false
            })
        ];
    },

    down: (queryInterface, Sequelize) => {
        return [queryInterface.removeColumn("Participants", "score")];
    }
};
