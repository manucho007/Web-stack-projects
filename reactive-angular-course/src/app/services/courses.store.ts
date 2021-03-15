import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { Course, sortCoursesBySeqNo } from "../model/course";

@Injectable({ providedIn: "root" })
export class CoursesStore {
  coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadAllCourses();
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>(`/api/courses`).pipe(
      map((res) => res["payload"]),
      catchError((err) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);
        // We create a new observable that emits the error and finishes the lifecycle
        return throwError(err);
      }),
      tap((courses) => this.coursesSubject.next(courses))
    );
    this.loadingService.showLoaderUntilComplete(loadCourses$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.coursesSubject.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
