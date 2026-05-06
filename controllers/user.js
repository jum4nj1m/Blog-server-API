const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.includes("@")) {
            return res.status(400).send({ message: "Invalid email format" });
        } 
        if (password.length < 8) {
            return res.status(400).send({ message: "Password must be at least 8 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "Email already registered" });
        }

        const newUser = new User({
            email,
            password: bcrypt.hashSync(password, 10)
        });

        const result = await newUser.save();
        return res.status(201).send({
            message: "Registered successfully",
            user: { id: result._id, email: result.email }
        });

    } catch (err) {
        return errorHandler(err, req, res);
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.includes("@")) {
            return res.status(400).send({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (isPasswordCorrect) {
            return res.status(200).send({ 
                access: auth.createAccessToken(user) 
            });
        } else {
            return res.status(401).send({ message: "Invalid email or password" });
        }

    } catch (err) {
        return errorHandler(err, req, res);
    }
};

module.exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).send({
            email: user.email,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        return errorHandler(err, req, res);
    }
};