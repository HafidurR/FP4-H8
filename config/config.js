require("dotenv").config();
const {
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
	DB_HOST,
	DB_DIALECT
} = process.env;

module.exports = {
	development: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: 5433,
		"dialect": DB_DIALECT
	},
	test: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		port: 5433,
		"dialect": DB_DIALECT
		
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
