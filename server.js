// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();

// // parse requests dof ccontent-type; applicattion/json
// app.use(bodyParser.json());

// // parse reuests of content-type; application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true}));

// // simple route
// app.get("/", (req, res) => {
//     res.json({ message: "welcome to bezkoder application."});
// });
// require("./app/routes/product.route.js")(app);

// //set port, listen for requests
// app.listen(3000,() => {
//     console.log("server is running on prot 3000.");
// });

// 2 app.get("/", (req, res) => {
//     res.json({ message: "Welcome to my API" });
// });

// require("./app/routes/product.route")(app);
// require("./app/routes/user.route")(app); // เพิ่มบรรทัดนี้

// app.listen(3002, () => {
//     console.log("Server is running on port 3002");
// });


// 3 const express = require("express");

// const app = express(); // 👈 ต้องมีบรรทัดนี้

// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// const express = require("express");


// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/user", (req, res) => {
//   res.send("User page");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./app/routes/user.routes.js"; // ✅ match filename exactly
import productRoute from "./app/routes/product.route.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

// Mount routes
userRoutes(app);
productRoute(app);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
