const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const DB = require("../database/db.json");

const getAllUsers = (req, res) => {
  try {
    const allUsers = userService.getAllUsers();
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneUser = (req, res) => {
  const {
    params: { userID },
  } = req;

  if (!userID) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':userID' can not be empty" },
    });
  }

  try {
    const user = userService.getOneUser(userID);
    res.send({ status: "OK", data: user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneBook = (req, res) => {
  const {
    params: { userID, bookID },
  } = req;

  if (!bookID || !userID) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':bookID' and ':userID' can not be empty" },
    });
  }
  try {
    const book = userService.getOneBook(userID, bookID);
    res.send({ status: "OK", data: book });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 13);
    const newUser = {
      username: username,
      password: hash,
    };
    const createdUser = userService.createNewUser(newUser);
    console.log(createdUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = DB.users.find((u) => u.username === username);
    console.log("Sending request with:", { username, password });

    if (!user) {
      res.status(401).send("No user");
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).send("Wrong password");
      return;
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
};

const createNewBook = (req, res) => {
  const {
    params: { userID },
    body: { title, thumbnail },
  } = req;

  if (!userID || !title || !thumbnail) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'title', 'thumbnail'",
      },
    });
  }
  const newBook = {
    title,
    thumbnail,
  };

  try {
    const createdBook = userService.createNewBook(newBook, userID);
    res.status(201).json({ status: "OK", data: createdBook });
    if (!createdBook) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneBook = (req, res) => {
  const {
    params: { userID, bookID },
  } = req;

  if ((!userID, !bookID)) {
    return;
  }

  try {
    userService.deleteOneBook(userID, bookID);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getOneBook,
  createNewUser,
  loginUser,
  createNewBook,
  deleteOneBook,
};
