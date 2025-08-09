const Joi = require("joi");

const teacherSchema = Joi.object({
    teacherId: Joi.string().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    deptId: Joi.string().required(),
    courses: Joi.array().items(Joi.string()).optional(),
});

const validateTeacher = (data) =>
    teacherSchema.validate(data, { abortEarly: false });

module.exports = { validateTeacher };
