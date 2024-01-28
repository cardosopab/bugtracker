export const ProjectValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company ID cannot be empty",
    },
    isString: {
      errorMessage: "company ID is not string",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not string",
    },
  },
  description: {},
  personnel: {},
};
