"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class User extends Model {
		static associate(models) {
			// define association here
			//relasi ke table user -> photo
			User.hasMany(models.Photo, {foreignKey: "UserId"})
			//relasi ke table user -> comment
			User.hasMany(models.Comment, {foreignKey: "UserId"})
			//relasi user -> socialmedia
			User.hasMany(models.SocialMedia, { foreignKey: "UserId" });

		}
	}
	User.init(
		{
			full_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Full name required",
					},
					notEmpty: {
						args: true,
						msg: "Full name cannot be empty",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						args: true,
						msg: "Invalid email format",
					},
					notNull: {
						msg: "Email required",
					},
					notEmpty: {
						args: true,
						msg: "Email cannot be empty",
					},
				},
				unique: {
					args: true,
					msg: "Email already registered, use another email",
				},
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Username required",
					},
					notEmpty: {
						args: true,
						msg: "Username cannot be empty",
					},
				},
				unique: {
					args: true,
					msg: "Username already taken, use another username",
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password required",
					},
					notEmpty: {
						args: true,
						msg: "Password cannot be empty",
					},
				},
			},
			profile_image_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: {
						args: true,
						msg: "Invalid URL format",
					},
					notNull: {
						msg: "Profile image URL required",
					},
					notEmpty: {
						args: true,
						msg: "Profile image URL cannot be empty",
					},
				},
			},
			age: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						args: true,
						msg: "Age must be an integer value",
					},
					notNull: {
						msg: "Age required",
					},
					notEmpty: {
						args: true,
						msg: "Age cannot be empty",
					},
				},
			},
			phone_number: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Phone number required",
					},
					notEmpty: {
						args: true,
						msg: "Phone number cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
