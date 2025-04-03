const { Router } = require("express");
const { postUser,deleteUser,getOneUser,getUsers,updateUser } = require("../controllers/UserController.js");

const user = Router();

user.get('/',getUsers);
user.get('/:id',getOneUser);
user.post('/',postUser);
user.patch('/:id',updateUser);
user.delete('/:id',deleteUser);

module.exports = user;
