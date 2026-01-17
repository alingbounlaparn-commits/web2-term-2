// module.exports = app => {
// const products = require("../controllers/product.controller");
// app.get("/products", products.findAll);
// app.post("/products",products.create);
// app.put("/products/:id",products.update);
// app.delete("/products/:id",products.delete);
// };
// ลองใส่ { } ครอบชื่อตัวแปร เพื่อดึงเฉพาะ function ออกมาจาก module
const auth = require('./auth.middleware').default;

module.exports = app => {
    const products = require("../controllers/product.controller");
    
    // ใช้งาน middleware
    app.use("/products", auth);

    app.get("/products", products.findAll);
    app.post("/products", products.create);
    app.put("/products/:id", products.update);
    app.delete("/products/:id", products.delete);
};