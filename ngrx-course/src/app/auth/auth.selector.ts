import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// Provides type safety for the createselector
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// This is a memoized function
export const isLoggedIn = createSelector(
  // Without ts typesafety untill we implement the createFeatureSelector
  // (state) => state["auth"],
  selectAuthState,
  (auth) => !!auth.user
);

// We can combine multiple selectors together
// loggedIn is a result of passing the mapping function isLoggedIN
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
