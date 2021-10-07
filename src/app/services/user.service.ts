import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../models/User";
import {InMemoryDataService} from "./in-memory-data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private inMem: InMemoryDataService) { }

  //ID-t general
  genId() {
    return this.inMem.genId();
  }

  //Elkeri a db-bol az egesz users-t
  onGet(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }

  //Elker a db-bol gez user-t id alapjan
  onGetUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  //Torol a db-bol gez user-t id alapjan
  onDelete(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  //Betesz egy user-t a db-be
  onAdd(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  //Frissit egy user-t a db-be
  onUpdate(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions);
  }
}
