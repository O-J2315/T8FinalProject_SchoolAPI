const deptDefinitions = {
    // D E P A R T M E N T
    // --------------------------------------------------
    // Department object definition
    Department: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "MongoDB generated unique identifier",
            },
            deptId: {
                type: "string",
                description: "Custom department identifier",
            },
            deptName: {
                type: "String",
                description: "Name of the department",
            },
            location: {
                type: "string",
                description: "Location of the department",
            },
            deptEmail: {
                type: "string",
                description: "Email address of the department",
            },
        },
    },

    // I N P U T
    // --------------------------------------------------
    // Department input definition for creating a new department
    DepartmentInput: {
        example: {
            deptId: "CSEE",
            deptName: "Computer Science and Electrical Engineering",
            location: "Austin Building",
            deptEmail: "csee@university.edu",
        },
    },

    // R E S P O N S E / S
    // --------------------------------------------------
    // Response definition for department/s
    DepartmentResponse: {
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
                $ref: "#/definitions/Department",
                description: "Department object",
            },
        },
    },

    // Response definition for multiple departments
    DepartmentsResponse: {
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
                    $ref: "#/definitions/Department",
                },
                description: "Array of department objects",
            },
        },
    },
};

module.exports = deptDefinitions;
