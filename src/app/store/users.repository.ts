import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Observable, of} from "rxjs";

@Injectable()
export class UsersRepository {

  constructor(private userService: UserService) {}

  list(): Observable<User[]> {
    return this.userService.onGet()
  }

  getUser(id: number): Observable<User> {
    return this.userService.onGetUser(id)
  }

  updateUser(user: User): Observable<User> {
    return this.userService.onUpdate(user)
  }

  deleteUser(user: User): Observable<User> {
    return this.userService.onDelete(user)
  }

  addUser(user: User): Observable<User> {
    return this.userService.onAdd(user)
  }

  //ID-t general
  genId() {
    return this.userService.genId();
  }
}
