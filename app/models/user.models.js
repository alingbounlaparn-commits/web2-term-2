const sql = require("./db.js");

// Constructor สำหรับ User ให้ตรงกับ Schema laotop (id, name, email, password, age)
const User = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
};

// สร้างผู้ใช้ใหม่ (Register)
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }
        result(null, { id: response.insertId, ...newUser });
    });
};

// เข้าสู่ระบบ (Login)
User.loginByEmailAndPassword = (email, password, result) => {
    sql.query("SELECT id, name, email FROM users WHERE email=? AND password=?", [email, password], (error, response) => {
        if (error) {
            result(error, null);
            return;
        }
        if (response.length) {
            result(null, response[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// ค้นหาโปรไฟล์ด้วย ID (Profile)
User.findById = (id, result) => {
    // Make sure you are selecting from the correct schema/table
    sql.query("SELECT id, name, email, age FROM users WHERE id = ?", [id], (error, response) => {
        if (error) {
            result(error, null);
            return;
        }
        if (response.length) {
            result(null, response[0]);
            return;
        }
        // This is the error you are seeing in Postman
        result({ kind: "not_found" }, null);
    });
};

module.exports = User;