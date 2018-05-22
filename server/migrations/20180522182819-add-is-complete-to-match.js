"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn("Matches", "is_completed", {
                type: Sequelize.INTEGER,
                allowNull: false
            })
        ];
    },

    down: (queryInterface, Sequelize) => {
        return [queryInterface.removeColumn("Matches", "is_completed")];
    }
};
