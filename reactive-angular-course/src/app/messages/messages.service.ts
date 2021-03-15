import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

// Again not a global singleton, there could be multiple instances of the service across the app
@Injectable()
export class MessagesService {
  private messageSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.messageSubject
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  //   We'll just emit the values of the errors and the component will subscribe to the observable
  showErrors(...errors: string[]) {
    this.messageSubject.next(errors);
  }
}
