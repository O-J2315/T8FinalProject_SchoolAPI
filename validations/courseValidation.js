const Joi = require("joi");

const courseSchema = Joi.object({
  courseId: Joi.string().required(),
  courseName: Joi.string().trim().required(),
  deptId: Joi.string().required(),
  teacherId: Joi.string().required(),
  credits: Joi.number().integer().min(1).required(),
});

const validateCourse = (data) => courseSchema.validate(data, { abortEarly: false });

module.exports = { validateCourse };
