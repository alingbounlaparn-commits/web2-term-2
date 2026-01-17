const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ================= REGISTER (CREATE) =================
exports.create = (req, res) => {
    // ตรวจสอบค่าบังคับ
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send({
            message: "Name, Email, and Password are required!"
        });
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age || null // age ไม่ระบุก็ได้
    });

    User.create(newUser, (error, data) => {
        if (error) {
            res.status(500).send({ message: error.message || "Error creating user" });
        } else {
            res.status(201).send(data);
        }
    });
};

// ================= LOGIN =================
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Missing email or password" });
    }

    User.loginByEmailAndPassword(req.body.email, req.body.password, (error, user) => {
        if (error) {
            if (error.kind === "not_found") res.status(401).send({ message: "Invalid credentials" });
            else res.status(500).send({ message: "Login error" });
            return;
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(accessToken, user.id);
        res.json({ accessToken, refreshToken });
    });
};

// ================= GET PROFILE =================
exports.profile = (req, res) => {
    // 1. Debug: If this is undefined, your middleware or login is broken
    console.log("Fetching profile for User ID:", req.userId);

    if (!req.userId) {
        return res.status(401).send({ message: "Unauthorized: No user ID found in token" });
    }

    User.findById(req.userId, (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({ message: "User not found" });
            } else {
                res.status(500).send({ message: "Error fetching profile" });
            }
        } else {
            // Success: Returns name, email, and age from 'laotop.users'
            res.send(data);
        }
    });
};

// ฟังก์ชันช่วยสร้าง Token
const generateAccessToken = (userId) => jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
const generateRefreshToken = (accessToken, userId) => jwt.sign({ userId, accessToken }, process.env.REFRESH_KEY, { expiresIn: "7d" });