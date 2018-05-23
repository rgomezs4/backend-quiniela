"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn("Teams", "image", {
                type: Sequelize.STRING,
                allowNull: true
            })
        ];
    },

    down: (queryInterface, Sequelize) => {
        return [queryInterface.removeColumn("Teams", "image")];
    }
};
