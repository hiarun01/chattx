export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const AUTH_ROUTE = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/update-profile`;
export const ADD_PROFILE_IMG_ROUTE = `${AUTH_ROUTE}/add-profile-image`;
export const DELETE_PROFILE_IMAGE = `${AUTH_ROUTE}/delete-profile-image`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;

// Contacts route
export const CONTACT_ROUTE = "/api/contacts";
export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTE}/search`;
