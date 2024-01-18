export const UserValidationSchema = {
  username: {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "username should be between 3-20 characters",
    },
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username is not string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "display name cannot be empty",
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
