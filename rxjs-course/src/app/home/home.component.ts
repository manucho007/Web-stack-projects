import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop, throwError } from "rxjs";
import {
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;
  constructor() {}

  ngOnInit() {
    // Creating our custom http observable
    const http$ = createHttpObservable("/api/courses");

    // Map the courses
    const courses$ = http$.pipe(
      // catchError((err) => {
      //   // Recovery Observable error handling  with a value
      //   // of([])
      //   // In this case we'll handle the error locally
      //   console.log("Error Ocurred", err);
      //   // An observable needs to be emitted, in this case this one will not emit a new value and errors out
      //   return throwError(err);
      // }),
      // this will execute when the obs finishes executing or it errors out
      finalize(() => console.log("finalize executed")),
      map((res) => res["payload"]),
      // Avoid multiple subscriptions
      shareReplay(),
      // Retry error handle strategy
      // creates a new stream each time the stream throws an error until it doesn't error out
      retryWhen((errors) =>
        errors.pipe(
          // Each time there is an error it'll wait 2 seconds before trying again
          delayWhen(() => timer(2000))
        )
      )
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
  }
}
