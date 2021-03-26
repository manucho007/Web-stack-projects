import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  fromEvent,
  interval,
  merge,
  noop,
  Observable,
  ReplaySubject,
  timer,
} from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.executedObservables();
    // this.mergeObs();
    this.cancelSub();
    this.subjectsFunction();
  }

  subjectsFunction = () => {
    // Normal subject doesn't support late subscribtions
    // const subject = new Subject();
    // BehaviorSubject does support late sub and gets the last value emited before the new subscription
    // const subject = new BehaviorSubject(0);
    // Asyncsubject will wait for completion to get access to the last value emited NEEDS COMPLETION
    // const subject = new AsyncSubject();
    // ReplaySubject will replay the entire obs so a late subscriber will get access to the whole obs values NO NEED FOR COMPLETION
    const subject = new ReplaySubject();

    const series$ = subject.asObservable();
    series$.subscribe((val) => console.log("early sub" + val));
    subject.next(1);
    subject.next(2);
    subject.next(3);
    // completion will not allow new subscriber to emit new values or get previous values
    // subject.complete();
    setTimeout(() => {
      series$.subscribe((val) => console.log("late sub" + val));
      subject.next(4);
      subject.complete();
    }, 300);
  };

  cancelSub = () => {
    const http$ = createHttpObservable("/api/courses");
    const sub = http$.subscribe(console.log);
    setTimeout(() => sub.unsubscribe(), 0);
  };

  mergeObs = () => {
    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map((val) => 10 * val));
    // Merge obs
    const result$ = merge(interval1$, interval2$);
    result$.subscribe(console.log);
  };

  executedObservables = () => {
    // Observables can either complete or error out
    const interval$ = interval(1000);
    const timer$ = timer(3000, 1000);
    // We can manually subscribe to an observable
    const subInterval = interval$.subscribe((val) =>
      console.log("Stream 1 with interval => " + val)
    );
    const subTimer = timer$.subscribe((val) =>
      console.log("Stream 2 with timer => " + val)
    );

    setTimeout(() => {
      // We can manually unsubscribe to an observable
      subInterval.unsubscribe();
      subTimer.unsubscribe();
      console.log("Unsubscribed");
    }, 5000);
    const click$ = fromEvent(document, "click");
    click$.subscribe(
      (val) => console.log(val),
      // We can catch errors
      (err) => console.log(err),
      // Notify when the obs finishes after getting an error
      () => console.log("Completed")
    );
  };
}
