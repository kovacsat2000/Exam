import {Injectable} from "@angular/core";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {Observable, of} from "rxjs";

@Injectable()
export class UsersRepository {

  constructor(private userService: UserService) {}

  //Listazza az osszes usert
  list(): Observable<User[]> {
    return this.userService.onGet()
  }

  //ID alapjan visszaad egy usert
  getUser(id: number): Observable<User> {
    return this.userService.onGetUser(id)
  }

  //Frissit egy usert
  updateUser(user: User): Observable<User> {
    return this.userService.onUpdate(user)
  }

  //Torol egy usert
  deleteUser(user: User): Observable<User> {
    return this.userService.onDelete(user)
  }

  //Letrehoz egy usert
  addUser(user: User): Observable<User> {
    return this.userService.onAdd(user)
  }

  //ID-t general
  genId() {
    return this.userService.genId();
  }
}
