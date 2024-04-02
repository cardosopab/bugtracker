export const DashboardValidationSchema = {
  projectId: {
    notEmpty: {
      errorMessage: "project id cannot be empty",
    },
    isString: {
      errorMessage: "project id is not a string",
    },
  },
};
