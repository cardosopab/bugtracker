export const UserValidationSchema = {
  name: {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "name should be between 3-20 characters",
    },
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
  password: {
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "password should be between 8-20 characters",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
};
