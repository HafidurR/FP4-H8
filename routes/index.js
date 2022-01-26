const route = require("express").Router();
const userControllers = require("../controllers/userControllers");
const photoControllers = require("../controllers/photoControllers");
const commentController = require("../controllers/commentController");
const socialMediaControllers = require("../controllers/socialMediaControllers");

// USER REGIS - LOGIN ROUTE
route.post("/users/register", userControllers.register);
route.post("/users/login", userControllers.login);

// MIDDLEWARE CHECK TOKEN
route.use(userControllers.loginMiddleware);

// USER MANAGEMENT ROUTE
route.put("/users/:userId", userControllers.edit);
route.delete("/users/:userId", userControllers.delete);

// PHOTOS ROUTE
route.post("/photos", photoControllers.create);
route.get("/photos", photoControllers.index);
route.put("/photos/:photoId", photoControllers.edit);
route.delete("/photos/:photoId", photoControllers.delete);

// COMMENTS ROUTE
route.post("/comments", commentController.create);
route.get("/comments", commentController.index);
route.put("/comments/:commentId", commentController.edit);
route.delete("/comments/:commentId", commentController.delete);

// SOCIAL MEDIAS ROUTE
route.post("/socialmedias", socialMediaControllers.create);
route.get("/socialmedias", socialMediaControllers.index);
route.put("/socialmedias/:socialmediaId", socialMediaControllers.update);
route.delete("/socialmedias/:socialmediaId", socialMediaControllers.delete);

module.exports = route;
