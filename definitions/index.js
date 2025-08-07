const deptDefinitions = require("./deptDefinitions");
const teacherDefinitions = require("./teacherDefinitions");
const studentDefinitions = require("./studentDefinitions");
const courseDefinitions = require("./courseDefinitions");
const commonDefinitions = require("./commonDefinitions");

const definitions = {
    ...deptDefinitions,
    ...teacherDefinitions,
    ...studentDefinitions,
    ...courseDefinitions,
    ...commonDefinitions,
};

module.exports = definitions;
