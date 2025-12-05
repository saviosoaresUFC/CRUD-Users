const express = require('express');
const { 
    createUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

const router = express.Router();

// Rotas para /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// Rotas para /api/users/:id
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;