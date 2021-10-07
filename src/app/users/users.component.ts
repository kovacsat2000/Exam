import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/User";
import {UsersFacade} from "../store/users.facade";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit, OnDestroy {

  //Selectionhoz
  // @ts-ignore
  user: User;

  //A storebol erkezo user tomb
  listUsers: Observable<User[]> = this.usersFacade.listData;

  constructor(private usersFacade: UsersFacade, private router: Router,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    //A user tomb feltoltese
    this.usersFacade.loadList();
    this.usersFacade.listData.subscribe( user => {
      console.log(user)
    })
  }

  //Torli a usert a db-bol
  onDelete(user: User): void {
    this.usersFacade.deleteUser(user);
    this.usersFacade.loadList()
  }

  //A torles megerositese
  deleteConfirmation(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the user?',
      accept: () => {
        this.onDelete(user)
      }
    });
  }

  //Atiranyit az edit komponensre id alapjan
  onEdit(user: User): void {
    if (!user) {
      this.editSelectMessage()
    }
    if (this.user){
      this.router.navigateByUrl('edit/' + user.id).then();
    }
  }

  //Atiranyit az edit komponensre 0 id-val, ami a user letrehozasa
  newUser() {
    this.router.navigateByUrl('new/0').then();
  }

  editSelectMessage() {
    this.messageService.add({severity:'info', summary:'Editing', detail:'For edit please select a user!'});
  }
}
