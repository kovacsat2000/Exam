import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UsersRepository {
  constructor(private userService: UserService) {
  }

  // @ts-ignore
  users: User[];

  // @ts-ignore
  user: User;

  listUser(id: number): Observable<User> {
    this.userService.onGetUser(id).subscribe(user => {
      this.user = user;
    });
    return of(this.user);
  }

  list(): Observable<User[]> {
    return this.userService.onGet().pipe(
      map(users => {
        return users;
      })
    )
  }
}
