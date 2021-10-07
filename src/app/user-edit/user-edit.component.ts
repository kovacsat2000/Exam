import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/User";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {SimulatedDb} from "../services/SimulatedDb";
import {UsersFacade} from "../store/users.facade";
import {Observable, Subject} from "rxjs";
import {UsersRepository} from "../store/users.repository";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  editUser: Observable<User> = this.usersFacade.userData;

  //Ebben taroljuk az aktualis user id-jet
  id = 0;

  //Ez az edit kepernyon megtalalhato form
  // @ts-ignore
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, private usersFacade: UsersFacade,
              public simulatedDb: SimulatedDb) {
  }

  private unsubscribe$ = new Subject<void>()

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
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

    this.usersFacade.loadUser(this.id);
    this.editUser.pipe(takeUntil(this.unsubscribe$)).subscribe( user => {
      this.form.patchValue(user)
    })

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
  save() {
    //Ha a formhoz nem volt hozzanyulva, akkor nem mentunk foloslegesen
    if (this.isChanged()){
      if (this.id == 0) {
        //Generaljuk az id-t itt
        if (this.isDateChanged()) {
          this.form.patchValue({id: this.usersFacade.genId(), birthDate: this.form.controls['birthDate'].value.toString() == '' ? "" : this.trimDate(this.form.controls['birthDate'].value.toString()) as unknown as Date})
        } else {
          this.form.patchValue({id: this.usersFacade.genId()})
        }
        this.usersFacade.createUser(this.form.value as User)
        this.form.reset();
        this.router.navigateByUrl('').then();
      } else {
        if (this.isDateChanged()) {
          this.form.patchValue({id: +this.form.controls['id'].value, birthDate: this.form.controls['birthDate'].value.toString() == '' ? "" : this.trimDate(this.form.controls['birthDate'].value.toString()) as unknown as Date})
        } else {
          this.form.patchValue({id: +this.form.controls['id'].value})
        }
        this.usersFacade.updateUser(this.form.value as User);
        this.form.reset();
        this.router.navigateByUrl('').then();
      }
    } else {
      this.router.navigateByUrl('').then();
    }
  }

  //Figyeli, hogy volt-e hozzanyulva a formhoz
  private isChanged() {
    return this.form.dirty;
  }

  //Figyeli, hogy volt-e hozzanyulva a szuletesi datumhoz
  private isDateChanged() {
    return this.form.controls["birthDate"].dirty;
  }

  //Visszalepes az elozo oldalra
  back() {
    this.router.navigateByUrl('').then();
  }
}
