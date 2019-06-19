import { SetIsOnLine } from "../actions/network.actions";
import { Observable, merge, of, fromEvent } from "rxjs";
import { switchMap, mapTo, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as networkActions from "../actions/network.actions";
import { Action } from "@ngrx/store";

@Injectable()
export class NetworkEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  startOnlineOfflineCheck$: Observable<Action> = this.actions$.pipe(
    ofType(networkActions.NetworkActionTypes.StartOnlineOfflineCheck),
    switchMap(() => {
      return merge(
        of(navigator.onLine),
        fromEvent(window, "online").pipe(mapTo(true)),
        fromEvent(window, "offline").pipe(mapTo(false))
      );
    }),
    map(isOnline => {
      return new SetIsOnLine(!!isOnline);
    })
  );
}
