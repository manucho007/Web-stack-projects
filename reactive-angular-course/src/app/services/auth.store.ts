import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { User } from "../model/user";

// Key for localstorage
const AUTH_DATA = "auth_data";

@Injectable({ providedIn: "root" })
export class AuthStore {
  userSubject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    // Check if the user exists
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    // Check if the user exists in localstorage
    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>("/api/login", { email, password })
      .pipe(
        //    Perform side effect to emit new value of user to store
        tap((user) => {
          this.userSubject.next(user);
          localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        }),
        // Avoid multiple subscriptions
        shareReplay()
      );
  }

  logout() {
    this.userSubject.next(null);
    // Delete the ite in LS
    localStorage.removeItem(AUTH_DATA);
  }
}
