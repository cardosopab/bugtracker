export const AuthEndpoints = {
  LOGIN: "/api/auth/login",
  STATUS: "/api/auth/status",
  LOGOUT: "/api/auth/logout",
};

export const UsersEndpoints = {
  USERS: "/api/users",
  USER_BY_EMAIL: "/api/users/by-email",
  USER_BY_ID: "/api/users/by-id",
  USERS_BY_COMPANY: "/api/users/by-company",
};

export const ProjectsEndpoints = {
  PROJECTS: "/api/projects",
  PROJECT_BY_NAME: "/api/projects/by-name",
  PROJECT_BY_ID: "/api/projects/by-id",
  PROJECT_BY_EMAIL: "/api/projects/by-email",
  PROJECTS_BY_COMPANY: "/api/projects/by-company",
  PROJECTS_BY_PAGE: "/api/projects/by-page",
  PERSONNEL: "/api/projects/personnel",
};

export const TicketsEndpoints = {
  TICKETS: "/api/tickets",
  TICKET_BY_TITLE: "/api/tickets/by-title",
  TICKET_BY_ID: "/api/tickets/by-id",
  TICKETS_BY_COMPANY: "/api/tickets/by-company",
  TICKETS_BY_PAGE: "/api/tickets/by-page",
  COMMENTS: "/api/tickets/comments",
};

export const CompaniesEndpoints = {
  COMPANIES: "/api/companies",
  COMPANY_BY_NAME: "/api/companies/by-name",
  COMPANY_BY_ID: "/api/companies/by-id",
  PERSONNEL: "/api/companies/personnel",
};
