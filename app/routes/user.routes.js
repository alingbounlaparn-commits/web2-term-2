const users = require("../controllers/user.controller.js");
// ต้องใช้ .default เพราะไฟล์ auth.middleware ใช้ export default
const auth = require("./auth.middleware").default; 

module.exports = app => {
  // เส้นทางที่ไม่ต้องใช้ Token
  app.post("/register", users.create);
  app.post("/login", users.login);
  
  // เส้นทางที่ "ต้อง" มี Token (Profile)
  // ลำดับคือ: เช็ค Token (auth) -> ถ้าผ่านค่อยไปดึงข้อมูล (users.profile)
  app.get("/profile", auth, users.profile); 
};