const data =[
    {course_id:"ENG001",course_name:"English"},
    {course_id:"PRO002",course_name:"Program Development"},
    {course_id:"WEB003",course_name:"Web Development"},
    {course_id:"BIZ004",course_name:"Business Administration"},
    {course_id:"FIN005",course_name:"Finance-Accounting"},
];

const courseModel = {
    getAllCourses: () => data,
};

module.exports = courseModel;
