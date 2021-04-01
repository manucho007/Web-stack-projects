import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loaded = true;
    });
  }

  onSubmit(userForm: NgForm) {
    if (!userForm.valid) {
      console.log('Form is not valid');
      console.log(userForm.value);
    } else {
      userForm.value.isActive = true;
      userForm.value.registered = new Date();
      userForm.value.hide = true;
      // this.users.unshift(userForm.value);
      this.userService.addUser(userForm.value);
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
