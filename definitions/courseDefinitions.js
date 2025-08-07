const courseDefinitions = {
    // C O U R S E
    // --------------------------------------------------
    // Course object definition
    Course: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "MongoDB generated unique identifier",
            },
            courseId: {
                tpye: "string",
                description: "Custom course identifier",
            },
            courseName: {
                type: "string",
                description: "Name of the course",
            },
            deptId: {
                type: "string",
                description: "Department ID to which the course belongs",
            },
            teacherId: {
                type: "string",
                description: "Teacher ID who teaches the course",
            },
            credits: {
                type: "number",
                description: "Number of credits for the course",
            },
        },
    },

    // I N P U T
    // --------------------------------------------------
    // Course input definition for creating a new course
    CourseInput: {
        courseId: "CSE_110",
        courseName: "Introduction to Computer Science",
        deptId: "CSEE",
        teacherId: "T001",
        credits: 3,
    },

    // R E S P O N S E / S
    // --------------------------------------------------
    // Response definition for a single course
    CourseResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                description: "Indicates if the operation was successful",
            },
            message: {
                type: "string",
                description: "Response message",
            },
            data: {
                $ref: "#/definitions/Course",
                description: "Course object",
            },
        },
    },

    // Response definition for multiple courses
    CoursesResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                description: "Indicates if the operation was successful",
            },
            message: {
                type: "string",
                description: "Response message",
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/definitions/Course",
                },
                description: "Array of course objects",
            },
        },
    },
};

module.exports = courseDefinitions;
