import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class UsersRepository {

  constructor(private userService: UserService) {}

  list(): Observable<User[]> {
    return this.userService.onGet().pipe(
      map(users => {
        return users;
      })
    )
  }

  getUser(id: number): Observable<User> {
    return this.userService.onGetUser(id).pipe(
      map(user => {
        return user;
      })
    )
  }
}
