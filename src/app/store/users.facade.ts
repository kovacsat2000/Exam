import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {usersSelectors} from "./users.selectors";
import {Store} from "@ngrx/store";
import {UsersState} from "./users.reducers";
import {loadListAction} from "./users.actions";

@Injectable()
export class UsersFacade {
  public listData: Observable<User[]> = this.store.select(usersSelectors.listData);

  constructor(private store: Store<UsersState>) {
  }

  public loadList(): void {
    this.store.dispatch(loadListAction());
  }
}
