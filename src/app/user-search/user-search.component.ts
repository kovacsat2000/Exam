import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";

interface Country {
  name: string
}

interface Gender {
  name: string
}

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  //A kereses alatt ebben taroljuk azokat a usereket, akik megfelelnek a felteteleknek
  // @ts-ignore
  filteredUsers: User[]

  //A selection tablazathoz a kapcsolat
  // @ts-ignore
  user: User;

  //Ebben vannak a userek
  // @ts-ignore
  users: User[]

  //Ezekkel figyeljuk, hogy eppen a teljes vagy a szurt tablazat jelenjen meg
  // @ts-ignore
  fullListNeeded: boolean = true;
  // @ts-ignore
  searchListNeeded: boolean = false;

  //Chechboxhoz
  registered: boolean = false;

  //Sztatus autocomplete-hez
  statuses: string[] = ['New','Done','In progress'];

  //Autocomlete output
  // @ts-ignore
  output: string[];

  autoComplete(event: { query: string; }) {
    this.output = this.statuses.filter(c => c.startsWith(event.query));
  }

  //Feltolti a db-bol a userekkel az osztaly user tomjet
  getUsers(): void {
    this.userService.onGet().subscribe(users => {
      this.users = users;
    });
  }

  //Az "orszag" dropdown-hoz, ebben taroljuk az orszagokat
  // @ts-ignore
  countries: Country[];

  //Ebben taroljuk az eppen kivalasztott orszagot az "orszag" dropdown-bol
  // @ts-ignore
  selectedCountry: Country = {name: ''};

  //A "nem" select-hez, ebben taroljuk a nemeket
  // @ts-ignore
  genders: Gender[] = [];

  //Ebben taroljuk az eppen kivalasztott nemet a "nem" select-bol
  // @ts-ignore
  selectedGender: Gender = {name: ''};

  //A szuletesi datum a p-calendarhoz
  // @ts-ignore
  birthDate: string;

  //Az eppen kivalasztott statusz a "statusz" autocomplete-hez
  // @ts-ignore
  selectedStat: string = "";

  constructor(private userService: UserService) {
    this.countries = [
      {name: ''},
      {name: 'Hungary'},
      {name: 'Germany'},
      {name: 'United kingdom'}
    ];
    this.genders = [
      {name: ''},
      {name: 'Male'},
      {name: 'Female'}
    ];
  }

  ngOnInit(): void {
    //Feltoltjuk a users-et
    this.getUsers()
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

    this.filteredUsers = this.users;
    this.filteredUsers = this.filteredUsers.filter(h => h.firstName.toLowerCase().indexOf(fname.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.lastName.toLowerCase().indexOf(lname.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.mothersName.toLowerCase().indexOf(mname.toLowerCase()) !== -1);
    if (this.birthDate) {
      this.filteredUsers = this.filteredUsers.filter(h => h.birthDate.toLowerCase().indexOf(this.trimDate(this.birthDate.toString()).toLowerCase()) !== -1);
    }
    // @ts-ignore
    this.filteredUsers = this.filteredUsers.filter(h => h.status.toLowerCase().indexOf(this.selectedStat.toLowerCase()) !== -1);
    // @ts-ignore
    this.filteredUsers = this.filteredUsers.filter(h => h.gender.toLowerCase().indexOf(this.selectedGender.name.toLowerCase()) !== -1);
    // @ts-ignore
    this.filteredUsers = this.filteredUsers.filter(h => h.country.toLowerCase().indexOf(this.selectedCountry.name.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => String(h.number).indexOf(numb.toString()) !== -1 );
    this.filteredUsers = this.filteredUsers.filter(h => h.registered === this.registered)
  }
}
