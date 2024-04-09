export const TicketValidationSchema = {
  ticketId: {
    optional: true,
    isString: {
      errorMessage: "ticket id is not a string",
    },
  },
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

export const TicketTitleValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "title cannot be empty",
    },
    isString: {
      errorMessage: "title is not a string",
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

export const TicketCommentValidationSchema = {
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

export const TicketProjectValidationSchema = {
  projectId: {
    notEmpty: {
      errorMessage: "project cannot be empty",
    },
    isString: {
      errorMessage: "project is not a string",
    },
  },
};

export const TicketPageValidationSchema = {
  companyId: {
    notEmpty: {
      errorMessage: "company cannot be empty",
    },
    isString: {
      errorMessage: "company is not a number",
    },
  },
  page: {
    notEmpty: {
      errorMessage: "page cannot be empty",
    },
    isInt: {
      errorMessage: "page is not a number",
    },
  },
  pageSize: {
    notEmpty: {
      errorMessage: "pageSize cannot be empty",
    },
    isInt: {
      errorMessage: "pageSize is not a number",
    },
  },
};
