import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //   This get all triggers a get request automatically by convention, there is no need to do a request manually now
    // There are many many more methods available with this but get all should not fetch the data just trigger an http request
    return this.coursesService.loaded$.pipe(
      // The loaded cache we're getting is in the entity, and based on this we'll tigger an http response to get the data
      tap((loaded) => {
        if (!loaded) {
          this.coursesService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
