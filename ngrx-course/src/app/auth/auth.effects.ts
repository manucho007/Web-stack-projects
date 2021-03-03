import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {
    // Not the optimal way to do it with a manual subscription
    // this.actions$.subscribe((action) => {
    //   if (action.type == "[Login Page] User Login") {
    //     localStorage.setItem("user", JSON.stringify(action["user"]));
    //   }
    // });
  }
  // Optimal Way with ngrx createEffect
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      ),
    // This prevents the creation of an infinite loop in case there is an error
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((action) => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("/login");
        })
      ),
    // This prevents the creation of an infinite loop in case there is an error
    { dispatch: false }
  );
}
