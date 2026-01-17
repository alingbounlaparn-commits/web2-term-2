const courseModel = require("../models/courseModel");

const handleGetCoruses = (req, res) => {
    const courseData = courseModel.getAllCourses();
    res.json(courseData);
};

const courseController = {
    handleGetCoruses,
};

module.exports = courseController;