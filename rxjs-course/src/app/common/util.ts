import { Observable } from "rxjs";
import { Course } from "../model/course";

export const createHttpObservable = (url: string): Observable<any> => {
  return new Observable((observer) => {
    // We'll add the option to cancel the fetch request
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then((res) => {
        // Adding error handling in case of non-fatal error such as 500 error
        if (res.ok) {
          return res.json();
        } else {
          observer.error("Request Failed with status code: " + res.status);
        }
      })
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
