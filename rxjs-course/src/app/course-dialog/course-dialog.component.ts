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
} from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { saveCourse } from "../../../server/save-course.route";

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
    @Inject(MAT_DIALOG_DATA) course: Course
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
        // To avoid the sequential http calls in this case better to use mergeMap
        mergeMap((changes) => this.saveCourse(changes))
      )
      .subscribe();
  }
  saveCourse(changes) {
    return fromPromise(
      fetch(`/api/courses/${this.course.id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "content-type": "application/json",
        },
      })
    );
  }

  ngAfterViewInit() {
    fromEvent(this.saveButton.nativeElement, "click")
      .pipe(
        //   exhaustMap avoid the situation of subscribing multiple times to an ongoing obs, this will ignore the subs until the
        // it finishes the original one then it will be posible to subscribe again
        exhaustMap(() => this.saveCourse(this.form.value))
      )
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
