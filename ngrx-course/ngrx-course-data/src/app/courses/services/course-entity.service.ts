import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Course } from "../model/course";

// Basically a facade service
@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super("Course", serviceElementFactory);
  }
}

// We can check the api
// const service = new CourseEntityService();
// service.
