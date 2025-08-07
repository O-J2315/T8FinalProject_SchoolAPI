module.exports = (validateFn) => (req, res, next) => {
  const { error } = validateFn(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};
