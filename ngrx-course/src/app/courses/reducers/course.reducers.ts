import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
  // Entity format but it's not optimal better to extend EntityState and done
  // The entities property iss a map whose keys are the IDs of the entities of course
  // entities:{[key:number]:Course},
  // ids:number[]
}

// With this will be able to use all the ngrx functions to create our dictionary type of courses
export const adapterCourse = createEntityAdapter<Course>();

export const initialCoursesState = adapterCourse.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapterCourse.addAll(action.courses, state)
  )
);

export const { selectAll } = adapterCourse.getSelectors();
