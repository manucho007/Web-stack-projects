import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from "moment";
import { fromEvent } from "rxjs";
import {
  concatMap,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
  switchMap,
} from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { saveCourse } from "../../../server/save-course.route";
import { Store } from "../common/store.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: Course;

  @ViewChild("saveButton", { static: true }) saveButton: ElementRef;

  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private store: Store
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    //   Check if the values in the form are valid
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        // concatMap waits for one obs to complete before subscribing and using the next observable
        // concatMap((changes) => this.saveCourse(changes))
        // To avoid the sequential http calls better to use mergeMap
        // mergeMap((changes) => this.store.saveCourse(this.course.id, changes)),
        // IN this case to avoid too many http requests we use exhaustMap
        // ExhaustMap avoid the situation of subscribing multiple times to an ongoing obs, this will ignore the subs until the
        // it finishes the original one then it will be posible to subscribe again
        // Nono better switchMap because it emits values only from the most recently projected Observable.
        switchMap((changes) => this.store.saveCourse(this.course.id, changes))
      )
      .subscribe();
  }

  ngAfterViewInit() {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.store.saveCourse(this.course.id, this.form.value).subscribe(
      () => this.dialogRef.close(),
      (err) => console.log("Error saving course", err)
    );
  }
}
