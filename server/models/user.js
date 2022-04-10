const mongoose = require('mongoose');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true,
            max: 30,
            unique: false,
            index: true,
            lowercase: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true,
            max: 30,
            unique: false,
            lowercase: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            trim: true,
            max: 6
        },
        phone: {
            type: String,
            trim: true,
            max: 15,
            default: '2348040100200'
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: String,
            default: 'shopper'
        },
        resetPasswordLink: {
            type: String,
            default: ''
        },
        provider: {
            type: String,
            default: "alpine"
        },
        isverified: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

//Virtual fields
userSchema
    .virtual('password')
    .set(function(password){
        //create temporary variable called _password
        this._password = password
        //generate salt
        this.salt = this.makeSalt();
        //encrypt password
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

//methods > authenticate , encryptPassword, makesalt
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;

    },

    encryptPassword: function(password) {
        if(!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch(err){
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

//export user model
module.exports = mongoose.model('User', userSchema);