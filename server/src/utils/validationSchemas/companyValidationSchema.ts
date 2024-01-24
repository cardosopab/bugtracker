export const CompanyValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not string",
    },
  },
  personnel: {},
};
