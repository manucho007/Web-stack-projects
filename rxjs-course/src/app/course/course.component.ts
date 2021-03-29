import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  throttleTime,
  first,
  take,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, forkJoin } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { debug, RxJsLoggingLevel, setRxJsLoggingLevel } from "../common/debug";
import { Store } from "../common/store.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: number;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true })
  input: ElementRef;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    this.course$ = this.store.selectCourseById(this.courseId).pipe(
      // Forces the obs to complete after emiting the first value - could be first() too
      take(1)
    );

    // Change the application debug level
    setRxJsLoggingLevel(RxJsLoggingLevel.TRACE);
  }

  combineObs() {
    // Combine obs always getting the latest version of the second obs(Course)
    // this.loadLessons().pipe(
    //   withLatestFrom(this.course$)
    // ).
    // subscribe(([lessons,course])=>{
    //   console.log(lessons);
    //   console.log(course);
    // })
    // Example of forkJoin for the observables - useful for executing obs in paralel
    // Both are executed in paralel but the values were emited only after both obs were completed
    // forkJoin([this.course$, this.lessons$])
    //   .pipe(
    //     tap(([course, lessons]) => {
    //       console.log("course:", course);
    //       console.log("lessons:", lessons);
    //     })
    //   )
    //   .subscribe();
  }

  ngAfterViewInit() {
    //   Create a stream from the input
    this.lessons$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map((event) => event.target.value),
      // begin with an empty string for the search
      startWith(""),
      debug(RxJsLoggingLevel.TRACE, "search"),
      //   debounce waits until the obs become stable before performing an action - does get the final value
      debounceTime(400),
      // Still waits 400 ms but might not get the final value only the one it was at the 400 ms mark
      // throttleTime(400),
      // Avoid sending duplicated values as requests,
      distinctUntilChanged(),
      // If the search word changes we unsubscribe from the http request and make a new one
      switchMap((search) => this.loadLessons(search)),
      debug(RxJsLoggingLevel.DEBUG, "lessons value")
    );
  }

  loadLessons(search: string = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
