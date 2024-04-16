const validator  = require('validation-utils');


const registerValidation = (req, res, next) => {
  const validateRule = {
    fullName: "required|string|min:3",
    email: "required|email",
    password: "required|min:6",
    phoneNumber: "required|max:10|min:10",
  };

  validator(req.body, validateRule, {})
    .then((status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: "Invalid data provided",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error("Validation error:", err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        data: err.toString(),
      });
    });
};

const loginValidation = (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:6",
  };

  validator(req.body, validateRule, {})
    .then((status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: "Invalid data provided",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error("Validation error:", err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        data: err.toString(),
      });
    });
};

module.exports = {
  registerValidation,
  loginValidation,
};
