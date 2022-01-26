require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
	test: {
		username: "root",
		password: null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "bagmjcylypjlpd",
		password: "43d5da119f484890d5337852bc809843f8398226fb1e4545b658244c7486b366",
		database: "d921ag6ebb4bd6",
		host: "ec2-3-230-219-251.compute-1.amazonaws.com",
		dialect: "postgres",
		port: 5432,
		dialectOptions:{
			ssl: {
				"rejectUnauthorized" : false
			}
		}
	},
};
