import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

import { CoursesService } from "../services/courses.service";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  // We subscribe to the observables only once from the HTML using the async pipe
  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    const courses$ = this.coursesService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        // We create a new observable that emits the error and finishes the lifecycle
        return throwError(err);
      })
    );

    // This new observable has loading indicator capability
    const loadCourses$ = this.loadingService.showLoaderUntilComplete(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
  }
}
