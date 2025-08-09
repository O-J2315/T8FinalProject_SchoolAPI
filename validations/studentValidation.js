const Joi = require("joi");

const studentSchema = Joi.object({
    studentId: Joi.string().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    major: Joi.string().required(),
    status: Joi.string()
        .valid("active", "graduated", "withdrawn")
        .default("active"),
    GPA: Joi.number().min(0).max(4).optional(),
    enrollmentDate: Joi.date().required(),
    courses: Joi.array().items(Joi.string()).optional(),
});

const validateStudent = (data) =>
    studentSchema.validate(data, { abortEarly: false });

module.exports = { validateStudent };
