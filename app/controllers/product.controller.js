const Product = require("../models/product.model");

// ดึงข้อมูลสินค้าทั้งหมด
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error fetch products"
            });
        else res.send(data);
    });
};

// สร้างสินค้าใหม่
exports.create = (req, res) => {
  // 1. เปลี่ยนชื่อฟิลด์ให้ตรงกับ Database (product_name, category_id)
  if (!req.body.product_name || !req.body.price || !req.body.category_id) {
    res.status(400).send({
      message: "Product name, price, and category ID cannot be empty!"
    });
    return;
  }

  // 2. สร้าง object โดยจับคู่ค่าจาก request body ให้ตรงกับ model
  const newProduct = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    category_id: req.body.category_id,
    is_delete: 0 // กำหนดค่าเริ่มต้นเป็น 0 (ยังไม่ถูกลบ)
  });

  Product.create(newProduct, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the product."
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// อัปเดตข้อมูลสินค้า
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty!"
    });
    return;
  }

  Product.updateById(req.params.id, req.body, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({ message: `Product with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: `Error updating product with id ${req.params.id}` });
      }
    } else {
      res.send(data);
    }
  });
};

// ลบสินค้า (แนะนำให้ใช้ Soft Delete)
exports.delete = (req, res) => {
  Product.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({ message: `Product with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ message: `Could not delete product with id ${req.params.id}` });
      }
    } else {
      res.send({ message: "Product was deleted successfully!" });
    }
  });
};