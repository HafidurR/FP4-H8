const { User, SocialMedia } = require("../models");
const jwt = require("jsonwebtoken");

function get_user(req, res) {
	let token = req.headers.token;
	let user = jwt.verify(token, "secretkey");
	return user;
}

class socialMediaController {
	static create(req, res) {
		let user = get_user(req, res);
		let input = {
			name: req.body.name,
			social_media_url: req.body.social_media_url,
			UserId: user.id,
		};
		SocialMedia.create(input)
			.then((data) => {
				res.status(201).json({
					social_media: {
						id: data.id,
						name: data.name,
						social_media_url: data.social_media_url,
						UserId: data.UserId,
						updatedAt: data.updatedAt,
						createdAt: data.createdAt,
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

	static index(req, res) {
		let user = get_user(req, res);
		SocialMedia.findAll({
			include: {
				model: User,
				attributes: ["id", "username", "profile_image_url"],
			},
			where: {
				UserId: user.id,
			},
		})
			.then((data) => {
				res.status(200).json({
					social_media: data,
				});
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static async update(req, res) {
		let user = get_user(req, res);
		let sos_id = req.params.socialmediaId;
		let sos_instance = await SocialMedia.findOne({
			where: {
				id: sos_id,
			},
		});

		if (sos_instance == null) {
			res.status(404).json({
				message: "Social media doesn't exist.",
			});
		} else if (user.id != sos_instance.UserId) {
			res.status(403).json({
				message: "You dont have permission on this user.",
			});
		} else {
			let name_data =
				req.body.name == undefined || req.body.name == ""
					? sos_instance.name
					: req.body.name;
			let url_data =
				req.body.social_media_url == undefined ||
				req.body.social_media_url == ""
					? sos_instance.social_media_url
					: req.body.social_media_url;

			sos_instance
				.update({
					name: name_data,
					social_media_url: url_data,
				})
				.then((data) => {
					res.status(200).json({
						social_media: data,
					});
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
		let user = get_user(req, res);
		let sos_id = req.params.socialmediaId;
		let sos_instance = await SocialMedia.findOne({
			where: {
				id: sos_id,
			},
		});

		if (sos_instance == null) {
			res.status(404).json({
				message: "Social media doesn't exist.",
			});
		} else if (user.id != sos_instance.UserId) {
			res.status(403).json({
				message: "You dont have permission on this user.",
			});
		} else {
			SocialMedia.destroy({
				where: {
					id: sos_id,
				},
			});
			res.status(200).json({
				message: "Your social media has been successfully deleted.",
			});
		}
	}
}

module.exports = socialMediaController;
