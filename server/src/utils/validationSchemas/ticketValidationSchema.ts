export const TicketValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
    isString: {
      errorMessage: "Title is not a string",
    },
  },
  description: {
    isString: {
      errorMessage: "Description is not a string",
    },
  },
  projectId: {
    notEmpty: {
      errorMessage: "Company id cannot be empty",
    },
    isString: {
      errorMessage: "Company id is not a string",
    },
  },
  companyId: {
    notEmpty: {
      errorMessage: "Company id cannot be empty",
    },
    isString: {
      errorMessage: "Company id is not a string",
    },
  },
  submitterId: {
    notEmpty: {
      errorMessage: "Submitter id cannot be empty",
    },
    isString: {
      errorMessage: "Submitter id is not a string",
    },
  },
  personnelId: {
    isString: {
      errorMessage: "Personnel id is not a string",
    },
  },
  priority: {
    isString: {
      errorMessage: "Priority is not a string",
    },
  },
  status: {
    isString: {
      errorMessage: "Status is not a string",
    },
  },
  type: {
    isString: {
      errorMessage: "Type is not a string",
    },
  },
  comments: {
    isArray: {
      errorMessage: "Comments must be an array",
    },
  },
};

export const TicketNameValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name is not a string",
    },
  },
};

export const TicketIdValidationSchema = {
  ticketId: {
    notEmpty: {
      errorMessage: "ticket id cannot be empty",
    },
    isString: {
      errorMessage: "ticket id is not a string",
    },
  },
};

export const CommentValidationSchema = {
  ticketId: {
    notEmpty: {
      errorMessage: "ticket id cannot be empty",
    },
    isString: {
      errorMessage: "ticket id is not a string",
    },
  },
  commentId: {
    notEmpty: {
      errorMessage: "comment id cannot be empty",
    },
    isString: {
      errorMessage: "comment id is not a string",
    },
  },
};
