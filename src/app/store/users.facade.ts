import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {usersSelectors} from "./users.selectors";
import {Store} from "@ngrx/store";
import {UsersState} from "./users.reducers";
import {createUserAction, deleteUserAction, loadListAction, loadUserAction, updateUserAction} from "./users.actions";
import {UserService} from "../services/user.service";

@Injectable()
export class UsersFacade {
  public listData: Observable<User[]> = this.store.select(usersSelectors.listData);
  public userData: Observable<User> = this.store.select(usersSelectors.userData);

  constructor(private store: Store<UsersState>, private userService: UserService) {
  }

  //ID-t general
  genId() {
    return this.userService.genId();
  }

  //Listazza a usereket
  public loadList(): void {
    this.store.dispatch(loadListAction());
  }

  //Betolt egy usert id alapjan
  public loadUser(id: number): void {
    this.store.dispatch(loadUserAction({payload: id}));
  }

  //Frissit egy usert
  public updateUser(user: User): void {
    this.store.dispatch(updateUserAction({payload: user}))
  }

  //Letrehoz egy usert
  public createUser(user: User): void {
    this.store.dispatch(createUserAction({payload: user}))
  }

  //Torol egy usert
  public deleteUser(user: User): void {
    this.store.dispatch(deleteUserAction({payload: user}))
  }
}
