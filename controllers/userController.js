const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    // check if user already exists in database with help of email
    const userAvailable = await User.findOne({ email });
    if (userAvailable){
        res.status(400);
        throw new Error("User already exists!");
    }
    // if new user, Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // create new user in db
    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    console.log(`User created: ${user}`);
    // send info to user that you have registered successfully
    if (user) {
        res.status(201).json({ success: true, data: { _id: user.id, email: user.email } });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    // res.status(200).json({ success: true, message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password required!");
    }
    // compare password with hashed password
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // generate a jwt access token
        const accessToken = jwt.sign(
            {
                // payload
                user : {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            // secret access token
            process.env.ACCESS_TOKEN_SECRET,
            // token expires in/ valid till 15 minutes
            { expiresIn: "15m" }
        );
        res.status(200).json({ success: true, data: accessToken });
    } else {
        res.status(400);
        throw new Error("Email or password is not valid!");
    }
    res.status(200).json({ success: true, message: "Login user" });
});

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    // here we generally fetch user info from mongoDB.
    // but here I will use user info attached to request by the validate token handler.
    res.status(200).json({ success: true, data: req.user });
});

module.exports = { registerUser,  loginUser, currentUser };