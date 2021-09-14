import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {InMemoryDataService} from "../services/in-memory-data.service";

interface Country {
  name: string
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  //Az "orszag" dropdown-hoz, ebben taroljuk az orszagokat
  // @ts-ignore
  countries: Country[];

  //Ebben taroljuk az eppen kivalasztott orszagot az "orszag" dropdown-bol
  // @ts-ignore
  selectedCountry: Country = {name: ''};

  //Ebben taroljuk az eppen kivalasztott statuszt a "statusz" radio button-bol
  // @ts-ignore
  radioButtonSelectedValue: string | undefined;

  //Ebben taroljuk az aktualis user nemet
  usersGender: string | undefined;

  //A "nem" select-hez, ebben taroljuk a nemeket
  // @ts-ignore
  genders: string[];

  //Ebben taroljuk az eppen kivalasztott nemet a "nem" select-bol
  // @ts-ignore
  selectedGender: string;

  //Ebben taroljuk az aktualis user id-jet
  id = 0;

  //Ebben taroljuk az aktualis user-t
  // @ts-ignore
  user: User;

  //Ez az edit kepernyon megtalalhato form
  // @ts-ignore
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService,
              private formBuilder: FormBuilder, private inMem: InMemoryDataService) {
    //Nemek feltoltese
    this.genders = [
      'Male',
      'Female'
    ];
    //Orszagok feltoltese
    this.countries = [
      {name: ''},
      {name: 'Hungary'},
      {name: 'Germany'},
      {name: 'United kingdom'}
    ];
  }

  ngOnInit(): void {
    //Felepitjuk a formot
    this.form = this.formBuilder.group({
      id: ['', RxwebValidators.required()],
      firstName: ['', RxwebValidators.required()],
      lastName: ['', RxwebValidators.required()],
      country: [''],
      nationality: ['', RxwebValidators.required()],
      mothersName: ['', RxwebValidators.required()],
      registered: [''],
      gender: [''],
      birthDate: [''],
      number: [''],
      status: ['']
    });

    //Feltoltjuk az id-t az url-bol
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');

    this.userService.onGetUser(this.id).subscribe(user => {
      //Az osztalyban levo user-be beletesszuk a db-tol kapott user adatait
      this.user = user
      //Feltoltjuk a user adataival a formot
      this.form.patchValue(user);
      this.usersGender = user.gender;
      //Beletesszuk a selectedGender-be az aktualis user nemet.
      // Erre azert van szuksegunk mert a p-selectButton a selectedGenderrel van osszekotve
      if (this.usersGender == 'Male') {
        this.selectedGender = this.genders[0];
      } else if (this.usersGender == 'Female') {
        this.selectedGender = this.genders[1];
      }
      // @ts-ignore
      this.user.gender = this.selectedGender;
      //Ahogyan fentebb, beletesszuk az osszekotott valtozonkba az aktualis user statuszat
      this.radioButtonSelectedValue = user.status;
      if (this.id != 0) {
        if (user.country != null) {
          //Szinten az orszag eseteben
          this.selectedCountry.name = user.country
        }
      }
    });

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
    okDate = this.getMonth(dateInStr) + '/' + dateInStr.substr(8, 2) + '/' + dateInStr.substr(11,4)
    return okDate;
  }

  //A fuggveny menti a usert a db-be
  //Ha az id-nk 0, tehat uj user-rol van szo, akkor add-ol, ellenkezo esetben update-l
  saveButton() {
    //Ha a formhoz nem volt hozzanyulva, akkor nem mentunk foloslegesen
    if (this.isChanged()){
      if (this.id == 0) {
        //Generaljuk az id-t itt
        this.form.patchValue({id: this.inMem.genId(), country: this.selectedCountry.name, birthDate: this.user.birthDate == '' ? "" : this.trimDate(this.user.birthDate.toString()) as unknown as Date})
        this.userService.onAdd(this.form.value as User).subscribe();
      } else {
        this.form.patchValue({id: +this.form.controls['id'].value, country: this.selectedCountry.name, birthDate: this.user.birthDate == '' ? "" : this.trimDate(this.user.birthDate.toString()) as unknown as Date})
        this.userService.onUpdate(this.form.value as User).subscribe();
      }
    }

    this.form.reset();
    //Visszalepes az elozo oldalra
    this.router.navigateByUrl('').then();
  }

  //Figyeli, hogy volt-e hozzanyulva a formhoz
  private isChanged() {
    return this.form.dirty;
  }

  //Visszalepes az elozo oldalra
  back() {
    this.router.navigateByUrl('').then();
  }
}
