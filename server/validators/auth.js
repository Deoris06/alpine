const { check }  = require('express-validator')

exports.userRegistervalidator = [
    check('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required'),
    
    check('last_name')
        .not()
        .isEmail()
        .withMessage('Last name is required'),
    
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),

    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
]

exports.userLoginValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
]