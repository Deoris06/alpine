const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const tokenGenerator = require('../utils/tokenGenerator')
const { registerEmailTemplate } = require('../helpers/email_template')
const AWS = require('aws-sdk')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const expressJwt = require('express-jwt')
const _ = require('lodash')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const ses = new AWS.SES({ apiVersion: '2010-12-01'});

// Register controller to create the register user
exports.register =  catchAsyncErrors(async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body
    //check if user exists in out DB
    User.findOne({ email }).exec((err, user) => {
        //check if user exist in the database
        if(user){
            return next(new ErrorHandler('Email has been taken', 400));
        }
        console.log(req.body);
        //Generate token with data from req.body
        const token = tokenGenerator(req.body, '60m')

        //send activation email to complete registeration and store info in db
        const params = registerEmailTemplate(email, token, first_name)
        
        //Send Email using AWS SDK package
        const sendEmailOnRegister = ses.sendEmail(params).promise();

        sendEmailOnRegister
            .then(data => {
                console.log('Email submitted to SES', data);
                res.json({
                    message: `Activation mail has been sent to ${email}, Please follow the instructions to complete your registration.`
                });
            })
            .catch(error => {
                console.log('ses email on register', error);
                res.json({
                    message: `We could not verify your email. Please try again`
                });
        });
        //end of register controller
    })
})

//activate account
exports.registerActivate = catchAsyncErrors( async (req, res, next) => {
    const { token } = req.body
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
        if(err){
            return next(new ErrorHandler('Expired link. Try again', 401));
        }
        const { first_name, last_name, email, password } = jwt.decode(token)
        User.findOne({ email }).exec(( err, user ) => {
            if(user){
                console.log(next(new ErrorHandler('Email is taken', 401)))
                return res.status(401).json({
                    error: 'Email is taken'
                });
            }

            //register new user
            const newUser = new User({ first_name, last_name, email, password })
            console.log(newUser)
            newUser.save(( err, result) => {
                if(err){
                    return res.json({
                        message: next(new ErrorHandler('User cannot be saved', 401))
                    })
                }
                return res.json({
                    message: 'Registration success. Please login.'
                });
            })
        })
    })
    
});

//login account
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email }).exec((err, user ) => {
        if(err || !user ) {
            return res.status(400).json({
                error: "User does not exist!"
            })
        }
        //authenticate the user then
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email or password does not match"
            })
        }
        //Generate token and send it to the client machine
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d'});
        const { _id, first_name, email, role } = user;

        return res.json({
            token,
            user: { _id, first_name, email, role}
        })
    })
})

exports.requireSignin  = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256'] })

exports.authMiddleware = catchAsyncErrors( async( req, res, next) => {

    const authUserId = req.user._id;
    User.findOne({ _id: authUserId}).exec(( err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    })
})

exports.adminMiddleware = catchAsyncErrors( async(req, res, next ) => {
    const adminUserId = req.user._id;
    User.findOne({ _id: adminUserId}).exec(( err, user ) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    })
})