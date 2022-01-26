"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Photo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			//relasi table photo -> users
			Photo.belongsTo(models.User, {foreignKey: "UserId"})
			//relasi table photo ->comment
			Photo.hasMany(models.Comment, {foreignKey: 'PhotoId'})
		}
	}
	Photo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "title  required",
					},
					notEmpty: {
						args: true,
						msg: "title  cannot be empty",
					},
				},
			},
			caption: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "caption  required",
					},
					notEmpty: {
						args: true,
						msg: "caption  cannot be empty",
					},
				},
			},
			poster_image_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "poster_image_url required",
					},
					notEmpty: {
						args: true,
						msg: "poster_image_url cannot be empty",
					},
					isUrl: {
						args: true,
						msg: "Invalid URL format",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate:{
					notNull: {
						msg: "UserID  required",
					},
					notEmpty: {
						args: true,
						msg: "UserID cannot be empty",
					}
				}
			}
		},
		{
			sequelize,
			modelName: "Photo",
		}
	);
	return Photo;
};
