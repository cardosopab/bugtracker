export const ProjectValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company id cannot be empty",
    },
    isString: {
      errorMessage: "company id is not a string",
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

export const ProjectCompanyValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company cannot be empty",
    },
    isString: {
      errorMessage: "company is not a string",
    },
  },
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
      errorMessage: "project id cannot be empty",
    },
    isString: {
      errorMessage: "project id is not a string",
    },
  },
};

export const PersonnelValidationSchema = {
  projectId: {
    notEmpty: {
      errorMessage: "project id cannot be empty",
    },
    isString: {
      errorMessage: "project id is not a string",
    },
  },
  personnelId: {
    notEmpty: {
      errorMessage: "personnel id cannot be empty",
    },
    isString: {
      errorMessage: "personnel id is not a string",
    },
  },
};
