const express = require("express");

const userController = require("../../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/:userID", userController.getOneUser);

router.get("/:userID/books/:bookID", userController.getOneBook);

router.post("/:userID/books", userController.createNewBook);

router.post("/", userController.createNewUser);

router.delete("/:userID/books/:bookID", userController.deleteOneBook);

module.exports = router;
