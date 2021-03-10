import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers/course.reducers";
import * as fromCourses from "./reducers/course.reducers";

// To use the courses selector features
export const selectCoursesState = createFeatureSelector<CoursesState>(
  "courses"
);

// use of adapter from the course reducers
// Will get all the courses in their respective order
export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);
