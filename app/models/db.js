// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");
// // Create a connection to the database
// const connection = mysql.createConnection({
// host: dbConfig.HOST,
// user: dbConfig.USER,
// password: dbConfig.PASSWORD,
// database: dbConfig.DB
// });
// // open the MySQL connection
// connection.connect(error => {
// if (error) throw error;
// console.log("Successfully connected to the database.");
// });
// module.exports = connection;

const mysql = require('mysql');

// โหลดค่าจากไฟล์ .env (บรรทัดนี้จำเป็นเพื่อให้โปรแกรมอ่านไฟล์ .env ได้)
require('dotenv').config(); 

const connection = mysql.createConnection({
    host: process.env.HOST,        // ดึงค่า "localhost" มาใช้
    user: process.env.USER,        // ดึงค่า "root" มาใช้
    password: process.env.PASSWORD, // ดึงค่ารหัสผ่านมาใช้
    database: process.env.DB       // ดึงค่า "laotop" มาใช้
});

module.exports = connection;