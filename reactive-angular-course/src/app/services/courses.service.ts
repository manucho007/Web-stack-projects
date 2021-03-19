import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

// It's a stateless service without access to the data, just will return observables to the view layer
@Injectable({ providedIn: "root" })
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  //   shareReplay prevents additional subscribers to the returned observable triggering a new response
  loadAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"]),
      shareReplay()
    );
  }

  loadCourseById(courseId: number): Observable<Course> {
    return this.httpClient
      .get<Course>(`/api/courses/${courseId.toString()}`)
      .pipe(shareReplay());
  }

  loadAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.httpClient
      .get<Lesson[]>("/api/lessons", {
        params: {
          courseId: courseId.toString(),
          pageSize: "10000",
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.httpClient
      .put(`/api/courses/${courseId}`, changes)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.httpClient
      .get<Lesson[]>("/api/lessons", {
        params: {
          filter: search,
          pageSize: "100",
        },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }
}
