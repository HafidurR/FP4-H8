"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("Users", "phone_number", {
			type: Sequelize.TEXT,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.changeColumn("Users", "phone_number", {
			type: Sequelize.INTEGER,
		});
	},
};
