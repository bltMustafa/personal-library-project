const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllUsers = () => {
  try {
    return DB.users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneUser = (userID) => {
  try {
    const user = DB.users.find((user) => user.id === userID);
    if (!user) {
      throw {
        status: 400,
        message: `Can't find userID with the id '${userID}'`,
      };
    }
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getOneBook = (bookID) => {
  try {
    const book = DB.users.find((favoriteBooks) => favoriteBooks.id === bookID);
    if (!book) {
      throw {
        status: 400,
        message: `Can't find bookID with the id '${bookID}'`,
      };
    }
    return book;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUser = (newUser) => {
  try {
    const isAlreadyAdded =
      DB.users.findIndex((user) => user.username === newUser.username) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `User with the name '${newUser.username}' already exists`,
      };
    }
    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewBook = (newBook, userID) => {
  try {
    const userIndex = DB.users.findIndex((user) => user.id === userID);
    if (userIndex === -1) {
      throw {
        status: 400,
        message: ` '${userID}' users not found.`,
      };
    }
    DB.users[userIndex].favoriteBooks.push(newBook);
    saveToDatabase(DB);
    return newBook;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneBook = (userID, bookID) => {
  try {
    const userIndex = DB.users.findIndex((user) => user.id === userID);
    console.log(userID, bookID);

    if (userIndex === -1) {
      throw {
        status: 400,
        message: `Can't find user with the id '${userID}'`,
      };
    }

    const user = DB.users[userIndex];
    const bookIndex = user.favoriteBooks.findIndex(
      (book) => book.id === bookID
    );

    if (bookIndex === -1) {
      throw {
        status: 400,
        message: `Can't find book with the id '${bookID}'`,
      };
    }

    user.favoriteBooks.splice(bookIndex, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  createNewBook,
  getOneBook,
  getOneUser,
  deleteOneBook,
};
