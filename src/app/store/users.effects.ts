import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {UsersRepository} from "./users.repository";
import {Observable, of} from "rxjs";
import {
  createUserAction, createUserResultAction, deleteUserAction, deleteUserResultAction,
  loadListAction,
  loadListResultAction,
  loadUserAction,
  loadUserResultAction,
  updateUserAction, updateUserResultAction
} from "./users.actions";
import {concatMap, debounce, flatMap, map, mergeMap, switchMap} from "rxjs/operators";
import {User} from "../models/User";
import {HandleErrorAction, toActionCreatorPayload} from "../util";
import {UserService} from "../services/user.service";

@Injectable()
export class UsersEffects {
  constructor(private actions: Actions, private usersRepository: UsersRepository, private userService: UserService) {
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

  //Frissit egy usert
  updateUser = createEffect( () => this.actions.pipe(
    ofType(updateUserAction.type),
    mergeMap( (action) => {
      return this.userService.onUpdate((action as any).payload).pipe(
        map( user => {
          return updateUserResultAction({payload: user})
        })
      )
    })
  ))

  //Letrehoz egy usert
  createUser = createEffect( () => this.actions.pipe(
    ofType(createUserAction.type),
    mergeMap( (action) => {
      return this.userService.onAdd((action as any).payload).pipe(
        map( user => {
          return createUserResultAction({payload: user})
        })
      )
    })
  ))

  //Torol egy usert
  deleteUser = createEffect( () => this.actions.pipe(
    ofType(deleteUserAction.type),
    mergeMap( (action) => {
      return this.userService.onDelete((action as any).payload).pipe(
        map( user => {
          return deleteUserResultAction()
        })
      )
    })
  ))
}
