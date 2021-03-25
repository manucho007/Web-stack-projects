import { Observable } from "rxjs";
import { Course } from "../model/course";

export const createHttpObservable = (url: string): Observable<any> => {
  return new Observable((observer) => {
    // We'll add the option to cancel the fetch request
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then((res) => res.json())
      .then((body) => {
        observer.next(body);
        // We complete the observable
        observer.complete();
      })
      // Or we error it out
      .catch((err) => observer.error(err));

    // This is the cancellation funct and it's executed by the unsubscribe method
    return () => controller.abort();
  });
};
