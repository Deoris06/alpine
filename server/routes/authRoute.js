const express = require('express');
const router = express.Router();

//import validators from the available validators
const {
    userRegistervalidator,
    userLoginValidator
} = require('../validators/auth')

const { runValidation } = require('../validators')

const {
    register,
    registerActivate,
    login
} = require('../controllers/auth')


router.post('/register', userRegistervalidator, runValidation, register);
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidator, runValidation, login)

module.exports = router;