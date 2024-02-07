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
  role: {
    optional: true,
  },
  companyId: {
    optional: true,
  },
};

export const UserIdValidationSchema = {
  userId: {
    notEmpty: {
      errorMessage: "userId cannot be empty",
    },
  },
};

export const UserEmailValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
};

export const PatchUserValidationSchema = {
  userId: {
    notEmpty: {
      errorMessage: "user id cannot be empty",
    },
  },
  name: {
    optional: true,
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
    optional: true,
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
  password: {
    optional: true,
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "password should be between 8-20 characters",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
  role: {
    optional: true,
  },
  companyId: {
    optional: true,
  },
};
