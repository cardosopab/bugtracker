export const ProjectValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company ID cannot be empty",
    },
    isString: {
      errorMessage: "company ID is not a string",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not a string",
    },
  },
  description: {},
  personnel: {},
};

export const ProjectNameValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not a string",
    },
  },
};

export const ProjectIdValidationSchema = {
  projectId: {
    notEmpty: {
      errorMessage: "project ID cannot be empty",
    },
    isString: {
      errorMessage: "project ID is not a string",
    },
  },
};
