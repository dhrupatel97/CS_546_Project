const
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        passwordConfirmation: {
            type: String,
            required: true
        }
    })

userSchema.methods.generateHash = function (password) {
    //encrypt password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = function (password) {
    //validate by comparing passwords {
    return bcrypt.compareSync(password, this.password)
}


module.exports = mongoose.model('User', userSchema)