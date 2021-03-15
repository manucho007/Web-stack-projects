import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

// This will not be a global singleton, it can be instantiated at level component
@Injectable()
export class LoadingService {
  // A subject is like a observable but has the option to emit values
  // Behavior subject is like a subject but this one remembers the last value emited
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // Derives an observable from the subject that emits the same vaues as the subject but is simply a observable
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log("Loading service created");
  }
  //   WIll turn off and on the loader according to the lifecycle of the operation
  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    //    First we create a default observable to create an observable chain
    return of(null).pipe(
      // We create a side effect to switch on the loading indicator
      tap(() => {
        this.loadingOn();
      }),
      //Switch to outputing the values emited by the input observable with concatMap
      concatMap(() => obs$),
      // When the obs$ finishes emiting values or errors out we call finalize to switch off the loading indicator
      finalize(() => {
        this.loadingOff();
      })
    );
  }
  loadingOn() {
    //   Next allows to emit a new value
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
