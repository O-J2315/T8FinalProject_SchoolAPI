const studentDefinitions = {
    // S T U D E N T
    // --------------------------------------------------
    // Student object definition
    Student: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "MongoDB generated unique identifier",
            },
            studentId: {
                type: "string",
                description: "Custom student identifier",
            },
            firstName: {
                type: "string",
                description: "First name of student",
            },
            lastName: {
                type: "string",
                description: "Last name of student",
            },
            email: {
                type: "string",
                description: "Email address of student",
            },
            major: {
                type: "string",
                description: "Major field of study",
            },
            status: {
                type: "string",
                description: "Enrollment status of student",
            },
            GPA: {
                type: "number",
                description: "Grade Point Average of student",
            },
            enrollmentDate: {
                type: "string",
                description: "Enrollment date of student",
            },
            courses: {
                type: "array",
                items: {
                    type: "string",
                    description: "Course ID (e.g., CSE110)",
                },
                description: "List of course IDs enrolled by the student",
            },
        },
    },

    // I N P U T
    // --------------------------------------------------
    // Student input definition for creating a new student
    StudentInput: {
        studentId: "S001",
        firstName: "Student",
        lastName: "One",
        email: "student.one@example.com",
        major: "Computer Science",
        status: "active",
        GPA: 3.5,
        enrollmentDate: "2023-01-01",
        courses: ["CSE110", "CSE120"],
    },

    // R E S P O N S E / S
    // --------------------------------------------------
    // Response definition for a single student
    StudentResponse: {
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
                $ref: "#/definitions/Student",
                description: "Student object",
            },
        },
    },

    // Response definition for multiple students
    StudentsResponse: {
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
                    $ref: "#/definitions/Student",
                },
                description: "Array of student objects",
            },
        },
    },
};

module.exports = studentDefinitions;
