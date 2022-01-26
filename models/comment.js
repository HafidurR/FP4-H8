"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			//relasi comment -> user
			Comment.belongsTo(models.User, {foreignKey: "UserId"})
			//relasi comment ->photo
			Comment.belongsTo(models.Photo, {foreignKey: "PhotoId"})
		}
	}
	Comment.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "UserId required",
					},
					notEmpty: {
						args: true,
						msg: "Userid cannot be empty",
					},
				}
			},
			PhotoId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: "PhotoID required",
					},
					notEmpty: {
						args: true,
						msg: "PhotoID cannot be empty",
					},
				}
			},	
			comment: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Comment required",
					},
					notEmpty: {
						args: true,
						msg: "Comment cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
