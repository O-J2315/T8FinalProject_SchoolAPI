const deptDefinitions = require("./deptDefinitions");
const teacherDefinitions = require("./teacherDefinitions");
const commonDefinitions = require("./commonDefinitions");

const definitions = {
    ...deptDefinitions,
    ...teacherDefinitions,
    ...commonDefinitions,
};

module.exports = definitions;
