"use strict";
const bcrypt = require("bcrypt");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync('secret', salt);
		let data = 
			[
				{
					full_name: "Zhafira Hajar",
					email: "zhafira@gmail.com",
					username: "zhafira",
					password: hash,
					profile_image_url: "https://nomorsiapa.com/images/v/th/id/OIP.tmgWGdzGFmIwg1iaqCbSvgHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7",
					age: 20,
					phone_number: "0821112223333",
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					full_name: "Saman Supriadi",
					email: "saman@gmail.com",
					username: "saman",
					password: hash,
					profile_image_url: "https://nomorsiapa.com/images/v/th/id/OIP.tmgWGdzGFmIwg1iaqCbSvgHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7",
					age: 20,
					phone_number: "0821112223333",
					createdAt: new Date(),
					updatedAt: new Date()
				},
		]
		await queryInterface.bulkInsert("Users", data);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
