const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const schema_user = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Ensure emails are stored in lowercase
    validate(value) {   // Validate email address
        if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
            }
        },
    },
    password: {
    type: String,
    required: true,
    minlength: 8,
    },
},{
    timestamps: true
});

// This ia a middleware that hashes the user's password before saving
schema_user.pre('save' , async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

schema_user.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);

    //user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

schema_user.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('Unable to login, Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Unable to login, Invalid email or password');
    }

    return user;
};

const User = mongoose.model('User', schema_user);

module.exports = User;
