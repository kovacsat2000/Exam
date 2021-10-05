import { Injectable } from '@angular/core';

//Szimulalt adatbazis, mintha kapnank valahonnan az adatokat
@Injectable({
  providedIn: 'root'
})
export class SimulatedDb {
  genders: string[];
  countries: string[];
  statuses: string[];

  constructor() {
    this.genders = [
      'Male',
      'Female'
    ];

    this.countries = [
      'Hungary',
      'Germany',
      'United Kingdom'
    ];

    this.statuses = [
      'New',
      'Done',
      'In process'
    ]
  }
}
