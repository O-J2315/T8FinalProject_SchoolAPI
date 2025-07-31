const commonDefinitions = {
    // E R R O R
    // --------------------------------------------------
    // Error response definition
    ErrorResponse: {
        type: "Object",
        properties: {
            success: {
                type: "boolean",
                example: false,
                description: "Indicates request failed",
            },
            message: {
                type: "string",
                description: "Error message describing the issue",
                example: "An error occurred",
            },
            error: {
                type: "string",
                description: "Detailed error information",
                example: "Validation error: 'courseName' is required",
            },
        },
    },

    // V A L I D A T I O N
    // --------------------------------------------------
    // Validation error response definition
    ValidationErrorResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false,
            },
            message: {
                type: "string",
                example: "Validation failed",
            },
            error: {
                type: "string",
                example: "courseId is required",
            },
            details: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        field: {
                            type: "string",
                            example: "courseId",
                        },
                        message: {
                            type: "string",
                            example: "courseId is required",
                        },
                    },
                },
            },
        },
    },

    // C O N F L I C T
    // --------------------------------------------------
    // Conflict error response definition
    ConflictErrorResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false,
            },
            message: {
                type: "string",
                example: "Resource already exists",
            },
            error: {
                type: "string",
                example: "Course with ID CSE_101 already exists",
            },
            conflictField: {
                type: "string",
                example: "courseId",
                description: "The field that caused the conflict",
            },
        },
    },

    // N O T F O U N D
    // --------------------------------------------------
    // Not Found error response definition
    NotFoundErrorResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: false,
            },
            message: {
                type: "string",
                example: "Resource not found",
            },
            error: {
                type: "string",
                example: "Teacher with ID T001 does not exist",
            },
        },
    },
};

module.exports = commonDefinitions;
