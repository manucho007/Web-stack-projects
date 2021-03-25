import { Observable } from "rxjs";
import { Course } from "../model/course";

export const createHttpObservable = (url: string): Observable<Course[]> => {
  return new Observable((observer) => {
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        observer.next(body);
        // We complete the observable
        observer.complete();
      })
      // Or we error it out
      .catch((err) => observer.error(err));
  });
};
