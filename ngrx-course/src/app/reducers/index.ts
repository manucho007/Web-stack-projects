import { routerReducer } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  // This router is the same statekey as the one in StoreRouterConnectingModule from app.module
  router: routerReducer,
};

// This is a metareducer, this metareducers are always executed before the regular reducers
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log("state before:", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

// The order of the metareducers matter in terms of execution
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
