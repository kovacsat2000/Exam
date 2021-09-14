import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  counter: number = Math.max(...this.createDb().users.map(user => user.id)) + 1 ;

  createDb() {
    //In memory adatbazis a gyakorlashoz, ugyanugy tudja a CRUD-okat.
    const users: User[] = [
      { id: 0, firstName: '', lastName: '', country: '', nationality: [],
        mothersName: '', registered: false, gender: '', birthDate: '',
        number: '', status: '' },
      { id: 1, firstName: 'Dummy first 1', lastName: 'Dummy last 1', country: 'Hungary', nationality: ['Hungarian'],
        mothersName: 'Mommy Name 1', registered: true, gender: 'Male', birthDate: '01/01/2020',
        number: '012345876', status: 'Done' },
      { id: 2, firstName: 'Dummy first 2', lastName: 'Dummy last 2', country: 'Hungary', nationality: ['Hungarian'],
        mothersName: 'Mommy Name 2', registered: false, gender: 'Female', birthDate: '02/01/2020',
        number: '012345876', status: 'New' },
      { id: 3, firstName: 'Dummy first 3', lastName: 'Dummy last 3', country: 'Germany', nationality: ['German'],
        mothersName: 'Mommy Name 3', registered: true, gender: 'Male', birthDate: '03/01/2020',
        number: '012345876', status: 'In process' },
      { id: 4, firstName: 'Dummy first 4', lastName: 'Dummy last 4', country: 'United Kingdom', nationality: ['British'],
        mothersName: 'Mommy Name 4', registered: true, gender: 'Male', birthDate: '04/01/2020',
        number: '012345876', status: 'Done' },
      { id: 5, firstName: 'Dummy first 5', lastName: 'Dummy last 5', country: 'Hungary', nationality: ['Hungarian'],
        mothersName: 'Mommy Name 5', registered: false, gender: 'Female', birthDate: '05/01/2020',
        number: '012345876', status: 'New' },
    ];
    return {users};
  }

  //A (legnagyobb id + 1)-es szamot general, az id mezo feltoltesehez szukseges
  genId(): number {
    this.counter += 1;
    return this.counter;
  }

}
