import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";

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
}
