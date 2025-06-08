// This file defines the application's route constants for easy reference and maintenance.

const ROUTES = {
  HOME: '/',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  AUTH_ERROR: '/auth/error',
  TAG: (id: string) => `/tags/${id}`,
};

// Routes which will be accessible to public and do not require login
const publicRoutes = ['/', '/auth/new-verification'];

// Routes which will be used to auth
// These routes will be redirect logged in users to /settings
const authRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/error'];

// The prefix for API authentication routes
// Routes that start with this prefix are used for API authentication process
const apiAuthPrefix = '/api/auth';

// The default redirect path after login
const DEFAULT_LOGIN_REDIRECT = '/settings';

export {
  ROUTES,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
};
