import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, merge, noop, Observable, timer } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.executedObservables();
    this.mergeObs();
  }

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
