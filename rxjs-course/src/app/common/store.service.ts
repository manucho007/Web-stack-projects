import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
} from "rxjs/operators";
import { Course } from "../model/course";
import { debug, RxJsLoggingLevel } from "./debug";
import { createHttpObservable } from "./util";

@Injectable({
  providedIn: "root",
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    // Cleaned version for store
    const http$ = createHttpObservable("/api/courses");
    http$
      .pipe(
        map((res) => Object.values(res["payload"])),
        debug(RxJsLoggingLevel.INFO, "Courses from store")
      )
      .subscribe((courses) => this.subject.next(courses));

    //   // Creating our custom http observable
    // const http$ = createHttpObservable("/api/courses");

    // // Map the courses
    // const courses$ = http$.pipe(
    //   // This is one strategy to deal with erros
    //   catchError((err) => {
    //     // Recovery Observable error handling  with a value
    //     // of([])
    //     // In this case we'll handle the error locally
    //     console.log("Error Ocurred", err);
    //     // An observable needs to be emitted, in this case this one will not emit a new value and errors out
    //     return throwError(err);
    //   }),
    //   // this will execute when the obs finishes executing or it errors out
    //   finalize(() => console.log("finalize executed")),
    //   map((res) => res["payload"]),
    //   // Avoid multiple subscriptions
    //   shareReplay(),
    //   // Retry error handle strategy
    //   // creates a new stream each time the stream throws an error until it doesn't error out
    // //   retryWhen((errors) =>
    // //     errors.pipe(
    // //       // Each time there is an error it'll wait 2 seconds before trying again
    // //       delayWhen(() => timer(2000))
    // //     )
    // //   )
    // );
  }

  selectBeginnerCourses() {
    return this.filterByCategory("BEGINNER");
  }
  selectAdvancedCourses() {
    return this.filterByCategory("ADVANCED");
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }
}