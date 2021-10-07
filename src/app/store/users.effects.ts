import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {UsersRepository} from "./users.repository";
import {Observable} from "rxjs";
import {
  createUserAction, createUserResultAction, deleteUserAction, deleteUserResultAction,
  loadListAction,
  loadListResultAction,
  loadUserAction,
  loadUserResultAction,
  updateUserAction, updateUserResultAction
} from "./users.actions";
import {flatMap, map, switchMap} from "rxjs/operators";
import {User} from "../models/User";
import {HandleErrorAction, toActionCreatorPayload} from "../util";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersRepository: UsersRepository) {
  }

  //Listazza a usereket
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

  //Betolt egy usert id alapjan
  @Effect()
  LoadUser: Observable<any> = this.actions
    .pipe(
      ofType(loadUserAction),
      flatMap((payload: any) => {
        return this.usersRepository.getUser(payload.payload).pipe(
          map((user: User) => {
            return {payload: user};
          })
          , toActionCreatorPayload(loadUserResultAction, HandleErrorAction)
        );
      })
    );

  //Letrehoz egy usert
  @Effect()
  createUser: Observable<any> = this.actions
    .pipe(
      ofType(createUserAction),
      flatMap((payload: any) => {
        return this.usersRepository.addUser(payload.payload).pipe(
          map((user: User) => {
            return {payload: user};
          })
          , toActionCreatorPayload(createUserResultAction, HandleErrorAction)
        );
      })
    );

  //Frissit egy usert
  @Effect()
  updateUser: Observable<any> = this.actions
    .pipe(
      ofType(updateUserAction),
      flatMap((payload: any) => {
        return this.usersRepository.updateUser(payload.payload).pipe(
          map((user: User) => {
            return {payload: user};
          })
          , toActionCreatorPayload(updateUserResultAction, HandleErrorAction)
        );
      })
    );

  //Torol egy usert
  @Effect()
  deleteUser: Observable<any> = this.actions
    .pipe(
      ofType(deleteUserAction),
      flatMap((payload: any) => {
        return this.usersRepository.deleteUser(payload.payload).pipe(
          map((user: User) => {
            return {payload: user};
          })
          , toActionCreatorPayload(deleteUserResultAction, HandleErrorAction)
        );
      })
    );
}
