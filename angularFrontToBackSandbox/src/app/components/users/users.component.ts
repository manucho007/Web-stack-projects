import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
  };
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  @ViewChild('userForm') form: NgForm;

  constructor() {}

  ngOnInit() {
    this.users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        isActive: true,
        registered: new Date('01/02/2018 08:30:00'),
        hide: true,
      },
      {
        firstName: 'Kevin',
        lastName: 'Johnson',
        email: 'kevin@yahoo.com',
        isActive: false,
        registered: new Date('03/11/2017 06:20:00'),
        hide: true,
      },
      {
        firstName: 'Karen',
        lastName: 'Williams',
        email: 'karen@gmaial.com',
        isActive: true,
        registered: new Date('11/02/2016 10:30:00'),
        hide: true,
      },
    ];

    this.loaded = true;
  }

  onSubmit(userForm: NgForm) {
    if (!userForm.valid) {
      console.log('Form is not valid');
      console.log(userForm.value);
    } else {
      userForm.value.isActive = true;
      userForm.value.registered = new Date();
      userForm.value.hide = true;
      this.users.unshift(userForm.value);
      this.form.reset();
    }
  }
  // same but passing the event instead of userForm
  // onSubmit(e: Event) {
  //   e.preventDefault();
  //   if (!this.form.valid) {
  //     console.log('Form is not valid');
  //   } else {
  //     const newUser: User = {
  //       ...this.form.value,
  //       hide: true,
  //       registered: new Date(),
  //       isActive: true,
  //     };
  //     this.users.unshift(newUser);
  //     this.form.reset();
  //   }
  // }
}
