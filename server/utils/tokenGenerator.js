const jwt = require('jsonwebtoken')

const tokenGenerator = (data, time) => {
    //create Jwt token
    return jwt.sign({ ...data }, process.env.JWT_ACCOUNT_ACTIVATION, {
        expiresIn:  time
    })
}

module.exports = tokenGenerator