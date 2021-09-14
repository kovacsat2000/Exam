import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {UsersRepository} from "./users.repository";
import {Observable, of} from "rxjs";
import {loadListAction, loadListResultAction} from "./users.actions";
import {debounce, map, switchMap} from "rxjs/operators";
import {User} from "../models/User";
import {HandleErrorAction, toActionCreatorPayload} from "../util";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersRepository: UsersRepository) {
  }
  @Effect()
  LoadList: Observable<any> = this.actions
    .pipe(
      ofType(loadListAction),
      switchMap((action) => {
        return this.usersRepository.list().pipe(
          map((users: User[]) => {
            return {payload: users};
          })
          , toActionCreatorPayload(loadListResultAction, HandleErrorAction)
        );
      })
    );
}
