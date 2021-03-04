import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      //   concatMap ensures we only send one request at the time
      concatMap((action) => this.coursesHttpService.findAllCourses()),
      //   The courses are the response from the backend
      map((courses) => CourseActions.allCoursesLoaded({ courses }))
    )
  );
}
