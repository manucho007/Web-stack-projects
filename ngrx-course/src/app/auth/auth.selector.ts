import { createSelector } from "@ngrx/store";

// This is a memoized function
export const isLoggedIn = createSelector(
  (state) => state["auth"],
  (auth) => !!auth.user
);

// We can combine multiple selectors together
// loggedIn is a result of passing the mapping function isLoggedIN
export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
