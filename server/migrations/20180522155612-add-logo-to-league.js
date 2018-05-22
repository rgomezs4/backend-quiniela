"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn("Leagues", "logo", {
                type: Sequelize.STRING,
                allowNull: true
            })
        ];
    },

    down: (queryInterface, Sequelize) => {
        return [queryInterface.removeColumn("Leagues", "logo")];
    }
};
