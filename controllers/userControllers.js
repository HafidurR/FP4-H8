const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DataRowMessage } = require("pg-protocol/dist/messages");

class userController {
	static register(req, res) {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(req.body.password, salt);

		let input = {
			full_name: req.body.full_name,
			email: req.body.email,
			username: req.body.username,
			password: hash,
			profile_image_url: req.body.profile_image_url,
			age: req.body.age,
			phone_number: req.body.phone_number,
		};

		User.create(input)
			.then((data) => {
				res.status(201).json({
					user: {
						email: data.email,
						full_name: data.full_name,
						username: data.username,
						profile_image_url: data.profile_image_url,
						age: data.age,
						phone_number: data.phone_number,
					},
				});
			})
			.catch((err) => {
				let errCode = 500;
				let errMessages = [];

				for (let index in err.errors) {
					let errMsg = err.errors[index].message;
					errMessages.push(errMsg);
				}

				if (err.name.includes("Sequelize")) {
					errCode = 400;
				}

				res.status(errCode).json({
					error: err.name,
					message: errMessages,
				});
			});
	}

	static loginMiddleware(req, res, next) {
		try {
			let token = req.headers.token;
			let decoded = jwt.verify(token, "secretkey");
			User.findOne({
				where: {
					email: decoded.email,
				},
			})
				.then((data) => {
					if (data !== null) {
						next();
					} else {
						res.status(401).json({ messege: "Invalid Credentials" });
					}
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		} catch (err) {
			res.status(500).json(err);
		}
	}

	static login(req, res) {
		User.findOne({
			where: {
				email: req.body.email,
			},
		})
			.then((data) => {
				if (data === null) {
					res.status(401).json({ messege: "Invalid Credentials" });
				} else {
					let compare = bcrypt.compareSync(req.body.password, data.password);
					if (compare == true) {
						let token = jwt.sign(data.toJSON(), "secretkey");
						res.status(200).json({ token });
					} else {
						res.status(401).json({ messege: "Username or password invalid" });
					}
				}
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static async edit(req, res) {
		let user_instance = await User.findOne({
			where: {
				id: req.params.userId,
			},
		});

		let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");

		if (user_instance == null) {
			res.status(404).json({
				message: "Account doesn't exitst",
			});
		} else if (user_login.username != user_instance.username) {
			res.status(403).json({
				message: "You dont have permission on this user.",
			});
		} else {
			let full_name_data =
				req.body.full_name == undefined || req.body.full_name == ""
					? user_instance.full_name
					: req.body.full_name;
			let email_data =
				req.body.email == undefined || req.body.email == ""
					? user_instance.email
					: req.body.email;
			let username_data =
				req.body.username == undefined || req.body.username == ""
					? user_instance.username
					: req.body.username;
			let profile_image_url_data =
				req.body.profile_image_ur == undefined ||
				req.body.profile_image_ur == ""
					? user_instance.profile_image_ur
					: req.body.profile_image_ur;
			let age_data =
				req.body.age == undefined || req.body.age == ""
					? user_instance.age
					: req.body.age;
			let phone_number_data =
				req.body.phone_number == undefined || req.body.phone_number == ""
					? user_instance.phone_number
					: req.body.phone_number;

			user_instance
				.update({
					full_name: full_name_data,
					email: email_data,
					username: username_data,
					profile_image_url: profile_image_url_data,
					age: age_data,
					phone_number: phone_number_data,
				})
				.then(async (data) => {
					if (req.body.password) {
						let pass_user = user_instance.password;
						let compare = bcrypt.compareSync(req.body.password, pass_user);
						if (compare) {
							res.status(400).json({
								message: "Use different password!",
							});
						} else {
							let salt = bcrypt.genSaltSync(10);
							let hash = bcrypt.hashSync(req.body.password, salt);
							await user_instance.update({
								password: hash,
							});
							res.status(200).json({
								user: {
									email: data.email,
									full_name: data.full_name,
									username: data.username,
									profile_image_url: data.profile_image_url,
									age: data.age,
									phone_number: data.phone_number,
								},
							});
						}
					} else {
						res.status(200).json({
							user: {
								email: data.email,
								full_name: data.full_name,
								username: data.username,
								profile_image_url: data.profile_image_url,
								age: data.age,
								phone_number: data.phone_number,
							},
						});
					}
				})
				.catch((err) => {
					if (err.name == "SequelizeUniqueConstraintError") {
						res.status(400).json({
							error: err.name,
							message: err.message,
						});
					}
				});
		}
	}

	static async delete(req, res) {
		let user_instance = await User.findOne({
			where: {
				id: req.params.userId,
			},
		});

		let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");
		if (user_instance == null) {
			res.status(404).json({
				message: "Account doesn't exist.",
			});
		} else if (user_login.username != user_instance.username) {
			res.status(403).json({
				message: "You dont have permission on this user.",
			});
		} else {
			user_instance
				.destroy()
				.then(() => {
					res.status(200).json({
						message: "Your account has been successfully deleted.",
					});
				})
				.catch((err) => {
					res.status(500).json(err);
				});
		}
	}
}

module.exports = userController;
