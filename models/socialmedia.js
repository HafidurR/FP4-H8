"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	class SocialMedia extends Model {
		static associate(models) {
			// define association here
			//relasi social media -> user
			SocialMedia.belongsTo(models.User, { foreignKey: "UserId" });
		}
	}
	SocialMedia.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Name required",
					},
					notEmpty: {
						args: true,
						msg: "Name cannot be empty",
					},
				},
			},
			social_media_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: {
						args: true,
						msg: "Invalid URL format",
					},
					notNull: {
						msg: "Social media URL required",
					},
					notEmpty: {
						args: true,
						msg: "Social media URL cannot be empty",
					},
				},
			},
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "SocialMedia",
		}
	);
	return SocialMedia;
};
