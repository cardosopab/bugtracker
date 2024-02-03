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

export const CompanyNameValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not a string",
    },
  },
};

export const CompanyIdValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company id cannot be empty",
    },
    isString: {
      errorMessage: "company id is not a string",
    },
  },
};

export const PersonnelValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company id cannot be empty",
    },
    isString: {
      errorMessage: "company id is not a string",
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
