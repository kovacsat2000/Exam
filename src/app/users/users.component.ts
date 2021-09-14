import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {UsersFacade} from "../store/users.facade";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmationService]
})
export class UsersComponent implements OnInit {

  //Selectionhoz
  // @ts-ignore
  user: User;

  //A strebol erkezo user tomb
  listUsers: Observable<User[]>=this.usersFacade.listData;

  constructor(private userService: UserService, private usersFacade: UsersFacade, private router: Router,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    //A user tomb feltoltese
    this.usersFacade.loadList();
  }

  //Torli a usert a db-bol
  onDelete(user: User): void {
    this.userService.onDelete(user.id).subscribe();
    this.usersFacade.loadList();
  }

  //A torles megerositese
  confirm(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the user?',
      accept: () => {
        this.onDelete(user)
      }
    });
  }

  //Atiranyit az edit komponensre id alapjan
  onEdit(user: User): void {
    if (this.user){
      this.router.navigateByUrl('edit/' + user.id).then();
    }
  }

  //Atiranyit az edit komponensre 0 id-val, ami a user letrehozasa
  newUser() {
    this.router.navigateByUrl('edit/0').then();
  }
}
