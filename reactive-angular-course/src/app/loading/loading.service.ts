import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// This will not be a global singleton, it can be instantiated at level component
@Injectable()
export class LoadingService {
  loading$: Observable<boolean>;

  //   WIll turn off and on the loader according to the lifecycle of the operation
  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }
  loadingOn() {}

  loadingOff() {}
}
