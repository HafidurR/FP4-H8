"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.addConstraint("Users", {
				fields: ["email"],
				type: "unique",
				name: "email_value_unique_constraint",
			}),
			queryInterface.addConstraint("Users", {
				fields: ["username"],
				type: "unique",
				name: "username_value_unique_constraint",
			}),
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await Promise.all([
			queryInterface.removeConstraint("Users", "email_unique_constraint"),
			queryInterface.removeConstraint("Users", "username_unique_constraint"),
		]);
	},
};
