const express = require('express');
const router = express.Router();

//import validators from the available validators
const {
    userRegistervalidator
} = require('../validators/auth')

const { runValidation } = require('../validators')

const {
    register,
    registerActivate
} = require('../controllers/auth')


router.post('/register', userRegistervalidator, runValidation, register);
router.post('/register/activate', registerActivate);

module.exports = router;