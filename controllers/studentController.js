const studentModel = require("../models/studentsModel");

const handleGreeting = (req, res) => {
    res.send("Hello, Lao-Top API");
};

const handleGetstudents = (req, res) => {
    const studentsData = studentModel.getAllStudents();
    res.json(studentsData);
};

const studentController = {
    handleGreeting,
    handleGetstudents,
};
module.exports = studentController;