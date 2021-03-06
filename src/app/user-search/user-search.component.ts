import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/User";
import {Router} from "@angular/router";
import {SimulatedDb} from "../services/SimulatedDb";
import {UsersFacade} from "../store/users.facade";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  providers: []
})
export class UserSearchComponent implements OnInit, OnDestroy {
  listUsers: Observable<User[]> = this.usersFacade.listData;

  title = "List of Users"

  //A kereses alatt ebben taroljuk azokat a usereket, akik megfelelnek a felteteleknek
  // @ts-ignore
  filteredUsers: User[]

  //A selection tablazathoz a kapcsolat
  // @ts-ignore
  user: User;

  //Ezekkel figyeljuk, hogy eppen a teljes vagy a szurt tablazat jelenjen meg
  // @ts-ignore
  fullListNeeded: boolean = true;
  // @ts-ignore
  searchListNeeded: boolean = false;

  //Chechboxhoz
  // @ts-ignore
  registered: boolean = null;

  //Autocomlete output
  // @ts-ignore
  output: string[];

  autoComplete(event: { query: string; }) {
    this.output = this.simulatedDb.statuses.filter(c => c.startsWith(event.query));
  }

  //Ebben taroljuk az eppen kivalasztott orszagot az "orszag" dropdown-bol
  // @ts-ignore
  selectedCountry: string

  //Ebben taroljuk az eppen kivalasztott nemet a "nem" select-bol
  // @ts-ignore
  selectedGender: string

  //A szuletesi datum a p-calendarhoz
  // @ts-ignore
  birthDate: string;

  //Az eppen kivalasztott statusz a "statusz" autocomplete-hez
  // @ts-ignore
  selectedStat: string = "";

  constructor(private router: Router, public simulatedDb: SimulatedDb,
              private usersFacade: UsersFacade) {
  }

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
    //Feltoltjuk a users-et
    this.usersFacade.loadList();
  }

  //Visszaadja szam formajaban a kapott Date tipusbol a honapot
  private getMonth(dateInStr: string) {
    switch(dateInStr.substr(4,3)) {
      case "Jan": {
        return "01";
      }
      case "Feb": {
        return "02";
      }
      case "Mar": {
        return "03";
      }
      case "Apr": {
        return "04";
      }
      case "May": {
        return "05";
      }
      case "Jun": {
        return "06";
      }
      case "Jul": {
        return "07";
      }
      case "Aug": {
        return "08";
      }
      case "Sep": {
        return "09";
      }
      case "Oct": {
        return "10";
      }
      case "Nov": {
        return "11";
      }

      default: {
        return '12'
      }
    }
  }

  //A kivant formatumban adja vissza a kapott Date tipusbol a datumot => "dd/mm/yyyy"
  private trimDate(dateInStr: string) {
    let okDate: string;
    okDate = dateInStr.substr(8, 2) + '/' + this.getMonth(dateInStr) + '/' + dateInStr.substr(11,4)
    return okDate;
  }

  //Filter segitsegevel keres a listaban, sorban hasonlitja ossze az adottakat
  search(fname: string, lname: string, nat: string, mname: string,  numb: string) {
    this.fullListNeeded = false;
    this.searchListNeeded = true;

    this.listUsers.pipe(takeUntil(this.unsubscribe$)).subscribe(users => {
      this.filteredUsers = users
    })
    if (fname !== "") {
      this.filteredUsers = this.filteredUsers.filter(h => h.firstName.toLowerCase().indexOf(fname.toLowerCase()) !== -1);
    }
    this.filteredUsers = this.filteredUsers.filter(h => h.lastName.toLowerCase().indexOf(lname.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.nationality.toLowerCase().indexOf(nat.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.mothersName.toLowerCase().indexOf(mname.toLowerCase()) !== -1);
    if (this.birthDate) {
      this.filteredUsers = this.filteredUsers.filter(h => h.birthDate.toLowerCase().indexOf(this.trimDate(this.birthDate.toString()).toLowerCase()) !== -1);
    }
    // @ts-ignore
    this.filteredUsers = this.filteredUsers.filter(h => h.status.toLowerCase().indexOf(this.selectedStat.toLowerCase()) !== -1);
    if (this.selectedGender !== null && this.selectedGender !== undefined) {
      // @ts-ignore
      this.filteredUsers = this.filteredUsers.filter(h => h.gender.indexOf(this.selectedGender) !== -1);
    }
    if (this.selectedCountry !== null && this.selectedCountry !== undefined) {
      // @ts-ignore
      this.filteredUsers = this.filteredUsers.filter(h => h.country.toLowerCase().indexOf(this.selectedCountry.toLowerCase()) !== -1);
    }
    this.filteredUsers = this.filteredUsers.filter(h => String(h.number).indexOf(numb.toString()) !== -1 );
    if (this.registered !== null ) {
      this.filteredUsers = this.filteredUsers.filter(h => h.registered === this.registered)
    }
  }

  //Atiranyit az edit komponensre 0 id-val, ami a user letrehozasa
  newUser() {
    this.router.navigateByUrl('edit/0').then();
  }

  //Atiranyit az edit komponensre id alapjan
  onEdit(user: User): void {
    if (this.user){
      this.router.navigateByUrl('edit/' + user.id).then();
    }
  }

  //Torli a usert a db-bol
  onDelete(user: User): void {
    this.usersFacade.deleteUser(user)
    this.fullListNeeded = true;
    this.searchListNeeded = false;
  }
}
