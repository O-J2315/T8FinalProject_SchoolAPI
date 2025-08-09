const Joi = require("joi");

const departmentSchema = Joi.object({
    deptId: Joi.string().required(),
    deptName: Joi.string().trim().required(),
    location: Joi.string().allow("", null),
    deptEmail: Joi.string().email().allow("", null),
});

const validateDepartment = (data) =>
    departmentSchema.validate(data, { abortEarly: false });

module.exports = { validateDepartment };
