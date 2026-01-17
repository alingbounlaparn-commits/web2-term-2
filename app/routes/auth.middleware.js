import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req, res, next) => {
  // 1. ตรวจสอบว่ามีการส่ง Header Authorization มาหรือไม่
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided" });
  }

  // 2. แยก Token ออกจาก "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // 3. ตรวจสอบความถูกต้องของ Token ด้วย SECRET_KEY
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    // 4. เก็บ userId ที่แกะออกมาได้ลงใน req object เพื่อให้ Controller อื่นใช้งานต่อ
    // สำคัญ: ชื่อ property ต้องตรงกับที่ใช้ใน generateAccessToken (นั่นคือ userId)
    req.userId = decoded.userId; 
    
    console.log("Authenticated User ID:", req.userId); // สำหรับ Debug ใน Terminal
    next(); // อนุญาตให้ไปทำงานที่ Controller ต่อ
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};