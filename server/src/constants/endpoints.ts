export const AuthEndpoints = {
  LOGIN: "/api/auth/login",
  STATUS: "/api/auth/status",
  LOGOUT: "/api/auth/logout",
};

export const UsersEndpoints = {
  USERS: "/api/users",
  USER_BY_EMAIL: "/api/users/by-email",
  USER_BY_ID: "/api/users/by-id",
};

export const ProjectsEndpoints = {
  PROJECTS: "/api/projects",
  PROJECT_BY_NAME: "/api/projects/by-name",
  PROJECT_BY_ID: "/api/projects/by-id",
  PERSONNEL: "/api/projects/personnel",
};

export const TicketsEndpoints = {
  TICKETS: "/api/tickets",
  TICKET_BY_TITLE: "/api/tickets/by-title",
  TICKET_BY_ID: "/api/tickets/by-id",
  COMMENTS: "/api/tickets/comments",
};

export const CompaniesEndpoints = {
  COMPANIES: "/api/companies",
  COMPANY_BY_NAME: "/api/companies/by-name",
  COMPANY_BY_ID: "/api/companies/by-id",
  PERSONNEL: "/api/companies/personnel",
};
