const User = require("../database/User");
const { v4: uuid } = require("uuid");

const getAllUsers = () => {
  try {
    const allUsers = User.getAllUsers();
    return allUsers;
  } catch (error) {
    throw error;
  }
};

const getOneUser = (userID) => {
  try {
    const user = User.getOneUser(userID);
    return user;
  } catch (error) {
    throw error;
  }
};

const getOneBook = (bookID) => {
  try {
    const book = User.getOneBook(bookID);
    return book;
  } catch (error) {
    throw error;
  }
};

const createNewUser = (newUser) => {
  const userToInsert = {
    id: uuid(),
    ...newUser,
    favoriteBooks: [],
  };

  try {
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

const createNewBook = (newBook, userID) => {
  const bookToInsert = {
    id: uuid(),
    ...newBook,
    createdAt: new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    }),
  };
  try {
    const createdBook = User.createNewBook(bookToInsert, userID);
    return createdBook;
  } catch (error) {
    throw error;
  }
};

const deleteOneBook = (userID, bookID) => {
  try {
    User.deleteOneBook(userID, bookID);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getOneBook,
  createNewUser,
  createNewBook,
  deleteOneBook,
};
