const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AuthEndpoints = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  STATUS: `${BASE_URL}/api/auth/status`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
};

export const UsersEndpoints = {
  USERS: `${BASE_URL}/api/users`,
  USER_BY_EMAIL: `${BASE_URL}/api/users/by-email`,
  USER_BY_ID: `${BASE_URL}/api/users/by-id`,
};

export const ProjectsEndpoints = {
  PROJECTS: `${BASE_URL}/api/projects`,
  PROJECT_BY_NAME: `${BASE_URL}/api/projects/by-name`,
  PROJECT_BY_ID: `${BASE_URL}/api/projects/by-id`,
  PERSONNEL: `${BASE_URL}/api/projects/personnel`,
};

export const TicketsEndpoints = {
  TICKETS: `${BASE_URL}/api/tickets`,
  TICKET_BY_TITLE: `${BASE_URL}/api/tickets/by-title`,
  TICKET_BY_ID: `${BASE_URL}/api/tickets/by-id`,
  TICKET_BY_PAGE: `${BASE_URL}/api/tickets/by-page`,
  PERSONNEL: `${BASE_URL}/api/tickets/personnel`,
};

export const CompaniesEndpoints = {
  COMPANIES: `${BASE_URL}/api/companies`,
  COMPANY_BY_NAME: `${BASE_URL}/api/companies/by-name`,
  COMPANY_BY_ID: `${BASE_URL}/api/companies/by-id`,
  PERSONNEL: `${BASE_URL}/api/companies/personnel`,
};
