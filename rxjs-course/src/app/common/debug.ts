import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR,
}

// We define an application logging level
let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

// Function to change the application logging level
export const setRxJsLoggingLevel = (level: RxJsLoggingLevel) => {
  rxjsLoggingLevel = level;
};

// This higher order function takes an observable and returns an observable
export const debug = (level: number, message: string) => (
  sourceObs: Observable<any>
) =>
  sourceObs.pipe(
    tap((val) => {
      if (level >= rxjsLoggingLevel) {
        console.log(message + ": ", val);
      }
    })
  );
