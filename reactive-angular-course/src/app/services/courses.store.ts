import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, map, shareReplay, tap } from "rxjs/operators";
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

  //   Will save the course optimistically
  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    // We get the list of courses from the subject
    const courses = this.coursesSubject.getValue();
    // We find th index of the course we want to modify
    const index = courses.findIndex((course) => course.id == courseId);
    // We create a new version of the course with the updated values
    const newCourse: Course = {
      // an object containing the old version of the course without any changes made yet
      ...courses[index],
      ...changes,
    };
    // Now we create a new version of the courses array
    const newCourses: Course[] = courses.slice(0);
    newCourses[index] = newCourse;
    // We'll emit the new value
    this.coursesSubject.next(newCourses);
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      // Error handling
      catchError((err) => {
        const message = "Course could not be saved";
        console.log(message, err);
        this.messagesService.showErrors(message);
        return throwError(err);
      }),
      // Avoid multiple subscriptions triggering multiple executions
      shareReplay()
    );
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
