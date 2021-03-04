import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

// The resolver is a plugable router service that is triggered before the content is rendered
export const loadAllCourses = createAction(
  "[Courses Resolver] Load All Courses"
);

export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All courses have been loaded",
  props<{ courses: Course[] }>()
);
