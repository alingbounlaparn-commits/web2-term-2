const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

db.connect((err) => {
    if (err) {
        console.log("DB connection failed", err);
        return;
    }
    console.log("✅ Database connected");
});

// Test route
app.get("/", (req, res) => {
    res.send("Hello! API Connected Successfully ✅");
});

// Start server
app.listen(3000, () => {
    console.log("✅ Server running at http://localhost:3000");
});
