import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
  // Entity format but it's not optimal better to extend EntityState and done
  // The entities property is a map whose keys are the IDs of the entities of course
  // entities:{[key:number]:Course},
  // ids:number[]
  allCoursesLoaded: boolean;
}

// With this will be able to use all the ngrx functions to create our dictionary type of courses
export const adapterCourse = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  // Id is used by default but if we had another value for id we can set it manually with this
  selectId: (course) => course.id,
});

export const initialCoursesState = adapterCourse.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapterCourse.addAll(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = adapterCourse.getSelectors();
