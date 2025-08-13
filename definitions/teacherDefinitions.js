const teacherDefinitions = {
    // T E A C H E R
    // --------------------------------------------------
    // Teacher object definition
    Teacher: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "MongoDB generated unique identifier",
            },
            teacherId: {
                type: "string",
                description: "Custom teacher identifier",
            },
            firstName: {
                type: "string",
                description: "First name of teacher",
            },
            lastName: {
                type: "string",
                description: "Last name of teacher",
            },
            email: {
                type: "string",
                description: "Email address of teacher",
            },
            deptId: {
                type: "string",
                description: "Department identifier",
            },
            courses: {
                type: "array",
                items: {
                    type: "string",
                    description: "Course ID (e.g., CSE110)",
                },
                description: "List of course IDs taught by the teacher",
            },
        },
    },

    // I N P U T
    // --------------------------------------------------
    // Teacher input definition for creating a new teacher
    TeacherInput: {
        teacherId: "T001",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
        deptId: "CSEE",
        courses: ["CSE110", "CSE120"],
    },

    // R E S P O N S E / S
    // --------------------------------------------------
    // Response definition for a single teacher
    TeacherResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                description: "Indicates if request was successful",
            },
            message: {
                type: "string",
                description: "Response message",
            },
            data: {
                $ref: "#/definitions/Teacher",
                description: "Teacher object",
            },
        },
    },

    // Response definition for multiple teachers
    TeachersResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                description: "Indicates if request was successful",
            },
            message: {
                type: "string",
                description: "Response message",
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/definitions/Teacher",
                },
                description: "Array of teacher objects",
            },
        },
    },
};

module.exports = teacherDefinitions;
